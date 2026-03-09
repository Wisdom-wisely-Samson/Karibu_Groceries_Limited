/**
 * @swagger
 * tags:
 *   - name: Produce
 *     description: API endpoints for managing produce inventory
 */

/**
 * @swagger
 * /api/produce:
 *   get:
 *     summary: Get all produce in inventory
 *     tags: [Produce]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current stock retrieved successfully
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Add new produce to inventory
 *     tags: [Produce]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, quantity, pricePerKg]
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *               pricePerKg:
 *                 type: number
 *     responses:
 *       201:
 *         description: Produce added successfully
 *       400:
 *         description: Invalid input data
 */

/**
 * @swagger
 * /api/produce/{id}:
 *   put:
 *     summary: Update existing produce details
 *     tags: [Produce]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The produce ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *               pricePerKg:
 *                 type: number
 *     responses:
 *       200:
 *         description: Produce updated successfully
 *       404:
 *         description: Produce not found
 *   delete:
 *     summary: Delete produce from inventory
 *     tags: [Produce]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The produce ID
 *     responses:
 *       200:
 *         description: Produce deleted successfully
 *       404:
 *         description: Produce not found
 */

const express = require("express");
const router = express.Router();
const {
  addProduce,
  updateProduce,
  deleteProduce,
  getStock,
  getProduce,
} = require("../controllers/producecontroller");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect(["Manager"]), addProduce);
router.put("/:id", protect(["Manager"]), updateProduce);
router.delete("/:id", protect(["Manager"]), deleteProduce);
router.get("/stock", protect(["Manager", "SalesAgent"]), getStock);
router.get("/", protect(["Manager", "SalesAgent"]), getProduce);
module.exports = router;
