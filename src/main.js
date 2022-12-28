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

const output = document.querySelector('#output');
const editorDiv = document.querySelector('#editor');
const clearButton = document.querySelector('#clearButton');

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

function clearOutput() {
  output.textContent = '';
}

// Override the console.log function to display the output in the output div
const oldLog = console.log;
const oldError = console.error;
console.log = function (...args) {
  oldLog(...args);
  output.innerText += args.join(' ') + '\n';
};

console.error = function (...args) {
  oldError(...args);
  output.innerHTML += `<pre class="text-red-500">${args.join(' ')}</pre>`;
};

function executeCode() {
  try {
    clearOutput();
    const code = codeEditor.getValue();
    console.log(eval(code));
  } catch (error) {
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

clearButton.addEventListener('click', () => {
  clearOutput();
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
