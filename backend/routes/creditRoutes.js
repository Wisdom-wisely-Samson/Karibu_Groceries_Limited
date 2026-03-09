/**
 * @swagger
 * tags:
 *   - name: Credit Sales
 *     description: API endpoints for managing credit sales and repayments
 */

/**
 * @swagger
 * /api/credit-sales:
 *   get:
 *     summary: Get all credit sales
 *     tags: [Credit Sales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of credit sales retrieved successfully
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Record a new credit sale
 *     tags: [Credit Sales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyerName:
 *                 type: string
 *               produce:
 *                 type: string
 *               tonnage:
 *                 type: number
 *               amountDue:
 *                 type: number
 *               amountPaid:
 *                 type: number
 *     responses:
 *       201:
 *         description: Credit sale recorded successfully
 *       400:
 *         description: Insufficient stock or invalid input
 *       404:
 *         description: Produce not found
 */

/**
 * @swagger
 * /api/credit-sales/{id}:
 *   put:
 *     summary: Update credit sale details
 *     tags: [Credit Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Credit sale ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyerName:
 *                 type: string
 *               produce:
 *                 type: string
 *               tonnage:
 *                 type: number
 *               amountDue:
 *                 type: number
 *               amountPaid:
 *                 type: number
 *               dueDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Credit sale updated successfully
 *       404:
 *         description: Credit sale not found
 *   delete:
 *     summary: Delete a credit sale
 *     tags: [Credit Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Credit sale ID
 *     responses:
 *       200:
 *         description: Credit sale deleted successfully
 *       404:
 *         description: Credit sale not found
 */

/**
 * @swagger
 * /api/credit-sales/{id}/repay:
 *   put:
 *     summary: Repay credit sale
 *     tags: [Credit Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Credit sale ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Repayment successful
 *       404:
 *         description: Credit sale not found
 */

const express = require("express");
const router = express.Router();
const { recordCreditSale } = require("../controllers/creditController");
const { protect } = require("../middleware/authMiddleware");
const { repayCredit } = require("../controllers/creditController");
const { getCreditSales } = require("../controllers/creditController");
const { updateCreditSale } = require("../controllers/creditController");
const { deleteCreditSale } = require("../controllers/creditController");
// const { getRecentCreditSales} = require("../controllers/creditController");

router.get("/", protect(["Manager", "SalesAgent"]), getCreditSales);
router.post("/", protect(["Manager", "SalesAgent"]), recordCreditSale);
router.put("/:id/repay", protect(["Manager", "SalesAgent"]), repayCredit);
router.put("/:id", protect(["Manager", "SalesAgent"]), updateCreditSale);
router.delete("/:id", protect(["Manager", "SalesAgent"]), deleteCreditSale);

// router.get("/recent", protect(["Manager", "SalesAgent"]), getRecentCreditSales);
module.exports = router;
