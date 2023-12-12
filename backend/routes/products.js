const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductsByCategory,
  getProductsBySubcategory,
  getProductById,
  getProductsBySearch,
  createProduct,
  deleteProduct,
  deleteCategory,
  deleteSubcategory,
  updateProduct,
} = require("../controllers/productController");

/**
 * @swagger
 *   tags:
 *   name: Products
 *   description: The products managing API
 * /products:
 *   get:
 *     summary: Retrieves all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */

router.get("/", getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieves a product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Some server error
 */

router.get("/:id", getProductById);

/**
 * @swagger
 * /api/products/category/{id}:
 *   get:
 *     summary: Retrieves products by category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category id
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Category not found
 *       500:
 *         description: Some server error
 */

router.get("/category/:id", getProductsByCategory);

/**
 * @swagger
 * /products/category/{id1}/{id2}:
 *   get:
 *     summary: Retrieves products by subcategory
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id1
 *         required: true
 *         schema:
 *           type: string
 *         description: The category id
 *       - in: path
 *         name: id2
 *         required: true
 *         schema:
 *           type: string
 *         description: The subcategory id
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Some server error
 */

router.get("/category/:id1/:id2", getProductsBySubcategory);

/**
 * @swagger
 * /api/products/search/{query}:
 *   get:
 *     summary: Retrieves products by search query
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The search query
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No products found
 *       500:
 *         description: Some server error
 */

router.get("/search/:query", getProductsBySearch);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Successful creating
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 createdProducts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error message
 *       500:
 *         description: Some server error
 */

router.post("/", createProduct);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Update product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product is updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 productData:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Some server error
 */

router.patch("/:id", updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product id
 *     responses:
 *       200:
 *         description: Product is deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 productData:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Some server error
 */

router.delete("/:id", deleteProduct);

/**
 * @swagger
 * /products/category/{id}:
 *   delete:
 *     summary: Delete category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category id
 *     responses:
 *       200:
 *         description: Category is deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 productsData:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       404:
 *         description: Category not found
 *       500:
 *         description: Some server error
 */

router.delete("/category/:id", deleteCategory);

/**
 * @swagger
 * /products/category/{id1}/{id2}:
 *   delete:
 *     summary: Delete subcategory
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id1
 *         required: true
 *         schema:
 *           type: string
 *         description: The category id
 *       - in: path
 *         name: id2
 *         required: true
 *         schema:
 *           type: string
 *         description: The subcategory id
 *     responses:
 *       200:
 *         description: Subcategory is deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 productsData:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Some server error
 */

router.delete("/category/:id1/:id2", deleteSubcategory);

module.exports = router;
