import cron from 'node-cron';
import { checkPrices } from '../../alert/alert.service';
import { Frequency } from '../utils/enums';

export const runScheduledChecks = () => {
  cron.schedule('0 0 * * *', () => {
    console.log('Running midnight price check...');
    checkPrices(Frequency.MIDNIGHT);
  });

  cron.schedule('0 9 * * *', () => {
    console.log('Running morning price check...');
    checkPrices(Frequency.MORNING);
  });

  cron.schedule('0 0 */1 * *', () => {
    console.log('Running daily price check...');
    checkPrices(Frequency.DAILY);
  });
};