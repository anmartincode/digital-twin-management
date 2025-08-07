const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Assets endpoint - not implemented yet',
    data: []
  });
});

module.exports = router; 