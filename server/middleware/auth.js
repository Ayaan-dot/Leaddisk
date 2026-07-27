const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;

    console.log("AUTH DEBUG: Origin:", req.headers.origin);
    console.log("AUTH DEBUG: Full URL:", req.method, req.originalUrl);
    console.log("AUTH DEBUG: Cookies present:", !!req.cookies);
    console.log("AUTH DEBUG: Auth header present:", !!req.headers.authorization);
    console.log("AUTH DEBUG: Auth header value:", req.headers.authorization);

    // Check Authorization header first (Bearer token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
      console.log("AUTH DEBUG: Token extracted from Authorization header");
    }
    // Fallback to cookie
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
      console.log("AUTH DEBUG: Token extracted from cookie");
    }

    if (!token) {
      console.log("AUTH DEBUG: No token found in request");
      console.log("AUTH DEBUG: All headers:", JSON.stringify(req.headers));
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided',
      });
    }

    console.log("TOKEN RECEIVED:", token.substring(0, 20) + "...");
    console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("DECODED TOKEN:", decoded);
      
      req.user = await User.findById(decoded.id).select('-password');
      console.log("USER FOUND:", req.user?._id);
      
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found',
        });
      }
      next();
    } catch (error) {
      console.log("JWT ERROR:", error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token invalid',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { protect };

