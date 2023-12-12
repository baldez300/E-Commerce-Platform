/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - category
 *         - subcategory
 *         - productName
 *         - price
 *         - description
 *         - img
 *       properties:
 *         category:
 *           type: integer
 *           description: The category of the product.
 *           example: 1
 *         subcategory:
 *           type: integer
 *           description: The subcategory of the product.
 *           example: 2
 *         productName:
 *           type: string
 *           description: The name of the product.
 *           example: "Product Name"
 *         manufacturer:
 *           type: string
 *           description: The manufacturer of the product.
 *           example: "Manufacturer Name"
 *         country:
 *           type: string
 *           description: The country of origin of the product.
 *           example: "Country Name"
 *         price:
 *           type: integer
 *           description: The price of the product.
 *           example: 100
 *         description:
 *           type: string
 *           description: The description of the product.
 *           example: "Product Description"
 *         img:
 *           type: string
 *           description: The image URL of the product.
 *           example: "http://example.com/image.jpg"
 *         discount:
 *           type: integer
 *           description: The discount on the product.
 *           example: 10
 */

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema([{
  category: {
    type: Number,
    required: true,
  },
  subcategory: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  manufacturer: {
    type: String,
  },
  country: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
  },
},]);

module.exports = mongoose.model("product", productSchema);
