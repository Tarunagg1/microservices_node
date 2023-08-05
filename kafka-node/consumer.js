// https://gist.github.com/piyushgarg-dev/32cadf6420c452b66a9a6d977ade0b01   -- refs

const { kafka } = require("./client.js");

const group = process.argv[2];

async function consumer() {
  try {
    const consumer = kafka.consumer({ groupId: group });
    console.log("connecting to kafka.....");

    await consumer.connect();
    console.log("connected.....");

    const result = await consumer.subscribe({
      topic: "rider-updates",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          group,
          " Recived messsage ",
          result.message.value.toString(),
          "on partition " + result.partition
        );
      },
    });
  } catch (error) {
    console.log(error);
  }
}

consumer();
