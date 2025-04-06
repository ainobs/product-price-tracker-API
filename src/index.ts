import express, { Express, Request, Response, NextFunction } from 'express';
import cron from 'node-cron';
import alertRoutes from './alert/alert.route';
import { runScheduledChecks } from './middlewares/services/scheduler';
import createError from 'http-errors';
import dotenv from 'dotenv';

dotenv.config();



const app: Express = express();
const PORT = 3000;

if (process.env.NODE_ENV !== 'test') {
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
}

app.use(express.json());


//route for setting alerts
app.use('/alerts', alertRoutes);

//bad request
app.use((_req: Request, _res: Response, next: NextFunction): void => {
  next(createError(404, 'This URL does not exist!'));
});

//start cron job
runScheduledChecks();


export default app;