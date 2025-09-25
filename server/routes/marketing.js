const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const { search, category, minBudget, maxBudget, sortBy } = req.query;

        let query = 'SELECT * FROM campaigns';
        const whereClauses = [];
        const queryParams = [];

        if (search) {
            queryParams.push(`%${search}%`);
            whereClauses.push(`(title ILIKE $${queryParams.length} OR description ILIKE $${queryParams.length})`);
        }

        if (category) {
            queryParams.push(category);
            whereClauses.push(`category = $${queryParams.length}`);
        }

        if (minBudget) {
            queryParams.push(minBudget);
            whereClauses.push(`budget >= $${queryParams.length}`);
        }

        if (maxBudget) {
            queryParams.push(maxBudget);
            whereClauses.push(`budget <= $${queryParams.length}`);
        }

        if (whereClauses.length > 0) {
            query += ' WHERE ' + whereClauses.join(' AND ');
        }

        if (sortBy) {
            switch (sortBy) {
                case 'budget-asc':
                    query += ' ORDER BY budget ASC';
                    break;
                case 'budget-desc':
                    query += ' ORDER BY budget DESC';
                    break;
                case 'newest':
                    query += ' ORDER BY created_at DESC';
                    break;
                default:
                    query += ' ORDER BY created_at DESC';
            }
        } else {
            query += ' ORDER BY created_at DESC';
        }

        const campaigns = await pool.query(query, queryParams);

        res.json(campaigns.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
