export function createMatch(req, res) {
    res.status(201).send({ message: 'Match created' });
}

export function getMatches(req, res) {
    res.status(200).send({ message: 'List of matches' });
}

export function updateMatch(req, res) {
    res.status(201).send({ message: 'Match updated' });
}

export function deleteMatch(req, res) {
    res.status(201).send({ message: 'Match deleted' });
}