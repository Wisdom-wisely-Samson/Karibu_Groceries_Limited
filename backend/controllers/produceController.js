const Produce = require("../models/Produce");
const asyncHandler = require("../middleware/asyncHandler");

exports.addProduce = asyncHandler(async (req, res) => {
  const { name, tonnage } = req.body;

  if (!name || !tonnage) {
    res.status(400);
    throw new Error("Produce name and tonnage are required");
  }

  const produce = new Produce(req.body);
  await produce.save();

  res.status(201).json({
    success: true,
    message: "Produce added successfully",
    produce
  });
});

exports.getStock = asyncHandler(async (req, res) => {
  const stock = await Produce.find();

  res.json({
    success: true,
    count: stock.length,
    data: stock
  });
});

