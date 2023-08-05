const { Kafka } = require("kafkajs");

const CLIENTID = "my-app";
const BROKERS = ["172.18.128.1:9092"];

module.exports.kafka = new Kafka({
  clientId: CLIENTID,
  brokers: BROKERS,
});
