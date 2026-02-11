const mongoose = require("mongoose");

const creditSaleSchema = new mongoose.Schema({
  buyerName: { type: String, required: true },
  nin: { type: String, required: true, match: /^[A-Z0-9]{13}$/},
  location: { type: String, required: true },
  contact: { type: String, required: true },
  amountDue: { type: Number, required: true },
  amountPaid: { type: Number, default: 0 },
  produce: { type: String, required: true },
  tonnage: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  salesAgent: { type: String, required: true },
  status: { type: String, default: "Pending", required: true },
  branch: { type: String, enum: ["Magango","Matugga"], required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CreditSale", creditSaleSchema);
