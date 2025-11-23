@echo off
REM Setup Script for Academic Portfolio Website
REM Run this file to automatically set up the project

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║  Academic Portfolio Website - Setup Script         ║
echo ║  Windows Edition                                   ║
echo ╚════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed!
    echo Please download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found: 
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed!
    pause
    exit /b 1
)

echo ✅ npm found: 
npm --version

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Python is not found in PATH
    echo Trying python3...
    python3 --version >nul 2>&1
    if errorlevel 1 (
        echo ❌ Python is not installed!
        echo Please download from: https://www.python.org/
        pause
        exit /b 1
    )
)

echo ✅ Python found: 
python --version 2>nul || python3 --version

echo.
echo Installing Node.js dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install npm dependencies
    pause
    exit /b 1
)

echo ✅ Node.js dependencies installed

echo.
echo Installing Python packages...
python -m pip install scholarly selenium beautifulsoup4 2>nul
if errorlevel 1 (
    echo ⚠️  pip install failed, trying python3...
    python3 -m pip install scholarly selenium beautifulsoup4
)

if errorlevel 1 (
    echo ⚠️  Could not install some Python packages
    echo You may need to install them manually
    echo Run: pip install scholarly selenium beautifulsoup4
)

echo ✅ Python packages installed (or installation attempted)

echo.
echo Checking for .env file...
if exist ".env" (
    echo ✅ .env file already exists
) else (
    echo Creating .env from template...
    if exist ".env.example" (
        copy ".env.example" ".env"
        echo ✅ .env file created
        echo.
        echo ⚠️  IMPORTANT: Edit .env and add your Google Scholar ID:
        echo   1. Go to https://scholar.google.com/citations
        echo   2. Copy your Scholar ID from the URL
        echo   3. Edit .env and set: SCHOLAR_ID=your_id_here
    ) else (
        echo ⚠️  .env.example not found
    )
)

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║  Setup Complete!                                   ║
echo ║                                                    ║
echo ║  Next steps:                                       ║
echo ║  1. Edit .env and add your Google Scholar ID      ║
echo ║  2. Run: npm start                                ║
echo ║  3. Open: http://localhost:3000                   ║
echo ║                                                    ║
echo ║  For more info, see QUICK_START.md                ║
echo ╚════════════════════════════════════════════════════╝
echo.

pause
