const { Kafka } = require('kafkajs')

const TOPIC = 'learning';
const CLIENTID = "myapp";
const BROKERS = ['127.0.0.0:9092'];

const msg = process.argv[2];

const kafka = new Kafka({
    clientId: CLIENTID,
    brokers: BROKERS
})

producers();
async function producers() {

    try {
        const producer = kafka.producer();
        console.log('connecting.....');

        await producer.connect();
        console.log('connected.....');
        const partition = mgs[0] < "N" ? 0 : 1;
        const result = await producer.send({
            "topic": TOPIC,
            "messages": [
                { "value": msg,"partition":partition }
            ]
        });

        console.log('send successfully.....', JSON.stringify(result));
        await producer.disconnect();

    } catch (error) {
        console.log(error);
    }
    finally {
        process.exit(0);
    }

}