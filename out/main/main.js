"use strict";
const { app, shell, BrowserWindow, Menu } = require("electron");
const path = require("path");
const { electronApp, optimizer } = require("@electron-toolkit/utils");
const menu = require("./menu");
const { ipcMain } = require("electron/main");
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    darkTheme: true,
    ...process.platform === "linux" ? {
      icon: path.join(__dirname, "../resources/logoRED.png")
    } : { icon: "../resources/logoRED.png" },
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      nodeIntegration: true
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.on("maximize", () => {
    console.log("maximizing");
    ipcMain.emit("maximizing");
  });
  mainWindow.on("unmaximize", () => {
    console.log("unmaximizing");
    ipcMain.emit("unmaximizing");
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });
  mainWindow.loadURL("http://localhost:5173/");
}
app.whenReady().then(() => {
  electronApp.setAppUserModelId("com.dritsjs");
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });
  createWindow();
  app.on("activate", function() {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
ipcMain.handle("isMaximized", () => mainWindow.isMaximized());
ipcMain.on("minimize", () => {
  mainWindow.minimize();
});
ipcMain.on("maxUnmaxWindow", () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});
ipcMain.on("closeWindow", () => {
  mainWindow.close();
});
ipcMain.on("openMenu", (event, ...args) => {
  const [x, y] = args;
  menu.popup({
    window: mainWindow,
    x,
    y
  });
});
