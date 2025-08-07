/**
 * Performance monitoring and optimization utilities for backend
 */

const { performance } = require('perf_hooks');
const os = require('os');

// Performance metrics storage
const metrics = {
  responseTimes: [],
  memoryUsage: [],
  cpuUsage: [],
  databaseQueries: [],
  errors: [],
};

// Performance monitoring middleware
const performanceMiddleware = (req, res, next) => {
  const start = performance.now();
  const startMemory = process.memoryUsage();
  
  // Override res.end to capture response time
  const originalEnd = res.end;
  res.end = function(...args) {
    const end = performance.now();
    const endMemory = process.memoryUsage();
    
    const responseTime = end - start;
    const memoryDelta = {
      rss: endMemory.rss - startMemory.rss,
      heapUsed: endMemory.heapUsed - startMemory.heapUsed,
      heapTotal: endMemory.heapTotal - startMemory.heapTotal,
      external: endMemory.external - startMemory.external,
    };
    
    // Store metrics
    metrics.responseTimes.push({
      path: req.path,
      method: req.method,
      responseTime,
      timestamp: new Date(),
      statusCode: res.statusCode,
    });
    
    metrics.memoryUsage.push({
      path: req.path,
      method: req.method,
      memoryDelta,
      timestamp: new Date(),
    });
    
    // Log slow requests
    if (responseTime > 1000) {
      console.warn(`Slow request detected: ${req.method} ${req.path} - ${responseTime.toFixed(2)}ms`);
    }
    
    // Add performance headers
    res.setHeader('X-Response-Time', `${responseTime.toFixed(2)}ms`);
    res.setHeader('X-Memory-Usage', `${(endMemory.heapUsed / 1024 / 1024).toFixed(2)}MB`);
    
    originalEnd.apply(this, args);
  };
  
  next();
};

// Database query performance monitoring
const queryPerformanceMiddleware = (pool) => {
  const originalQuery = pool.query.bind(pool);
  
  pool.query = function(text, params, callback) {
    const start = performance.now();
    const queryId = Math.random().toString(36).substr(2, 9);
    
    console.log(`[DB Query ${queryId}] Starting: ${text.substring(0, 100)}...`);
    
    const wrappedCallback = (err, result) => {
      const end = performance.now();
      const duration = end - start;
      
      const queryMetric = {
        id: queryId,
        query: text,
        params: params || [],
        duration,
        timestamp: new Date(),
        error: err ? err.message : null,
      };
      
      metrics.databaseQueries.push(queryMetric);
      
      // Log slow queries
      if (duration > 100) {
        console.warn(`[DB Query ${queryId}] Slow query detected: ${duration.toFixed(2)}ms`);
        console.warn(`Query: ${text}`);
        if (params && params.length > 0) {
          console.warn(`Params: ${JSON.stringify(params)}`);
        }
      }
      
      if (callback) {
        callback(err, result);
      }
    };
    
    return originalQuery(text, params, wrappedCallback);
  };
  
  return pool;
};

// Memory monitoring
const getMemoryUsage = () => {
  const memUsage = process.memoryUsage();
  const systemMemory = {
    total: os.totalmem(),
    free: os.freemem(),
    used: os.totalmem() - os.freemem(),
  };
  
  return {
    process: {
      rss: memUsage.rss,
      heapUsed: memUsage.heapUsed,
      heapTotal: memUsage.heapTotal,
      external: memUsage.external,
      arrayBuffers: memUsage.arrayBuffers,
    },
    system: {
      total: systemMemory.total,
      free: systemMemory.free,
      used: systemMemory.used,
      usagePercent: ((systemMemory.used / systemMemory.total) * 100).toFixed(2),
    },
  };
};

// CPU monitoring
const getCpuUsage = () => {
  const cpus = os.cpus();
  const loadAverage = os.loadavg();
  
  return {
    cores: cpus.length,
    loadAverage: {
      '1min': loadAverage[0],
      '5min': loadAverage[1],
      '15min': loadAverage[2],
    },
    uptime: os.uptime(),
  };
};

// Performance metrics aggregation
const getPerformanceMetrics = () => {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  
  // Filter recent metrics
  const recentResponseTimes = metrics.responseTimes.filter(
    m => m.timestamp > oneHourAgo
  );
  const recentQueries = metrics.databaseQueries.filter(
    m => m.timestamp > oneHourAgo
  );
  
  // Calculate averages
  const avgResponseTime = recentResponseTimes.length > 0
    ? recentResponseTimes.reduce((sum, m) => sum + m.responseTime, 0) / recentResponseTimes.length
    : 0;
  
  const avgQueryTime = recentQueries.length > 0
    ? recentQueries.reduce((sum, q) => sum + q.duration, 0) / recentQueries.length
    : 0;
  
  // Get slowest queries
  const slowestQueries = recentQueries
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 10);
  
  // Get most frequent endpoints
  const endpointStats = recentResponseTimes.reduce((acc, m) => {
    const key = `${m.method} ${m.path}`;
    if (!acc[key]) {
      acc[key] = { count: 0, totalTime: 0, avgTime: 0 };
    }
    acc[key].count++;
    acc[key].totalTime += m.responseTime;
    acc[key].avgTime = acc[key].totalTime / acc[key].count;
    return acc;
  }, {});
  
  return {
    responseTimes: {
      average: avgResponseTime,
      count: recentResponseTimes.length,
      endpoints: endpointStats,
    },
    database: {
      averageQueryTime: avgQueryTime,
      totalQueries: recentQueries.length,
      slowestQueries,
      errorCount: recentQueries.filter(q => q.error).length,
    },
    system: {
      memory: getMemoryUsage(),
      cpu: getCpuUsage(),
    },
    errors: metrics.errors.filter(e => e.timestamp > oneHourAgo),
  };
};

