// backend/models/Produce.js
const mongoose = require("mongoose");

const produceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, minlength: 2 },
  tonnage: { type: Number, required: true },
  cost: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  dealerName: { type: String, minlength: 2 },
  contact: { type: String },
  branch: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Produce", produceSchema);
