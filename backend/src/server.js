const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Import routes
const authRoutes = require('./routes/auth');
const bimRoutes = require('./routes/bim');
const iotRoutes = require('./routes/iot');
const facilityRoutes = require('./routes/facility');
const assetRoutes = require('./routes/assets');
const maintenanceRoutes = require('./routes/maintenance');
const energyRoutes = require('./routes/energy');
const analyticsRoutes = require('./routes/analytics');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/auth');

// Import services
const mqttService = require('./services/mqttService');
const socketService = require('./services/socketService');

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bim', authMiddleware, bimRoutes);
app.use('/api/iot', authMiddleware, iotRoutes);
app.use('/api/facility', authMiddleware, facilityRoutes);
app.use('/api/assets', authMiddleware, assetRoutes);
app.use('/api/maintenance', authMiddleware, maintenanceRoutes);
app.use('/api/energy', authMiddleware, energyRoutes);
app.use('/api/analytics', authMiddleware, analyticsRoutes);

// Swagger documentation
if (process.env.NODE_ENV !== 'production') {
  const swaggerJsdoc = require('swagger-jsdoc');
  const swaggerUi = require('swagger-ui-express');
  
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Digital Twin Management API',
        version: '1.0.0',
        description: 'API for Facility Management Integration with BIM and IoT',
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 5000}`,
          description: 'Development server',
        },
      ],
    },
    apis: ['./src/routes/*.js'],
  };
  
  const specs = swaggerJsdoc(options);
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
}

// Socket.IO connection handling
socketService(io);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start MQTT service
mqttService.connect();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
  console.log(`🔌 WebSocket server ready`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

module.exports = app; 