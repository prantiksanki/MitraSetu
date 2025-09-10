import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
// import Auth from './pages/auth'
import Login from './components/login'
import Home from './pages/Home'
import ChatPage from './pages/ChatPage'
import PeerChat from './pages/PeerChat';


function App() {
  return (
    <Router>
      <Routes>
      {/* <Route path="/" element={<Auth />} /> */}
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/journey" element={<ChatPage />} />
      <Route path="/resources" element={<PeerChat />} />
      </Routes>
  {/* Voice launcher moved inside AIAssistant input bar */}
    </Router>
  );
}

export default App;