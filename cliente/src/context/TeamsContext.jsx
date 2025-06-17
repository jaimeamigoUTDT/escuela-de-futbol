"use client"

import { createContext, useState, useContext } from "react"

export const TeamsContext = createContext()

export const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([])

  const saveTeam = (team) => {
    setTeams((prevTeams) => [...prevTeams, team])
  }

  const deleteTeam = (teamId) => {
    setTeams((prevTeams) => prevTeams.filter((team) => team.team_id !== teamId))
  }

  const getStoredTeams = () => {
    const storedTeams = localStorage.getItem("teams")
    return storedTeams ? JSON.parse(storedTeams) : []
  }

  const updateTeams = (newTeams) => {
    setTeams(newTeams);
    return newTeams;
  }

  const editTeam = (teamId, updatedTeam) => {
    // Update the team in the state
    console.log("Editing team:", teamId, updatedTeam)
    console.log("Current teams:", teams)

    updatedTeam.match_id = updatedTeam.match?.match_id || updatedTeam.match_id

    setTeams((prevTeams) => prevTeams.map((team) => (team.team_id === teamId ? { ...team, ...updatedTeam } : team)))
  }

  return (
    <TeamsContext.Provider value={{ teams, saveTeam, deleteTeam, getStoredTeams, editTeam, updateTeams }}>
      {children}
    </TeamsContext.Provider>
  )
}

export const useTeams = () => useContext(TeamsContext)
