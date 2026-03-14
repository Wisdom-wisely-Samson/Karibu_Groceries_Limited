const mongoose = require("mongoose");
// creating a schema for users
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Manager", "SalesAgent", "Director"],
  },
  branch: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
