import { rateLimit } from 'express-rate-limit';
import { config } from '../config/config.js';

/**
 * Rate limiting middleware to prevent API abuse
 * Limits requests per IP address within a time window
 */
export const rateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: {
    error: 'Too many requests from this IP',
    detail: `Please try again later. Rate limit: ${config.rateLimit.maxRequests} requests per ${config.rateLimit.windowMs / 60000} minutes.`
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
});
