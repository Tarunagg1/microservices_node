const express = require('express');
const redis = require('redis');
const jwt = require('jsonwebtoken');

const app = express();

const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);

(async () => {
    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();
})();

app.use(express.json());


const PORT = 5000;

const fakeUser = {
    name: "tarun",
    email: "tarun@gmail.com",
    password: "password"
}



app.post('/login', async function (req, res) {
    try {
        // 1 increment count
        const getCOunter = await client.get('counter');
        console.log(getCOunter, " mmy");

        const token = await jwt.sign(fakeUser, "abcuhwuiehdiuhduiwdhiuwhfuihefuh", { expiresIn: "1d" });
        console.log(token);
        // 2 map the counter with newly create token
        let increment = parseInt(getCOunter) + 1;
        console.log(increment);
        await client.set(increment, token);

        // 3 send counter as response to store it in a coookie send back to user
        res.cookie("jwt-id", increment);
        return res.status(200).json({ state: "SUCCESS", message: "login successful", status: true });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ state: "FALIURE", message: "login successful failed", status: false, error });
    }
})


app.post('/protected', async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id);
        const getCOunter = await client.get(`${id}`);
        console.log(getCOunter);
    } catch (error) {
        console.log(error);
        return res.status(200).json({ state: "FALIURE", message: "login successful failed", status: false, error });
    }

})

app.listen(PORT, function () {
    console.log('server listning at ', PORT);
})


