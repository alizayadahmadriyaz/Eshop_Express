import mongoose from 'mongoose';


const categorySchema = new mongoose.Schema({
  name: { type: String, enum: ['pants','shirts','jeans'], default: 'jeans'  }
});


export default mongoose.model('Category', categorySchema);