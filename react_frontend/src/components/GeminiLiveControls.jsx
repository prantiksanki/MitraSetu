import React, { useState } from 'react';
import { useGeminiLive } from '../hooks/useGeminiLive';
import { Mic, MicOff, Video, VideoOff, MonitorUp, PlugZap, Plug, Send } from 'lucide-react';
import { useConversation } from '../context/ConversationContext';
import { LIVE_TOKEN_ENDPOINT } from '../config';

async function fetchToken() {
  const res = await fetch(LIVE_TOKEN_ENDPOINT, { headers: { 'Accept': 'application/json' } });
  const text = await res.text();
  if (!res.ok) throw new Error(`Token fetch failed (${res.status})`);
  if (text.startsWith('<')) throw new Error('Unexpected HTML response (check server URL)');
  let json;
  try { json = JSON.parse(text); } catch { throw new Error('Token endpoint returned invalid JSON'); }
  if (!json.token) throw new Error('Token missing in response');
  return json.token;
}

export function GeminiLiveControls() {
  const [input, setInput] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const { addMessage, messages } = useConversation();
  const live = useGeminiLive({
    tokenProvider: fetchToken,
    onUserMessage: (text, meta) => addMessage({ role: 'user', text, meta }),
    onAIMessage: (text, meta) => addMessage({ role: 'ai', text, meta })
  });
  const { connected, connecting, error, isMicOn, isCameraOn, isScreenOn, videoRef, connect, disconnect, toggleMic, toggleCamera, toggleScreen, sendUserText } = live;

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white/80 backdrop-blur rounded-2xl shadow border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Gemini Live (Beta Scaffold)</h2>
        <button onClick={()=>setCollapsed(c=>!c)} className="text-xs px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">{collapsed ? 'Expand' : 'Collapse'}</button>
      </div>
      <p className="text-sm text-gray-600 mb-4">Experimental real-time audio / video / screen share integration. Requires backend token proxy.</p>
      {error && <div className="p-2 mb-4 text-xs text-red-700 bg-red-100 rounded">{error.message || String(error)}</div>}
      {collapsed && <p className="text-xs text-gray-500">Panel collapsed.</p>}
  {!collapsed && (
  <>
  <div className="flex flex-wrap gap-3 mb-4">
        {!connected ? (
          <button onClick={connect} disabled={connecting} className="px-4 py-2 rounded bg-blue-600 text-white flex items-center gap-2 disabled:opacity-50">
            <PlugZap size={16}/> {connecting ? 'Connecting...' : 'Connect'}
          </button>
        ) : (
          <button onClick={disconnect} className="px-4 py-2 rounded bg-red-600 text-white flex items-center gap-2">
            <Plug size={16}/> Disconnect
          </button>
        )}
        <button onClick={toggleMic} disabled={!connected} className={`px-4 py-2 rounded flex items-center gap-2 ${isMicOn ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'} disabled:opacity-50`}>
          {isMicOn ? <Mic size={16}/> : <MicOff size={16}/>}{isMicOn ? 'Mic On' : 'Mic Off'}
        </button>
        <button onClick={toggleCamera} disabled={!connected} className={`px-4 py-2 rounded flex items-center gap-2 ${isCameraOn ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'} disabled:opacity-50`}>
          {isCameraOn ? <Video size={16}/> : <VideoOff size={16}/>}{isCameraOn ? 'Camera On' : 'Camera Off'}
        </button>
        <button onClick={toggleScreen} disabled={!connected} className={`px-4 py-2 rounded flex items-center gap-2 ${isScreenOn ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'} disabled:opacity-50`}>
          <MonitorUp size={16}/>{isScreenOn ? 'Sharing' : 'Share Screen'}
        </button>
      </div>
  <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="aspect-video bg-gray-200 rounded overflow-hidden flex items-center justify-center">
            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
            {!isCameraOn && !isScreenOn && <span className="text-xs text-gray-600">Camera / Screen feed</span>}
          </div>
        </div>
        <div className="md:col-span-2 flex flex-col">
          <div className="flex-1 overflow-y-auto border rounded p-3 bg-white text-sm space-y-2 max-h-64">
            {messages.map(m => (
              <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <span className={`inline-block px-3 py-2 rounded-2xl ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>{m.text}</span>
              </div>
            ))}
            {!messages.length && <div className="text-gray-400 text-center">No messages yet.</div>}
          </div>
          <form onSubmit={(e)=>{e.preventDefault(); sendUserText(input); setInput('');}} className="mt-3 flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} disabled={!connected} placeholder={connected? 'Say something...' : 'Connect to start'} className="flex-1 border rounded px-3 py-2" />
            <button type="submit" disabled={!connected || !input.trim()} className="px-4 py-2 rounded bg-blue-600 text-white flex items-center gap-2 disabled:opacity-50"><Send size={16}/>Send</button>
          </form>
        </div>
      </div>
  </>
      )}
      <p className="mt-4 text-xs text-gray-500">Protocol placeholder. Do not ship without security + moderation.</p>
    </div>
  );
}

export default GeminiLiveControls;
