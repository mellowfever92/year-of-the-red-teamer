#!/bin/bash

echo "========================================"
echo "Logic Inverter API Server"
echo "Week 27 - Chain-of-Thought Manipulation"
echo "========================================"
echo ""

cd "$(dirname "$0")"

echo "Checking for dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

echo "Starting Logic Inverter API..."
echo "Server will run on http://localhost:3027"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

node logic-inverter-server.js
