const {Team} = require('../models/team.model');

class teamRepository {
    teams = [];

    createTeam(teamData) {
        
        this.teams.push(new Team(teamData));
        
        console.log(this.teams);
        return teamData;

    }

    getTeams() {
        return this.teams;
    }

    updateTeam(team_id, teamData) {
        
        this.deleteTeam(team_id);
        this.createTeam(teamData);

        return teamData;
    }

    deleteTeam(team_id) {
        const teamIndex = this.teams.findIndex(team => team.team_id === team_id);

        if (teamIndex !== -1) {
            return this.teams.splice(teamIndex, 1)[0];
        }
        return null;
    }
}

module.exports = new teamRepository();