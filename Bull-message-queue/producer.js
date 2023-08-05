import { Queue } from 'bullmq';

const notificationQueue = new Queue('email-queue', {
    connection: {
        host: '127.0.0.1',
        port: 6379
    }
});

async function init() {
    const res = await notificationQueue.add('email-to-tarun', { email: "tarun@gmail.com", subject: "Welcome to message queue", body: "My data", date: Date.now() });
    console.log('job added to queue', res.id);
}

setInterval(() => {
    init();
}, 1000);
