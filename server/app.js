const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./utils/AppError');
const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 100 : 1000,
  message: { status: 'error', message: 'Too many requests. Please try again later.' },
  skip: () => process.env.NODE_ENV === 'development',
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Server is running.' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// 404 handler
app.all('*', (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found.`, 404));
});

// Global error handler
app.use(errorHandler);

module.exports = app;

