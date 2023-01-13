const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('minimize'),
  closeWindow: () => ipcRenderer.send('closeWindow'),
  maxUnmaxWindow: () => ipcRenderer.send('maxUnmaxWindow'),
  isMaximized: () => ipcRenderer.invoke('isMaximized'),
  openMenu: (x, y) => ipcRenderer.invoke('openMenu', x, y),
});
