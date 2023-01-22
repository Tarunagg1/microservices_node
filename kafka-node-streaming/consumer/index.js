// docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 1 --topic test

console.log('consumer...');
const Kafka = require('node-rdkafka');

const consumer = Kafka.KafkaConsumer({
    "group.id": "kafka",
    'metadata.broker.list': 'localhost:9092'
}, {});


consumer.connect();


consumer.on('ready', () => {
    console.log('consumer connected');
    consumer.subscribe(['test']);
    consumer.consume();
}).on('data', (data) => {
    console.log(`received message ${data.value}`);
})




