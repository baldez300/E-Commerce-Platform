/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - userId
 *         - products
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user who placed the order.
 *           example: "60d0fe4f5311236168a109ca"
 *         delivered:
 *           type: boolean
 *           description: Whether the order has been delivered.
 *           example: false
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product.
 *                 example: "60d0fe4f5311236168a109ca"
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product ordered.
 *                 example: 1
 */

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema([
  {
    userId: {
      type: String,
      required: true,
    },
    delivered: {
      type: Boolean,
      default: false,
    },
    products: [
      {
        productId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
]);

orderSchema.statics.findOrdersByUserId = async function (userId) {
  return await this.find({ userId: userId });
};

orderSchema.statics.deleteOrderById = async function (orderId) {
  return await this.findByIdAndDelete(orderId);
};

orderSchema.statics.saveOrder = async function (userId, products) {
  return await this.create({ userId: userId, products: products });
};

orderSchema.statics.updateOrderById = async function (orderId, delivered) {
  return await this.findByIdAndUpdate(
    orderId,
    { delivered: delivered },
    { new: true }
  );
};

module.exports = mongoose.model("order", orderSchema);
