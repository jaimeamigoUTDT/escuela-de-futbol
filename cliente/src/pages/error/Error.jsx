import React from 'react';
import { Link } from 'react-router-dom';
import './error.css';

function Error() {
  return (
    <div className="error-page">
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <p>
        Por favor, dirigite a <Link to="/login">la página de inicio</Link>
        
        </p> 
    </div>
  );
}

export default Error;