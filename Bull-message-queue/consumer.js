import { Worker } from 'bullmq';

const sendMail = ()=>{
    return new Promise((resolve, reject) => setTimeout(() => {
        resolve();
    }, 5 * 1000));
}

const worker = new Worker('email-queue', async email => {
    // Will print { foo: 'bar'} for the first job
    // and { qux: 'baz' } for the second.
    console.log("id ==> ", email.id);
    console.log(email.data);
    await sendMail();
    console.log('email sent');
});

