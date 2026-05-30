const rateLimit = require('express-rate-limit');

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10000,
  message: {
    success: false,
    error: 'Demasiadas solicitudes, por favor intenta más tarde',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10000,
  message: {
    success: false,
    error: 'Demasiados intentos de inicio de sesión, intenta más tarde',
  },
  skipSuccessfulRequests: true, 
});

const writeLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 1000,
  message: {
    success: false,
    error: 'Demasiadas operaciones, espera un momento',
  },
});

module.exports = {
  generalLimiter,
  authLimiter,
  writeLimiter,
};