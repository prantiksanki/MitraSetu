// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
// import Auth from './pages/auth'
import Login from './components/login'
import Home from './pages/Home'
import ChatPage from './pages/ChatPage'
import PeerChat from './pages/PeerChat';
import Landing from './pages/Landing';


function App() {
  return (
    <Router>
      <Routes>
      {/* <Route path="/" element={<Auth />} /> */}
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/journey" element={<ChatPage />} />
      <Route path="/resources" element={<PeerChat />} />
      </Routes>
    </Router>
  );
}

export default App;