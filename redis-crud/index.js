const express = require('express');

const app = express();
app.use(express.json());

const { createClient } = require('redis');


const REDIS_PORT = process.env.PORT || 6379;
const client = createClient(REDIS_PORT);

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();
client.on('connect', () => console.log('Redis Client Connected'));


app.get('/:id?', async (req, res) => {

    const id = req.params.id || 1;
    try {
        const result = await client.hGetAll(id);
        console.log(result);
        if (!result) {
            return res.status(404).send('Not Found');
        } else {
            return res.status(200).send(result);
        }
    } catch (error) {
        console.log(error);
    }

})


app.get('/setkey/redis', async (req, res) => {

    const key = "12"
    const data = {
        name: 'mydata',
        age: '10',
        city: 'delgi'
    }
    try {
        const isKeyExist = await client.get(key);
        console.log(isKeyExist);
        if (isKeyExist) {
            console.log('oij');
            return res.status(200).json({ mmessage: 'key found', isKeyExist: JSON.parse(isKeyExist) });
        } else {
            const result = await client.set(key, JSON.stringify(data), { EX: 10 });
            console.log(result);
            return res.status(200).json({ mmessage: 'key set successfully' });
        }

    } catch (error) {
        console.log(error);
    }

})


app.get('/add/user', async (req, res) => {
    try {
        const id = '3';
        const data = {
            name: 'arun',
            age: '30',
            city: 'New York'
        }


        const result = await client.hSet(id, data);
        console.log(result);
        return res.status(200).send({ result });

    } catch (error) {
        console.log(error);
    }
})
 

app.post('/login', async function (req, res) {
    const fakeUser = {
        name: "tarun",
        email: "tarun@gmail.com",
        password: "password"
    }
    
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



app.listen(3000, () => {
    console.log('listening on port 3000');
})

