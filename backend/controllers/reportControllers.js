const Sale = require("../models/Sale");
const CreditSale = require("../models/CreditSale");
const asyncHandler = require("../middleware/asyncHandler");

exports.salesSummary = asyncHandler(async (req, res) => {
  const result = await Sale.aggregate([
    { $group: { _id: null, total: { $sum: "$amountPaid" } } }
  ]);

  res.json({
    success: true,
    totalSales: result[0]?.total || 0
  });
});

exports.totalOutstandingCredit = asyncHandler(async (req, res) => {
  const result = await CreditSale.aggregate([
    {
      $project: {
        balance: { $subtract: ["$amountDue", "$amountPaid"] }
      }
    },
    {
      $group: {
        _id: null,
        totalOutstanding: { $sum: "$balance" }
      }
    }
  ]);

  res.json({
    success: true,
    totalOutstanding: result[0]?.totalOutstanding || 0
  });
});
