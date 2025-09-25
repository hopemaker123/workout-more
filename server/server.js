require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Make the pool available to other modules
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
app.set('pool', pool);

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/services', require('./routes/services'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/opportunities', require('./routes/opportunities'));
app.use('/api/real-estate', require('./routes/real-estate'));
app.use('/api/marketing', require('./routes/marketing'));
app.use('/api/jobs', require('./routes/jobs'));

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
