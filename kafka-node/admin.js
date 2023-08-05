const { kafka } = require("./client.js");


async function init() {
  try {
    const admin = kafka.admin();
    console.log("admin connecting.....");

    await admin.connect();
    console.log("admin connected.....");

    await admin.createTopics({
      topics: [
        {
          topic: "rider-updates",
          numPartitions: 2,
        },
      ],
    });

    console.log("topic created.....");
    await admin.disconnect();
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(0);
  }
}

init();
