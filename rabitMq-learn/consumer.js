const connect = require('./connect');

let channel = null;

const QUEUE_NAME = "jobs";


(async () => {
    channel = await await connect(QUEUE_NAME)
    
    channel.consume(QUEUE_NAME, (msg) => {
        console.log('received message ', msg.content.toString());
        channel.ack(msg);
    })
})()
