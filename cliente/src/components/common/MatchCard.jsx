import "./MatchCard.css"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

export default function MatchCard({ time, date, localTeam, rivalTeam, category, fieldAddress }) {
  return (
    <div className="match-card">
      <div className="match-card-header">
        <div className="match-title">
          <span className="teams">
            {localTeam} vs {rivalTeam}
          </span>
        </div>
      </div>
      <div className="match-card-content">
        <div className="content-left">
          <div className="match-detail">
            <Calendar className="icon" />
            <span>{date}</span>
          </div>
          <div className="match-detail">
            <Clock className="icon" />
            <span>{time}</span>
          </div>
        </div>
        <div className="content-right">
          <div className="match-detail">
            <MapPin className="icon" />
            <span>{fieldAddress}</span>
          </div>
          <div className="match-detail">
            <Users className="icon" />
            <span>{category}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
