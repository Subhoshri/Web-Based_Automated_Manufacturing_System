const router = require("express").Router();
const Supplier = require("../models/Supplier");

router.post("/add", async (req, res) => {
  const supplier = await Supplier.create(req.body);
  res.json(supplier);
});

router.get("/", async (req, res) => {
  const suppliers = await Supplier.find();
  res.json(suppliers);
});

module.exports = router;