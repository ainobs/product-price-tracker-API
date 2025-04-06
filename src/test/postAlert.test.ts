import request from 'supertest';
import app from '../index';
import { sendNotification } from '../middlewares/services/notification';

// mock notification service
jest.mock('../middlewares/services/notification');

// Mock cron.schedule to avoid running cron jobs during tests
jest.mock('node-cron', () => ({
  schedule: jest.fn(),
}));

let server: any;

beforeAll(() => {
  server = app.listen(3000);
});

afterAll((done) => {
  if (server) {
    server.close(done);
  }
});

describe('Testing POST /alerts route', () => {
  it('should successfully set an alert and mock the email sending', async () => {
    const alertData = {
      url: 'https://example.com/product1',
      desiredPrice: 100,
      email: 'victor@gmail.com',
      frequency: 'daily',
    };

    await request(app)
      .post('/alerts')
      .send(alertData)
      .expect(201);

    // Ensure sendNotification was called once
    expect(sendNotification).toHaveBeenCalledTimes(1);
  });

  it('should return 400 if the email is missing', async () => {
    const alertData = {
      url: 'https://example.com/product1',
      desiredPrice: 100,
      frequency: 'daily',
    };

    await request(app)
      .post('/alerts')
      .send(alertData)
      .expect(400);
  });

  it('should return 400 if the desiredPrice is missing', async () => {
    const alertData = {
      url: 'https://example.com/product1',
      email: 'victor@gmail.com',
      frequency: 'daily',
    };

    await request(app)
      .post('/alerts')
      .send(alertData)
      .expect(400);
  });

  it('should return 400 if the frequency is invalid', async () => {
    const alertData = {
      url: 'https://example.com/product1',
      desiredPrice: 100,
      email: 'victor@gmail.com',
      frequency: 'invalid',
    };

    await request(app)
      .post('/alerts')
      .send(alertData)
      .expect(400);
  });
});
