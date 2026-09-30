# e-Tappal & Total Panchayat Governance System
### Madanapuram Gram Panchayat, Saravakota Mandal, Srikakulam District, Andhra Pradesh

A comprehensive e-Governance and DAK management platform for AP Grama Sachivalayams, featuring 26 statutory registers, Tottenham classification, Proceedings and Official Orders drafting engine, and offline IndexedDB persistence.

---

## 1. Quick Launch (Zero Setup)
Simply open `index.html` in Google Chrome or Microsoft Edge.
Click **`📲 Install App`** in the header to install as an offline desktop or mobile app.

---

## 2. Desktop App Generation (.exe / .dmg / .deb)
You can package this project into an installer using Electron:

```bash
cd desktop-electron
npm install
npm run start       # Run desktop app locally
npm run build:win   # Creates standalone Windows .exe installer in desktop-electron/dist/
```

---

## 3. Native Android Mobile App Generation (APK)
Using the pre-configured Capacitor configuration:

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "eTappal AP" in.gov.ap.panchayat.etappal --web-dir .
npx cap add android
npx cap sync
npx cap open android   # Opens Android Studio -> Build -> Generate Signed APK
```

---

## 4. Push to GitHub
1. Create a new repository on [GitHub](https://github.com/new) (e.g., `etappal-panchayat-ap`).
2. Run the included push script:
   - **Windows:** Double-click `push_to_github.bat` and paste your repository URL.
   - **Linux / Mac:** Run `./push_to_github.sh`.
3. To host it as a free, live web application:
   - In your GitHub repo, go to **Settings** -> **Pages**.
   - Under **Build and deployment**, select `Deploy from a branch` -> `main` -> `/ (root)` and click **Save**.
   - Your system will be live at `https://<username>.github.io/<repo-name>/`!

---

## 5. Ongoing Updates Management
You can update your system in two ways:
1. **Zero-Code Patch Updates:** Download update bundles (`.json`) from Gemini Spark and upload them directly via **`🔄 DB Upgrades`** in the running application.
2. **Git Version Control:** Pull or replace source files and run `git add .`, `git commit -m "Update"`, `git push`.
