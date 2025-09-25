const express = require('express');
const verifyToken = require('../middleware/auth'); // Middleware to verify JWT

module.exports = (pool) => {
  const router = express.Router();

  // Mock data generators (replace with real database queries)
  const generateNotifications = (userId) => [
    {
      id: 1,
      type: 'opportunity',
      title: 'New High-Value Opportunity',
      message: 'A new opportunity matching your profile has been posted in the AI & Machine Learning category.',
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      read: false,
      priority: 'high',
      icon: 'Zap',
      color: 'text-green-500'
    },
    {
      id: 2,
      type: 'network',
      title: 'Connection Request Accepted',
      message: 'John Doe has accepted your connection request.',
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      read: true,
      priority: 'medium',
      icon: 'Users',
      color: 'text-blue-500'
    },
    {
      id: 3,
      type: 'system',
      title: 'Profile Completion Reminder',
      message: 'Complete your profile to get better opportunity matches.',
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      read: false,
      priority: 'low',
      icon: 'UserCheck',
      color: 'text-yellow-500'
    },
  ];

  const generateActivityFeed = (userId) => [
      {
          id: '1',
          userName: 'Alice Johnson',
          userAvatar: 'https://i.pravatar.cc/40?u=a042581f4e29026704d',
          action: 'applied for an opportunity',
          target: 'Senior React Developer',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          icon: 'FileText'
      },
      {
          id: '2',
          userName: 'Bob Williams',
          userAvatar: 'https://i.pravatar.cc/40?u=a042581f4e29026705d',
          action: 'posted a new service',
          target: 'UX/UI Design Consultation',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          icon: 'Briefcase'
      },
  ];

  router.get('/', verifyToken, async (req, res) => {
    try {
      // The user ID is available from the verifyToken middleware
      const userId = req.user.id;

      // Fetch user's name from the database
      const userResult = await pool.query('SELECT first_name, last_name FROM users WHERE id = $1', [userId]);

      if (userResult.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = userResult.rows[0];
      const userName = `${user.first_name} ${user.last_name}`.trim() || 'Professional';

      // For now, we'll use generated data. In a real application, 
      // you would fetch this data from your database based on the userId.
      const dashboardData = {
        userName: userName,
        lastLogin: new Date(Date.now() - 86400000 * 2).toISOString(), // Mock last login 2 days ago
        notifications: generateNotifications(userId),
        activityFeed: generateActivityFeed(userId),
        // Add other data like performance charts, opportunity insights, etc.
      };

      res.json(dashboardData);

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      res.status(500).send('Server error');
    }
  });

  return router;
};