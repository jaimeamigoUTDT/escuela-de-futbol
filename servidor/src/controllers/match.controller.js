const matchService = require('../services/match.service');
const { Match } = require('../models/match.model');

function createMatch(req, res) {

    try {
    
        const newMatchData = req.body;

        if (!newMatchData.match_id){
            return res.status(400).send({ message: 'match_id is missing' });
        } else if (!newMatchData.fecha){
            return res.status(400).send({ message: 'Date is missing' });
        } else if (!newMatchData.hora){
            return res.status(400).send({ message: 'Time is missing' });
        } else if (!newMatchData.rival){
            return res.status(400).send({ message: 'Rival is missing' });
        } else if (!newMatchData.category_id){
            return res.status(400).send({message: "category_id is missing"});
        } else if (!newMatchData.cancha_id){
            return res.status(400).send({message: "cancha_id is missing"});
        }

        const matchData = matchService.createMatch(newMatchData);

        res.status(201).send({ message: 'Match created', data: matchData });

    } catch(e){
        res.status(500).send({ message: `Error ${e} `, data: {}});
    }
    
}

function getMatches(req, res) {
    try {
        
        queryParameters = {};
    
        // Check if req.body exists
        if (req.body) {
          queryParameters = req.body;
        }
    
        const data = matchService.getMatches(queryParameters)
    
        res.status(200).send({ message: 'List of matches', data: data});
    
      } catch (error) {
        console.log(error); // Pass errors to error middleware
        res.status(500).send({ message: 'Internal Server Error', data: {} });
      }
}

function updateMatch(req, res) {
    try {

        const updateMatchData = req.body;

        if (!updateMatchData.match_id){
            return res.status(400).send({ message: 'match_id is missing' });
        } else if (!updateMatchData.fecha){
            return res.status(400).send({ message: 'Date is missing' });
        } else if (!updateMatchData.hora){
            return res.status(400).send({ message: 'Time is missing' });
        } else if (!updateMatchData.rival){
            return res.status(400).send({ message: 'Rival is missing' });
        } else if (!updateMatchData.category_id){
            return res.status(400).send({message: "category_id is missing"});
        } else if (!updateMatchData.cancha_id){
            return res.status(400).send({message: "cancha_id is missing"});
        }

        const updateMatch = matchService.updateMatch(updateMatchData);

        if (!updateMatch) {
            return res.status(400).send({ message: 'Match not found' });
        }

        res.status(201).send({ message: 'Match updated', data: updateMatch });


    } catch (e) {
        res.status(500).send({ message: `Error ${e} `, data: {}});
    }
}

function deleteMatch(req, res) {
    
    try {
        const match_id = req.body.match_id;

        if (!match_id) {
            return res.status(400).send({ message: 'match_id is missing' });
        }

        const deletedMatch = matchService.deleteMatch(match_id);

        if (!deletedMatch) {
            return res.status(400).send({ message: 'Match not found' });
        }

        res.status(201).send({ message: 'Match deleted' });

    } catch (e) {
        res.status(500).send({ message: `Error ${e} `, data: {}});
    }
}

module.exports = {createMatch, getMatches, updateMatch, deleteMatch};