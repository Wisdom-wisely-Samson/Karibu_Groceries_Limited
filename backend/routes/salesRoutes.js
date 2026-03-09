/**
 * @swagger
 * tags:
 *   - name: Sales
 *     description: API endpoints for managing sales transactions
 */

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Get all sales transactions
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: List of sales transactions
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new sales transaction
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       201:
 *         description: Sales transaction created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/sales/{id}:
 *   put:
 *     summary: Update a sale
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The sale ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: Sale not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a sale
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The sale ID
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Sale not found
 *       500:
 *         description: Server error
 */
const express = require("express");
const router = express.Router();
const { sellProduce } = require("../controllers/salesController");
const { protect } = require("../middleware/authMiddleware");
const { getSales } = require("../controllers/salesController");
const { updateSale } = require("../controllers/salesController");
const { deleteSale } = require("../controllers/salesController");

router.get("/", protect(["Manager", "SalesAgent"]), getSales);
router.post("/", protect(["SalesAgent"]), sellProduce);
router.put("/:id", protect(["Manager", "SalesAgent"]), updateSale);
router.delete("/:id", protect(["Manager", "SalesAgent"]), deleteSale);

module.exports = router;
