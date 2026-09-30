const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1366,
    height: 850,
    title: 'e-Tappal & Total Panchayat Governance System - Madanapuram GP',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  // Load the standalone offline HTML file
  win.loadFile(path.join(__dirname, '../index.html'));
  win.removeMenu(); // Clean desktop window without browser URL bars
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
