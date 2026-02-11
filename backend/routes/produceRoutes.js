const express = require("express");
const router = express.Router();
const { addProduce, getStock } = require("../controllers/produceController");
const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect(["Manager"]), addProduce);
router.get("/", protect(["Manager", "Director"]), getStock);

module.exports = router;
