# Deployment Guide - YoTRT AI Backend

This guide covers deploying the optional AI backend to production environments.

## Pre-Deployment Checklist

- [ ] Backend tested locally
- [ ] Environment variables documented
- [ ] CORS origins configured for production URLs
- [ ] OpenRouter API key obtained
- [ ] Deployment platform selected
- [ ] Monitoring strategy defined

## Deployment Options

### Option 1: Railway (Recommended for Beginners)

Railway offers simple deployment with generous free tier.

**Steps:**

1. **Create Railway Account**
   - Visit [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Set root directory to `/backend`

3. **Configure Environment Variables**
   ```
   OPENROUTER_API_KEY=sk-or-v1-your-key-here
   OPENROUTER_MODEL=x-ai/grok-2-1212
   PORT=3000
   NODE_ENV=production
   ALLOWED_ORIGINS=https://your-frontend-domain.com
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=20
   ```

4. **Deploy**
   - Railway auto-detects Node.js
   - Builds and deploys automatically
   - Provides a public URL: `https://your-app.railway.app`

5. **Update Frontend**
   ```javascript
   IntelligenceLayer.configure({
     proxyEndpoint: 'https://your-app.railway.app'
   });
   ```

**Cost**: Free tier → $5/month after limits

---

### Option 2: Render

Render offers free tier with automatic HTTPS and simple deploys.

**Steps:**

1. **Create Render Account**
   - Visit [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your repository
   - Configure:
     - Name: `yotrt-ai-backend`
     - Environment: `Node`
     - Build Command: `cd backend && npm install`
     - Start Command: `cd backend && npm start`
     - Branch: `main`

3. **Set Environment Variables**
   Add in Render dashboard:
   ```
   OPENROUTER_API_KEY=sk-or-v1-your-key-here
   OPENROUTER_MODEL=x-ai/grok-2-1212
   NODE_ENV=production
   ALLOWED_ORIGINS=https://your-frontend.com
   ```

4. **Deploy**
   - Render auto-deploys on git push
   - Provides URL: `https://yotrt-ai-backend.onrender.com`

**Cost**: Free tier (sleeps after 15min inactivity) → $7/month always-on

---

### Option 3: Vercel (Serverless)

Vercel offers serverless deployment with edge functions.

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Create `vercel.json`**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "backend/src/server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "backend/src/server.js"
       }
     ],
     "env": {
       "NODE_ENV": "production"
     }
   }
   ```

3. **Deploy**
   ```bash
   cd backend
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add OPENROUTER_API_KEY
   vercel env add ALLOWED_ORIGINS
   ```

**Cost**: Free tier → $20/month Pro

---

### Option 4: Self-Hosted (VPS)

For complete control, deploy to your own server.

**Steps:**

1. **Provision Server**
   - DigitalOcean Droplet ($5/month)
   - Linode Nanode ($5/month)
   - AWS EC2 t3.micro ($8/month)

2. **Install Node.js**
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone Repository**
   ```bash
   git clone https://github.com/mellowfever92/year-of-the-red-teamer.git
   cd year-of-the-red-teamer/backend
   npm install
   ```

4. **Configure Environment**
   ```bash
   cp .env.example .env
   nano .env  # Edit with your values
   ```

5. **Setup Process Manager**
   ```bash
   npm install -g pm2
   pm2 start src/server.js --name yotrt-backend
   pm2 save
   pm2 startup  # Follow instructions
   ```

6. **Configure Reverse Proxy (Nginx)**
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **Enable HTTPS**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d api.yourdomain.com
   ```

**Cost**: $5-10/month

---

## Post-Deployment Configuration

### 1. Update Frontend Configuration

Modify all tools to use production backend:

```javascript
// In your tool's HTML/JS
IntelligenceLayer.configure({
  proxyEndpoint: 'https://your-backend-url.com',
  currentStrategy: 'proxy'
});
```

### 2. Test Production Deployment

```bash
# Health check
curl https://your-backend-url.com/health

# API info
curl https://your-backend-url.com/api

# Test chat endpoint
curl -X POST https://your-backend-url.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "test"}]
  }'
```

### 3. Configure CORS

