const amqpLib = require('amqplib');


const connectToRabbitMq = async ()=> {
    const connection = await amqpLib.connect('amqp://localhost');
   return connection.createChannel();
}


module.exports = connectToRabbitMq;