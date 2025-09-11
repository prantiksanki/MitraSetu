// Central front-end config for live features with safe defaults
export const API_KEY = '';
export const WEBSOCKET_HOST = 'example.com';
export const WEBSOCKET_PATH = '/ws';
export const MODEL_NAME = 'gemini-live-proto';
export const AUDIO_SAMPLE_RATE = 16000;

// Optional audio processing flags (guarded usage)
export const AEC_ENABLED = false; // Acoustic Echo Cancellation
export const AGC_ENABLED = true;  // Auto Gain Control
export const NS_ENABLED = true;   // Noise Suppression

// Token endpoint for Gemini LiveControls scaffold
export const LIVE_TOKEN_ENDPOINT = '/api/live/token';

// Centralized configuration & environment access
export const API_BASE = import.meta.env.VITE_API_BASE || '';
// Presentation prototype: live WS removed. Keep only API base if needed later.