Update ALLOWED_ORIGINS for production:

```env
ALLOWED_ORIGINS=https://mellowfever92.github.io,https://your-custom-domain.com
```

### 4. Setup Monitoring

**UptimeRobot (Free)**
- Add health check monitor
- Alert on downtime
- Track response times

**Sentry (Optional)**
```bash
npm install @sentry/node
```

Add to `server.js`:
```javascript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: process.env.NODE_ENV
});
```

### 5. Enable Rate Limiting Alerts

Create script to monitor API costs:

```bash
# Monitor OpenRouter usage
curl https://openrouter.ai/api/v1/auth/key \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

## Security Hardening

### Production Checklist

- [ ] HTTPS enabled
- [ ] API keys in environment variables only
- [ ] CORS whitelist configured
- [ ] Rate limiting active
- [ ] Security headers enabled (Helmet)
- [ ] Input validation active
- [ ] Error messages sanitized (no stack traces)
- [ ] Logging configured
- [ ] Monitoring active

### Environment Variables Security

**Railway/Render:**
- Variables stored in platform dashboard
- Encrypted at rest
- Not visible in logs

**Self-Hosted:**
```bash
# Secure .env file
chmod 600 .env
chown youruser:youruser .env
```

### API Key Rotation

Rotate keys every 90 days:

1. Generate new OpenRouter API key
2. Update environment variable
3. Restart service
4. Revoke old key after verification

## Troubleshooting

### Backend Not Responding

```bash
# Check logs (Railway)
railway logs

# Check logs (Render)
# View in dashboard

# Check logs (PM2)
pm2 logs yotrt-backend

# Check logs (Docker)
docker logs container-name
```

### CORS Errors

Verify ALLOWED_ORIGINS includes your frontend domain:

```javascript
// Should include protocol and domain
ALLOWED_ORIGINS=https://mellowfever92.github.io,https://yourdomain.com
```

### Rate Limit Issues

Adjust limits in environment:

```env
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=50   # Increase to 50
```

### High Costs

Monitor and optimize:

```bash
# Check token usage per request
# Review logs for patterns
# Consider caching frequent requests
# Implement request deduplication
```

## Scaling Strategy

### Phase 1: Single Instance (0-1K users)
- Current setup sufficient
- Monitor performance
- Track costs

### Phase 2: Horizontal Scaling (1K-10K users)
- Deploy multiple instances
- Add load balancer
- Implement Redis for rate limiting

### Phase 3: Caching Layer (10K+ users)
- Add Redis caching
- Cache AI responses by prompt hash
- Reduce API costs 60-80%

### Phase 4: Multi-Region (Global)
- Deploy to multiple regions
- GeoDNS routing
- Regional failover

## Rollback Procedure

If deployment fails:

**Railway/Render:**
1. Go to Deployments
2. Select previous successful deployment
3. Click "Redeploy"

**Vercel:**
```bash
vercel rollback
```

**Self-Hosted:**
```bash
git log  # Find previous commit
git checkout <commit-hash>
pm2 restart yotrt-backend
```

## Continuous Deployment

### GitHub Actions Example

```yaml
# .github/workflows/deploy-backend.yml
name: Deploy Backend

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway link ${{ secrets.RAILWAY_PROJECT_ID }}
          railway up
```

## Cost Optimization

### Tips for Reducing Costs

1. **Response Caching**
   - Cache identical requests
   - Use Redis with 7-day TTL
   - Save 60-80% on API costs

2. **Model Selection**
   - Use cheaper models for simple tasks
   - Reserve expensive models for complex analysis

3. **Token Limits**
   - Set aggressive max_tokens limits
   - Truncate long prompts

4. **Rate Limiting**
   - Prevent abuse
   - Set per-user quotas

## Support & Resources

- **Railway Docs**: docs.railway.app
- **Render Docs**: render.com/docs
- **Vercel Docs**: vercel.com/docs
- **OpenRouter Docs**: openrouter.ai/docs

## Next Steps

After successful deployment:
1. Update all tools to use production backend
2. Remove any hardcoded API keys from frontend
3. Test all AI features end-to-end
4. Monitor costs and performance
5. Document backend URL for team
