// require('./config/rabbitmq');
const fs = require('fs');
const path = require('path');
const { client } = require('./config/redis');
const { deleteFolder, execute } = require('./utils');
const amqp = require('amqplib');

const QUEUE_NAME = 'judge';

// const connection = amqp.connect('amqp://localhost:5672');
let channel;
const test = async () => {
  console.log('hello before connection connects');
  connection = await amqp.connect('amqp://rabbitmq:5672');
  connection.on('connect', () => console.log('Connected'));
  connection.on('disconnect', (err) => console.log('Disconnected ', err));

  // Set up a channel listening for messages in the queue.
  const channel = await connection.createChannel();

  const result = await channel.assertQueue(QUEUE_NAME);
  console.log('before chanel consumes');
  channel.consume(
    QUEUE_NAME,
    (data) => {
      onMessage(data);
    },
    { noAck: true }
  );
};

test();

const onMessage = (data) => {
  console.log('message received');
  let message = JSON.parse(data.content.toString());
  console.log('python code received', message);
  createFiles(message, channel, data);
};

const extensions = {
  cpp: 'cpp',
  c: 'c',
  java: 'java',
  python3: 'txt',
  js: 'js',
};

const runCode = async (apiBody, ch, msg) => {
  try {
    client.set(apiBody.folder.toString(), 'Processing');
    const command = `python3 run.py ../temp/${apiBody.folder}/source.test.${
      extensions[apiBody.lang]
    } ${apiBody.lang} ${apiBody.timeOut}`;
    await fs.promises.writeFile(`/temp/${apiBody.folder}/output.txt`, '');
    console.log('cwd', __dirname);
    await fs.promises.copyFile(
      path.resolve(__dirname, './AlgoChampsReporter.js'),
      `/temp/${apiBody.folder}/AlgoChampsReporter.js`
    );
    await fs.promises.copyFile(
      path.resolve(__dirname, './jest.config.js'),
      `/temp/${apiBody.folder}/jest.config.js`
    );
    console.log('Finished copying jest config file into temp folder');
    console.log('Output.txt created !');
    const output = await execute(command);
    const data = await fs.promises.readFile(
      `/temp/${apiBody.folder}/output.txt`,
      'utf-8'
    );
    const regex = /\n/g;
    let result = {
      output: data.replace(regex, ''),
      stderr: output.stderr,
      status: output.stdout,
      submission_id: apiBody.folder,
    };

    console.log('result', result.output);
    deleteFolder(`../temp/${apiBody.folder}`);
    client.setex(apiBody.folder.toString(), 3600, JSON.stringify(result));
  } catch (error) {
    console.log('Error', error);
  }
};

const createFiles = async (apiBody, ch, msg) => {
  try {
    await fs.promises.mkdir(`/temp/${apiBody.folder}`);
    await fs.promises.writeFile(
      `/temp/${apiBody.folder}/input.txt`,
      apiBody.input
    );

    const test = await fs.promises.readFile(
      path.join(__dirname, './__tests__/sum/sum.test.js'),
      'utf-8'
    );
    const data = await fs.promises.writeFile(
      `/temp/${apiBody.folder}/source.test.${extensions[apiBody.lang]}`,
      apiBody.src + ' ' + test
    );
    console.log('test', apiBody.src + test);
    console.log('ready to run code.....');
    runCode(apiBody, ch, msg);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { runCode, createFiles };
