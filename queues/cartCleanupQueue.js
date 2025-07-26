import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis({
    host: 'redis',
  port: 6379,
  maxRetriesPerRequest: null, 
}); // default localhost:6379

export const cartCleanupQueue = new Queue('cart-cleanup', { connection });