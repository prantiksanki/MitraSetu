import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
// import Auth from './pages/auth'
import Login from './components/login'
import Nav from './components/nav';


function App() {
  return (
    <Router>
      <Routes>
      {/* <Route path="/" element={<Auth />} /> */}
      <Route path="/" element={<Login />} />
      {/* <Route path="/nav" element={<Nav />} /> */}

      
      </Routes>
    </Router>
  );
}

export default App;