/**
 * @swagger
 * components:
 *   schemas:
 *     RefreshToken:
 *       type: object
 *       required:
 *         - token
 *         - user
 *       properties:
 *         token:
 *           type: string
 *           description: The refresh token.
 *           example: "1234567890abcdef"
 *         user:
 *           type: string
 *           description: The user associated with the refresh token.
 *           example: "user@example.com"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the refresh token was created.
 *           example: "2022-01-01T00:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the refresh token was last updated.
 *           example: "2022-01-01T00:00:00Z"
 */

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

refreshTokenSchema.statics.createToken = async function (_id) {
  try {
    const token = jwt.sign({ _id }, process.env.REFRESH_TOKEN_SECRET);
    const refreshToken = await this.create({ token, user: _id });
    return refreshToken.token;
  } catch (error) {
    throw new Error("⚠ Error creating refresh token");
  }
};

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
