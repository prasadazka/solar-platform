@echo off
echo 🌞 RABHAN - Deploying to GitHub Pages...
echo.

cd /d "E:\BNPL_Solar"

echo 📡 Adding remote repository...
git remote add origin https://github.com/prasad25525/rabhan-solar-platform.git

echo 🔍 Verifying remote repository...
git remote -v

echo 🚀 Pushing code to GitHub...
git push -u origin main

echo.
echo ✅ RABHAN deployed successfully!
echo 🌐 Repository: https://github.com/prasad25525/rabhan-solar-platform
echo 🌐 Live Site: https://prasad25525.github.io/rabhan-solar-platform/
echo.
echo 📋 Next: Enable GitHub Pages in repository Settings → Pages → GitHub Actions
pause
