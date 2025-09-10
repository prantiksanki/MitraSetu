import { useCallback, useEffect, useRef, useState } from 'react';
import { basicProfanityFilter, detectRiskPhrases } from '../utils/safety';
import { GeminiLiveClient, captureVideoFrameToBase64 } from '../lib/geminiLiveClient';
import { GeminiLiveMock, isMockMode } from '../lib/geminiLiveMock';
import { useConversation } from '../context/ConversationContext';
import { connect as wsConnect, disconnect as wsDisconnect, sendTextInput as wsSendText, sendAudioChunk as wsSendAudio, setOnStatusUpdateCallback as wsOnStatus, setOnErrorCallback as wsOnError, setOnTranscriptCallback as wsOnTranscript } from '../lib/WebSocketService';
import { AUDIO_SAMPLE_RATE } from '../config';

export function useGeminiLive({ autoConnect = false, tokenProvider, onUserMessage, onAIMessage }) {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isScreenOn, setIsScreenOn] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const streamingTimeoutRef = useRef(null);
  // liveMode: 'live' | 'mock'
  const [liveMode, setLiveMode] = useState(isMockMode() ? 'mock' : 'live');
  const [autoFallbackUsed, setAutoFallbackUsed] = useState(false);
  const hasAttemptedLiveRef = useRef(false); // StrictMode duplicate guard

  const mediaStreamRef = useRef(null);
  const videoRef = useRef(null);
  const audioContextRef = useRef(null);
  const audioQueueRef = useRef([]);
  const playingRef = useRef(false);
  const frameIntervalRef = useRef(null);
  const clientRef = useRef(null);
  // Always call hooks unconditionally to preserve order
  const conversationCtx = useConversation();
  const replaceLastAIChunkAppendRef = useRef(conversationCtx?.replaceLastAIChunkAppend);
  useEffect(()=>{ replaceLastAIChunkAppendRef.current = conversationCtx?.replaceLastAIChunkAppend; }, [conversationCtx]);

  const ensureAudioContext = () => {
    if (!audioContextRef.current) {
      // Use configured sample rate (Gemini expects 16k for PCM path; adjust if model changes)
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: AUDIO_SAMPLE_RATE });
    }
    return audioContextRef.current;
  };

  const playLoop = async () => {
    if (playingRef.current) return;
    playingRef.current = true;
    const ctx = ensureAudioContext();
    while (audioQueueRef.current.length > 0) {
      const chunk = audioQueueRef.current.shift();
      try {
        const audioBuffer = await ctx.decodeAudioData(chunk.slice(0));
        const src = ctx.createBufferSource();
        src.buffer = audioBuffer;
        src.connect(ctx.destination);
        src.start();
        await new Promise(r => src.onended = r);
      } catch (e) {
        console.warn('Audio decode error', e);
      }
    }
    playingRef.current = false;
  };

  const handleAudioChunk = (arrayBuffer) => {
    audioQueueRef.current.push(arrayBuffer);
    playLoop();
  };

  const handleText = (text) => {
    setIsStreaming(true);
    streamingTimeoutRef.current && clearTimeout(streamingTimeoutRef.current);
    streamingTimeoutRef.current = setTimeout(()=> setIsStreaming(false), 800); // ends 800ms after last chunk
    const clean = basicProfanityFilter(text);
    const risks = detectRiskPhrases(clean);
    if (isMockMode() && replaceLastAIChunkAppendRef.current) {
      // Stream append for mock mode
      replaceLastAIChunkAppendRef.current(clean);
    } else {
      setTranscript(prev => [...prev, { id: Date.now() + Math.random(), role: 'ai', text: clean, risks }]);
      onAIMessage && onAIMessage(clean, { risks });
    }
  };

  const connect = useCallback(async () => {
    if (connecting || connected) return;
    setConnecting(true); setError(null);
    if (liveMode === 'mock' || isMockMode()) {
      try {
        const ClientClass = GeminiLiveMock;
        clientRef.current = new ClientClass({ onText: handleText, onAudioChunk: handleAudioChunk, onOpen: () => { setConnected(true); setConnecting(false); }, onClose: () => setConnected(false), onError: e=>{ setError(e); setConnecting(false);} });
        await clientRef.current.connect();
      } catch (e) { setError(e); setConnecting(false); }
      return;
    }
    if (hasAttemptedLiveRef.current) {
      // Prevent duplicate immediate second attempt triggered by StrictMode double invoke
      setConnecting(false);
      return;
    }
    hasAttemptedLiveRef.current = true;
    // Real WebSocketService path
    wsOnStatus((st)=>{
      if (st==='connected'){ setConnected(true); setConnecting(false);} else if (st==='disconnected'){ setConnected(false);} });
    wsOnError((msg)=> { setError(new Error(msg)); setConnecting(false); if (!connected) {
      // early failure -> fallback
      setLiveMode('mock');
      setAutoFallbackUsed(true);
      setTimeout(()=>{ hasAttemptedLiveRef.current = false; connect(); }, 30);
    }});
    wsOnTranscript((t)=> {
      if (t.type==='model') {
        if (replaceLastAIChunkAppendRef.current) {
          replaceLastAIChunkAppendRef.current(t.text + (t.isFinal? '' : ''));
        } else {
          handleText(t.text);
        }
      }
    });
    try {
      wsConnect();
    } catch(e){ setError(e); setConnecting(false); }
  }, [connecting, connected, liveMode]);

  const disconnect = useCallback(() => {
    frameIntervalRef.current && clearInterval(frameIntervalRef.current);
    frameIntervalRef.current = null;
    if (liveMode==='mock' || isMockMode()) {
      clientRef.current && clientRef.current.close();
    } else {
      wsDisconnect();
    }
    stopMedia();
    setConnected(false);
  }, [liveMode]);

  const retryLive = useCallback(async () => {
    if (connecting) return;
    setLiveMode('live');
    setAutoFallbackUsed(false);
    hasAttemptedLiveRef.current = false;
    disconnect();
    await new Promise(r=> setTimeout(r, 50));
    connect();
  }, [connecting, connect, disconnect]);

  const stopMedia = () => {
    mediaStreamRef.current?.getTracks().forEach(t => t.stop());
    mediaStreamRef.current = null;
    setIsMicOn(false);
    setIsCameraOn(false);
    setIsScreenOn(false);
  };

  const toggleMic = async () => {
    if (!isMicOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (mediaStreamRef.current) {
          stream.getAudioTracks().forEach(track => mediaStreamRef.current.addTrack(track));
        } else {
          mediaStreamRef.current = stream;
        }
        startAudioCapture(stream);
        setIsMicOn(true);
      } catch (e) { setError('Microphone permission denied'); }
    } else {
      mediaStreamRef.current?.getAudioTracks().forEach(t => t.stop());
      setIsMicOn(false);
    }
  };

  const startAudioCapture = (stream) => {
    const ctx = ensureAudioContext();
    const setupWorklet = async () => {
      try {
        if (ctx.audioWorklet && !ctx.workletModulesLoaded) {
          await ctx.audioWorklet.addModule('/audio-worklet.js');
          ctx.workletModulesLoaded = true;
        }
        if (ctx.workletModulesLoaded) {
          const node = new AudioWorkletNode(ctx, 'pcm-processor');
          node.port.onmessage = (e) => {
            if (liveMode==='mock' || isMockMode()) {
              if (!clientRef.current) return; clientRef.current.sendAudioPcm(e.data);
            } else {
              wsSendAudio(e.data);
            }
          };
          const source = ctx.createMediaStreamSource(stream);
            source.connect(node).connect(ctx.destination);
          return;
        }
      } catch (err) {
        console.warn('AudioWorklet fallback to ScriptProcessor', err);
      }
      // Fallback
      const source = ctx.createMediaStreamSource(stream);
      const processor = ctx.createScriptProcessor(1024, 1, 1);
      processor.onaudioprocess = (e) => {
        if (liveMode==='mock' || isMockMode()) {
        if (!clientRef.current) return;
        const input = e.inputBuffer.getChannelData(0);
        const pcm = new ArrayBuffer(input.length * 2);
        const view = new DataView(pcm);
        for (let i = 0; i < input.length; i++) {
          let s = Math.max(-1, Math.min(1, input[i]));
          view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
        clientRef.current.sendAudioPcm(pcm);
        } else {
          const input = e.inputBuffer.getChannelData(0);
          const pcm = new ArrayBuffer(input.length * 2);
          const view = new DataView(pcm);
          for (let i = 0; i < input.length; i++) {
            let s = Math.max(-1, Math.min(1, input[i]));
            view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
          }
          wsSendAudio(pcm);
        }
      };
      source.connect(processor);
      processor.connect(ctx.destination);
    };
    setupWorklet();
  };

  const toggleCamera = async () => {
    if (!isCameraOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        attachVideoStream(stream);
        startVideoFrameLoop();
        setIsCameraOn(true);
      } catch (e) { setError('Camera permission denied'); }
    } else {
      stopVideo();
    }
  };

  const toggleScreen = async () => {
    if (!isScreenOn) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        attachVideoStream(stream);
        startVideoFrameLoop();
        setIsScreenOn(true);
      } catch (e) { setError('Screen share denied'); }
    } else {
      stopVideo();
    }
  };

  const attachVideoStream = (stream) => {
    mediaStreamRef.current = mediaStreamRef.current || new MediaStream();
    stream.getVideoTracks().forEach(t => mediaStreamRef.current.addTrack(t));
    if (videoRef.current) videoRef.current.srcObject = stream;
  };

  const stopVideo = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }
    frameIntervalRef.current && clearInterval(frameIntervalRef.current);
    frameIntervalRef.current = null;
    setIsCameraOn(false);
    setIsScreenOn(false);
  };

  const startVideoFrameLoop = () => {
    frameIntervalRef.current && clearInterval(frameIntervalRef.current);
    frameIntervalRef.current = setInterval(async () => {
      if (!clientRef.current || !videoRef.current) return;
      const base64 = await captureVideoFrameToBase64(videoRef.current);
      if (base64) clientRef.current.sendImage(base64);
    }, 1000);
  };

  const sendUserText = (text) => {
    if (!text.trim()) return;
    const clean = basicProfanityFilter(text);
    const risks = detectRiskPhrases(clean);
    setTranscript(prev => [...prev, { id: Date.now(), role: 'user', text: clean, risks }]);
    onUserMessage && onUserMessage(clean, { risks });
    if (liveMode==='mock' || isMockMode()) {
      clientRef.current?.sendText(clean);
    } else {
      wsSendText(clean);
    }
  };

  useEffect(() => {
    if (autoConnect) connect();
    return () => disconnect();
  }, [autoConnect, connect, disconnect]);

  return {
    connected,
    connecting,
    error,
    transcript,
    isMicOn,
    isCameraOn,
    isScreenOn,
    videoRef,
    connect,
    disconnect,
    toggleMic,
    toggleCamera,
    toggleScreen,
  sendUserText,
  isStreaming,
  liveMode,
  autoFallbackUsed,
  retryLive
  };
}
