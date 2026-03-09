const Produce = require("../models/Produce");
const Sale = require("../models/Sale");
const CreditSale = require("../models/creditsale");

// ADMIN DASHBOARD
exports.getAdminDashboard = async (req, res) => {
  try {
    const salesAgg = await Sale.aggregate([
      { $group: { _id: null, total: { $sum: "$amountPaid" } } },
    ]);

    const creditAgg = await CreditSale.aggregate([
      { $group: { _id: null, total: { $sum: "$amountDue" } } },
    ]);

    const produceAgg = await Produce.aggregate([
      {
        $group: {
          _id: null,
          totalCost: { $sum: "$cost" },
          totalStock: { $sum: "$tonnage" },
        },
      },
    ]);

    const totalSales = salesAgg[0]?.total || 0;
    const totalCredit = creditAgg[0]?.total || 0;
    const totalCost = produceAgg[0]?.totalCost || 0;
    const totalStock = produceAgg[0]?.totalStock || 0;

    const revenue = totalSales + totalCredit - totalCost;

    res.json({
      totalSales,
      totalCredit,
      totalCost,
      totalStock,
      revenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
