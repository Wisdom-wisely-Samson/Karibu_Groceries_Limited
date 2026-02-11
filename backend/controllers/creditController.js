const CreditSale = require("../models/CreditSale");
const Produce = require("../models/Produce");
const asyncHandler = require("../middleware/asyncHandler");

exports.createCreditSale = asyncHandler(async (req, res) => {
  const { produce, tonnage, amountDue } = req.body;

  if (!produce || !tonnage || !amountDue) {
    res.status(400);
    throw new Error("Missing required credit sale fields");
  }

  const stock = await Produce.findOne({ name: produce });

  if (!stock) {
    res.status(404);
    throw new Error("Produce not found in stock");
  }

  if (stock.tonnage < tonnage) {
    res.status(400);
    throw new Error("Insufficient stock for credit sale");
  }

  stock.tonnage -= tonnage;
  await stock.save();

  const credit = new CreditSale(req.body);
  await credit.save();

  res.status(201).json({
    success: true,
    message: "Credit sale recorded successfully",
    credit
  });
});

exports.payCredit = asyncHandler(async (req, res) => {
  const { creditId, amountPaid } = req.body;

  if (!creditId || !amountPaid) {
    res.status(400);
    throw new Error("Credit ID and amount paid are required");
  }

  const credit = await CreditSale.findById(creditId);

  if (!credit) {
    res.status(404);
    throw new Error("Credit record not found");
  }

  credit.amountPaid += amountPaid;

  if (credit.amountPaid >= credit.amountDue) {
    credit.status = "Paid";
  }

  await credit.save();

  res.json({
    success: true,
    message: "Credit payment recorded",
    credit
  });
});
