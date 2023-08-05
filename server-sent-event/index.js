const express = require('express');

const app = express();

const PORT = 8000;

app.get('/', (req, res) => {
    res.send("hello world!")
});

app.get('/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    // res.write("Data: " + "helllo!\n\n");
    send(res)
});

let i = 0;
function send(res) {
    res.write("Data: " + `helllo${i++}!\n\n`);
    setInterval(() => send(res), 1000);
}



app.get('/fetchdata', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader("Access-control-Allow-Origin", '*');

    const intervalId = setInterval(() => {
        console.log('interval');
        const date = new Date().toLocaleString();
        res.write(`helllo-${date}!\n\n`);
    }, 1000);


    res.on('close', () => {
        console.log('connection close');
        clearInterval(intervalId);
        res.end();
    });
})


app.listen(PORT, () => {
    console.log('server listning on port ' + PORT);
});
