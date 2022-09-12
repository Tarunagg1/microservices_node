const connect = require('../connect');

const QUEUE_NAME = "task";

let channel = null;


const data = {
    name: "tarun",
    email: "tarun@gmail.com",
    date: new Date().getMilliseconds()
}



const sentToQueue = async (data) => {
    try {
        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(data)),{persistent: true});
        console.log('send queue complete ', data);
    } catch (error) {
        console.log(error);
    }
}


(async () => {
    channel = await connect(QUEUE_NAME);
    sentToQueue(data);
    // channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(data)));
})()
