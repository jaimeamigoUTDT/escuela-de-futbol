import "./PlayerCard.css";
import { Calendar } from "lucide-react";

const PlayerCard = ({ name, surname, dateOfBirth }) => {
  const birthYear = dateOfBirth.split("-")[0];

  return (
    <div className="player-card">
      <div className="player-header">
        <h3>{surname}, {name}</h3>
      </div>

      <div className="player-info">
        <div className="info-item">
          <Calendar size={16} />
          <span>Nacido en: <strong>{birthYear}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
