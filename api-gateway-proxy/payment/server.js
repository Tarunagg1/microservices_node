const express = require('express');


const app = express();
const PORT = 8002;


app.get('/mypayment',(req,res)=>{
    let response = {
        data:{
            payment:[
                {id:1,amount:200},{id:2,amount:5000}
            ]
        }
    }
    return res.status(200).json(response);
})

app.get('/',(req,res)=>{
    return res.status(200).send("payment service called");
})



app.listen(PORT,() => {
    console.log(`order service listning at: http://localhost:${PORT}`);
})
