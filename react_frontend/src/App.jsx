// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Auth from './pages/Auth'
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import ChatPage from './pages/ChatPage'
import PeerChat from './pages/PeerChat';
import Landing from './pages/Landing';
import LivePage from './pages/LivePage';
import Onboarding from './pages/Onboarding';


function App() {
  return (
    <Router>
      <Routes>
  {/* <Route path="/" element={<Auth />} /> */}
  <Route path="/" element={<LandingPage />} />
  <Route path="/auth" element={<Auth />} />
      <Route path="/home" element={<Home />} />
      <Route path="/journey" element={<ChatPage />} />
      <Route path="/live" element={<LivePage />} />
      <Route path="/resources" element={<PeerChat />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/onboarding" element={<Onboarding />} />
  </Routes>
    </Router>
  );
}

export default App;