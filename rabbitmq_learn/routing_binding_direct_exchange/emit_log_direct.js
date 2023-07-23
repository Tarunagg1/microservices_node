const amqp = require('amqplib');
const { connectionString, direct_routing_binding_Queue_Name } = require('../constant');
const { task_Queue_Name } = require('../constant');

const exchangeName = direct_routing_binding_Queue_Name;

const args = process.argv.slice(2);

const msg = args[1] || "Something went wrong";
const logType = args[0];

const sendLog = async () => {
    const connection = await amqp.connect(connectionString);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName,"direct",{durable:false});

    channel.publish(exchangeName,logType,Buffer.from(msg));

    setTimeout(() => {
        connection.close();
    }, 500);

}


// setInterval(() => {
//     console.log('send again');
// }, 500);
sendLog();
