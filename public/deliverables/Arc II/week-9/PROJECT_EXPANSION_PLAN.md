# AI Injection Analyzer - Production Expansion Plan

## Executive Summary

This document outlines the roadmap to transform the Week 9 AI Injection Analyzer from an educational proof-of-concept into a production-ready, secure, and scalable application. The current implementation exposes API keys client-side and lacks robust security controls—acceptable for educational demos but unsuitable for wider deployment.

**Timeline**: 4-6 weeks for full production implementation  
**Effort**: ~120-160 developer hours  
**Priority**: High (if deploying publicly), Medium (if strictly internal/educational)

---

## Current Architecture Limitations

### 🔴 Critical Issues
1. **API Key Exposure**: OpenRouter key hardcoded in client JavaScript
   - **Risk**: Unauthorized usage, cost overruns, quota exhaustion
   - **Impact**: Anyone inspecting browser DevTools can steal the key
   
2. **No Rate Limiting**: Unlimited API calls possible
   - **Risk**: DDoS potential, API quota burnout
   - **Impact**: Cost spikes, service disruption

3. **No Authentication**: No user accountability or access control
   - **Risk**: Abuse, misuse for non-educational purposes
   - **Impact**: Reputational damage, compliance issues

4. **Client-Side Only**: All logic runs in browser
   - **Risk**: No audit trail, no analytics, no user management
   - **Impact**: Cannot track usage patterns or identify abuse

### 🟡 Secondary Concerns
- No input sanitization (XSS potential via prompt injection into UI)
- No CORS policy enforcement
- No error handling for network failures
- No caching to reduce redundant API calls
- No analytics on attack pattern efficacy

---

## Proposed Architecture

### High-Level Design

```
┌─────────────────┐
│   Web Browser   │
│  (React/Vue/    │
│   Vanilla JS)   │
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────────────────────────┐
│     Frontend (Static Hosting)       │
│   • HTML/CSS/JS (no secrets)        │
│   • Calls Backend API endpoints     │
│   • Renders heatmap & results       │
└────────┬────────────────────────────┘
         │ API Requests
         ▼
┌─────────────────────────────────────┐
│    Backend API Server (Node.js)     │
│  • Express.js REST API              │
│  • JWT Authentication               │
│  • Rate Limiting (Redis)            │
│  • Request Validation               │
│  • Logging & Analytics              │
└────────┬────────────────────────────┘
         │
         ├─────────────┬──────────────┐
         ▼             ▼              ▼
   ┌─────────┐  ┌──────────┐  ┌──────────┐
   │OpenRouter│  │ Database │  │  Redis   │
   │   API    │  │(Postgres)│  │  Cache   │
   └─────────┘  └──────────┘  └──────────┘
```

### Component Breakdown

#### **1. Frontend (Client-Side)**
- **Technology**: Keep existing vanilla JavaScript or upgrade to React/Vue
- **Responsibilities**:
  - UI rendering (textareas, buttons, heatmap)
  - User authentication flow
  - API calls to backend (NOT OpenRouter directly)
  - Display results from backend responses
- **Location**: Can remain in `public/weeks/week-9.html` or separate SPA
- **Security**: No secrets, all API calls go through backend proxy

#### **2. Backend API Server**
- **Technology**: Node.js + Express.js (recommended) or Python + FastAPI
- **Responsibilities**:
  - Proxy requests to OpenRouter API
  - Manage API keys securely (env variables)
  - Authenticate users (JWT tokens)
  - Rate limiting (per user, per IP)
  - Input validation & sanitization
  - Audit logging (who analyzed what, when)
  - Response caching (reduce API costs)
- **Deployment**: Vercel, Netlify Functions, AWS Lambda, Railway, Render

#### **3. Database (Optional but Recommended)**
- **Technology**: PostgreSQL or MongoDB
- **Purpose**:
  - User accounts (email, hashed passwords, JWT refresh tokens)
  - Analysis history (prompts analyzed, timestamps, results)
  - Usage analytics (most common patterns, ASR trends)
  - Admin dashboard data
- **Schema Example**:
  ```sql
  CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE analyses (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    system_prompt TEXT,
    injection_payload TEXT,
    asr_estimate INTEGER,
    patterns_detected TEXT[],
    ai_response TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );
  ```

#### **4. Redis Cache (Optional)**
- **Purpose**:
  - Rate limiting counters (req/min per user)
  - Cache AI responses for identical prompts (save $$$)
  - Session storage for JWT tokens
- **Deployment**: Redis Cloud (free tier), Upstash, self-hosted

---

## Implementation Roadmap

### **Phase 1: Backend Foundation (Week 1-2)**

#### Week 1: Basic API Server
- [ ] **Day 1-2**: Initialize Node.js project
  ```bash
  mkdir injection-analyzer-backend
  cd injection-analyzer-backend
  npm init -y
  npm install express dotenv cors helmet express-rate-limit
  ```
