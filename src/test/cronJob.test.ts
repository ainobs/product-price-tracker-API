import { runScheduledChecks } from '../middlewares/services/scheduler';
import cron from 'node-cron';

jest.mock('node-cron');

describe('Scheduled Checks', () => {
  it('should schedule the midnight price check cron job', () => {
    runScheduledChecks();

    expect(cron.schedule).toHaveBeenCalledWith('0 0 * * *', expect.any(Function));
  });

  it('should schedule the morning price check cron job', () => {
    runScheduledChecks();

    expect(cron.schedule).toHaveBeenCalledWith('0 9 * * *', expect.any(Function));
  });

  it('should schedule the daily price check cron job', () => {
    runScheduledChecks();
    expect(cron.schedule).toHaveBeenCalledWith('0 0 */1 * *', expect.any(Function));
  });
});
