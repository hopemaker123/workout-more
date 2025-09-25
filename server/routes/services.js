const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  // Get all services with filtering, sorting, and pagination
  router.get('/', async (req, res) => {
    try {
      const { category, search, sortBy, page = 1, limit = 10, featured } = req.query;
  
      let query = `
        SELECT 
          s.id, s.title, s.description, s.image, s.starting_price, s.delivery_time, s.revisions, s.featured, s.tags,
          c.name as category_name,
          u.id as provider_id, u.first_name || ' ' || u.last_name as provider_name, u.avatar as provider_avatar, u.verified as provider_verified,
          (SELECT AVG(r.rating) FROM reviews r WHERE r.service_id = s.id) as average_rating,
          (SELECT COUNT(o.id) FROM orders o WHERE o.service_id = s.id) as completed_jobs
        FROM services s
        JOIN users u ON s.provider_id = u.id
        JOIN categories c ON s.category_id = c.id
      `;
  
      const whereClauses = [];
      const queryParams = [];
  
      if (category && category !== 'all') {
        queryParams.push(category);
        whereClauses.push(`c.slug = $${queryParams.length}`);
      }
  
      if (search) {
        queryParams.push(`%${search}%`);
        whereClauses.push(`(s.title ILIKE $${queryParams.length} OR s.description ILIKE $${queryParams.length})`);
      }
      
      if (featured) {
        whereClauses.push('s.featured = true');
      }
  
      if (whereClauses.length > 0) {
        query += ' WHERE ' + whereClauses.join(' AND ');
      }
  
      // Sorting
      let orderBy = ' ORDER BY s.created_at DESC'; // Default sort
      if (sortBy) {
        switch (sortBy) {
          case 'price-low':
            orderBy = ' ORDER BY s.starting_price ASC';
            break;
          case 'price-high':
            orderBy = ' ORDER BY s.starting_price DESC';
            break;
          case 'rating':
            orderBy = ' ORDER BY average_rating DESC NULLS LAST';
            break;
          case 'popular':
              orderBy = ' ORDER BY completed_jobs DESC NULLS LAST';
              break;
          case 'newest':
              orderBy = ' ORDER BY s.created_at DESC';
              break;
        }
      }
      query += orderBy;
  
      // Pagination
      const offset = (page - 1) * limit;
      queryParams.push(limit, offset);
      query += ` LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length}`;
  
      const result = await pool.query(query, queryParams);
      res.json(result.rows);
  
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

  return router;
};