# RABHAN GitHub Pages Deployment Script
# Replace YOUR_GITHUB_USERNAME with your actual GitHub username

Write-Host "🌞 RABHAN - Deploying to GitHub Pages..." -ForegroundColor Green

# Step 1: Add remote repository (replace YOUR_GITHUB_USERNAME)
$GITHUB_USERNAME = "YOUR_GITHUB_USERNAME"
$REPO_URL = "https://github.com/$GITHUB_USERNAME/rabhan-solar-platform.git"

Write-Host "📡 Adding remote repository..." -ForegroundColor Yellow
git remote add origin $REPO_URL

# Step 2: Verify remote was added
Write-Host "🔍 Verifying remote repository..." -ForegroundColor Yellow
git remote -v

# Step 3: Push to main branch (GitHub Pages workflow expects 'main' branch)
Write-Host "🚀 Creating main branch and pushing code..." -ForegroundColor Yellow
git branch -M main
git push -u origin main

Write-Host "✅ Code pushed to GitHub!" -ForegroundColor Green
Write-Host "🌐 Your repository: https://github.com/$GITHUB_USERNAME/rabhan-solar-platform" -ForegroundColor Cyan

Write-Host "" 
Write-Host "📋 Next Steps:" -ForegroundColor Magenta
Write-Host "1. Go to your GitHub repository" -ForegroundColor White
Write-Host "2. Click 'Settings' tab" -ForegroundColor White
Write-Host "3. Scroll down to 'Pages' section" -ForegroundColor White
Write-Host "4. Source: Select 'GitHub Actions'" -ForegroundColor White
Write-Host "5. The deployment will start automatically!" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Your website will be available at:" -ForegroundColor Green
Write-Host "https://$GITHUB_USERNAME.github.io/rabhan-solar-platform/" -ForegroundColor Cyan
