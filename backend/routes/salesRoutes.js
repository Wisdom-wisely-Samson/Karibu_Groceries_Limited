const express = require("express");
const router = express.Router();
const { sellProduce } = require("../controllers/salesController");
const { protect } = require("../middleware/authMiddleware");

router.post("/sell", protect(["Manager", "SalesAgent"]), sellProduce);

module.exports = router;
