import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('minimize'),
  closeWindow: () => ipcRenderer.send('closeWindow'),
  maxUnmaxWindow: () => ipcRenderer.send('maxUnmaxWindow'),
  isMaximized: () => ipcRenderer.invoke('isMaximized'),
  openMenu: (x, y) => ipcRenderer.send('openMenu', x, y),
  ...electronAPI,
});
