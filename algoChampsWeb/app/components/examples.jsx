import jsonData from '../../../algo-bank.json';

const Examples = () => {
  const { name, prompt, example } = jsonData[0];
  const testCases = jsonData[0]['test cases'];

  return (
    <div className='w-1/2 m-2 h-auto font-inconsolata'>
      <div className='border-2 rounded flex flex-col p-2 text-white border-softred shadow-lg shadow-softred '>
        <div className='mb-4 text-green'>{name}</div>
        <div className='mb-8'>{prompt}</div>
        <div className='mb-8'>
          Examples:
          {example.map((el, i) => (
            <div className='p-2' key={i}>
              {el}
            </div>
          ))}
        </div>
        <div>
          Test Cases:
          {testCases.map((el, i) => (
            <div className='p-2' key={i}>
              {el}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Examples;
