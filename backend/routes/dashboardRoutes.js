/**
 * @swagger
 * tags:
 *   - name: Dashboard
 *     description: API endpoints for fetching business intelligence and dashboard metrics
 */

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard metrics
 *     description: Returns aggregated data for the manager dashboard, including total sales, stock levels, and branch performance.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard metrics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 metrics:
 *                   type: object
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       500:
 *         description: Internal Server Error
 */

const express = require("express");
const router = express.Router();

const { getAdminDashboard } = require("../controllers/dashboardController");

router.get("/", getAdminDashboard);

module.exports = router;
