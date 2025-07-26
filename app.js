import express from "express";

import productRoutes from "./router/product.js";
import userroutes from "./router/user.js";
import cartrotes from "./router/cart.js";


import connectDB from './db.js';

import dotenv from 'dotenv';
dotenv.config();

const app=express()
const PORT=8000;
app.use(express.json()); // To handle JSON body
app.use(express.urlencoded({ extended: true }));


connectDB();






app.get('/',(req,res)=>{
    res.send("running....")
})
app.use('/api', productRoutes);
app.use('/user', userroutes);
app.use('/cart', cartrotes);





app.listen(PORT,()=>{console.log(`server runs on ${PORT}`)});