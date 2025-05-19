const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express'); // Add Swagger UI
const YAML = require('yamljs'); // Add YAML parser
const path = require('path'); // For file path resolution

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Load Swagger YAML file
const swaggerDocument = YAML.load(path.join(__dirname, 'src/docs/swagger.yaml'));

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Sample API route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the Node.js backend!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});