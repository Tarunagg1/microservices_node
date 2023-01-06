const {fork} = require('child_process');

const processes = [
    fork('./app.js',['3001']),
    fork('./app.js',['3002']),
    fork('./app.js',['3003'])
];


console.log(`Forked ${processes.length} processes`);