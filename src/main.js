import './style.css';
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

Split({
  columnGutters: [
    {
      track: 1,
      element: document.querySelector('.gutter-col-1'),
    },
  ],
});

const outputDiv = document.querySelector('#output');
const editorDiv = document.querySelector('#editor');
const codeEditor = editor.create(editorDiv, {
  value: `const HelloWorld = () => {
    console.log('Hello world')
  }
HelloWorld()`,
  theme: 'vs-dark',
  fontFamily: "'Fira Code', 'Consolas'",
  fontLigatures: true,
  language: 'javascript',
  automaticLayout: true,
  wordWrap: 'on',
});

// Override the console.log function to display the output in the output div
const oldLog = console.log;
const oldError = console.error;
console.log = function (...args) {
  oldLog(...args);
  outputDiv.innerHTML = `<p>${args.join(' ')}</p>`;
};

console.error = function (...args) {
  oldError(...args);
  outputDiv.innerHTML = `<p class="text-red-500">${args.join(' ')}</p>`;
};

function executeCode() {
  try {
    const code = codeEditor.getValue();
    eval(code);
  } catch (error) {
    console.error(error);
  }
}

let timeout;
codeEditor.onDidChangeModelContent(() => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    executeCode();
  }, 300);
});

function clearOutput() {}

executeCode();
