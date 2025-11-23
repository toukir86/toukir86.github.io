#!/bin/bash

# Setup Script for Academic Portfolio Website
# Mac/Linux Edition

echo ""
echo "╔════════════════════════════════════════════════════╗"
echo "║  Academic Portfolio Website - Setup Script         ║"
echo "║  Mac/Linux Edition                                 ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found:"
node --version

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi

echo "✅ npm found:"
npm --version

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    if ! command -v python &> /dev/null; then
        echo "❌ Python is not installed!"
        echo "Please download from: https://www.python.org/"
        exit 1
    fi
fi

echo "✅ Python found:"
python3 --version 2>/dev/null || python --version

echo ""
echo "Installing Node.js dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install npm dependencies"
    exit 1
fi

echo "✅ Node.js dependencies installed"

echo ""
echo "Installing Python packages..."
python3 -m pip install scholarly selenium beautifulsoup4 2>/dev/null
if [ $? -ne 0 ]; then
    echo "⚠️  pip install failed, trying python..."
    python -m pip install scholarly selenium beautifulsoup4
fi

if [ $? -ne 0 ]; then
    echo "⚠️  Could not install some Python packages"
    echo "You may need to install them manually"
    echo "Run: pip install scholarly selenium beautifulsoup4"
fi

echo "✅ Python packages installed (or installation attempted)"

echo ""
echo "Checking for .env file..."
if [ -f ".env" ]; then
    echo "✅ .env file already exists"
else
    echo "Creating .env from template..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ .env file created"
        echo ""
        echo "⚠️  IMPORTANT: Edit .env and add your Google Scholar ID:"
        echo "   1. Go to https://scholar.google.com/citations"
        echo "   2. Copy your Scholar ID from the URL"
        echo "   3. Edit .env and set: SCHOLAR_ID=your_id_here"
    else
        echo "⚠️  .env.example not found"
    fi
fi

# Make setup script executable
chmod +x setup.sh

echo ""
echo "╔════════════════════════════════════════════════════╗"
echo "║  Setup Complete!                                   ║"
echo "║                                                    ║"
echo "║  Next steps:                                       ║"
echo "║  1. Edit .env and add your Google Scholar ID      ║"
echo "║  2. Run: npm start                                ║"
echo "║  3. Open: http://localhost:3000                   ║"
echo "║                                                    ║"
echo "║  For more info, see QUICK_START.md                ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""
