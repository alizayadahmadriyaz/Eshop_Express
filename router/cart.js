import express from 'express';
import {
  getCart,
  addToCart,
  removeCartItem,
} from '../controllers/cartController.js';
import protect from '../middlewares/cust_auth.js';

const router = express.Router();

router.get('/', protect,getCart);
router.post('/',protect, addToCart);
router.delete('/:id',protect, removeCartItem);

export default router;