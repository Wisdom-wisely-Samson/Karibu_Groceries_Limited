const Sale = require("../models/Sale");
const Produce = require("../models/Produce");
const asyncHandler = require("../middleware/asyncHandler");

exports.sellProduce = asyncHandler(async (req, res) => {
  const { produce, tonnageSold } = req.body;

  if (!produce || !tonnageSold) {
    res.status(400);
    throw new Error("Produce and tonnage sold are required");
  }

  const stock = await Produce.findOne({ name: produce });

  if (!stock) {
    res.status(404);
    throw new Error("Produce not found in stock");
  }

  if (stock.tonnage < tonnageSold) {
    res.status(400);
    throw new Error("Insufficient stock available");
  }

  stock.tonnage -= tonnageSold;
  await stock.save();

  const sale = new Sale(req.body);
  await sale.save();

  res.status(201).json({
    success: true,
    message: "Sale recorded successfully",
    sale
  });
});
