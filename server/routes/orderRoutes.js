const router = require("express").Router();
const Order = require("../models/DealerOrder");
const Product = require("../models/Product");

router.post("/place", async (req, res) => {
  const { dealer_id, items } = req.body;

  let total = 0;

  for (let item of items) {
    const product = await Product.findById(item.product_id);

    if (!product || product.stock_quantity < item.quantity) {
      return res.status(400).json({ error: "Stock not available" });
    }

    total += product.unit_price * item.quantity;
    product.stock_quantity -= item.quantity;
    await product.save();
  }

  const order = await Order.create({
    dealer_id,
    items,
    total_cost: total,
  });

  res.json(order);
});

router.get("/", async (req, res) => {
  const orders = await Order.find().populate("dealer_id");
  res.json(orders);
});

module.exports = router;