const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT 
        c.id, 
        c.name, 
        c.slug,
        (SELECT COUNT(*) FROM services s WHERE s.category_id = c.id) as service_count
      FROM categories c
      ORDER BY c.name ASC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
