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

  const handleRunButtonClick = async () => {
    console.log('button clicked')
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
      }
    });
    const redisData = await data.json()
    let redisState ='';
    let redisComp;
    console.log(redisData)
    const fibonacci = (n) => {
      if (n<=1)return n;
      return fibonacci(n-2) + fibonacci(n-1)
    }
    fibonacci(44)
     const redisReq = await fetch(redisData.data, {
      headers: {'Accept': 'application/json'}
    })
    redisComp =  await redisReq.json()
    redisState = redisData.status
    // console.log(await data.json())
  

    console.log(redisComp)
   
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
      <button onClick={() => console.log("Test button clicked")}>Test</button>
    </div>
  );
};
export default IDE;
