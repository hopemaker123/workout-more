const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
      try {
          const {
              search, 
              propertyType, 
              minPrice, 
              maxPrice, 
              minBedrooms, 
              minBathrooms, 
              sortBy
          } = req.query;
  
          let query = 'SELECT * FROM properties';
          const whereClauses = [];
          const queryParams = [];
  
          if (search) {
              queryParams.push(`%${search}%`);
              whereClauses.push(`(title ILIKE $${queryParams.length} OR location ILIKE $${queryParams.length})`);
          }
  
          if (propertyType) {
              queryParams.push(propertyType);
              whereClauses.push(`property_type = $${queryParams.length}`);
          }
  
          if (minPrice) {
              queryParams.push(minPrice);
              whereClauses.push(`price >= $${queryParams.length}`);
          }
  
          if (maxPrice) {
              queryParams.push(maxPrice);
              whereClauses.push(`price <= $${queryParams.length}`);
          }
  
          if (minBedrooms) {
              queryParams.push(minBedrooms);
              whereClauses.push(`bedrooms >= $${queryParams.length}`);
          }
  
          if (minBathrooms) {
              queryParams.push(minBathrooms);
              whereClauses.push(`bathrooms >= $${queryParams.length}`);
          }
  
          if (whereClauses.length > 0) {
              query += ' WHERE ' + whereClauses.join(' AND ');
          }
  
          if (sortBy) {
              switch (sortBy) {
                  case 'price-asc':
                      query += ' ORDER BY price ASC';
                      break;
                  case 'price-desc':
                      query += ' ORDER BY price DESC';
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
  
          const properties = await pool.query(query, queryParams);
  
          res.json(properties.rows);
      } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
      }
  });

  return router;
};