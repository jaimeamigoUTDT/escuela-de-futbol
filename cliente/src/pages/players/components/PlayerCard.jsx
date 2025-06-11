import "./PlayerCard.css";
import { Calendar } from "lucide-react";

const PlayerCard = ({ name, surname, dateOfBirth, gender }) => {
  // Get the birth year from dateOfBirth (assuming format is YYYY-MM-DD)
  const birthYear = dateOfBirth.split("-")[0];
  // Format category as "year - gender"
  const category = `${gender} - ${birthYear}`;

  return (
    <div className="player-card">
      <div className="player-header">
        <h3>
          {surname}, {name}
        </h3>
      </div>

      <div className="player-info">
        <div className="info-item">
          <Calendar size={16} />
          <span>
            Categoría: <strong>{category}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;