const { Kafka } = require('kafkajs')


async function createPartition() {
    const kafka = new Kafka({
        clientId: 'player-jersey',
        brokers: ['127.0.0.0:9092']
    })

    const admin = kafka.admin();
    await admin.connect();

    admin.createTopics({
        topic: [
            {
                "topic": "Jersy",
                "numPartitions": 2
            }
        ]
    });
    console.log('2 partitions created');
    await admin.disconnect();
}

createPartition();
