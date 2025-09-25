const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const { q, vertical, location, remote, urgent, verified, sortBy } = req.query;

    let query = 'SELECT * FROM opportunities';
    const whereClauses = [];
    const queryParams = [];

    if (q) {
      queryParams.push(`%${q}%`);
      whereClauses.push(`(title ILIKE $${queryParams.length} OR description ILIKE $${queryParams.length})`);
    }

    if (vertical && vertical !== 'all') {
      queryParams.push(vertical);
      whereClauses.push(`vertical = $${queryParams.length}`);
    }

    if (location) {
      queryParams.push(`%${location}%`);
      whereClauses.push(`location ILIKE $${queryParams.length}`);
    }

    if (remote) {
      whereClauses.push(`remote = true`);
    }

    if (urgent) {
      whereClauses.push(`urgent = true`);
    }

    if (verified) {
      whereClauses.push(`verified = true`);
    }

    if (whereClauses.length > 0) {
      query += ' WHERE ' + whereClauses.join(' AND ');
    }

    if (sortBy) {
        switch (sortBy) {
            case 'newest':
                query += ' ORDER BY posted_time DESC';
                break;
            case 'salary-high':
                query += ' ORDER BY salary_max DESC';
                break;
            case 'match-score':
                // This would require a more complex calculation, so we'll order by created_at for now
                query += ' ORDER BY created_at DESC';
                break;
            case 'location':
                query += ' ORDER BY location ASC';
                break;
            default:
                query += ' ORDER BY created_at DESC';
        }
    } else {
        query += ' ORDER BY created_at DESC';
    }

    const opportunities = await pool.query(query, queryParams);

    res.json(opportunities.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
