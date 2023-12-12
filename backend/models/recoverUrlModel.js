/**
 * @swagger
 * components:
 *   schemas:
 *     RecoverUrl:
 *       type: object
 *       required:
 *         - email
 *         - url
 *       properties:
 *         email:
 *           type: string
 *           description: The email address associated with the recovery URL.
 *           example: "user@example.com"
 *         url:
 *           type: string
 *           description: The recovery URL.
 *           example: "http://example.com/recover/1234567890abcdef"
 *         expiresAt:
 *           type: string
 *           format: date-time
 *           description: The expiration date of the recovery URL.
 *           example: "2022-01-01T00:00:00Z"
 */

const mongoose = require("mongoose");
const crypto = require("crypto");

const recoverUrlSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    default: function () {
      return crypto.randomBytes(20).toString("hex");
    },
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    index: { expires: "1h" },
  },
});

recoverUrlSchema.statics.createUrl = async function (email) {
  try {
    console.log("email", email)
    const url = await this.create({ email });
    return url.url;
  } catch (error) {
    throw Error("⚠ Error creating url");
  }
};

recoverUrlSchema.statics.findUrl = async function (url) {
  try {
    return await this.findOne({ url });
  } catch (error) {
    throw Error("⚠ Error finding url");
  }
};

recoverUrlSchema.statics.deleteUrl = async function (url) {
  try {
    return await this.deleteOne({ url });
  } catch (error) {
    throw Error("⚠ Error deleting url");
  }
};

module.exports = mongoose.model("RecoverUrl", recoverUrlSchema);
