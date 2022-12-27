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

const codeEditor = editor.create(document.getElementById('editor'), {
  value: '',
  theme: 'vs-dark',
  language: 'javascript',
  automaticLayout: true,
  wordWrap: 'on',
});

codeEditor.onDidChangeModelContent(() => {
  console.log(codeEditor.getValue());
});
