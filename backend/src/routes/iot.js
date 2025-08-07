const express = require('express');
const router = express.Router();

router.get('/devices', (req, res) => {
  res.json({
    success: true,
    message: 'IoT devices endpoint - not implemented yet',
    data: []
  });
});

router.get('/sensors', (req, res) => {
  res.json({
    success: true,
    message: 'IoT sensors endpoint - not implemented yet',
    data: []
  });
});

module.exports = router; 