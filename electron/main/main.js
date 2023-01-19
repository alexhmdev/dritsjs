// Modules to control application life and create native browser window
const { app, shell, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { electronApp, optimizer, platform } = require('@electron-toolkit/utils');
const menu = require('./menu');
const { ipcMain } = require('electron/main');

/**
 * @type {BrowserWindow}
 */
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    darkTheme: true,

    ...(platform.isLinux
      ? {
          icon: path.join(__dirname, 'public/logoRED.png'),
        }
      : { icon: 'public/logoRED.png' }),
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  for (const ev of ['maximize', 'unmaximize', 'minimize', 'restore']) {
    mainWindow.on(ev, () => {
      console.log(ev);
      mainWindow.webContents.send('windowGeometryChange', {
        isMaximized: mainWindow.isMaximized(),
      });
    });
  }

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  // mainWindow.loadURL('http://localhost:5173/');
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.dritsjs');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('border', (border) => {
  console.log('changing border');
  mainWindow.webContents.send('border', border);
});

ipcMain.handle('isMaximized', () => mainWindow.isMaximized());

ipcMain.on('minimize', () => {
  mainWindow.minimize();
});
ipcMain.on('maxUnmaxWindow', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});
ipcMain.on('closeWindow', () => {
  mainWindow.close();
});
ipcMain.on('openMenu', (event, ...args) => {
  const [x, y] = args;
  menu.popup({
    window: mainWindow,
    x,
    y,
  });
});