- [ ] **Day 3-4**: Create proxy endpoint
  ```javascript
  // server.js
  app.post('/api/analyze', async (req, res) => {
    const { systemPrompt, userInjection } = req.body;
    // Validate inputs
    // Call OpenRouter API with server-side key
    // Return sanitized response
  });
  ```
- [ ] **Day 5**: Environment configuration
  - Create `.env` file (add to `.gitignore`)
  - Move `OPENROUTER_API_KEY` to backend
  - Set up production/dev environments

#### Week 2: Security Hardening
- [ ] **Day 1-2**: Input validation
  - Sanitize all user inputs (prevent injection into logs)
  - Limit prompt length (max 10,000 chars)
  - Block malicious patterns (SQL injection attempts, etc.)
- [ ] **Day 3**: Rate limiting
  ```javascript
  const rateLimit = require('express-rate-limit');
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20 // 20 requests per window
  });
  app.use('/api/', limiter);
  ```
- [ ] **Day 4-5**: CORS configuration
  - Whitelist frontend domain only
  - Set appropriate headers (`Access-Control-Allow-Origin`)

### **Phase 2: Authentication System (Week 3)**

#### User Management
- [ ] **Day 1-2**: Database setup
  - Deploy PostgreSQL instance (ElephantSQL, Supabase, Neon)
  - Create `users` and `sessions` tables
  - Set up migrations (use Prisma or TypeORM)
- [ ] **Day 3-4**: Auth endpoints
  ```javascript
  POST /api/auth/register  // Create account
  POST /api/auth/login     // Get JWT token
  POST /api/auth/logout    // Invalidate token
  GET  /api/auth/me        // Check current user
  ```
- [ ] **Day 5**: JWT implementation
  - Generate tokens with `jsonwebtoken`
  - Set expiration (1 hour access, 7 day refresh)
  - Protect `/api/analyze` endpoint (require valid JWT)

#### Frontend Integration
- [ ] Update `week-9.html` to handle login flow
- [ ] Store JWT in `localStorage` (or `httpOnly` cookie if using sessions)
- [ ] Add auth headers to analysis requests:
  ```javascript
  fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ systemPrompt, userInjection })
  });
  ```

### **Phase 3: Advanced Features (Week 4)**

#### Caching Layer
- [ ] **Day 1-2**: Redis integration
  - Set up Redis instance (Upstash recommended for serverless)
  - Cache AI responses by hash of `systemPrompt + userInjection`
  - Set TTL (7 days) to balance freshness vs. cost savings
  ```javascript
  const cacheKey = crypto.createHash('sha256')
    .update(systemPrompt + userInjection)
    .digest('hex');
  
  const cached = await redis.get(cacheKey);
  if (cached) return res.json(JSON.parse(cached));
  
  // Make API call, then cache result
  await redis.setex(cacheKey, 604800, JSON.stringify(result));
  ```

#### Analytics & Logging
- [ ] **Day 3**: Request logging
  - Log all analysis requests (user, timestamp, patterns found)
  - Track API costs per user
  - Monitor error rates
- [ ] **Day 4**: Analytics endpoints
  ```javascript
  GET /api/analytics/patterns  // Most common injection patterns
  GET /api/analytics/asr       // Average ASR over time
  GET /api/admin/usage         // Cost tracking (admin only)
  ```

#### User Dashboard
- [ ] **Day 5**: Create history page
  - `/dashboard.html` showing past analyses
  - Export feature (download as JSON/CSV)
  - Usage statistics (analyses this month, avg ASR)

### **Phase 4: Deployment & Optimization (Week 5-6)**

#### Week 5: Production Deployment
- [ ] **Day 1-2**: Choose hosting platform
  - **Option A**: Vercel (frontend) + Railway (backend + DB + Redis)
  - **Option B**: AWS (EC2 + RDS + ElastiCache) - more complex, more control
  - **Option C**: Render (all-in-one, simple but less scalable)
- [ ] **Day 3**: Environment setup
  - Production `.env` file with real API keys
  - Database connection strings
  - CORS origins set to production frontend URL
- [ ] **Day 4**: CI/CD pipeline
  - GitHub Actions for auto-deploy on push to `main`
  - Automated tests (Jest for backend, Playwright for E2E)
- [ ] **Day 5**: Monitoring
  - Set up Sentry for error tracking
  - CloudWatch/Datadog for performance metrics
  - Alerts for API errors, high costs, downtime

#### Week 6: Polish & Documentation
- [ ] **Day 1-2**: Performance optimization
  - Minify frontend assets
  - Compress API responses (gzip)
  - Optimize database queries (indexes on `user_id`, `created_at`)
