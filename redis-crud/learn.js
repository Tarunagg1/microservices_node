const { Redis } = require('ioredis');

const client = new Redis();

// String
const stringsOperations = async () => {
    await client.set("msg:6", "Hey from nodejs");
    const result = await client.get("msg:6");
    console.log('result', result);
}

// SETS
const setsOperations = async () => {
    await client.set("msg:6", "Hey from nodejs");
    const result = await client.get("msg:6");
    console.log('result', result);
}