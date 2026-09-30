#!/bin/bash
echo "======================================================="
echo "  Push e-Tappal System to your GitHub Repository"
echo "======================================================="
echo ""
read -p "Enter your GitHub Repository URL (e.g. https://github.com/username/etappal-ap.git): " REPO_URL
if [ -z "$REPO_URL" ]; then
    echo "[ERROR] Repository URL cannot be empty!"
    exit 1
fi

git init
git add .
git commit -m "Initial release of e-Tappal & Total Panchayat Governance AP System"
git branch -M main
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"
echo ""
echo "Pushing to GitHub main branch..."
git push -u origin main
echo ""
echo "======================================================="
echo "  Done! Repository synced to GitHub."
echo "======================================================="
