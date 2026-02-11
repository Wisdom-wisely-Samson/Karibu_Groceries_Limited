const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  produce: { type: String, required: true },
  tonnage: { type: Number, required: true },
  amountPaid: { type: Number, required: true },
  buyerName: { type: String, required: true },
  agentName: { type: String, required: true },
  branch: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sale", saleSchema);
