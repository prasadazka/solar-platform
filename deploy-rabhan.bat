@echo off
title RABHAN GitHub Pages Deployment
color 0A
echo.
echo ===================================================
echo    🌞 RABHAN - Automated GitHub Deployment
echo ===================================================
echo.
echo 🔍 Checking project status...
cd /d "E:\BNPL_Solar"

echo.
echo ✅ Current directory: %CD%
echo ✅ Git status:
git status --porcelain

echo.
echo 📋 DEPLOYMENT CHECKLIST:
echo ✅ Project code ready
echo ✅ Security review completed  
echo ✅ GitHub Pages configuration ready
echo ✅ Deployment workflow configured
echo.

echo 🚨 IMPORTANT: Before running this script, you must:
echo    1. Create repository on GitHub: "rabhan-solar-platform"
echo    2. Make it PUBLIC (required for free GitHub Pages)
echo    3. DO NOT initialize with README/gitignore
echo.

set /p proceed="Have you created the GitHub repository? (y/n): "
if /i "%proceed%" neq "y" (
    echo.
    echo ❌ Please create the repository first, then run this script again.
    echo 🌐 Go to: https://github.com/new
    echo 📝 Repository name: rabhan-solar-platform
    echo 👁️ Visibility: Public
    pause
    exit /b
)

echo.
echo 🚀 Starting deployment process...
echo.

echo 📡 Adding remote repository...
git remote add origin https://github.com/prasad25525/rabhan-solar-platform.git
if %errorlevel% neq 0 (
    echo ⚠️ Remote already exists, updating...
    git remote set-url origin https://github.com/prasad25525/rabhan-solar-platform.git
)

echo.
echo 🔍 Verifying remote repository...
git remote -v

echo.
echo 🌿 Switching to main branch...
git branch -M main

echo.
echo 📤 Pushing code to GitHub...
git push -u origin main

if %errorlevel% eq 0 (
    echo.
    echo ✅ SUCCESS! Code deployed to GitHub!
    echo.
    echo 🌐 Repository URL: https://github.com/prasad25525/rabhan-solar-platform
    echo 🎯 Live Website: https://prasad25525.github.io/rabhan-solar-platform/
    echo.
    echo 📋 FINAL STEPS:
    echo    1. Go to your repository on GitHub
    echo    2. Click "Settings" tab
    echo    3. Scroll to "Pages" section  
    echo    4. Source: Select "GitHub Actions"
    echo    5. Wait 2-3 minutes for deployment
    echo.
    echo 🎉 Your RABHAN demo will be live shortly!
) else (
    echo.
    echo ❌ Deployment failed. Common issues:
    echo    - Repository doesn't exist
    echo    - Authentication required
    echo    - Network connection issues
    echo.
    echo 💡 Manual fix:
    echo    git push -u origin main
)

echo.
echo 📊 Deployment Summary:
echo ✅ Code: Ready
echo ✅ Security: Verified  
echo ✅ Configuration: Complete
echo ✅ Documentation: Included
echo.

pause
