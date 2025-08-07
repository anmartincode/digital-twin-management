const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/bim/upload:
 *   post:
 *     summary: Upload BIM file
 *     tags: [BIM]
 */
router.post('/upload', (req, res) => {
  res.json({
    success: true,
    message: 'BIM upload endpoint - not implemented yet'
  });
});

/**
 * @swagger
 * /api/bim/models:
 *   get:
 *     summary: Get BIM models
 *     tags: [BIM]
 */
router.get('/models', (req, res) => {
  res.json({
    success: true,
    message: 'Get BIM models endpoint - not implemented yet',
    data: []
  });
});

module.exports = router; 