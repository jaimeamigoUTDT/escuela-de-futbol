const teamService = require('../services/team.service');
const { Team } = require('../models/team.model');

function createTeam(req, res) {

    try {
    
        const newTeamData = req.body;

        if (!newTeamData.team_id){
            return res.status(400).send({ message: 'team_id is missing' });
        } else if (!newTeamData.match_id){
            return res.status(400).send({ message: 'match_id is missing' });
        } else if (!newTeamData.category_id){
            return res.status(400).send({message: "category_id is missing"});
        } else if (!newTeamData.players){
            return res.status(400).send({message: "Players is missing"});
        }

        const teamData = teamService.createTeam(newTeamData);

        res.status(201).send({ message: 'Team created', data: teamData });

    } catch(e){
        res.status(500).send({ message: `Error ${e} `, data: {}});
    }
    
}

async function getTeams(req, res) {
    try {
        // Log request body for debugging
        console.log('Request body:', req.body);
    
        queryParameters = {};
    
        // Check if req.body exists
        if (req.body) {
          queryParameters = req.body;
        }
    
        const teamsData = await teamService.getTeams(queryParameters)

        res.status(200).send(
            {   
                success: true,
                message: 'Teams fetched successfully', 
                data: teamsData
            });
    
      } catch (error) {
        console.log(error); // Pass errors to error middleware
        res.status(500).send(
            { 
            status: false, 
            message: 'Internal Server Error', 
            data: {} });
      }
}

function updateTeam(req, res) {
    try {

        const updateTeamData = req.body;

        if (!updateTeamData.team_id){
            return res.status(400).send({ message: 'team_id is missing' });
        } else if (!updateTeamData.match_id){
            return res.status(400).send({ message: 'match_id is missing' });
        } else if (!updateTeamData.category_id){
            return res.status(400).send({message: "category_id is missing"});
        } else if (!updateTeamData.players){
            return res.status(400).send({message: "Players is missing"});
        }

        const updateTeam = teamService.updateTeam(updateTeamData);

        if (!updateTeam) {
            return res.status(400).send({ message: 'Team not found' });
        }

        res.status(201).send({ message: 'Team updated', data: updateTeam });


    } catch (e) {
        res.status(500).send({ message: `Error ${e} `, data: {}});
    }
}

function deleteTeam(req, res) {
    
    try {
        const team_id = req.body.team_id;

        if (!team_id) {
            return res.status(400).send({ message: 'team_id is missing' });
        }

        const deletedTeam = teamService.deleteTeam(team_id);

        if (!deletedTeam) {
            return res.status(400).send({ message: 'Team not found' });
        }

        res.status(201).send({ message: 'Team deleted' });

    } catch (e) {
        res.status(500).send({ message: `Error ${e} `, data: {}});
    }
}

module.exports = {createTeam, getTeams, updateTeam, deleteTeam};