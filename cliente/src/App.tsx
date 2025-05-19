import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api`)
      .then(response => setMessage(response.data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>React + Node.js Project</h1>
      <p>Backend Message: {message}</p>
    </div>
  );
}

export default App;