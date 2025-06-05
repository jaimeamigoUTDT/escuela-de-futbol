import Navbar from "../../components/layout/Navbar"
import MainLayout from "../../components/layout/MainLayout"
import WelcomeContent from "./components/WelcomeContent"
import UpcomingMatches from "./components/UpcomingMatches"
import Statistics from "./components/Statistics"
import { useState } from "react"
import "./home.css"

function Home() {
  // You can pass real data here when you have it
  const upcomingMatches = [
    {
      id: 1,
      teams: "Equipo A vs Equipo B",
      time: "Sábado 16:00",
    },
    {
      id: 2,
      teams: "Equipo C vs Equipo D",
      time: "Domingo 14:00",
    },
  ]

  const teamStats = {
    partidos: 24,
    victorias: 18,
    empates: 4,
    derrotas: 2,
  }

  const leftContent = <WelcomeContent />

  const rightContent = (
    <>
      <UpcomingMatches matches={upcomingMatches} />
    </>
  )
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen)
  }

  const handleNavClick = (section) => {
    console.log(`Navigating to: ${section}`)
    // Add navigation logic here
  }

  const handleEditProfile = () => {
    console.log("Edit profile clicked")
    setIsProfileDropdownOpen(false)
    // Add edit profile logic here
  }

  const handleLogout = () => {
    console.log("Logout clicked")
    setIsProfileDropdownOpen(false)
    // Add logout logic here
  }

  return (
    <div className="home-container">
      <Navbar />
      <MainLayout leftContent={leftContent} rightContent={rightContent} />
    </div>
  )
}

export default Home
