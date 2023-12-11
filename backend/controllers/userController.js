require("dotenv").config();
const User = require("../models/userModel");
const RecoverUrl = require("../models/recoverUrlModel");
const sendEmail = require("../utils/mailer");
const bcrypt = require("bcrypt");
const RefreshToken = require("../models/refreshTokenModel");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const registerUser = async (req, res) => {
  try {
    const user = await User.register(req.body);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password, googleLogin } = req.body;

  try {
    const user = await User.login(email, password, googleLogin);

    const accessToken = createToken(user._id);
    const refreshToken = await RefreshToken.createToken(user._id);

    return res.status(200).json({
      user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.updateUser(req.body);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const findUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "⚠ User not found, please register" });
    }

    return res.status(200).json({ user, accessToken: req.accessToken });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const addToFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "⚠ Please login or register" });
    }

    const { favorites } = user;
    const { product } = req.body;

    product && favorites.push(product);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { favorites },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "⚠ User not found, please register" });
    }

    const { favorites } = user;
    const { productId } = req.body;

    const productIndex = favorites.findIndex(
      (product) => product._id === productId
    );

    if (productIndex !== -1) {
      favorites.splice(productIndex, 1);
    } else {
      return res.status(400).json({ message: "⚠ Product is not in favorites" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { favorites },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const createUrl = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "⚠ Please provide email" });
  }

  try {
    const url = await RecoverUrl.create({ email });

    const link = `${process.env.CLIENT_URL}/recover-password/${url.url}`;

    await sendEmail(
      email,
      "Password Recovery",
      `Your recovery URL is: ${link}`
    );

    return res.status(200).json({ message: "Email sent and url created" });
  } catch (error) {
    throw Error("⚠ Error creating url");
  }
};

const recoverPassword = async (req, res) => {
  const { url } = req.params;
  const { password } = req.body;

  try {
    const recoverData = await RecoverUrl.findUrl(url);

    if (!recoverData) {
      return res.status(404).json({ message: "⚠ Url not found" });
    }

    // validate url and return if url is valid
    if (recoverData && !password) {
      return res.status(200).json({ message: "⚠ Url found" });
    }

    if (!password) {
      return res.status(400).json({ message: "⚠ Please provide password" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOneAndUpdate(
      { email: recoverData.email },
      { password: hashedPassword },
      { new: true }
    );

    await RecoverUrl.deleteUrl(url);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  findUserById,
  addToFavorites,
  removeFromFavorites,
  createUrl,
  recoverPassword,

};