// Error tracking
const trackError = (error, context = {}) => {
  const errorMetric = {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date(),
  };
  
  metrics.errors.push(errorMetric);
  
  // Log error with context
  console.error('Error tracked:', {
    message: error.message,
    context,
    timestamp: errorMetric.timestamp,
  });
};

// Performance optimization utilities
const optimizeDatabaseQueries = (pool) => {
  // Add query result caching
  const cache = new Map();
  const cacheTimeout = 5 * 60 * 1000; // 5 minutes
  
  const cachedQuery = async (text, params = [], timeout = cacheTimeout) => {
    const cacheKey = `${text}-${JSON.stringify(params)}`;
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < timeout) {
      return cached.result;
    }
    
    const result = await pool.query(text, params);
    cache.set(cacheKey, {
      result,
      timestamp: Date.now(),
    });
    
    return result;
  };
  
  return { cachedQuery };
};

// Connection pooling optimization
const optimizeConnectionPool = (pool) => {
  // Monitor pool usage
  const poolStats = {
    totalCount: pool.totalCount,
    idleCount: pool.idleCount,
    waitingCount: pool.waitingCount,
  };
  
  // Log pool statistics periodically
  setInterval(() => {
    console.log('Connection pool stats:', {
      total: pool.totalCount,
      idle: pool.idleCount,
      waiting: pool.waitingCount,
    });
  }, 30000); // Every 30 seconds
  
  return poolStats;
};

// Rate limiting with performance tracking
const createRateLimiter = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    max = 100, // limit each IP to 100 requests per windowMs
    message = 'Too many requests from this IP',
    standardHeaders = true,
    legacyHeaders = false,
  } = options;
  
  const requests = new Map();
  
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean old entries
    if (requests.has(ip)) {
      const userRequests = requests.get(ip).filter(timestamp => timestamp > windowStart);
      requests.set(ip, userRequests);
    } else {
      requests.set(ip, []);
    }
    
    const userRequests = requests.get(ip);
    
    if (userRequests.length >= max) {
      trackError(new Error('Rate limit exceeded'), { ip, userAgent: req.get('User-Agent') });
      
      if (standardHeaders) {
        res.setHeader('X-RateLimit-Limit', max);
        res.setHeader('X-RateLimit-Remaining', 0);
        res.setHeader('X-RateLimit-Reset', new Date(now + windowMs).toISOString());
      }
      
      return res.status(429).json({ error: message });
    }
    
    userRequests.push(now);
    
    if (standardHeaders) {
      res.setHeader('X-RateLimit-Limit', max);
      res.setHeader('X-RateLimit-Remaining', max - userRequests.length);
      res.setHeader('X-RateLimit-Reset', new Date(now + windowMs).toISOString());
    }
    
    next();
  };
};

// Garbage collection monitoring
const monitorGarbageCollection = () => {
  if (global.gc) {
    const gcStats = {
      count: 0,
      totalTime: 0,
      lastRun: null,
    };
    
    const originalGc = global.gc;
    global.gc = function() {
      const start = performance.now();
      originalGc();
      const end = performance.now();
      
      gcStats.count++;
      gcStats.totalTime += (end - start);
      gcStats.lastRun = new Date();
      
      console.log(`Garbage collection completed in ${(end - start).toFixed(2)}ms`);
    };
    
    return gcStats;
  }
  
  return null;
};

// Performance health check
const getPerformanceHealth = () => {
  const metrics = getPerformanceMetrics();
  const memory = getMemoryUsage();
  const cpu = getCpuUsage();
  
  const health = {
    status: 'healthy',
    checks: {
      responseTime: metrics.responseTimes.average < 1000,
      memoryUsage: parseFloat(memory.system.usagePercent) < 80,
      cpuLoad: cpu.loadAverage['5min'] < os.cpus().length,
      databaseQueries: metrics.database.averageQueryTime < 100,
    },
    details: {
      responseTime: `${metrics.responseTimes.average.toFixed(2)}ms`,
      memoryUsage: `${memory.system.usagePercent}%`,
      cpuLoad: cpu.loadAverage['5min'],
      databaseQueries: `${metrics.database.averageQueryTime.toFixed(2)}ms`,
    },
  };
  
  // Determine overall health status
  const failedChecks = Object.values(health.checks).filter(check => !check).length;
  if (failedChecks > 0) {
    health.status = failedChecks === Object.keys(health.checks).length ? 'critical' : 'degraded';
  }
  
  return health;
};

module.exports = {
  performanceMiddleware,
  queryPerformanceMiddleware,
  getMemoryUsage,
  getCpuUsage,
  getPerformanceMetrics,
  trackError,
  optimizeDatabaseQueries,
  optimizeConnectionPool,
  createRateLimiter,
  monitorGarbageCollection,
  getPerformanceHealth,
  metrics,
}; 