const router = require("express").Router();
const mongoose = require("mongoose");
const Order = require("../models/DealerOrder");
const Product = require("../models/Product");

router.post("/place", async (req, res) => {
  try {
    const { dealer_id, items } = req.body;

    if (!dealer_id || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "dealer_id and items are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(dealer_id)) {
      return res.status(400).json({ error: "Invalid dealer_id" });
    }

    let total = 0;

    for (const item of items) {
      if (!item?.product_id || !mongoose.Types.ObjectId.isValid(item.product_id)) {
        return res.status(400).json({ error: "Invalid product_id" });
      }

      const product = await Product.findById(item.product_id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (product.stock_quantity < item.quantity) {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("dealer_id");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;