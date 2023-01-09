const { contextBridge, BrowserWindow } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
});

function createNewTab() {
  const newWindow = new BrowserWindow({ width: 800, height: 600 });
  // newWindow.loadFile('index.html');
  newWindow.loadURL('http://localhost:5173/');
}
