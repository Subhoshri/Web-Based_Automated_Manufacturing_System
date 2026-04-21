const router = require("express").Router();
const mongoose = require("mongoose");
const Dealer = require("../models/Dealer");

router.post("/add", async (req, res) => {
  try {
    const dealer = await Dealer.create(req.body);
    res.json(dealer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const dealers = await Dealer.find();
    res.json(dealers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:dealerId", async (req, res) => {
  try {
    const { dealerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(dealerId)) {
      return res.status(400).json({ error: "Invalid dealer id" });
    }

    const dealer = await Dealer.findByIdAndUpdate(dealerId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!dealer) {
      return res.status(404).json({ error: "Dealer not found" });
    }

    res.json(dealer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;