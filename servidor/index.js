const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const authMiddleware = require('./src/middleware/authMiddleware'); // Adjust path


const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  // List routes that should NOT require authentication
  const openRoutes = [
    '/api/users/login',
    '/api/users/register',
    '/api-docs'
  ];
  if (openRoutes.includes(req.path) || req.path.startsWith('/api-docs')) {
    return next();
  }
  return authMiddleware(req, res, next);
});

// Load Swagger YAML file
const swaggerDocument = YAML.load(path.join(__dirname, 'src/docs/swagger.yaml'));

// Import routes
const userRoutes = require('./src/routes/user.routes');
const teamRoutes = require('./src/routes/team.routes');
const canchaRoutes = require('./src/routes/cancha.routes');
const notificacionRoutes = require('./src/routes/notification.routes');
const matchRoutes = require('./src/routes/match.routes');
const categoryRoutes = require('./src/routes/category.routes');
const playerRoutes = require('./src/routes/player.routes');
const resultRoutes = require('./src/routes/result.routes');

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/canchas', canchaRoutes);
app.use('/api/notifications', notificacionRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/results', resultRoutes);

// Sample API route (optional, can be removed if not needed)
app.get('/hello-world', (req, res) => {
  res.json({ message: 'Hello from the Node.js backend!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});