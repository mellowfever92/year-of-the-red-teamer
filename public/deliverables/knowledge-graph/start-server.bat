@echo off
REM Knowledge Graph Server Startup Script (Windows)
REM Starts the AI backend server for enhanced features

echo ================================================================
echo   🕸️  YoTRT Knowledge Graph - Server Startup
echo ================================================================
echo.

REM Check if we're in the right directory
if not exist "kg-server.js" (
    echo ❌ Error: kg-server.js not found
    echo Please run this script from: public\deliverables\knowledge-graph\
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    echo.
)

REM Check for .env file
if not exist ".env" (
    echo ⚠️  Warning: No .env file found
    echo Creating .env template...
    (
        echo # OpenRouter API Key for AI features
        echo # Get your key at: https://openrouter.ai/
        echo OPENROUTER_API_KEY=
        echo.
        echo # Server port ^(default: 3100^)
        echo KG_PORT=3100
    ) > .env
    echo ✅ Created .env template
    echo 📝 Please add your OPENROUTER_API_KEY to .env file
    echo.
)

REM Check if API key is set
findstr /C:"OPENROUTER_API_KEY=sk-" .env >nul 2>&1
if errorlevel 1 (
    echo ⚠️  OPENROUTER_API_KEY not configured in .env
    echo    AI features will be disabled. The server will still run with basic features.
    echo.
)

echo 🚀 Starting Knowledge Graph server...
echo.
echo Once started:
echo   • Open knowledge-graph.html in your browser
echo   • AI search, learning paths, and advanced features will be enabled
echo   • Press Ctrl+C to stop the server
echo.
echo ----------------------------------------------------------------
echo.

call npm start
