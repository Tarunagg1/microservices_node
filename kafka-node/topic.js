const { Kafka } = require('kafkajs')

const TOPIC = 'learning';
const CLIENTID = "myapp";
const BROKERS = ['127.0.0.0:9092'];


const kafka = new Kafka({
    clientId: CLIENTID,
    brokers: BROKERS
})

run();
async function run() {

    try {
        const admin = kafka.admin();
        console.log('connecting.....');

        await admin.connect();
        console.log('connected.....');

        await admin.createTopics({
            "topics": [{
                "toppic": "Users",
                "numPartitions": 2
            }]
        });
        console.log('topic created.....');
        await admin.disconnect();

    } catch (error) {
        console.log(error);
    }
    finally {
        process.exit(0);
    }

}