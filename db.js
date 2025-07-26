import mongoose from "mongoose";

import { startCartCleanupScheduler } from './scheduler/startCartCleanupScheduler.js';


const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ALI_21:B22me008382@cluster0.gb9mn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected ✅');
    startCartCleanupScheduler();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB; 
