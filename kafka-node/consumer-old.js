const { Kafka } = require('kafkajs')

const TOPIC = 'learning';
const CLIENTID = "myapp";
const BROKERS = ['127.0.0.0:9092'];

const msg = process.argv[2];


class Consumer {

    constructor() {
        this.kafka = new Kafka({
            clientId: CLIENTID,
            brokers: BROKERS
        })
    }

    async consumeData() {
        try {
            const consumer = this.kafka.consumer({ "groupId": 'test' });
            console.log('connected to kafka.....');

            await consumer.connect();
            console.log('consumer ready to listning.....');

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

        } catch (error) {
            console.log(error);
        }
    }
}

// consumer();

const listner = new Consumer();

listner.consumeData();