class Team {
    constructor({ team_id, name, match_id, category_id, players_ids }) {
      this.team_id = team_id;
      this.name = name;
      this.match_id = match_id;
      this.category_id = category_id;
      this.players_ids = players_ids;
    }
  }

module.exports = { Team };