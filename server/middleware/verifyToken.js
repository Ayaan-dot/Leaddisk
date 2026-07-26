const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return next(new AppError('Not authenticated. Please log in.', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Session expired. Please log in again.', 401));
    }
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token. Please log in again.', 401));
    }
    return next(new AppError('Authentication failed.', 401));
  }
};

module.exports = verifyToken;

