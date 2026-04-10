import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // OpenRouter API configuration
  openRouter: {
    apiKey: process.env.OPENROUTER_API_KEY,
    model: process.env.OPENROUTER_MODEL || 'x-ai/grok-2-1212',
    baseUrl: 'https://openrouter.ai/api/v1'
  },
  
  // CORS configuration
  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
      : ['http://localhost:5173', 'http://localhost:3000']
  },
  
  // Rate limiting configuration
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 20
  }
};

// Validate required configuration
export function validateConfig() {
  const errors = [];
  
  if (!config.openRouter.apiKey || config.openRouter.apiKey === 'your_openrouter_api_key_here') {
    errors.push('OPENROUTER_API_KEY is not configured. Please set it in your .env file.');
  }
  
  if (errors.length > 0) {
    console.error('Configuration errors:');
    errors.forEach(error => console.error(`  - ${error}`));
    console.error('\nPlease copy .env.example to .env and configure the required values.');
    return false;
  }
  
  return true;
}
