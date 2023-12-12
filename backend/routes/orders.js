const express = require("express");
const router = express.Router();

const {
  saveOrder,
  findOrdersByUserId,
  deleteOrderById,
  updateOrderById,
} = require("../controllers/orderController");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: The orders managing API
 * /api/orders:
 *   post:
 *     summary: Creates a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Some server error
 *
 */

// POST save order
router.post("/", saveOrder);

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: The orders managing API
 * /api/orders/{userId}:
 *   get:
 *     summary: Retrieves orders by user id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user id
 *     responses:
 *       200:
 *         description: The list of the orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Some server error
 *
 */

// GET find orders by user id
router.get("/:userId", findOrdersByUserId);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   delete:
 *     summary: Deletes an order by id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order id
 *     responses:
 *       200:
 *         description: The deleted order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Some server error
 *
 */

// DELETE delete order by id
router.delete("/:orderId", deleteOrderById);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   put:
 *     summary: Updates an order by id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               delivered:
 *                 type: boolean
 *                 description: The delivery status of the order
 *     responses:
 *       200:
 *         description: The updated order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Some server error
 *
 */

// PUT update order by id
router.put("/:orderId", updateOrderById);

module.exports = router;
