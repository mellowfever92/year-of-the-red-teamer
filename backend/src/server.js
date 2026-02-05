import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config, validateConfig } from './config/config.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import aiRoutes from './routes/ai.js';

// Pre-flight configuration check
if (!validateConfig()) {
  process.exit(1);
}

const serverInstance = express();

// Apply security hardening
serverInstance.use(helmet());

// Configure cross-origin access
const originValidator = (requestOrigin, doneCallback) => {
  const noOriginAllowed = !requestOrigin;
  if (noOriginAllowed) {
    return doneCallback(null, true);
  }
  
  const originIsWhitelisted = config.cors.allowedOrigins.includes(requestOrigin);
  if (originIsWhitelisted) {
    doneCallback(null, true);
  } else {
    doneCallback(new Error('CORS policy violation'));
  }
};

serverInstance.use(cors({
  origin: originValidator,
  credentials: true
}));

// Configure request parsing with size limits
serverInstance.use(express.json({ limit: '1mb' }));
serverInstance.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Apply throttling to prevent abuse
serverInstance.use('/api/', rateLimiter);

// System status check
serverInstance.get('/health', (req, res) => {
  res.json({ 
    operational: true,
    serviceName: 'YoTRT AI Backend',
    buildVersion: '1.0.0',
    serverTime: new Date().toISOString()
  });
});

// Service documentation
serverInstance.get('/api', (req, res) => {
  res.json({
    serviceName: 'Year of the Red Teamer - AI Backend',
    purpose: 'General-purpose backend proxy for AI-integrated features',
    buildVersion: '1.0.0',
    availableEndpoints: {
      '/api/chat': {
        httpMethod: 'POST',
        purpose: 'General-purpose AI chat endpoint',
        expectedPayload: {
          messages: 'Array of message objects with role and content',
          model: 'Optional: AI model to use',
          temperature: 'Optional: Temperature setting (0-1)',
          maxTokens: 'Optional: Maximum tokens to generate'
        }
      },
      '/api/complete': {
        httpMethod: 'POST',
        purpose: 'Simple text completion endpoint',
        expectedPayload: {
          prompt: 'Required: The prompt to complete',
          systemPrompt: 'Optional: System prompt for context',
          model: 'Optional: AI model to use',
          temperature: 'Optional: Temperature setting (0-1)',
          maxTokens: 'Optional: Maximum tokens to generate'
        }
      },
      '/api/analyze': {
        httpMethod: 'POST',
        purpose: 'Specialized endpoint for prompt injection analysis',
        expectedPayload: {
          systemPrompt: 'Required: The system prompt to test',
          userInjection: 'Required: The injection payload to test'
        }
      }
    },
    throttleConfig: {
      maxRequestsAllowed: config.rateLimit.maxRequests,
      timeWindowMinutes: config.rateLimit.windowMs / 60000
    }
  });
});

// Wire up AI functionality
serverInstance.use('/api', aiRoutes);

// Handle unknown routes
serverInstance.use((req, res) => {
  res.status(404).json({
    errorType: 'RouteNotFound',
    message: `Endpoint ${req.method} ${req.path} does not exist`
  });
});

// Global error handling
serverInstance.use((errorObj, req, res, next) => {
  console.error('Request processing error:', errorObj);
  res.status(errorObj.status || 500).json({
    errorType: errorObj.message || 'InternalServerError',
    ...(config.nodeEnv === 'development' && { debugTrace: errorObj.stack })
  });
});

// Boot up the server
const listeningPort = config.port;
serverInstance.listen(listeningPort, () => {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  Year of the Red Teamer - AI Backend');
  console.log('  General-purpose AI proxy server');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`  🚀 Server listening on http://localhost:${listeningPort}`);
  console.log(`  📊 Status endpoint: http://localhost:${listeningPort}/health`);
  console.log(`  📖 Documentation: http://localhost:${listeningPort}/api`);
  console.log(`  🔒 Running mode: ${config.nodeEnv}`);
  console.log(`  ⚡ Throttle: ${config.rateLimit.maxRequests} reqs/${config.rateLimit.windowMs / 60000}min`);
  console.log('═══════════════════════════════════════════════════════════');
});
