const express = require('express');

const app = express();

const PORT = 8001;


app.get('/myorder',(req,res)=>{
    let response = {
        data:{
            item:[
                {id:1,name:"p1"},{id:2,name:"p2"}
            ]
        }
    }
    return res.status(200).json(response);
})

app.get('/',(req,res)=>{
    return res.status(200).send("Order service called");
})



app.listen(PORT,() => {
    console.log(`order service listning at: http://localhost:${PORT}`);
})
