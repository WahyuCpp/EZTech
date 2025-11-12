@echo off
echo ================================
echo EZTech Palembang - Vercel Deployment
echo ================================
echo.

echo Step 1: Testing build locally...
echo.
call npm run build
if errorlevel 1 (
    echo.
    echo ERROR: Build failed! Please fix the errors above before deploying.
    pause
    exit /b 1
)

echo.
echo ================================
echo Build successful!
echo ================================
echo.
echo Next steps to deploy to Vercel:
echo.
echo 1. Install Vercel CLI (if not installed):
echo    npm install -g vercel
echo.
echo 2. Login to Vercel:
echo    vercel login
echo.
echo 3. Deploy to preview:
echo    vercel
echo.
echo 4. Deploy to production:
echo    vercel --prod
echo.
echo For detailed instructions, see DEPLOYMENT.md
echo.
pause
