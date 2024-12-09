import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const routes = express.Router();

routes.get(
  '/',
  [body('email').isEmail().withMessage('Invalid email')],
  (req: Request, res: Response) => {
    const { email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: 'invlaid email' });
    }

    return res.status(200).json({ message: 'success' });
  }
);

export default routes;
