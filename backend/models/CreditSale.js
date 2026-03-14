const mongoose = require("mongoose");
// creating a schema for credit sales
const creditSaleSchema = new mongoose.Schema(
  {
    buyerName: { type: String, required: true },

    nationalId: {
      type: String,
      required: true,
    },

    location: { type: String, required: true },

    contact: { type: String, required: true },

    amountDue: { type: Number, required: true },

    amountPaid: { type: Number, default: 0 },

    produce: { type: String, required: true },

    tonnage: { type: Number, required: true },

    dueDate: { type: Date, required: true },
    branch: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
    time: { type: String },
    agentName: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("CreditSale", creditSaleSchema);
