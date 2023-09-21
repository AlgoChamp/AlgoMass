const amqp = require('amqplib');
const QUEUE_NAME = 'judge';

let channelWrapper;
// const connection = amqp.connect('amqp://localhost:5672');
const test = async () => {
  console.log('test runs');
  const connection = await amqp.connect('amqp://rabbitmq:5672', (err, conn) =>
    console.log(err)
  );
  connection.on('connect', () => console.log('Connected'));
  connection.on('disconnect', (err) => console.log('Disconnected ', err));
  channelWrapper = await connection.createChannel({
    json: true,
    setup: (channel) => channel.assertQueue(QUEUE_NAME, { durable: true }),
  });
};
test();

const sendMessage = async (data) => {
  channelWrapper.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(data)));
};

module.exports = sendMessage;
