const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Analytics endpoint - not implemented yet',
    data: []
  });
});

module.exports = router; 