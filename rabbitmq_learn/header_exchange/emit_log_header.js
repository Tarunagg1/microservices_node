const amqp = require('amqplib');
const { connectionString, header_exchnage } = require('../constant');

const exchangeName = header_exchnage;

const args = process.argv.slice(2);

const msg = args[1] || "Something went wrong";
const logType = args[0];

const sendLog = async () => {
    const connection = await amqp.connect(connectionString);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "headers", { durable: false });

    channel.publish(exchangeName, "", Buffer.from(msg), { headers: { account: "new", method: "facebook" } });

    setTimeout(() => {
        connection.close();
    }, 500);

}

sendLog();
