// backend/models/Produce.js
const mongoose = require("mongoose");
// creating a schema for produce
const produceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    type: { type: String, minlength: 2, required: true },

    tonnage: { type: Number, required: true, min: 0 },

    cost: { type: Number, required: true },

    sellingPrice: { type: Number, required: true },

    dealerName: { type: String, minlength: 2, required: true },

    contact: { type: String, required: true },

    branch: {
      type: String,
      enum: ["Maganjo", "Matugga"],
      required: true,
    },

    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Produce", produceSchema);