- [ ] **Day 3**: Security audit
  - Run OWASP ZAP scan
  - Check for SQL injection, XSS vulnerabilities
  - Enable HTTPS only (enforce TLS 1.3)
- [ ] **Day 4**: Documentation
  - API documentation (Swagger/OpenAPI)
  - Deployment guide
  - Developer onboarding instructions
- [ ] **Day 5**: Load testing
  - Simulate 100+ concurrent users (k6, Locust)
  - Verify rate limiting works
  - Check database connection pooling

---

## Technology Stack Recommendations

### **Recommended Stack (Balance of Simplicity & Power)**

| Component | Technology | Justification |
|-----------|------------|---------------|
| **Frontend** | Vanilla JS or React | Keep existing or upgrade for state management |
| **Backend** | Node.js + Express | Fast development, great for API proxies |
| **Database** | Supabase (Postgres) | Free tier, built-in auth helpers, real-time |
| **Cache** | Upstash Redis | Serverless, pay-per-request pricing |
| **Hosting (Backend)** | Railway or Render | Simple deploys, free tier, auto-scaling |
| **Hosting (Frontend)** | Vercel or Netlify | CDN, instant deploys, free SSL |
| **Auth** | JWT (jsonwebtoken) | Stateless, scalable, industry standard |
| **Monitoring** | Sentry + Vercel Analytics | Free tiers, easy integration |

### **Alternative: Serverless Stack (Lower Cost at Scale)**

| Component | Technology |
|-----------|------------|
| **Backend** | AWS Lambda + API Gateway |
| **Database** | DynamoDB or Supabase |
| **Cache** | DynamoDB TTL or Upstash |
| **Auth** | AWS Cognito or Clerk |
| **Hosting** | CloudFront + S3 for frontend |

**Pros**: Pay only for actual usage, auto-scales infinitely  
**Cons**: Cold starts, vendor lock-in, more complex debugging

---

## Cost Estimates

### **Development Costs**
- **Solo Developer** (40 hrs/week): 4-6 weeks = 160-240 hours
  - Junior dev: $25/hr × 200 hrs = **$5,000**
  - Mid-level: $50/hr × 200 hrs = **$10,000**
  - Senior: $100/hr × 200 hrs = **$20,000**

### **Operational Costs (Monthly)**

#### Option 1: Minimal (Educational Use, <1000 users)
- **Hosting**: Railway/Render free tier → **$0**
- **Database**: Supabase free tier → **$0**
- **Redis**: Upstash free tier → **$0**
- **OpenRouter API**: $0.10/1K tokens × 50K tokens/month → **$5**
- **Monitoring**: Sentry free tier → **$0**
- **TOTAL**: **~$5/month**

#### Option 2: Small Production (<10K users)
- **Hosting**: Railway Pro → **$20**
- **Database**: Supabase Pro → **$25**
- **Redis**: Upstash Pay-as-you-go → **$10**
- **OpenRouter API**: $0.10/1K tokens × 500K tokens → **$50**
- **CDN**: Vercel Pro → **$20**
- **Monitoring**: Sentry Team → **$26**
- **TOTAL**: **~$151/month**

#### Option 3: Large Scale (100K+ users)
- **AWS EC2** (t3.medium × 2) → **$100**
- **RDS PostgreSQL** (db.t3.small) → **$40**
- **ElastiCache Redis** → **$25**
- **OpenRouter API** (5M tokens) → **$500**
- **CloudFront CDN** → **$30**
- **Monitoring Suite** → **$100**
- **TOTAL**: **~$795/month**

---

## Security Enhancements Checklist

### **Backend Security**
- [x] Move API keys to environment variables (`.env` file)
- [ ] Use secret management service (AWS Secrets Manager, HashiCorp Vault)
- [ ] Implement API key rotation (regenerate every 90 days)
- [ ] Add request signing (HMAC) to prevent replay attacks
- [ ] Enable HTTPS only (redirect HTTP to HTTPS)
- [ ] Set security headers (Helmet.js):
  - `Strict-Transport-Security`
  - `X-Content-Type-Options`
  - `X-Frame-Options`
  - `Content-Security-Policy`

### **Authentication & Authorization**
- [ ] Hash passwords with bcrypt (cost factor 12+)
- [ ] Implement email verification for new accounts
- [ ] Add 2FA option (TOTP via Google Authenticator)
- [ ] Rate limit failed login attempts (5 tries per 15 min)
- [ ] Use refresh tokens (short access token lifespan)
- [ ] Implement role-based access control (RBAC):
  - `student`: Limited analyses per day (20)
  - `educator`: Higher limits (100)
  - `admin`: Full access, analytics dashboard

