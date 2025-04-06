import { Request, Response } from 'express';
import { alerts } from './alert.service';
import { sendNotification } from '../middlewares/services/notification';

export const setAlert = (req: Request, res: Response) => {
  try {
    const { url, desiredPrice, email, frequency } = req.body;
    alerts.push({ url, desiredPrice, email, frequency });
    sendNotification(email, url, desiredPrice);

    res.status(201).json({ message: 'Alert set successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'something went wrong' });
    
  }
}