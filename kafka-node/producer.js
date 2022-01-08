const { Kafka } = require('kafkajs')


async function producer() {

    const kafka = new Kafka({
        clientId: 'player-jersey',
        brokers: ['127.0.0.0:9092']
    })

    const jerseyNumber = process.argv[2]

    const producer = kafka.producer();

    await producer.connect();

    console.log('Producer connected');

    const player = {
        7: "Dhoni",
        15: "virat",
        12: "Yuvraj",
        10: "sachin",
        45: "Rohit"
    }

    const produceData = await producer.send({
        topic: 'Jersy',
        messages: [
            {
                value: player[jerseyNumber],
                partition: jerseyNumber < 10 ? 0 : 1
            }
        ]
    })

    console.log(`Produce data ${JSON.stringify(produceData)}`);
}

producer();
