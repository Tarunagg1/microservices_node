const express = require('express');
const jwt = require('jsonwebtoken')
require('./config/db');
const userModel = require('./models/user');


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 7070;

app.post("/auth/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const isEmailExists = await userModel.findOne({ email });

        if (isEmailExists) {
            return res.status(400).json({ message: "EMAIL allready exists" })
        } else {
            const newUser = new userModel({ name, email, password });
            const resp = await newUser.save();

            if (resp) {
                return res.status(200).json({ message: "registration successful" })
            }

        }

    } catch (error) {
        return res.status(400).json({ message: "FAIL" })
    }

})

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const isEmailExists = await userModel.findOne({ email });
        if (!isEmailExists) {
            return res.status(400).json({ message: "EMAIL not exists" })
        } else {
            if (password === isEmailExists.password) {
                const payload = {
                    email: isEmailExists.email,
                    name: isEmailExists.name,
                    password
                }
                const token = await jwt.sign(payload, "okijuhygtfgyhujiuhygtf", { expiresIn: '1d' });
                return res.status(200).json({ message: "login successful", token })
            } else {
                return res.status(400).json({ message: "invalid password" })
            }
        }

    } catch (error) {
        return res.status(400).json({ message: "FAIL" })
    }

})

app.listen(PORT, () => {
    console.log('Server listning at ', PORT);
});


