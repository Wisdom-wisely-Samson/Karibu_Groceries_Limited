/**
 * @swagger
 * tags:
 *   - name: Reports
 *     description: API endpoints for generating sales and inventory reports
 */

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: Get sales and inventory reports
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Report data retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/reports/analytics:
 *   get:
 *     summary: Get sales analytics data
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics data retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { loadTotals } = require("../controllers/reportController");
const { loadAnalytics } = require("../controllers/reportController");

router.get("/", protect(["Director"]), loadAnalytics);
// router.get("/", protect(["Manager"]), loadTotals);

module.exports = router;
