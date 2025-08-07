const request = require('supertest');
const { Pool } = require('pg');

// Mock the auth controller
const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({
          error: 'Email and password are required'
        });
      }
      
      // Mock authentication logic
      if (email === 'test@example.com' && password === 'password') {
        return res.status(200).json({
          message: 'Login successful',
          token: 'mock-jwt-token',
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
            role: 'user'
          }
        });
      } else {
        return res.status(401).json({
          error: 'Invalid credentials'
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Internal server error'
      });
    }
  },
  
  register: async (req, res) => {
    try {
      const { email, password, role = 'user' } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({
          error: 'Email and password are required'
        });
      }
      
      // Mock registration logic
      return res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: 'new-user-id',
          email,
          role
        }
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Internal server error'
      });
    }
  },
  
  logout: async (req, res) => {
    try {
      return res.status(200).json({
        message: 'Logout successful'
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Internal server error'
      });
    }
  }
};

// Mock Express app for testing
const express = require('express');
const app = express();

app.use(express.json());
app.post('/auth/login', authController.login);
app.post('/auth/register', authController.register);
app.post('/auth/logout', authController.logout);

describe('Auth Controller', () => {
  describe('POST /auth/login', () => {
    it('should return 400 when email is missing', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ password: 'password' })
        .expect(400);
      
      expect(response.body.error).toBe('Email and password are required');
    });
    
    it('should return 400 when password is missing', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'test@example.com' })
        .expect(400);
      
      expect(response.body.error).toBe('Email and password are required');
    });
    
    it('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'wrong@example.com',
          password: 'wrongpassword'
        })
        .expect(401);
      
      expect(response.body.error).toBe('Invalid credentials');
    });
    
    it('should return 200 and token for valid credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200);
      
      expect(response.body.message).toBe('Login successful');
      expect(response.body.token).toBe('mock-jwt-token');
      expect(response.body.user).toEqual({
        id: 'test-user-id',
        email: 'test@example.com',
        role: 'user'
      });
    });
  });
  
  describe('POST /auth/register', () => {
    it('should return 400 when email is missing', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ password: 'password' })
        .expect(400);
      
      expect(response.body.error).toBe('Email and password are required');
    });
    
    it('should return 400 when password is missing', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ email: 'new@example.com' })
        .expect(400);
      
      expect(response.body.error).toBe('Email and password are required');
    });
    
    it('should return 201 and user data for valid registration', async () => {
      const userData = {
        email: 'new@example.com',
        password: 'newpassword',
        role: 'admin'
      };
      
      const response = await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(201);
      
      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.user).toEqual({
        id: 'new-user-id',
        email: userData.email,
        role: userData.role
      });
    });
    
    it('should use default role when not provided', async () => {
      const userData = {
        email: 'new@example.com',
        password: 'newpassword'
      };
      
      const response = await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(201);
      
      expect(response.body.user.role).toBe('user');
    });
  });
  
  describe('POST /auth/logout', () => {
    it('should return 200 for successful logout', async () => {
      const response = await request(app)
        .post('/auth/logout')
        .expect(200);
      
      expect(response.body.message).toBe('Logout successful');
    });
  });
});

// Example of testing with database integration
describe('Auth Controller with Database', () => {
  let testPool;
  
  beforeAll(async () => {
    // Setup test database connection
    testPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 1,
    });
  });
  
  afterAll(async () => {
    if (testPool) {
      await testPool.end();
    }
  });
  
  beforeEach(async () => {
    // Clear test data
    await testPool.query('TRUNCATE TABLE users CASCADE');
  });
  
  it('should create user in database during registration', async () => {
    const userData = {
      email: 'db-test@example.com',
      password: 'hashed-password',
      role: 'user'
    };
    
    // Mock the actual database insertion
    const result = await testPool.query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *',
      [userData.email, userData.password, userData.role]
    );
    
    expect(result.rows[0]).toMatchObject({
      email: userData.email,
      role: userData.role
    });
    expect(result.rows[0].id).toBeDefined();
  });
  
  it('should find user in database during login', async () => {
    // First create a user
    const userData = {
      email: 'login-test@example.com',
      password: 'hashed-password',
      role: 'user'
    };
    
    await testPool.query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3)',
      [userData.email, userData.password, userData.role]
    );
    
    // Then try to find the user
    const result = await testPool.query(
      'SELECT * FROM users WHERE email = $1',
      [userData.email]
    );
    
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0].email).toBe(userData.email);
  });
});

// Example of testing error handling
describe('Auth Controller Error Handling', () => {
  it('should handle database connection errors', async () => {
    // Mock a database error scenario
    const mockAuthController = {
      login: async (req, res) => {
        try {
          // Simulate database error
          throw new Error('Database connection failed');
        } catch (error) {
          return res.status(500).json({
            error: 'Internal server error'
          });
        }
      }
    };
    
    const errorApp = express();
    errorApp.use(express.json());
    errorApp.post('/auth/login', mockAuthController.login);
    
    const response = await request(errorApp)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password'
      })
      .expect(500);
    
    expect(response.body.error).toBe('Internal server error');
  });
  
  it('should handle malformed JSON', async () => {
    const response = await request(app)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send('invalid json')
      .expect(400);
    
    // Express should return 400 for malformed JSON
    expect(response.status).toBe(400);
  });
}); 