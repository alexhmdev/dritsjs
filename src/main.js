import './style.css';
import 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js';
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

// Override the console log,error, warn and info function to display the output in the output div
const oldLog = console.log;
const oldError = console.error;

const model = codeEditor.getModel();

console.log = function (...args) {
  args = args.map((arg) => {
    if (typeof arg === 'object') {
      return JSON.stringify(arg, undefined, 2);
    }
    return arg;
  });
  const consoleLogs = model.findMatches(
    'console.log',
    false,
    false,
    false,
    null,
    false
  );
  const lines = consoleLogs.map(({ range }) => range.startLineNumber);
  oldLog(lines);
  output.innerText += args.join(' ') + '\n';
  oldLog(args.map((arg) => typeof arg));
  oldLog(...args);
};

console.error = function (...args) {
  output.innerHTML += `<pre class="text-red-500">${args.join(' ')}</pre>`;
  oldError(...args);
};

function executeCode() {
  try {
    clearOutput();
    const code = codeEditor.getValue();
    const result = eval(code);
    console.log(result);
  } catch (error) {
    clearOutput();
    console.error(error);
  }
}

let timeout;
codeEditor.onDidChangeModelContent((event) => {
  oldLog(event);
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
