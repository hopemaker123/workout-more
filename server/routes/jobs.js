const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const { search, location, jobType, experienceLevel, minSalary, maxSalary, sortBy } = req.query;

        let query = 'SELECT * FROM jobs';
        const whereClauses = [];
        const queryParams = [];

        if (search) {
            queryParams.push(`%${search}%`);
            whereClauses.push(`(title ILIKE $${queryParams.length} OR description ILIKE $${queryParams.length})`);
        }

        if (location) {
            queryParams.push(location);
            whereClauses.push(`location = $${queryParams.length}`);
        }

        if (jobType) {
            queryParams.push(jobType);
            whereClauses.push(`job_type = $${queryParams.length}`);
        }

        if (experienceLevel) {
            queryParams.push(experienceLevel);
            whereClauses.push(`experience_level = $${queryParams.length}`);
        }

        if (minSalary) {
            queryParams.push(minSalary);
            whereClauses.push(`salary >= $${queryParams.length}`);
        }

        if (maxSalary) {
            queryParams.push(maxSalary);
            whereClauses.push(`salary <= $${queryParams.length}`);
        }

        if (whereClauses.length > 0) {
            query += ' WHERE ' + whereClauses.join(' AND ');
        }

        if (sortBy) {
            switch (sortBy) {
                case 'salary-asc':
                    query += ' ORDER BY salary ASC';
                    break;
                case 'salary-desc':
                    query += ' ORDER BY salary DESC';
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

        const jobs = await pool.query(query, queryParams);

        res.json(jobs.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
