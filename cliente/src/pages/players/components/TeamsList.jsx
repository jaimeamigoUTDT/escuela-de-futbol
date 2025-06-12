// TeamList.jsx
import React from 'react';
import './TeamsList.css'; // Import your CSS file for styling

// Define the shape of a team object for clarity
const TeamList = ({ teams }) => {
  return (
    <div className="team-list-container">
      <div className="team-card">
        {teams && teams.length > 0 ? (
          teams.map((team) => (
            <div
              key={team.team_id} // Use team_id for unique key
              className="team-card-item"
              style={{
                border: '1px solid #ccc',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '5px',
              }}
            >
              <p>
                <strong>Categoría:</strong>{' '}
                {team.category?.gender && team.category?.year
                  ? `${team.category.gender} ${team.category.year}`
                  : 'N/A'}
              </p>
              <p>
                <strong>Jugadores confirmados:</strong>{' '}
                {team.players?.length || '0'}
                <button>Ver listado de jugadores completo</button>
              </p>
              <div>
                <p>
                  <strong>Info partido:</strong>
                </p>
                {team.match ? (
                  <div>
                    <p>Rival: {team.match.rival || 'N/A'}</p>
                    <p>
                      Fecha y hora: {team.match.fecha || 'N/A'} a las{' '}
                      {team.match.hora || 'N/A'}
                    </p>
                    <p>Ubicación: {team.match.cancha?.address || 'N/A'}</p>
                  </div>
                ) : (
                  <p>No asignado</p>
                )}
              </div>
              <button className="edit-button">Editar Equipo</button>
            </div>
          ))
        ) : (
          <p>No hay equipos disponibles.</p>
        )}
      </div>
    </div>
  );
};

// Default props for when no teams are provided
TeamList.defaultProps = {
  teams: [],
};

export default TeamList;