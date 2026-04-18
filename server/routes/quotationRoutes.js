const router = require("express").Router();
const Quotation = require("../models/Quotation");

router.post("/add", async (req, res) => {
  const q = await Quotation.create(req.body);
  res.json(q);
});

router.get("/", async (req, res) => {
  const qs = await Quotation.find().populate("supplier_id");
  res.json(qs);
});

module.exports = router;