function createTeam(req, res) {
    res.status(201).send({ message: 'Team created' });
}

function getTeams(req, res) {
    res.status(200).send({ message: 'List of teams' });
}

function updateTeam(req, res) {
    res.status(201).send({ message: 'Team updated' });
}

function deleteTeam(req, res) {
    res.status(201).send({ message: 'Team deleted' });
}

module.exports = { createTeam, getTeams, updateTeam, deleteTeam };