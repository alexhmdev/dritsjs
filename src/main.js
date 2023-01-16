import './style.css';
import 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js';
import './menu-manager.js';
import './verify-platform.js';
import { editor } from 'monaco-editor';
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import Split from 'split-grid';

window.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'javascript') {
      return new JsWorker();
    }
  },
};
/* load monaco */

import('./themes/dritsjs.json').then((data) => {
  editor.defineTheme('dritsjs', data);
  editor.setTheme('dritsjs');
});

const output = document.querySelector('#output');
const editorDiv = document.querySelector('#editor');

const codeEditor = editor.create(editorDiv, {
  value: `const HelloWorld = () => {
    console.log('Hello world')
  }
HelloWorld()`,
  theme: 'vs-dark',
  fontFamily: '"Fira Code", "Consolas", monospace',
  fontLigatures: true,
  language: 'javascript',
  wordWrap: 'on',
  automaticLayout: true,
  scrollBeyondLastLine: false,
  roundedSelection: false,
  autoDetectHighContrast: false,
  minimap: {
    enabled: false,
  },
  scrollbar: {
    verticalScrollbarSize: 4,
  },
});

Split({
  columnGutters: [
    {
      track: 1,
      element: document.querySelector('.gutter-col'),
    },
  ],
  columnCursor: 'ew-resize',
});

function clearOutput() {
  output.textContent = '';
}

// Override the console log and error function to display the output in the output div
const oldLog = console.log;
const oldError = console.error;

console.log = function (...args) {
  args = args.map((arg) => {
    if (typeof arg === 'object' && arg) {
      return JSON.stringify(arg, undefined, 2);
    }
    return arg;
  });
  output.innerText += args.join(' ') + '\n';
  oldLog(args.map((arg) => typeof arg));
  oldLog(...args);
};

console.error = function (...args) {
  output.innerHTML += `<pre class="text-red-500">${args.join(' ')}</pre>`;
  oldError(...args);
};

async function executeCode() {
  try {
    clearOutput();
    let code = codeEditor.getValue();
    const encodedJs = encodeURIComponent(code);
    const dataUri = 'data:text/javascript;charset=utf-8,' + encodedJs;
    await import(/* @vite-ignore */ dataUri);
  } catch (error) {
    clearOutput();
    if (error instanceof RangeError) {
      console.error('Error: Infinite loop detected');
    } else {
      console.error(error);
      throw error;
    }
  }
}

let timeout;
codeEditor.onDidChangeModelContent((event) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    executeCode();
  }, 300);
});

function printMessage() {
  console.log('\n\n\n\n\n\n\n\n', '     /         / \\        Welcome');
  console.log('     /         /   \\       To');
  console.log('    /         /     \\      DritsJs');
  console.log('   /         /       \\');
  console.log('   \\        /        /     ⌨️⚡');
  console.log('    \\      /        /');
  console.log('     \\    /        /');
  console.log('      \\  /        /', '\n');
  console.log('      Type and write code to start...');
}

printMessage();

window.electronAPI.ipcRenderer.on('border', (border) => {
  console.log(border);
  console.log('Changing  border');
});
