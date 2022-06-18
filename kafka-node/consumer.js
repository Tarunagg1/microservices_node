const { Kafka } = require('kafkajs')

const TOPIC = 'learning';
const CLIENTID = "myapp";
const BROKERS = ['127.0.0.0:9092'];

const msg = process.argv[2];

const kafka = new Kafka({
    clientId: CLIENTID,
    brokers: BROKERS
})

consumer();
async function consumer() {

    try {
        const consumer = kafka.consumer({ "groupId": 'test' });
        console.log('connecting.....');

        await consumer.connect();
        console.log('connected.....');

        const result = await consumer.subscribe({
            "topic": TOPIC,
            "fromBeginning": true,

        });

        await consumer.run({
            "eachMessage": async (result) => {
                console.log("Recived messsage ", result.message, "on partition " + result.partition);
            }
        })


        console.log('send successfully.....', JSON.stringify(result));
        await producer.disconnect();

    } catch (error) {
        console.log(error);
    }
}