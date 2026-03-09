const Produce = require("../models/Produce");
const asyncHandler = require("../middleware/asyncHandler");

// ADD PRODUCE
exports.addProduce = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    tonnage,
    cost,
    sellingPrice,
    dealerName,
    contact,
    branch,
    date,
    time,
  } = req.body;
// VALIDATION
  if (
    !name ||
    !tonnage ||
    !type ||
    !cost ||
    !sellingPrice ||
    !dealerName ||
    !contact ||
    !branch ||
    !date ||
    !time
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }
// CREATE AND SAVE
  const produce = new Produce(req.body);
  await produce.save();
  res.status(201).json({
    success: true,
    message: "Produce added successfully",
    produce,
  });
});
// GET STOCK
exports.getStock = async (req, res) => {
  try {
    const stock = await Produce.aggregate([
      {
        $match: {
          branch: req.user.branch, // only this manager's branch
        },
      },
      {
        $group: {
          _id: "$name", // group by produce name
          totalTonnage: { $sum: "$tonnage" }, // sum tonnage
        },
      },
      {
        $project: {
          produce: "$_id",
          totalTonnage: 1,
          _id: 0,
        },
      },
      {
        $sort: { produce: 1 },
      },
    ]);

    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE PRODUCE */
exports.updateProduce = async (req, res) => {
  try {
    const updated = await Produce.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Produce not found" });
    }

    res.json({
      message: "Produce updated successfully",
      updated,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Failed to update produce" });
  }
};

/* DELETE PRODUCE */
exports.deleteProduce = async (req, res) => {
  try {
    const deleted = await Produce.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Produce not found" });
    }

    res.json({
      message: "Produce deleted successfully",
    });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Failed to delete produce" });
  }
};

// GET RECENT PRODUCE
exports.getProduce = async (req, res) => {
  try {
    const produces = await Produce.find({
      branch: req.user.branch,
    }).sort({ createdAt: -1 }); // newest first
    // .limit(5);

    res.json(produces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
