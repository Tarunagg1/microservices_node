const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4444;


app.listen(PORT, function () {
    console.log('server listning at ', PORT);
})

