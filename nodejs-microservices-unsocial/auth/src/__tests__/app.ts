import express from 'express';
import { signupRouter } from './routes';

const app = express();

app.use(express.json());

// app.get('*',(req,res) => {
//     res.status(200).send({});
// });

app.use(signupRouter);

export default app;
