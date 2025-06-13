import { useTeams } from "../context/TeamsContext" // Adjust the path as necessary
import teamsService from "../api/services/teamsService" // Adjust the path to your service

export const teamsController = () => {
  const { teams, updateTeams, saveTeam } = useTeams() // Adjust path to TeamsContext

  const fetchTeams = async ({ params } = {}) => {
    try {
      const teams = await teamsService.getTeams(params)

      updateTeams(teams) // Update the teams in context or state

      return teams
    } catch (error) {
      console.error("Error fetching players:", error)
      throw error
    }
  }

  const createTeam = async (teamData) => {
    try {
      const newTeam = await teamsService.createTeam(teamData)

      console.log("New team created:", newTeam) // Log for debugging

      saveTeam(newTeam) // Save the new team to context or state

      return newTeam
    } catch (error) {
      console.error("Error creating team:", error)
      throw error
    }
  }

  const editTeam = async (updatedTeamData) => {
    try {

      updatedTeamData.match_id = updatedTeamData.match.match_id

      const updatedTeam = await teamsService.editTeam(updatedTeamData)

      console.log("Team updated:", updatedTeam) // Log for debugging

      // Fetch all teams again to update the context
      await fetchTeams()

      return updatedTeam
    } catch (error) {
      console.error("Error updating team:", error)
      throw error
    }
  }

  return { fetchTeams, createTeam, editTeam }
}
