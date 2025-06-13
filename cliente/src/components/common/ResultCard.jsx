import "./ResultCard.css";
import { Calendar, Clock, MapPin, Users, Bell } from "lucide-react"

export default function ResultCard({ date, category, localTeam, rivalTeam, localScore, rivalScore }) {
  return (
    <div className="result-card">
      <div className="result-card-header">
        <div className="result-detail">
          <Calendar className="icon" />
          <span>{date}</span>
        </div>
        <div className="result-detail">
          <Users className="icon" />
          <span>{category}</span>
        </div>
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
