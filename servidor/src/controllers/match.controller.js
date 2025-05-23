function createMatch(req, res) {
    res.status(201).send({ message: 'Match created' });
}

function getMatches(req, res) {
    res.status(200).send({ message: 'List of matches' });
}

function updateMatch(req, res) {
    res.status(201).send({ message: 'Match updated' });
}

function deleteMatch(req, res) {
    res.status(201).send({ message: 'Match deleted' });
}

module.exports = { createMatch, getMatches, updateMatch, deleteMatch };