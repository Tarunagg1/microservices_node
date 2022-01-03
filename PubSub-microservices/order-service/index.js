const express = require('express');
var NRP = require('node-redis-pubsub');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5555;

var config = {
    port: 6379,
    scope: 'microservices'
};

var nrp = new NRP(config);

const food = {
    "burger": 150,
    "egg": 10,
    "rice": 100,
    "bread": 50
}

app.post('/order', (req, res) => {
    const { name, qty } = req.body;
    if (!name || !qty) {
        return res.status(400).json({ state: "FALIUR", status: false, message: "All fields are required" });
    }

    const recipt = {
        name,
        qty,
        totalprice: qty * food[name]
    }

    nrp.emit("NEW_ORDER", recipt);

    nrp.on("ORDER_ERR", (err) => {
        console.log(err);
        if (err) {
            return res.status(400).json({ state: "FALIUR", status: false, message: err.error });
        }
    })

    nrp.on("ORDER_SUCCESS", (success) => {
        if (success) {
            return res.status(200).json({ state: "SUCCESS", status: false, message: success.message, remine: success.amount });
        }
    })
})

app.listen(PORT, function () {
    console.log('server listning at ', PORT);
})

