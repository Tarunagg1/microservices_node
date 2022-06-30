require('dotenv').config();
const cassandra = require('cassandra-driver');
const express = require('express');
const sigV4 = require('aws-sigv4-auth-cassandra-plugin');


const app = express();
app.use(express.json());


// const auth = new sigV4.SigV4AuthProvider({
//     region: 'ap-south-1', 
//     accessKeyId:'',
//     secretAccessKey: ''
// });

// const sslOptions1 = {
//     ca: [
//         fs.readFileSync('path_to_file/sf-class2-root.crt', 'utf-8')],
//     host: 'cassandra.ap-south-1.amazonaws.com',
//     rejectUnauthorized: true
// };

// const client = new cassandra.Client({
//     contactPoints: ['cassandra.ap-south-1.amazonaws.com'],
//     localDataCenter: 'ap-south-1',
//     authProvider: auth,
//     sslOptions: sslOptions1,
//     protocolOptions: { port: 9142 }
// });



// const client = new cassandra.Client({
//     contactPoints: ['arn:aws:cassandra:ap-south-1:865860829632:/keyspace/tutorialkeyspace']
// });

const query = 'SELECT name, email FROM users WHERE key = ?';

client.execute(query, ['someone'])
    .then(result => console.log('User with email %s', result.rows[0].email));

app.listen(process.env.PORT, () => {
    console.log('server listening on port', process.env.PORT);
})