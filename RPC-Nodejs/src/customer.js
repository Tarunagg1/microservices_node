const express = require('express');
const { RPCObserver, RPCRequest } = require('./rpc');

const PORT = 9000;
const app = express();

app.use(express.json());

const CONSUMER_RPC = 'CONSUMER_RPC';
const PRODUCT_RPC = 'PRODUCT_RPC';

const fakeDataResponse = {
    _id: "dojdijfjfjf",
    name: 'tarun',
    country: "india"
}

RPCObserver(CONSUMER_RPC, fakeDataResponse)

app.get('/', (req, res) => {
    return res.status(200).json("customer service running")
});

app.get('/wishlist', async (req, res) => {
    const requestPayload = {
        productId: '123',
        customerId: 1
    };
    try {
        // console.log('abs');
        const responseData = await RPCRequest(PRODUCT_RPC, requestPayload);
        console.log(responseData);
        return res.status(200).json({ message: "customer service", responseData })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error || "something went wrong")
    }
})




app.listen(PORT, () => {
    console.log('customer listning on port ' + PORT);
})