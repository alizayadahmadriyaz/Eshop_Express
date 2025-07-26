import { cartCleanupQueue } from '../queues/cartCleanupQueue.js';

export function startCartCleanupScheduler() {
  setInterval(async () => {
    await cartCleanupQueue.add('cleanup', {}, {
      removeOnComplete: true,
      removeOnFail: true
    });
    console.log('🧼 Queued cart cleanup job...');
  }, 60 * 1000); // every 1 minute
}