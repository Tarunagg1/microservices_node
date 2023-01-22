console.log('producer...');
const Kafka = require('node-rdkafka');

const stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092'
}, {}, { topic: 'test' });

let num = 0;


function queueMessage() {
    num++;
    const success = stream.write(Buffer.from(`hii ${num}`));
    if (success) {
        console.log('message wrote successfully', num);
    } else {
        console.log('someting went wrong');
    }
}

setInterval(() => {
    queueMessage();
}, 2000);