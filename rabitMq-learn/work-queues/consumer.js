const connect = require('../connect');

const QUEUE_NAME = "task";

let channel = null;

(async () => {
    channel = await connect(QUEUE_NAME);
    channel.prefetch(1);
    channel.consume(QUEUE_NAME, (msg) => {
        console.log('received message');
        setTimeout(() => {
            console.log('done');
            channel.ack(msg);
        }, 4*1000);
    })
    // channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(data)));
})()
