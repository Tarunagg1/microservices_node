const connect = require('./connect');

const QUEUE_NAME = "jobs";

let channel = null;


const data = {
    name: process.argv[2],
    email: "tarun@gmail.com",
    date: new Date().getMilliseconds()
}



const sentToQueue = async (data) => {
    try {
        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(data)));
        console.log('send queue complete ', data);
    } catch (error) {
        console.log(error);
    }
}


(async () => {
    channel = await connect(QUEUE_NAME);
    sentToQueue(data)
})()


