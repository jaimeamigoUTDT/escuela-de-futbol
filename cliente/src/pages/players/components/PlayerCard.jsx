import { useState } from "react";
import { Calendar, Pencil, Trash2 } from "lucide-react";
import EditPlayerModal from "./editPlayerModal";
import DeletePlayerModal from "./deletePlayerModal";

const PlayerCard = ({ name, surname, dateOfBirth, gender, dni, parent, updateList }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const birthYear = dateOfBirth.split("-")[0];
  const category = `${gender} - ${birthYear}`;

  const playerData = {
    dni,
    name,
    surname,
    date_of_birth: dateOfBirth,
    gender,
    parent,
  };

  return (
    <>
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
              onClick={() => {setIsEditModalOpen(true)}}
              aria-label={`Edit ${name} ${surname}`}
            >
              <Pencil size={16} className="player-card__icon" />
            </button>
            <button
              className="player-card__button player-card__button--delete"
              onClick={() => {setIsDeleteModalOpen(true)}}
              aria-label={`Delete ${name} ${surname}`}
            >
              <Trash2 size={16} className="player-card__icon" />
            </button>
          </div>
        </div>
      </div>

      <EditPlayerModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          updateList();
        }}
        player={playerData}
      />

      <DeletePlayerModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          updateList();
        }}
        player={playerData}
      />
    </>
  );
};

export default PlayerCard;