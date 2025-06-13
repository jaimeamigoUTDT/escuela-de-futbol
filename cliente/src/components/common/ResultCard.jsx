import "./ResultCard.css";

export default function ResultCard({ date, category, localTeam, rivalTeam, localScore, rivalScore }) {
  return (
    <div className="result-card">
      <div className="result-card-header">
        <p><strong>Fecha:</strong> {date}</p>
        <p><strong>Categoría:</strong> {category}</p>
      </div>

      <div className="result-card-body">
        <div className="team-score">
          <h3>{localTeam}</h3>
          <p>{localScore}</p>
        </div>
        <div className="team-score">
          <h3>{rivalTeam}</h3>
          <p>{rivalScore}</p>
        </div>
      </div>
    </div>
  );
}
