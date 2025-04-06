import path from 'path';
import fs from 'fs';
import { sendNotification } from '../middlewares/services/notification';
import {TAlert, TProduct } from '../middlewares/utils/types';
import { Frequency } from '../middlewares/utils/enums';


export const alerts: TAlert[] = [];

const getPrices = (): Record<string, TProduct> => {
  const filePath = path.join(__dirname, '../../data/prices.json');
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

export const checkPrices = (frequency: Frequency) => {
  const prices = getPrices();
  alerts.forEach((alert) => {
    if (alert.frequency === frequency) {
      const product = Object.values(prices).find(
        (p: TProduct) => p.url === alert.url
      );
      if (product && product.price <= alert.desiredPrice) {
        sendNotification(alert.email, alert.url, product.price);
      }
    }
  });
};
