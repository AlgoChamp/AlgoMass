'use client';
import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

import '../prism-vsc-dark-plus.css';
import '../editor.css';

const IDE = () => {
  const initialCodeSnippet = ``;

  const [code, setCode] = useState(initialCodeSnippet);

  const handleRunButtonClick = () => {
    console.log(code);
    fetch('https://localhost:3000/submit', {
      method: 'POST',
      body: JSON.stringify({
        src: code,
        lang: 'js',
        timeout: 5000,
        stdin: 'a',
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  };

  return (
    <div className='flex flex-col items-center justify-center w-1/2 h-3/4'>
      <div className='window'>
        <div className='title-bar text-green p-2 font-inconsolata flex items-center'>
          Rise to the challenge:
        </div>
        <div className='editor_wrap'>
          <Editor
            value={code}
            onValueChange={(newCode) => {
              setCode(newCode);
            }}
            highlight={(code) => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 18,
            }}
          />
        </div>
      </div>
      <button
        className='font-inconsolata w-1/5 text-xl rounded bg-softred hover:bg-green'
        onClick={handleRunButtonClick}
      >
        Run
      </button>
    </div>
  );
};
export default IDE;
