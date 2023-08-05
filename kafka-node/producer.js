// https://gist.github.com/piyushgarg-dev/32cadf6420c452b66a9a6d977ade0b01   -- refs

const { kafka } = require("./client.js");

const riderName = process.argv[2];
const location = process.argv[3];


async function producers() {
  try {
    const producer = kafka.producer();
    console.log("connection to kafka.....");

    await producer.connect();
    console.log("connected.....");

    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          partition: location.toLocaleLowerCase() === "north" ? 0 : 1,
          key: "location-update",
          value: JSON.stringify({ name: riderName, loc: location }),
        },
      ],
    });

    await producer.disconnect();
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(0);
  }
}

producers();
