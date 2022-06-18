const { Kafka } = require('kafkajs')

const TOPIC = 'learning';
const CLIENTID = "";
const BROKERS = ['127.0.0.0:9092'];

const kafka = new Kafka({
    clientId: 'player-jersey',
    brokers: ['127.0.0.0:9092']
})


const producer = kafka.producer();


async function run() {

    // const admin = kafka.admin();
    await producer.connect();

    await producer.send({
        topic: TOPIC,
        messages: [
            { value: "My value for testing" }
        ]
    });
    console.log('2 partitions created');
    await admin.disconnect();
}

run();
