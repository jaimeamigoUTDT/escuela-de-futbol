// src/components/Layout.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import '../App.css'; // Assuming you want to keep the same styling

function Layout() {
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
    <div>
      <h1>React + Node.js Project</h1>
    </div>
  );
}

export default Layout;