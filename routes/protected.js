const express = require('express');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}! This is a protected route.` });
});

module.exports = router; 