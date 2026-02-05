# YoTRT AI Backend - Architecture

## Overview

This backend provides **optional** AI capabilities for Year of the Red Teamer tools through a secure proxy architecture.

## Design Philosophy

### Optional Infrastructure
The backend is designed to be **completely optional**:
- Tools work standalone without backend
- Backend adds security and features when deployed
- No breaking changes to existing tools
- Clear separation between frontend and backend

### Security-First
- API keys never exposed to clients
- Rate limiting prevents abuse
- Input validation protects against injection
- CORS restricts access to whitelisted origins

## System Architecture

```
┌─────────────────────────────────────────────────┐
│         YoTRT Tools (Browser)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Week 9   │  │ Week X   │  │ Week Y   │     │
│  │Injection │  │  Tool    │  │  Tool    │     │
│  │ Analyzer │  │          │  │          │     │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘     │
│       │             │             │            │
│       └─────────────┴─────────────┘            │
│                     │                          │
│           Intelligence Layer (JS)              │
│         ┌──────────────────────┐               │
│         │ Strategy Selector    │               │
│         │  - Proxy Mode        │               │
│         │  - Standalone Mode   │               │
│         └──────────┬───────────┘               │
└────────────────────┼───────────────────────────┘
                     │ HTTPS
                     │
        ┌────────────▼────────────┐
        │   Optional Backend      │
        │  (Node.js + Express)    │
        │                         │
        │  ┌──────────────────┐   │
        │  │ Rate Limiter     │   │
        │  └────────┬─────────┘   │
        │           │             │
        │  ┌────────▼─────────┐   │
        │  │ Input Validator  │   │
        │  └────────┬─────────┘   │
        │           │             │
        │  ┌────────▼─────────┐   │
        │  │ AI Router        │   │
        │  │ - /api/chat      │   │
        │  │ - /api/complete  │   │
        │  │ - /api/analyze   │   │
        │  └────────┬─────────┘   │
        │           │             │
        │  ┌────────▼─────────┐   │
        │  │ OpenRouter Client│   │
        │  └────────┬─────────┘   │
        └───────────┼─────────────┘
                    │
        ┌───────────▼──────────────┐
        │   OpenRouter API         │
        │   (External Service)     │
        └──────────────────────────┘
```

## Component Breakdown

### Frontend Layer

**Intelligence Layer (Client-Side)**
- JavaScript module loaded by tools
- Implements strategy pattern for execution
- Handles proxy/standalone mode switching
- Provides health checking and fallback logic

**Key Features:**
- Automatic strategy selection
- Health monitoring
- Graceful degradation
- Configuration management

### Backend Layer

**Server Core (`src/server.js`)**
- Express application setup
- Security middleware integration
- Route mounting
- Error handling

**Middleware Stack:**
1. **Helmet**: Security headers
2. **CORS**: Origin validation
3. **Body Parser**: JSON/URL encoded parsing
4. **Rate Limiter**: Throttling per IP

**Routes (`src/routes/ai.js`)**
- `/api/chat`: General conversation endpoint
- `/api/complete`: Text completion endpoint
- `/api/analyze`: Injection testing endpoint

**OpenRouter Client (`src/utils/openRouterClient.js`)**
- Encapsulates API communication
- Manages authentication
- Handles response parsing

## Data Flow

### Successful Request Flow

1. **Frontend**: User triggers AI action
2. **Intelligence Layer**: Selects proxy strategy
3. **Health Check**: Verifies backend availability
4. **Request**: Sends formatted payload to backend
5. **Rate Limiter**: Checks IP request quota
6. **Validator**: Sanitizes and validates input
7. **Router**: Routes to appropriate handler
8. **OpenRouter Client**: Forwards to AI service
9. **Response Processing**: Extracts AI response
10. **Return**: Sends formatted response to frontend
11. **Display**: Frontend renders result

### Fallback Flow

1. **Frontend**: User triggers AI action
2. **Intelligence Layer**: Attempts proxy strategy
3. **Health Check**: Backend unavailable
4. **Fallback**: Switches to standalone strategy
5. **Direct Request**: Calls OpenRouter directly
6. **Response**: Processes and displays result

