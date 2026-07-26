const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const sendCookieToken = (res, statusCode, user) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + (process.env.JWT_EXPIRES_IN ? parseInt(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000)
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  };

  res.cookie('token', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email and password.', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError('Invalid email or password.', 401));
    }

    sendCookieToken(res, 200, user);
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.cookie('token', 'loggedout', {
      expires: new Date(Date.now() + 1000),
      httpOnly: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully.',
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new AppError('User not found.', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

