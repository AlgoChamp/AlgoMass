const amqp = require('amqplib/callback_api');
const QUEUE_NAME = "judge";

const connection = await amqp.connect("amqp://localhost:5672");

connection.on('connect', ()=>  console.log("Connected"));
connection.on('disconnect', (err)=>console.log("Disconnected ", err));

const channelWrapper = connection.createChannel({
    json:true,
    setup: (channel)=> channel.assertQueue(QUEUE_NAME, {durable: true})
})

const sendMessage = async (data) => {
    channelWrapper.sendToQueue(QUEUE_NAME, data)
        .then(()=>console.log("Message Sent"))
        .catch((err)=> {
            console.log("Message was rejected", err.stack);
            channelWrapper.close();
            connection.close();
        });
};

module.exports = sendMessage
