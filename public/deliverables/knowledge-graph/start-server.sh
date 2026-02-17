#!/bin/bash

# Knowledge Graph Server Startup Script
# Starts the AI backend server for enhanced features

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║  🕸️  YoTRT Knowledge Graph - Server Startup              ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Check if we're in the right directory
if [ ! -f "kg-server.js" ]; then
    echo "❌ Error: kg-server.js not found"
    echo "Please run this script from: public/deliverables/knowledge-graph/"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check for .env file
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: No .env file found"
    echo "Creating .env template..."
    cat > .env << 'EOF'
# OpenRouter API Key for AI features
# Get your key at: https://openrouter.ai/
OPENROUTER_API_KEY=

# Server port (default: 3100)
KG_PORT=3100
EOF
    echo "✅ Created .env template"
    echo "📝 Please add your OPENROUTER_API_KEY to .env file"
    echo ""
fi

# Check if API key is set
if ! grep -q "OPENROUTER_API_KEY=sk-" .env 2>/dev/null; then
    echo "⚠️  OPENROUTER_API_KEY not configured in .env"
    echo "   AI features will be disabled. The server will still run with basic features."
    echo ""
fi

echo "🚀 Starting Knowledge Graph server..."
echo ""
echo "Once started:"
echo "  • Open knowledge-graph.html in your browser"
echo "  • AI search, learning paths, and advanced features will be enabled"
echo "  • Press Ctrl+C to stop the server"
echo ""
echo "───────────────────────────────────────────────────────────"
echo ""

npm start