### **Input Validation**
- [ ] Sanitize all inputs (strip HTML, escape special chars)
- [ ] Validate prompt length (max 10,000 characters)
- [ ] Block SQL injection patterns in prompts
- [ ] Rate limit by prompt content hash (prevent abuse via slightly modified prompts)

### **Audit & Compliance**
- [ ] Log all API requests (user ID, timestamp, IP, prompt hash)
- [ ] Retain logs for 90 days (GDPR compliance if in EU)
- [ ] Implement GDPR data export/deletion endpoints
- [ ] Add "Report Abuse" button (flag malicious usage)
- [ ] Create Terms of Service & Privacy Policy pages

---

## Risk Mitigation

### **Technical Risks**

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| API key leaked in git history | High | Medium | Use git-secrets hook, scan with TruffleHog |
| OpenRouter rate limit hit | Medium | Medium | Implement caching, set per-user quotas |
| Database breach | High | Low | Encrypt at rest, use prepared statements, regular security audits |
| DDoS attack | Medium | Medium | Use Cloudflare (free DDoS protection), rate limiting |
| Cost overrun from abuse | High | Medium | Set API spending alerts ($50/day limit), implement strict rate limiting |

### **Organizational Risks**

| Risk | Impact | Mitigation |
|------|--------|------------|
| Scope creep | Project takes 12+ weeks | Stick to MVP, defer advanced features (AI model fine-tuning, mobile app) |
| Developer unavailable | Delays by 2-4 weeks | Document code thoroughly, use TypeScript for self-documenting APIs |
| Changing requirements | Re-work needed | Lock requirements early, use agile sprints with clear milestones |

---

## MVP vs. Full Feature Comparison

### **MVP (4 weeks, ~$5K dev cost)**
✅ Backend proxy for OpenRouter API  
✅ Basic JWT authentication  
✅ Rate limiting (20 req/15min)  
✅ Input sanitization  
✅ Frontend updated to call backend  
✅ Deployed on free tier (Railway + Vercel)  
❌ No analytics dashboard  
❌ No caching layer  
❌ No usage history  
❌ No admin panel  

### **Full Production (6 weeks, ~$10K dev cost)**
✅ All MVP features  
✅ Redis caching (cost reduction)  
✅ User dashboard (analysis history)  
✅ Analytics endpoints (pattern trends)  
✅ Admin panel (usage monitoring)  
✅ Email verification  
✅ Comprehensive logging  
✅ Monitoring & alerting  

**Recommendation**: Start with MVP, iterate based on user feedback.

---

## Success Metrics

### **Technical KPIs**
- **Uptime**: 99.5%+ (measured by UptimeRobot)
- **API Latency**: <2 seconds for analysis endpoint (p95)
- **Error Rate**: <1% of requests fail
- **Cache Hit Rate**: >60% (reduces OpenRouter costs)

### **User Engagement**
- **Active Users**: Track daily/weekly/monthly actives
- **Analyses per User**: Target 5+ analyses per active user
- **Session Duration**: >3 minutes on tool (indicates engagement)
- **Retention**: 40%+ of users return within 7 days

### **Cost Efficiency**
- **API Cost per Analysis**: <$0.02 (with caching)
- **Total Monthly Cost**: Stay within $150 budget for <10K users
- **Cost per User**: <$0.05/user/month

---

## Next Steps

### **Immediate Actions (This Week)**
1. **Get stakeholder approval** on architecture & budget
2. **Choose tech stack** (recommend Node.js + Supabase + Railway)
3. **Set up development environment**:
   ```bash
   git checkout -b feature/backend-api
   mkdir backend
   cd backend
   npm init -y
   npm install express dotenv cors helmet express-rate-limit
   ```

### **Week 1 Goals**
- [ ] Create `/api/analyze` proxy endpoint
- [ ] Move API key to backend `.env`
- [ ] Update frontend to call backend (instead of OpenRouter directly)
- [ ] Test locally with `http://localhost:3000`

### **Weekly Check-ins**
- Monday: Sprint planning (set week's goals)
- Friday: Sprint review (demo progress, adjust roadmap)

---

## Conclusion

Transforming this educational tool into a production-ready application requires:
- **4-6 weeks development time**
- **$5K-$10K development cost** (depending on developer level)
- **$5-$150/month operational cost** (scales with usage)

The effort is justified if:
✅ Tool will be used by >100 concurrent users  
✅ Need to track usage analytics for curriculum improvement  
✅ Want to prevent API key abuse/leakage  
✅ Plan to integrate with other YoTRT modules  

For **purely local/classroom use**, the current implementation is acceptable with minor hardening (move API key to a separate config file, add basic rate limiting client-side).

For **public deployment** or **institutional adoption**, full backend implementation is **mandatory** for security and compliance.

---

**Document Version**: 1.0  
**Last Updated**: February 5, 2026  
**Next Review**: After MVP completion (Week 4)