## Security Layers

### Layer 1: Client-Side
- No secrets in code
- Strategy pattern prevents accidental exposure
- Configuration isolation

### Layer 2: Network
- CORS validation
- HTTPS enforcement (production)
- Origin whitelisting

### Layer 3: Application
- Rate limiting per IP
- Input length restrictions
- Content validation
- Request sanitization

### Layer 4: Data
- Environment variable secrets
- No credential logging
- Secure header configuration

## Configuration Management

### Environment-Based Config
```
Development:
- Relaxed CORS
- Detailed error messages
- Console logging

Production:
- Strict CORS
- Minimal error exposure
- Structured logging
```

### Runtime Config
```javascript
// Frontend can reconfigure at runtime
IntelligenceLayer.configure({
  proxyEndpoint: 'https://prod-backend.app',
  currentStrategy: 'proxy',
  modelPreference: 'gpt-4'
});
```

## Scalability Considerations

### Current Architecture
- Suitable for: 1-1000 concurrent users
- Hosting: Free tier (Railway, Render)
- Cost: ~$5-20/month

### Scaling Options

**Horizontal Scaling**
- Deploy multiple backend instances
- Add load balancer
- Use Redis for shared rate limiting

**Vertical Scaling**
- Increase instance size
- Optimize Node.js performance
- Add response caching

**Serverless Migration**
- Convert to AWS Lambda
- Use API Gateway
- DynamoDB for state

## Future Enhancements

### Phase 2 Features (Optional)
- [ ] Response caching (Redis)
- [ ] User authentication (JWT)
- [ ] Usage analytics
- [ ] Cost tracking dashboard
- [ ] Multiple AI provider support

### Phase 3 Features (Optional)
- [ ] WebSocket support for streaming
- [ ] Fine-tuned model endpoints
- [ ] Batch processing API
- [ ] Admin dashboard

## Technology Choices

### Why Node.js?
- Fast development
- Excellent async I/O
- Large package ecosystem
- Easy deployment

### Why Express?
- Minimal and flexible
- Well-documented
- Large middleware ecosystem
- Industry standard

### Why OpenRouter?
- Unified API for multiple models
- Pay-per-use pricing
- No vendor lock-in
- Great for experimentation

## Deployment Topology

### Development
```
Frontend (Vite Dev Server :5173)
    ↓
Backend (Node.js :3000)
    ↓
OpenRouter API
```

### Production
```
Frontend (Vercel CDN)
    ↓
Backend (Railway)
    ↓
OpenRouter API
```

### Alternative (Serverless)
```
Frontend (CloudFront + S3)
    ↓
Backend (Lambda + API Gateway)
    ↓
OpenRouter API
```

## Monitoring & Observability

### Health Checks
- `/health` endpoint for uptime monitoring
- Backend availability detection
- Automatic fallback triggering

### Logging (Future)
- Request/response logging
- Error tracking
- Performance metrics
- Cost analysis

## Cost Analysis

### Backend Hosting
- Railway Free: $0/month (limited hours)
- Railway Starter: $5/month
- Render Free: $0/month (sleeps after inactivity)
- Render Starter: $7/month

### OpenRouter API
- Varies by model
- Grok-2: ~$0.10/1K tokens
- GPT-4: ~$0.30/1K tokens
- Claude-3: ~$0.25/1K tokens

### Total Monthly (Small Scale)
- Hosting: $5-10
- API Usage (500K tokens): $50-150
- **Total: $55-160/month**

## Maintenance

### Regular Tasks
- [ ] Monitor API costs
- [ ] Check error rates
- [ ] Review rate limits
- [ ] Update dependencies
- [ ] Rotate API keys (90 days)

### Updates
- Backend updates don't affect frontend
- Frontend can work during backend maintenance
- Zero-downtime deployments possible

## Related Documentation

- `README.md` - Backend setup guide
- `AI_INTEGRATION_GUIDE.md` - Frontend integration
- `DEPLOYMENT.md` - Production deployment
