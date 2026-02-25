@echo off
echo ========================================
echo Logic Inverter API Server
echo Week 27 - Chain-of-Thought Manipulation
echo ========================================
echo.

cd /d "%~dp0"

echo Checking for dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting Logic Inverter API...
echo Server will run on http://localhost:3027
echo.
echo Press Ctrl+C to stop the server
echo.

node logic-inverter-server.js

pause
