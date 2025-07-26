import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [String], // URLs to image storage
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  brand: String,
  stock: { type: Number, default: 0 },
  ratings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
const Product = mongoose.model('Product', productSchema);

export default Product;