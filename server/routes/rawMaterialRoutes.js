const router = require("express").Router();
const RawMaterial = require("../models/RawMaterial");

router.post("/add", async (req, res) => {
  const mat = await RawMaterial.create(req.body);
  res.json(mat);
});

router.get("/", async (req, res) => {
  const mats = await RawMaterial.find();
  res.json(mats);
});

module.exports = router;