const express = require("express");
const {
  authenticateToken,
  refreshToken,
} = require("../middleware/jwtMiddleware");
const {
  registerUser,
  loginUser,
  updateUser,
  findUserById,
  addToFavorites,
  removeFromFavorites,
  createUrl,
  recoverPassword,
} = require("../controllers/userController");

const router = express.Router();
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 *   tags:
 *   name: Users
 *   description: The users managing API
 */

 /**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error message
 *       500:
 *         description: Some server error
 */

// POST register user
router.post("/register", registerUser);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error message
 *       500:
 *         description: Some server error
 */

// POST login user
router.post("/login", loginUser);

/**
 * @swagger
 * /api/user/update:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error message
 *       500:
 *         description: Some server error
 */

// PUT update user
router.put("/update", authenticateToken, updateUser);

/**
 * @swagger
 * /api/user/authenticate:
 *   post:
 *     summary: Find user by id
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       400:
 *         description: Error message
 *       500:
 *         description: Some server error
 */

// POST find user by id
router.post("/authenticate", authenticateToken, findUserById);

/**
 * @swagger
 * /token:
 *   post:
 *     summary: Refresh token
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token refreshed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 savedUser:
 *                   $ref: '#/components/schemas/User'
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Authorization token required
 *       403:
 *         description: Invalid token
 *       500:
 *         description: Some server error
 */

// POST refresh token
router.post("/token", refreshToken);

/**
 * @swagger
 * /api/user/favorites:
 *   post:
 *     summary: Add a product to user's favorites
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Error message
 *       404:
 *         description: User not found
 *       500:
 *         description: Some server error
 */

// POST add to favorites
router.post("/favorites", authenticateToken, addToFavorites);

/**
 * @swagger
 * /api/user/recover-password:
 *   post:
 *     summary: Create a password recovery URL
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Email sent and url created
 *       400:
 *         description: Error message
 *       500:
 *         description: Some server error
 */

// POST create url
router.post("/recover-password", createUrl);

/**
 * @swagger
 * /api/user/recover-password/{url}:
 *   get:
 *     summary: Validate a password recovery URL
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Url found
 *       400:
 *         description: Error message
 *       404:
 *         description: Url not found
 *       500:
 *         description: Some server error
 */

// GET validate url
router.get("/recover-password/:url", recoverPassword);

/**
 * @swagger
 * /api/user/recover-password/{url}:
 *   put:
 *     summary: Update password using a recovery URL
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Error message
 *       404:
 *         description: Url not found
 *       500:
 *         description: Some server error
 */

// PUT update password
router.put("/recover-password/:url", recoverPassword);

/**
 * @swagger
 * /api/user/favorites:
 *   delete:
 *     summary: Remove a product from user's favorites
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Error message
 *       404:
 *         description: User not found
 *       500:
 *         description: Some server error
 */

// DELETE from favorites
router.delete("/favorites", authenticateToken, removeFromFavorites);

module.exports = router;
