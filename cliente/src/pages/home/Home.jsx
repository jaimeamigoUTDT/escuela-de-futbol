import Navbar from "../../components/layout/Navbar"
import MainLayout from "../../components/layout/MainLayout"
import MatchesContent from "./components/MatchesContent"
import NotificationsContent from "./components/NotificationsContent"
import "./home.css"

function Home() {

  const leftContent = <MatchesContent />

  const rightContent = <NotificationsContent />
  return (
    <div className="home-container">
      <Navbar />
      <MainLayout leftContent={leftContent} rightContent={rightContent} />
    </div>
  )
}

export default Home
