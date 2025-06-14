const playerService = require('../services/player.service');
const { Player } = require('../models/player.model');

function createPlayer(req, res) {

    try {
    
        const newPlayerData = req.body;

        if (!newPlayerData.dni){
            return res.status(400).send({ message: 'DNI is missing' });
        } else if (!newPlayerData.name){
            return res.status(400).send({ message: 'Name is missing' });
        } else if (!newPlayerData.surname){
            return res.status(400).send({ message: 'Surname is missing' });
        } else if (!newPlayerData.date_of_birth){
            return res.status(400).send({ message: 'Date of birth is missing' });
        } else if (!newPlayerData.gender){
            return res.status(400).send({message: "Gender is missing"});
        } else if (!newPlayerData.parent_dni){
            return res.status(400).send({message: "Parent DNI is missing"});
        }

        const playerData = playerService.createPlayer(newPlayerData);

        res.status(201).send({ message: 'Player created', data: playerData });

    } catch(e){
        res.status(500).send({ message: `Error ${e} `, data: {}});
    }
    
}

function getPlayers(req, res) {
    try {
      const queryParameters = req.query;
  
      const data = playerService.getPlayers(queryParameters);
  
      res.status(200).json({ message: "List of players", data });
    } catch (error) {
      console.error("Error in getPlayers:", error);
      res.status(500).json({ message: "Internal Server Error", data: {} });
    }
  }

function updatePlayer(req, res) {
    try {

        const {dni, updatedPlayerData} = req.body;

        if (!updatedPlayerData.dni){
            return res.status(400).send({ message: 'DNI is missing' });
        } else if (!updatedPlayerData.name){
            return res.status(400).send({ message: 'Name is missing' });
        } else if (!updatedPlayerData.surname){
            return res.status(400).send({ message: 'Surname is missing' });
        } else if (!updatedPlayerData.date_of_birth){
            return res.status(400).send({ message: 'Date of birth is missing' });
        } else if (!updatedPlayerData.gender){
            return res.status(400).send({message: "Gender is missing"});
        } else if (!updatedPlayerData.parent_dni){
            return res.status(400).send({message: "Parent DNI is missing"});
        }

        const updatePlayer = playerService.updatePlayer(dni, updatedPlayerData);

        if (!updatePlayer) {
            return res.status(400).send({ message: 'Player not found' });
        }

        res.status(201).send({ message: 'Player updated', data: updatePlayer });


    } catch (e) {
        res.status(500).send({ message: `Error ${e} `, data: {}});
    }
}

function deletePlayer(req, res) {
    
    try {

        const {dni} = req.body;

        if (!dni) {
            return res.status(400).send({ message: 'DNI is missing' });
        }

        const deletedPlayer = playerService.deletePlayer(dni);

        if (!deletedPlayer) {
            return res.status(400).send({ message: 'Player not found' });
        }

        res.status(201).send({ message: 'Player deleted' });

    } catch (e) {
        res.status(500).send({ message: `Error ${e} `, data: {}});
    }
}

module.exports = {createPlayer, getPlayers, updatePlayer, deletePlayer};