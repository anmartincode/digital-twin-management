const express = require('express');
const router = express.Router();
const {
  getPerformanceMetrics,
  getPerformanceHealth,
  getMemoryUsage,
  getCpuUsage,
  trackError,
} = require('../utils/performance');

// Middleware to ensure admin access for performance routes
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
};

// Get overall performance metrics
router.get('/metrics', requireAdmin, (req, res) => {
  try {
    const metrics = getPerformanceMetrics();
    res.json({
      success: true,
      data: metrics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    trackError(error, { route: '/performance/metrics' });
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve performance metrics',
    });
  }
});

// Get system health status
router.get('/health', (req, res) => {
  try {
    const health = getPerformanceHealth();
    res.json({
      success: true,
      data: health,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    trackError(error, { route: '/performance/health' });
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve health status',
    });
  }
});

// Get memory usage
router.get('/memory', requireAdmin, (req, res) => {
  try {
    const memory = getMemoryUsage();
    res.json({
      success: true,
      data: memory,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    trackError(error, { route: '/performance/memory' });
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve memory usage',
    });
  }
});

// Get CPU usage
router.get('/cpu', requireAdmin, (req, res) => {
  try {
    const cpu = getCpuUsage();
    res.json({
      success: true,
      data: cpu,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    trackError(error, { route: '/performance/cpu' });
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve CPU usage',
    });
  }
});

// Get slowest endpoints
router.get('/slowest-endpoints', requireAdmin, (req, res) => {
  try {
    const metrics = getPerformanceMetrics();
    const slowestEndpoints = Object.entries(metrics.responseTimes.endpoints)
      .map(([endpoint, stats]) => ({
        endpoint,
        averageTime: stats.avgTime,
        count: stats.count,
        totalTime: stats.totalTime,
      }))
      .sort((a, b) => b.averageTime - a.averageTime)
      .slice(0, 10);

    res.json({
      success: true,
      data: slowestEndpoints,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    trackError(error, { route: '/performance/slowest-endpoints' });
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve slowest endpoints',
    });
  }
});

// Get error statistics
router.get('/errors', requireAdmin, (req, res) => {
  try {
    const metrics = getPerformanceMetrics();
    const errorStats = {
      totalErrors: metrics.errors.length,
      errorsByType: metrics.errors.reduce((acc, error) => {
        const type = error.message.split(':')[0];
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {}),
      recentErrors: metrics.errors.slice(-10).map(error => ({
        message: error.message,
        timestamp: error.timestamp,
        context: error.context,
      })),
    };

    res.json({
      success: true,
      data: errorStats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    trackError(error, { route: '/performance/errors' });
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve error statistics',
    });
  }
});

// Get database performance
router.get('/database', requireAdmin, (req, res) => {
  try {
    const metrics = getPerformanceMetrics();
    const dbStats = {
      averageQueryTime: metrics.database.averageQueryTime,
      totalQueries: metrics.database.totalQueries,
      errorCount: metrics.database.errorCount,
      errorRate: metrics.database.totalQueries > 0 
        ? (metrics.database.errorCount / metrics.database.totalQueries * 100).toFixed(2)
        : 0,
      slowestQueries: metrics.database.slowestQueries.map(query => ({
        id: query.id,
        query: query.query.substring(0, 100) + '...',
        duration: query.duration,
        timestamp: query.timestamp,
        error: query.error,
      })),
    };

    res.json({
      success: true,
      data: dbStats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    trackError(error, { route: '/performance/database' });
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve database performance',
    });
  }
});

// Performance alerts endpoint
router.get('/alerts', requireAdmin, (req, res) => {
  try {
    const health = getPerformanceHealth();
    const alerts = [];

    // Check response time
    if (health.checks.responseTime === false) {
      alerts.push({
        type: 'warning',
        message: 'High response time detected',
        value: health.details.responseTime,
        threshold: '1000ms',
      });
    }

    // Check memory usage
    if (health.checks.memoryUsage === false) {
      alerts.push({
        type: 'warning',
        message: 'High memory usage detected',
        value: health.details.memoryUsage,
        threshold: '80%',
      });
    }

    // Check CPU load
    if (health.checks.cpuLoad === false) {
      alerts.push({
        type: 'warning',
        message: 'High CPU load detected',
        value: health.details.cpuLoad,
        threshold: 'CPU cores',
      });
    }

    // Check database queries
    if (health.checks.databaseQueries === false) {
      alerts.push({
        type: 'warning',
        message: 'Slow database queries detected',
        value: health.details.databaseQueries,
        threshold: '100ms',
      });
    }

    res.json({
      success: true,
      data: {
        alerts,
        count: alerts.length,
        status: health.status,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    trackError(error, { route: '/performance/alerts' });
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve performance alerts',
    });
  }
});

// Performance summary for dashboard
router.get('/summary', (req, res) => {
  try {
    const health = getPerformanceHealth();
    const memory = getMemoryUsage();
    const cpu = getCpuUsage();
    const metrics = getPerformanceMetrics();

    const summary = {
      status: health.status,
      responseTime: {
        average: metrics.responseTimes.average,
        unit: 'ms',
      },
      memory: {
        usage: memory.system.usagePercent,
        unit: '%',
      },
      cpu: {
        load: cpu.loadAverage['5min'],
        cores: cpu.cores,
      },
      database: {
        averageQueryTime: metrics.database.averageQueryTime,
        totalQueries: metrics.database.totalQueries,
        errorRate: metrics.database.totalQueries > 0 
          ? (metrics.database.errorCount / metrics.database.totalQueries * 100).toFixed(2)
          : 0,
      },
      uptime: {
        system: cpu.uptime,
        unit: 'seconds',
      },
    };

    res.json({
      success: true,
      data: summary,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    trackError(error, { route: '/performance/summary' });
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve performance summary',
    });
  }
});

module.exports = router; 