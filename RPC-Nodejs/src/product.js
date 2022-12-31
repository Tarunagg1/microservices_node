const express = require('express');
const { RPCObserver, RPCRequest } = require('./rpc');

const PORT = 8000;

const app = express();

app.use(express.json());

const RPC_CHANNEL_NAME = 'PRODUCT_RPC';
const CONSUMER_RPC = 'CONSUMER_RPC';


const fakeProductDataResponse = {
    _id: "dojdijfjfjf",
    title: 'product title',
    price: 100
}

// RPCObserver(RPC_CHANNEL_NAME,fakeProductDataResponse)


app.get('/', (req, res) => {
    return res.status(200).json("product service running")
})


app.get('/products',async (req,res)=>{
    const requestPayload = {
        customerId: 1
    };
    try {
        const responseData = await RPCRequest(CONSUMER_RPC,requestPayload);
        console.log(responseData);
        return res.status(200).json({message:"product service", responseData})
    } catch (error) {
        console.log(error);
        return res.status(500).json("something went wrong")
    }
})


app.listen(PORT,()=>{
    console.log('customer listning on port '+PORT);
})