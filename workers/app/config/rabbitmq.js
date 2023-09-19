const amqp = require('amqplib');
const { createFiles } = require('../app');

const QUEUE_NAME = 'judge';
let channel;
// const connection = amqp.connect('amqp://localhost:5672');
const test = async () => {
  console.log('hello before connection connects');
  const connection = await amqp.connect('amqp://rabbit:5672');

  connection.on('connect', () => console.log('Connected'));
  connection.on('disconnect', (err) => console.log('Disconnected ', err));

  // Set up a channel listening for messages in the queue.
  channel = await connection.createChannel();

  const result = await channel.assertQueue(QUEUE_NAME);
  console.log('before chanel consumes');
  channel.consume(
    QUEUE_NAME,
    (data) => {
      console.log('data', data);
      onMessage(data);
    },
    { noAck: true }
  );
};

test();

const onMessage = (data) => {
  console.log('message received');
  let message = JSON.parse(data.content.toString());
  //console.log(message);
  createFiles(message, channel, data);
};
