const CreditSale = require("../models/CreditSale");
const Produce = require("../models/Produce");

/**
 * Helper to handle FIFO Stock Deduction
 */
const deductStockFIFO = async (produceName, branch, requiredTonnage) => {
  const stocks = await Produce.find({
    name: { $regex: new RegExp(`^${produceName}$`, "i") },
    branch: { $regex: new RegExp(`^${branch}$`, "i") },
    tonnage: { $gt: 0 },
  }).sort({ createdAt: 1 });

  const totalAvailable = stocks.reduce((acc, s) => acc + s.tonnage, 0);
  if (totalAvailable < requiredTonnage) return false;

  let remainingToDeduct = requiredTonnage;
  for (const stock of stocks) {
    if (remainingToDeduct <= 0) break;

    if (stock.tonnage <= remainingToDeduct) {
      remainingToDeduct -= stock.tonnage;
      stock.tonnage = 0;
    } else {
      stock.tonnage -= remainingToDeduct;
      remainingToDeduct = 0;
    }
    await stock.save();
  }
  return true;
};

// RECORD CREDIT SALE
exports.recordCreditSale = async (req, res) => {
  try {
    const {
      buyerName,
      nationalId,
      location,
      contact,
      amountDue,
      amountPaid = 0,
      produce,
      tonnage,
      dueDate,
      agentName,
      date = date|| new Date(),
      time = new Date().toLocaleTimeString(),
    } = req.body;

    const reqTonnage = Number(tonnage);
    const paid = Number(amountPaid);
    const totalDue = Number(amountDue);

    // 1. Validations
    if (paid > totalDue) {
      return res
        .status(400)
        .json({ message: "Amount paid cannot exceed amount due" });
    }

    // 2. Deduct Stock (FIFO)
    const stockUpdated = await deductStockFIFO(
      produce,
      req.user.branch,
      reqTonnage,
    );
    if (!stockUpdated) {
      return res.status(400).json({ message: "Insufficient stock available" });
    }

    // 3. Create Record
    const recordedCreditSale = await CreditSale.create({
      buyerName,
      nationalId,
      location,
      contact,
      amountDue: totalDue,
      amountPaid: paid,
      produce,
      tonnage: reqTonnage,
      dueDate,
      agentName: agentName || req.user.username,
      branch: req.user.branch,
      status: paid >= totalDue ? "Paid" : "Pending",
      date: date || new Date(),
      time: time || new Date().toLocaleTimeString(),

    });

    res
      .status(201)
      .json({
        message: "Credit sale recorded successfully",
        recordedCreditSale,
      });
  } catch (error) {
    console.error("Credit Sale Error:", error);
    res.status(500).json({ message: "Server error recording credit sale" });
  }
};

// REPAY CREDIT
exports.repayCredit = async (req, res) => {
  try {
    const credit = await CreditSale.findById(req.params.id);
    if (!credit)
      return res.status(404).json({ message: "Credit sale not found" });

    const payment = Number(req.body.amount || 0);
    credit.amountPaid += payment;

    if (credit.amountPaid >= credit.amountDue) {
      credit.status = "Paid";
    }

    await credit.save();
    res.json({ message: "Repayment successful", credit });
  } catch (error) {
    res.status(500).json({ message: "Error processing repayment" });
  }
};

// GET ALL CREDIT SALES (Filtered by Branch)
exports.getCreditSales = async (req, res) => {
  try {
    const credits = await CreditSale.find({ branch: req.user.branch }).sort({
      createdAt: -1,
    });
    res.json(credits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE CREDIT SALE
exports.updateCreditSale = async (req, res) => {
  try {
    const updated = await CreditSale.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE CREDIT SALE
exports.deleteCreditSale = async (req, res) => {
  try {
    await CreditSale.findByIdAndDelete(req.params.id);
    res.json({ message: "Credit sale deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
