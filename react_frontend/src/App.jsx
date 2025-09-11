import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
// import Auth from './pages/auth'
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import ChatPage from './pages/ChatPage'
import PeerChat from './pages/PeerChat';


function App() {
  return (
    <Router>
      <Routes>
  {/* <Route path="/" element={<Auth />} /> */}
  <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/journey" element={<ChatPage />} />
      <Route path="/resources" element={<PeerChat />} />
  <Route path="/profile" element={<Profile />} />
  </Routes>
    </Router>
  );
}

export default App;