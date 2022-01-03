const express = require('express');
var NRP = require('node-redis-pubsub');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4444;

var config = {
    port: 6379,
    scope: 'microservices'
};

const wallet = 200;

var nrp = new NRP(config);


nrp.on("NEW_ORDER", data => {
    if (data.totalprice <= wallet) {
        nrp.emit("ORDER_SUCCESS", { message: "order was successfully", amount: wallet })
    } else {
        nrp.emit("ORDER_ERR", { error: "Low amount" })
    }
})

app.listen(PORT, function () {
    console.log('server listning at ', PORT);
})

