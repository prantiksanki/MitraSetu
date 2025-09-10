import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Users, Send, Smile } from 'lucide-react';
import EmojiPicker from './EmojiPicker';

const socket = io('http://localhost:5000');

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [userRole, setUserRole] = useState('user');
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    socket.on('chat_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('user_joined', (data) => {
      setMessages((prev) => [...prev, { 
        text: data.message, 
        sender: 'System', 
        role: 'user', 
        timestamp: new Date().toISOString(),
        system: true 
      }]);
      setOnlineUsers(data.count);
    });

    socket.on('user_left', (data) => {
      setMessages((prev) => [...prev, { 
        text: data.message, 
        sender: 'System', 
        role: 'user', 
        timestamp: new Date().toISOString(),
        system: true 
      }]);
      setOnlineUsers(data.count);
    });

    socket.on('room_full', (msg) => {
      alert(msg);
      socket.disconnect();
    });

    socket.on('online_count', (count) => {
      setOnlineUsers(count);
    });

    return () => {
      socket.off('chat_message');
      socket.off('user_joined');
      socket.off('user_left');
      socket.off('room_full');
      socket.off('online_count');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const joinChat = () => {
    if (username.trim()) {
      socket.emit('join_chat', { username, role: userRole });
      setIsJoined(true);
    }
  };

  const sendMessage = () => {
    if (input.trim()) {
      const message = {
        text: input,
        sender: username,
        role: userRole,
        timestamp: new Date().toISOString()
      };
      socket.emit('chat_message', message);
      setInput('');
      setShowEmojiPicker(false);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setInput(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isJoined) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="w-full max-w-md p-8 border shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl border-white/20">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-800">Join the Chat</h2>
            <p className="text-gray-600">Enter your details to start chatting</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full p-3 transition-all duration-200 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && joinChat()}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setUserRole('user')}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    userRole === 'user'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  User
                </button>
                <button
                  onClick={() => setUserRole('mentor')}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    userRole === 'mentor'
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Mentor
                </button>
              </div>
            </div>

            <button
              onClick={joinChat}
              disabled={!username.trim()}
              className="w-full p-3 font-medium text-white transition-all duration-200 transform bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              Join Chat
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 flex flex-col h-[700px]">
        {/* Header */}
        <div className="p-6 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Group Chat</h2>
              <p className="mt-1 text-sm text-blue-100">Welcome, {username}!</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">{onlineUsers} online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50/50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.system
                  ? 'justify-center'
                  : msg.sender === username
                  ? 'justify-end'
                  : 'justify-start'
              } animate-fade-in`}
            >
              {msg.system ? (
                <div className="px-4 py-2 text-sm italic text-gray-600 rounded-full bg-gray-200/80">
                  {msg.text}
                </div>
              ) : (
                <div
                  className={`max-w-[75%] ${
                    msg.sender === username ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      msg.role === 'mentor' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {msg.role === 'mentor' ? '👨‍🏫 Mentor' : '👤 User'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {msg.sender} • {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  <div
                    className={`p-3 rounded-2xl shadow-sm ${
                      msg.sender === username
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-200/50 bg-white/50">
          <div className="relative flex gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-4 pr-12 transition-all duration-200 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <div className="absolute transform -translate-y-1/2 right-3 top-1/2">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-1 text-gray-400 transition-colors duration-200 hover:text-gray-600"
                >
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              
              {showEmojiPicker && (
                <div ref={emojiPickerRef} className="absolute right-0 mb-2 bottom-full">
                  <EmojiPicker onSelect={handleEmojiSelect} />
                </div>
              )}
            </div>
            
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="p-4 text-white transition-all duration-200 transform bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}