import express, { Request, Response } from 'express';
import dotenv from 'dotenv';


dotenv.config();

const app = express();


const PORT = process.env.PORT || 5000;


app.get('/', (req: Request, res: Response) => {
    return res.send('hello world');
})


app.listen(PORT, () => {
    // console.log('listening on port ' + PORT);
})

