export function createTeam(req, res) {
    res.status(201).send({ message: 'Team created' });
}

export function getTeams(req, res) {
    res.status(200).send({ message: 'List of teams' });
}

export function updateTeam(req, res) {
    res.status(201).send({ message: 'Team updated' });
}

export function deleteTeam(req, res) {
    res.status(201).send({ message: 'Team deleted' });
}
