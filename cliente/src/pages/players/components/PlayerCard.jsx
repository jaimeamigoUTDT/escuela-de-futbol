import "./PlayerCard.css";
import { Calendar, Pencil, Trash2 } from "lucide-react";

const PlayerCard = ({ name, surname, dateOfBirth, gender }) => {
  // Get the birth year from dateOfBirth (assuming format is YYYY-MM-DD)
  const birthYear = dateOfBirth.split("-")[0];
  // Format category as "year - gender"
  const category = `${gender} - ${birthYear}`;

  return (
    <div className="player-card">
      <div>
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
      <div>
        <div className="player-card__actions">
          <button
            className="player-card__button player-card__button--edit"
            onClick={() => {}}
            aria-label={`Edit ${name} ${surname}`}
          >
            <Pencil size={16} className="player-card__icon" />
          </button>
          <button
            className="player-card__button player-card__button--delete"
            onClick={() => {}}
            aria-label={`Delete ${name} ${surname}`}
          >
            <Trash2 size={16} className="player-card__icon" />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default PlayerCard;