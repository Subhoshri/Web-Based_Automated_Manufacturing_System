const router = require("express").Router();
const Product = require("../models/Product");

router.post("/add", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post("/update-stock", async (req, res) => {
  const { product_id, qty } = req.body;
  const product = await Product.findById(product_id);

  product.stock_quantity += qty;
  await product.save();

  res.json(product);
});

module.exports = router;