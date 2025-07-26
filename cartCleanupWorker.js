import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import Cart from './models/Cart.js';
import Product from './models/Product.js';
import mongoose from 'mongoose';
const connection = new IORedis({
    host: 'redis',
    port: 6379,
    maxRetriesPerRequest: null
});

mongoose.connect('mongodb+srv://ALI_21:B22me008382@cluster0.gb9mn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

const cartCleanupWorker = new Worker('cart-cleanup', async job => {
  const now = Date.now();
  const carts = await Cart.find({});
    console.log(carts)
  for (const cart of carts) {
    let updated = false;
    // console.log("kjnvejbhjebfvhjberjbvjubjubvejedv")
    const validItems = [];
    // console.log(cart);
    for (const item of cart.items) {
      const addedTime = new Date(item.addedAt).getTime();
    
      const diff = now - addedTime;

      if (diff > 1 * 60 * 1000) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock += item.quantity;
          if (typeof product.price === 'number') {
            product.price += 0; // or skip this line entirely if it's unnecessary
          } else {
            product.price = 0; // or set to a default value like product.price = product.price || 0;
          }
          await product.save();
        }
        updated = true;
      } else {
        validItems.push(item);
      }
    }

    if (updated) {
      cart.items = validItems;
      await cart.save();
    }
  }

  return { status: 'cleanup complete' };
}, { connection });

cartCleanupWorker.on('completed', job => {
  console.log(`🧹 Job ${job.id} completed.`);
});

cartCleanupWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed: ${err.message}`);
});