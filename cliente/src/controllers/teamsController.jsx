import { useTeams } from "../context/TeamsContext"; // Adjust the path as necessary
import teamsService from "../api/services/teamsService"; // Adjust the path to your service

export const teamsController = () => {
  const { updateTeams, saveTeam } = useTeams(); // Adjust path to TeamsContext

  const fetchTeams = async ({ params } = {}) => {
    try {
      const newTeams = await teamsService.getTeams(params);

      console.log("Fetched teams:", newTeams); // Log for debugging

      updateTeams(newTeams); // Update the teams in context or state

      return newTeams;
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    }
  };

  const createTeam = async (teamData) => {
    try {
      const newTeam = await teamsService.createTeam(teamData);

      console.log("New team created:", newTeam); // Log for debugging

      saveTeam(newTeam); // Save the new team to context or state

      return newTeam;
    } catch (error) {
      console.error("Error creating team:", error);
      throw error;
    }
  };

  const editTeam = async (updatedTeamData) => {
    try {
      updatedTeamData.match_id = updatedTeamData.match.match_id;

      const updatedTeam = await teamsService.editTeam(updatedTeamData);

      console.log("Team updated:", updatedTeam); // Log for debugging

      // Fetch all teams again to update the context
      await fetchTeams();

      return updatedTeam;
    } catch (error) {
      console.error("Error updating team:", error);
      throw error;
    }
  };

  const getTeamsByChildren = async (children) => {
    try {
      // Fetch all teams (or you can optimize by calling an API endpoint if it exists)
      const allTeams = await teamsService.getTeams();

      // Build a set of child DNIs or IDs for fast lookup
      const childDnis = new Set(
        children
          .map(child => child.dni || child.player_id)
          .filter(id => !!id)
      );

      // Find all teams where any player matches a child
      const filteredTeams = allTeams.filter(team =>
        Array.isArray(team.players) &&
        team.players.some(player =>
          childDnis.has(player.dni || player.player_id)
        )
      );

      return filteredTeams;
    } catch (error) {
      console.error("Error fetching teams by children:", error);
      throw error;
    }
  };

  return { fetchTeams, createTeam, editTeam, getTeamsByChildren };
};