const windowsButtons = document.querySelectorAll('.windows-buttons');

if (navigator.userAgent.toLowerCase().includes('electron')) {
  windowsButtons.forEach((element) => {
    element.classList.remove('hidden');
    element.classList.add('flex');
  });
}
