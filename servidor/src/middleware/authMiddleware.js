const users = require('../repositories/user.repository'); // Adjust path to your repo

module.exports = function (req, res, next) {
  // Try to get from query (GET) or body (POST/PUT) 
  const dni = req.query.dni || req.body.dni;
  const authToken = req.query.authToken || req.body.authToken;

  if (!dni || !authToken) {
    return res.status(401).json({ message: 'dni and authToken required.' });
  }

  const user = users.getUserById(dni); // Adjust to your user repo method

  if (!user || user.authToken !== authToken) {

    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  // Check token age: tokenCreatedAt must exist and be < 24 hours old
  const tokenTime = new Date(user.tokenCreatedAt);
  const now = new Date();
  const ageMs = now - tokenTime;
  const oneDayMs = 24 * 60 * 60 * 1000;

  if (isNaN(tokenTime.getTime()) || ageMs > oneDayMs) {
    return res.status(401).json({ message: 'Token expired, please login again.' });
  }

  // Optionally, attach user to req for later use
  req.user = user;

  next();
};