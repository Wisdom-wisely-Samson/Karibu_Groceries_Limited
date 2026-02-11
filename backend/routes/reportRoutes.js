const express = require("express");
const router = express.Router();
const { salesSummary } = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");

router.get("/summary", protect(["Director"]), salesSummary);

module.exports = router;
