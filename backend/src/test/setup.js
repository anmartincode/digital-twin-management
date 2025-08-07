const { MongoMemoryServer } = require('mongodb-memory-server');
const { Pool } = require('pg');

// Global test setup
let mongoServer;
let testPool;

beforeAll(async () => {
  // Start in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.MONGODB_URI = mongoUri;
  process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/test_db';
  
  // Create test PostgreSQL pool
  testPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 1,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
  
  // Wait for database connections
  await testPool.query('SELECT 1');
});

afterAll(async () => {
  // Cleanup
  if (testPool) {
    await testPool.end();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});

beforeEach(async () => {
  // Clear test data before each test
  if (testPool) {
    // Clear PostgreSQL tables
    const tables = await testPool.query(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public'
    `);
    
    for (const table of tables.rows) {
      await testPool.query(`TRUNCATE TABLE "${table.tablename}" CASCADE`);
    }
  }
});

afterEach(async () => {
  // Clean up after each test
  jest.clearAllMocks();
});

// Mock external services
jest.mock('mqtt', () => ({
  connect: jest.fn(() => ({
    on: jest.fn(),
    subscribe: jest.fn(),
    publish: jest.fn(),
    end: jest.fn(),
  })),
}));

jest.mock('socket.io', () => ({
  Server: jest.fn(() => ({
    on: jest.fn(),
    emit: jest.fn(),
    to: jest.fn(() => ({
      emit: jest.fn(),
    })),
  })),
}));

// Mock file upload
jest.mock('multer', () => {
  const multer = () => {
    return {
      single: () => (req, res, next) => {
        req.file = {
          fieldname: 'file',
          originalname: 'test.ifc',
          encoding: '7bit',
          mimetype: 'application/octet-stream',
          buffer: Buffer.from('test file content'),
          size: 1024,
        };
        next();
      },
    };
  };
  multer.memoryStorage = () => jest.fn();
  return multer;
});

// Mock JWT
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mock-jwt-token'),
  verify: jest.fn(() => ({ userId: 'test-user-id', role: 'admin' })),
}));

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  hash: jest.fn(() => 'hashed-password'),
  compare: jest.fn(() => true),
}));

// Mock winston logger
jest.mock('winston', () => ({
  createLogger: jest.fn(() => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  })),
  format: {
    combine: jest.fn(),
    timestamp: jest.fn(),
    errors: jest.fn(),
    json: jest.fn(),
  },
  transports: {
    Console: jest.fn(),
    File: jest.fn(),
  },
}));

// Helper functions for tests
global.testHelpers = {
  createTestUser: async (pool, userData = {}) => {
    const defaultUser = {
      email: 'test@example.com',
      password: 'hashed-password',
      role: 'user',
      ...userData,
    };
    
    const result = await pool.query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *',
      [defaultUser.email, defaultUser.password, defaultUser.role]
    );
    
    return result.rows[0];
  },
  
  createTestBuilding: async (pool, buildingData = {}) => {
    const defaultBuilding = {
      name: 'Test Building',
      address: '123 Test St',
      coordinates: 'POINT(-122.4194 37.7749)',
      ...buildingData,
    };
    
    const result = await pool.query(
      'INSERT INTO buildings (name, address, coordinates) VALUES ($1, $2, ST_GeomFromText($3)) RETURNING *',
      [defaultBuilding.name, defaultBuilding.address, defaultBuilding.coordinates]
    );
    
    return result.rows[0];
  },
  
  createTestDevice: async (pool, deviceData = {}) => {
    const defaultDevice = {
      name: 'Test Device',
      type: 'sensor',
      location: 'Room 101',
      building_id: 1,
      ...deviceData,
    };
    
    const result = await pool.query(
      'INSERT INTO devices (name, type, location, building_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [defaultDevice.name, defaultDevice.type, defaultDevice.location, defaultDevice.building_id]
    );
    
    return result.rows[0];
  },
  
  generateAuthToken: (userId = 'test-user-id', role = 'user') => {
    return 'mock-jwt-token';
  },
  
  mockRequest: (data = {}) => ({
    body: {},
    params: {},
    query: {},
    headers: {},
    user: { id: 'test-user-id', role: 'user' },
    ...data,
  }),
  
  mockResponse: () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.end = jest.fn().mockReturnValue(res);
    return res;
  },
  
  mockNext: () => jest.fn(),
}; 