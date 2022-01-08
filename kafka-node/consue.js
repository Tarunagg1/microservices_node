const { Kafka } = require('kafkajs')


async function consumers() {

    const kafka = new Kafka({
        clientId: 'player-jersey',
        brokers: ['127.0.0.0:9092']
    })

    const consumer = kafka.consumer({ groupId: 'Jersy' });

    await consumer.connect();

    console.log(`Consumer connected`);

    await consumers.subscribe({
        topic: 'Jersy',
        fromBeginning: true
    })

    await consumers.run({
        eachMessage: async ({ topic, partition, message }) => {
            // 1. Topic
            // 2. partition
            // 3. message
            console.log(`To partition ${partition} -> message: ${message.value.toString()}`);
        }
    })

}

consumers();
