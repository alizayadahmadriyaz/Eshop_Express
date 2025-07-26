import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async(req,res)=>{
    const cart = await Cart.findOne({ user: req.user._id });
    res.json(cart || { userId: req.user._id, items: [] });
};

export const addToCart = async(req,res)=>{
    const { product, quantity } = req.body;
    console.log(req.user._id.toString());
    // const cartid=
    let cart=await Cart.findOne({ user: req.user._id.toString() });
    console.log(cart)
    if (!cart) {
        cart = new Cart({ user: req.user._id.toString(), items: [] });
    }
    // console.log()
    const indx=cart.items.findIndex(item => item.product.equals(product));
    console.log(indx);
    const realproduct=await Product.findById(product);
    if(realproduct.stock>=quantity){
        realproduct.stock-=quantity;
    }
    else{
         realproduct.stock=0;
    }
    await realproduct.save();
    if(indx!=-1){
        console.log("quant ",quantity);
        console.log("past  ",cart.items[indx].quantity);
        cart.items[indx].quantity+=quantity;

    }
    else{
        cart.items.push({product:product,quantity:quantity});
    }
    await cart.save();
    res.status(200).json(cart);

};

export const removeCartItem = async (req, res) => {
//   const { product } = req.params.id;
//   console.log()
  const cart = await Cart.findOne({ user: req.user._id.toString() });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter(item => !item.product.equals(req.params.id));
  console.log(cart);
  await cart.save();
  res.status(200).json(cart);
};