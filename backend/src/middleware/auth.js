const authMiddleware = (req, res, next) => {
  // TODO: Implement actual JWT verification
  // For now, just pass through
  next();
};

module.exports = authMiddleware; 