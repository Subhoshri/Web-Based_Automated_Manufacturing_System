const router = require("express").Router();
const Dealer = require("../models/Dealer");

router.post("/add", async (req, res) => {
  const dealer = await Dealer.create(req.body);
  res.json(dealer);
});

router.get("/", async (req, res) => {
  const dealers = await Dealer.find();
  res.json(dealers);
});

module.exports = router;