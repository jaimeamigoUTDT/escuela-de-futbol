// src/Home.jsx
import { use, useEffect, useState } from 'react';

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  const [count, setCount] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    console.log(`Component loaded with count: ${count}`);

  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>Welcome to the Homepage</h1>
      <p style={{ color: '#666' }}>This is a basic homepage for your React + Node.js project.</p>
      {isLoaded && (
        <p style={{ color: 'green', fontWeight: 'bold', marginTop: '1rem' }}>
          Homepage loaded successfully!
        </p>
      )}

      <button onClick={setCount((prevCount) => prevCount + 1)}></button>
    </div>
  );
}

export default Home;