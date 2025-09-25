require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Create a single database pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Import and use routes, passing the pool to each
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const servicesRoutes = require('./routes/services');
const categoriesRoutes = require('./routes/categories');
const opportunitiesRoutes = require('./routes/opportunities');
const realEstateRoutes = require('./routes/real-estate');
const marketingRoutes = require('./routes/marketing');
const jobsRoutes = require('./routes/jobs');

app.use('/api/auth', authRoutes(pool));
app.use('/api/dashboard', dashboardRoutes(pool));
app.use('/api/services', servicesRoutes(pool));
app.use('/api/categories', categoriesRoutes(pool));
app.use('/api/opportunities', opportunitiesRoutes(pool));
app.use('/api/real-estate', realEstateRoutes(pool));
app.use('/api/marketing', marketingRoutes(pool));
app.use('/api/jobs', jobsRoutes(pool));


app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Example route to test database connection
app.get('/test-db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to the database');
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
