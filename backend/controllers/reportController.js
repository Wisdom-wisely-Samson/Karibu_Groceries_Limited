const Produce = require("../models/Produce");
const Sale = require("../models/Sale");
const CreditSale = require("../models/CreditSale");

// DIRECTOR ANALYTICS
exports.loadAnalytics = async (req, res) => {
  try {
    if (req.user.role !== "Director") {
      return res.status(403).json({ message: "Access denied" });
    }

    // SALES PER BRANCH
    const sales = await Sale.aggregate([
      {
        $group: {
          _id: "$branch",
          totalSales: { $sum: "$amountPaid" },
        },
      },
    ]);

    // CREDIT PER BRANCH
    const credit = await CreditSale.aggregate([
      {
        $group: {
          _id: "$branch",
          totalCredit: { $sum: "$amountDue" },
        },
      },
    ]);

    // STOCK + COST PER BRANCH
    const produce = await Produce.aggregate([
      {
        $group: {
          _id: "$branch",
          totalStock: { $sum: "$tonnage" },
          totalCost: { $sum: "$cost" }, // ensure this field exists
        },
      },
    ]);

    // MERGE DATA BY BRANCH
    const branches = {};

    sales.forEach((s) => {
      branches[s._id] = {
        branch: s._id,
        sales: s.totalSales,
        credit: 0,
        stock: 0,
        cost: 0,
      };
    });

    credit.forEach((c) => {
      if (!branches[c._id]) {
        branches[c._id] = {
          branch: c._id,
          sales: 0,
          credit: 0,
          stock: 0,
          cost: 0,
        };
      }
      branches[c._id].credit = c.totalCredit;
    });

    produce.forEach((p) => {
      if (!branches[p._id]) {
        branches[p._id] = {
          branch: p._id,
          sales: 0,
          credit: 0,
          stock: 0,
          cost: 0,
        };
      }
      branches[p._id].stock = p.totalStock;
      branches[p._id].cost = p.totalCost;
    });

    // CALCULATE REVENUE
    const result = Object.values(branches).map((b) => ({
      ...b,
      revenue: b.sales + b.credit - b.cost,
    }));

    res.json({
      branches: result,
    });
  } catch (error) {
    console.error("Analytics error:", error);

    res.status(500).json({
      message: "Failed to load analytics",
    });
  }
};
