/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *         - phoneNumber
 *         - address
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user.
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           description: The password of the user.
 *           example: "password"
 *         firstName:
 *           type: string
 *           description: The first name of the user.
 *           example: "John"
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *           example: "Doe"
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the user.
 *           example: "1234567890"
 *         address:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *               description: The street of the user's address.
 *               example: "Main St"
 *             number:
 *               type: string
 *               description: The number of the user's address.
 *               example: "123"
 *             postalCode:
 *               type: string
 *               description: The postal code of the user's address.
 *               example: "12345"
 *             city:
 *               type: string
 *               description: The city of the user's address.
 *               example: "City"
 *             country:
 *               type: string
 *               description: The country of the user's address.
 *               example: "Country"
 *         role:
 *           type: string
 *           enum: ["user", "admin"]
 *           description: The role of the user.
 *           example: "user"
 *         favorites:
 *           type: array
 *           items:
 *             type: string
 *           description: The favorites of the user.
 *           example: []
 *         shoppingCart:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The product ID in the shopping cart.
 *                 example: "1234567890abcdef"
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product in the shopping cart.
 *                 example: 1
 *           description: The shopping cart of the user.
 *           example: []
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was created.
 *           example: "2022-01-01T00:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was last updated.
 *           example: "2022-01-01T00:00:00Z"
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      number: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    favorites: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    shoppingCart: {
      type: [
        {
          productId: String,
          quantity: Number,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.register = async function (userInformation) {
  const { password } = userInformation;
  const { email } = userInformation;

  const found = await this.findOne({ email: email });

  if (found) {
    throw Error("⚠ Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await this.create({
    ...userInformation,
    password: hashedPassword,
  });

  return user;
};

userSchema.statics.login = async function (email, password, googleLogin) {
  if (googleLogin) return await this.findOne({ email: email });

  if (!email || !password) {
    throw Error("⚠ Please provide email and password");
  }

  const user = await this.findOne({ email: email });

  if (!user) {
    throw Error("⚠ No user found, please register");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("⚠ Incorrect password");
  }

  return user;
};

userSchema.statics.updateUser = async function (userInformation) {
  const { password, firstName, lastName, phoneNumber } = userInformation;
  const { street, number, postalCode, city, country } = userInformation.address;

  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const updateData = {
    ...(password && { password: hashedPassword }),
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    ...(phoneNumber && { phoneNumber }),
    ...(street && { "address.street": street }),
    ...(number && { "address.number": number }),
    ...(postalCode && { "address.postalCode": postalCode }),
    ...(city && { "address.city": city }),
    ...(country && { "address.country": country }),
  };

  try {
    let user = await this.findOneAndUpdate(
      { email: userInformation.email },
      { $set: updateData },
      { new: true }
    );

    return user;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = mongoose.model("User", userSchema);
