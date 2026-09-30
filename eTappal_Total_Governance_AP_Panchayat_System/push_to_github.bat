@echo off
echo =======================================================
echo   Push e-Tappal System to your GitHub Repository
echo =======================================================
echo.
set /p REPO_URL="Enter your GitHub Repository URL (e.g. https://github.com/username/etappal-ap.git): "
if "%REPO_URL%"=="" (
    echo [ERROR] Repository URL cannot be empty!
    pause
    exit /b
)

git init
git add .
git commit -m "Initial release of e-Tappal & Total Panchayat Governance AP System"
git branch -M main
git remote remove origin 2>nul
git remote add origin %REPO_URL%
echo.
echo Pushing to GitHub main branch...
git push -u origin main
echo.
echo =======================================================
echo   Done! Repository synced to GitHub.
echo =======================================================
pause
