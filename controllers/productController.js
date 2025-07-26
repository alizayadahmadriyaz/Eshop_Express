import Product from "../models/Product.js"
// POST /api/products
export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

// GET /api/products
export const getAllProducts = async (req, res) => {
    // const products={};
    try{
        const products = await Product.find();
        res.json(products);
    }
    catch(error){
        console.log(error);
        res.json(error);
    }
  
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Product not found' });
  res.json(updated);
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted successfully' });
};
