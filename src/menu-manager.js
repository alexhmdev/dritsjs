const menuButton = document.getElementById('menu-btn');
const minimizeButton = document.getElementById('minimize-btn');
const maxUnmaxButton = document.getElementById('max-unmax-btn');
const closeButton = document.getElementById('close-btn');

menuButton.addEventListener('click', (e) => {
  // Opens menu at (x,y) coordinates of mouse click on the hamburger icon.
  window.electronAPI.openMenu(e.x, e.y);
});

minimizeButton.addEventListener('click', (e) => {
  window.electronAPI.minimize();
});

maxUnmaxButton.addEventListener('click', async (e) => {
  window.electronAPI.maxUnmaxWindow();
  const maximized = await window.electronAPI.isMaximized();
  console.log(maximized);
  // Change the middle maximize-unmaximize icons.
  if (maximized) {
    maxUnmaxButton.classList.remove('maximize-icon');
    maxUnmaxButton.classList.add('unmaximize-icon');
  } else {
    maxUnmaxButton.classList.remove('unmaximize-icon');
    maxUnmaxButton.classList.add('maximize-icon');
  }
});

closeButton.addEventListener('click', (e) => {
  window.electronAPI.closeWindow();
});

window.electronAPI.ipcRenderer.on(
  'windowGeometryChange',
  (_, { isMaximized }) => {
    if (isMaximized) {
      maxUnmaxButton.classList.remove('maximize-icon');
      maxUnmaxButton.classList.add('unmaximize-icon');
    } else {
      maxUnmaxButton.classList.remove('unmaximize-icon');
      maxUnmaxButton.classList.add('maximize-icon');
    }
  }
);
