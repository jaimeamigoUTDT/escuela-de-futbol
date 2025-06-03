// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/login';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/hello-world`)
      .then((response) => setMessage(response.data.message || 'No message received'))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setMessage('Failed to load backend message');
      });
  }, []);

  return (
    <Router>
      <div>
        <h1>React + Node.js Project</h1>
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/login">Login</Link>
        </nav>
        <p>Backend Message: {message}</p>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;