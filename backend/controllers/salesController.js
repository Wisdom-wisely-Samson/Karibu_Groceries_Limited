const Produce = require("../models/Produce");
const Sale = require("../models/Sale");

// UTIL FUNCTION TO UPDATE INVENTORY USING FIFO
const updateInventory = async (produceName, branch, amountToSell) => {
    const stocks = await Produce.find({
        name: { $regex: new RegExp(`^${produceName}$`, "i") },
        branch: { $regex: new RegExp(`^${branch}$`, "i") },
        tonnage: { $gt: 0 }
    }).sort({ createdAt: 1 }); // FIFO: Oldest stock first

    const totalAvailable = stocks.reduce((sum, s) => sum + s.tonnage, 0);
    
    if (totalAvailable < amountToSell) return { success: false };

    let remaining = amountToSell;
    for (const stock of stocks) {
        if (remaining <= 0) break;
        if (stock.tonnage <= remaining) {
            remaining -= stock.tonnage;
            stock.tonnage = 0;
        } else {
            stock.tonnage -= remaining;
            remaining = 0;
        }
        await stock.save();
    }

    return { success: true, totalRemaining: totalAvailable - amountToSell };
};

// SELL PRODUCE
exports.sellProduce = async (req, res) => {
    try {
        const { produce, tonnageSold, amountPaid, buyerName, agentName, date } = req.body;
        const tonnage = Number(tonnageSold);
        const branch = req.user.branch;

        // 1. Update Inventory using FIFO logic
        const inventoryResult = await updateInventory(produce, branch, tonnage);

        if (!inventoryResult.success) {
            return res.status(400).json({ message: "Insufficient stock available" });
        }

        //  Create Sale Record
        const sale = await Sale.create({
            produce,
            tonnageSold: tonnage,
            amountPaid: Number(amountPaid),
            buyerName,
            agentName: agentName || req.user.username,
            branch,
            date: date || new Date(),
            time: new Date().toLocaleTimeString()
        });

        // Low Stock Alert
        if (inventoryResult.totalRemaining < 500) {
            console.warn(`LOW STOCK ALERT: ${produce} at ${branch} branch has only ${inventoryResult.totalRemaining} tons left!`);
        }

        res.status(201).json({ message: "Sale recorded successfully", sale });
    } catch (error) {
        console.error("Sale Error:", error);
        res.status(500).json({ message: "Error processing sale" });
    }
};

// GET ALL SALE
exports.getSales = async (req, res) => {
    try {
        const sales = await Sale.find({ branch: req.user.branch }).sort({ createdAt: -1 });
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE SALe
exports.updateSale = async (req, res) => {
    try {
        const updated = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Sale record not found" });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE SALE
exports.deleteSale = async (req, res) => {
    try {
        const deleted = await Sale.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Sale record not found" });
        res.json({ message: "Sale deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};