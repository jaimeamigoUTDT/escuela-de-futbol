function createPlayer(req, res) {
    res.status(201).send({ message: 'Player created' });
}

function getPlayers(req, res) {
    res.status(200).send({ message: 'List of players' });
}

function updatePlayer(req, res) {
    res.status(201).send({ message: 'Player updated' });
}

function deletePlayer(req, res) {
    res.status(201).send({ message: 'Player deleted' });
}

module.exports = {createPlayer, getPlayers, updatePlayer, deletePlayer};