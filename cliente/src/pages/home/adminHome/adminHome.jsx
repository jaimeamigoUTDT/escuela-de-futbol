import Navbar from "../../../components/layout/Navbar"
import MainLayout from "../../../components/layout/MainLayout"
import MatchesContent from "./components/MatchesContent"
import NotificationsContent from "./components/NotificationsContent"
import "./adminHome.css"

function adminHome() {

  const leftContent = <MatchesContent />

  const rightContent = <NotificationsContent />
  return (
    <div className="home-container">
      <Navbar />
      <MainLayout leftContent={leftContent} rightContent={rightContent} />
    </div>
  )
}

export default adminHome
