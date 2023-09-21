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
  const [passed, setPassed] = useState(false);

  let result;

  const handleRunButtonClick = async () => {
    console.log('button clicked');
    console.log(code);
    const data = await fetch('http://localhost:3000/submit', {
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
    const redisData = await data.json();
    let redisState = '';
    let redisComp;
    console.log(redisData);
    const fibonacci = (n) => {
      if (n <= 1) return n;
      return fibonacci(n - 2) + fibonacci(n - 1);
    };
    fibonacci(44);
    const redisReq = await fetch(redisData.data, {
      headers: { Accept: 'application/json' },
    });
    redisComp = await redisReq.json();
    redisState = redisData.status;
    // console.log(await data.json())
    result = redisComp.data.output.split();
    result.forEach((el) => {
      console.log(el);
      if (!el.includes('failed')) {
        setPassed(true);
      } else {
        setPassed(false);
      }
    });
    // console.log(redisComp.data.output);
  };

  return (
    <div className='flex flex-col items-center justify-center m-4 w-1/2 h-3/4'>
      <div className='window w-full'>
        <div className='title-bar text-green p-2 font-inconsolata flex items-center'>
          Rise to the challenge:
        </div>
        <div className='editor_wrap '>
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
      <div className='flex justify-end w-full mt-4'>
        <button
          className='font-inconsolata text-xl rounded bg-softred hover:bg-green ml-4  p-2'
          onClick={handleRunButtonClick}
        >
          Run
        </button>
        <button
          className='font-inconsolata text-xl rounded bg-softred hover:bg-green ml-4 p-2'
          onClick={handleRunButtonClick}
        >
          Submit
        </button>
      </div>
      <div className='flex flex-row font-inconsolata justify-center items-center text-8xl'>
        {passed ? (
          <div className='text-green'>PASS</div>
        ) : (
          <div className='text-softred'>TRY HARDER</div>
        )}
      </div>
    </div>
  );
};
export default IDE;
