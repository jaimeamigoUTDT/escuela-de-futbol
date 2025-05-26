class Team {
    constructor({ team_id, match_id, category_id, players }) {
      this.team_id = team_id;
      this.match_id = match_id;
      this.category_id = category_id;
      this.players = players; // array of player DNI numbers
    }
  }

module.exports = { Team };