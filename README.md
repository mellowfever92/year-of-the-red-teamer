# Year of the Red Teamer

A modular, extensible collection of red teaming tools and educational resources, featuring a livestream production control interface built with Vite + React.

## 🎯 Overview

This repository contains weekly red teaming challenges, tools, and demonstrations for the "Year of the Red Teamer" project. Each week focuses on different security concepts, attack techniques, and defensive strategies.

## 🚀 Features

### Week Selector Production Kit
- **Timer & Segment Tracker** - Auto-transitions with 5-min and 2-min warnings
- **Conceptual Script Panel** - Bullet points with durations and checkoff functionality
- **Demo Checklist** - Pre-production checklist and 6-step demo flow tracker
- **Challenge & Community** - Challenge details, Discord links, and next week preview
- **Modular Architecture** - Easy to extend with new weeks
- **Dark Theme** - Eye-friendly during streaming
- **Offline-ready** - No external APIs or storage

### 🤖 Optional AI Backend Infrastructure (NEW)

An **optional** backend proxy server that provides secure AI capabilities for tools that need them:

- **Security-First**: API keys stay server-side, never exposed to clients
- **Rate Limiting**: Prevents abuse with configurable throttling
- **Generalized Design**: Works with any YoTRT tool, not just one specific feature
- **Optional Usage**: Tools work standalone; backend enhances when available
- **Multiple Endpoints**: Chat, completion, and specialized analysis endpoints

#### Quick Start - AI Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your OpenRouter API key

# Start server
npm run dev
```

See [`backend/README.md`](backend/README.md) for detailed setup and [`AI_INTEGRATION_GUIDE.md`](AI_INTEGRATION_GUIDE.md) for integrating AI into your tools.

## 📚 Documentation

- **[AI Integration Guide](AI_INTEGRATION_GUIDE.md)** - Add optional AI features to any tool
- **[Architecture](ARCHITECTURE.md)** - System design and component overview
- **[Deployment](DEPLOYMENT.md)** - Production deployment instructions
- **[Backend README](backend/README.md)** - Backend setup and API reference

## 🛠️ Quick Start - Frontend

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open the app in your browser (usually http://localhost:5173)

## 📖 Usage

1. Select your week from the dropdown
2. Open the app 5 minutes before going live
3. Verify all pre-production checklist items
4. Click **Start Timer** when stream begins
5. Follow segment instructions and check off items
6. Timer auto-warns at 5 and 2 minutes remaining

## 🔧 Extending with New Weeks

The app supports loading content from HTML files, making it easy to manage content without touching React code.

### Option 1: HTML Content (Recommended)

1. Create a new HTML file in `public/weeks/` (e.g., `week-10.html`)
2. Add the week configuration to `src/config/weeksConfig.js`:

```javascript
export const weeksConfig = {
  10: {
    weekNum: 10,
    title: "Your New Topic",
    date: "March 1, 2026",
    htmlFile: "/weeks/week-10.html",
    segments: [...],
    conceptualScript: {...},
    preProductionChecklist: [...],
    demoSteps: [...],
    challenge: {...},
    community: {...}
  }
};
```

3. Click the **"📄 HTML View"** button to see your HTML content alongside the timer

### Option 2: Structured React Components

Continue using the existing approach by editing `src/config/weeksConfig.js` with all data inline.

### HTML Template Reference

See `public/weeks/week-2.html` and `week-3.html` for examples. Your HTML files should include:
- Inline styles (they're scoped to the viewer)
- All content you want to display during the stream
- Links to external resources
- Code examples, tables, highlights, etc.

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

## 💻 Tech Stack

### Frontend
- **Vite** - Fast build tool
- **React** - UI framework
- **CSS3** - Styling (no external dependencies)

### Backend (Optional)
- **Node.js + Express** - Backend server
- **OpenRouter** - AI API aggregation
- **Helmet** - Security headers
- **Rate Limiting** - Abuse prevention

## 🎨 Project Structure

```
year-of-the-red-teamer/
├── backend/              # Optional AI backend infrastructure
│   ├── src/
│   │   ├── config/       # Configuration management
│   │   ├── middleware/   # Rate limiting, validation
│   │   ├── routes/       # API endpoints
│   │   ├── utils/        # Helper functions
│   │   └── server.js     # Main server file
│   ├── .env.example      # Environment template
│   ├── package.json      # Backend dependencies
│   └── README.md         # Backend documentation
├── public/
│   ├── weeks/            # Weekly HTML content files
│   └── deliverables/     # Challenge deliverables & docs
├── src/
│   ├── components/       # React components
│   ├── config/           # Week configurations
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── AI_INTEGRATION_GUIDE.md  # Guide for adding AI to tools
├── ARCHITECTURE.md          # System architecture docs
├── DEPLOYMENT.md            # Deployment instructions
└── README.md               # This file
```

## 🔐 Security Notes

### API Keys & Secrets
- **Never commit API keys** to the repository
- Use the optional backend to keep keys secure
- See `.gitignore` for excluded files
- Backend `.env` file contains all secrets

### Frontend Security
- No secrets in client-side code
- Tools can work standalone or with backend
- Optional "Intelligence Layer" provides secure AI access

## 🚀 Deployment Options

### Frontend
- **GitHub Pages** - Free static hosting
- **Vercel** - Automatic deployments from git
- **Netlify** - CDN with instant deploys

### Backend (Optional)
- **Railway** - Simple deployment ($5/month)
- **Render** - Free tier with auto-sleep
- **Vercel** - Serverless functions
- **Self-hosted** - VPS deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 📈 Roadmap

- [x] Week selector frontend
- [x] HTML-based content system
- [x] Optional AI backend infrastructure
- [ ] Authentication system (optional)
- [ ] Usage analytics (optional)
- [ ] Response caching (optional)
- [ ] Additional AI providers (optional)

## 🤝 Contributing

Contributions are welcome! Please ensure:
- No secrets in commits
- Follow existing code style
- Test changes locally
- Document new features

## 📝 License

MIT

## 🔗 Related Projects

- [PROJECT_EXPANSION_PLAN.md](public/deliverables/week-9/PROJECT_EXPANSION_PLAN.md) - Detailed expansion roadmap
- [Week 9 - AI Injection Analyzer](public/weeks/week-9.html) - Prompt injection testing tool

## 📞 Support

For questions about:
- **Frontend**: Check React/Vite documentation
- **Backend**: See [backend/README.md](backend/README.md)
- **AI Integration**: Read [AI_INTEGRATION_GUIDE.md](AI_INTEGRATION_GUIDE.md)
- **Deployment**: Review [DEPLOYMENT.md](DEPLOYMENT.md)
