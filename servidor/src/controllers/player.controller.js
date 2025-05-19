export function createPlayer(req, res) {
    res.status(201).send({ message: 'Player created' });
}

export function getPlayers(req, res) {
    res.status(200).send({ message: 'List of players' });
}

export function updatePlayer(req, res) {
    res.status(201).send({ message: 'Player updated' });
}

export function deletePlayer(req, res) {
    res.status(201).send({ message: 'Player deleted' });
}
