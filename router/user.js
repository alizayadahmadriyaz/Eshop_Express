import express from 'express';
import { register, login,getUser,allUser } from '../controllers/userController.js';
import adminOnly from "../middlewares/admin.js";
import protect from "../middlewares/auth.js";


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getUser/:id',protect,adminOnly, getUser);
router.get('/allUser',protect,adminOnly, allUser);

export default router