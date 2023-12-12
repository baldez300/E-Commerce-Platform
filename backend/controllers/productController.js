const ProductModel = require("../models/productModel");
const { default: mongoose } = require("mongoose");

// Get all products
const getAllProducts = async (req, res) => {
  const productsData = await ProductModel.find({});

  res.status(200).json(productsData);
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const productsData = await ProductModel.find({ category: id });

    if (productsData.length === 0) {
      return res.status(404).json({ message: "Such category not found" });
    }

    res.status(200).json(productsData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get products by subcategory

const getProductsBySubcategory = async (req, res) => {
  try {
    const { id1, id2 } = req.params;
    const productsData = await ProductModel.find({
      category: id1,
      subcategory: id2,
    });

    if (productsData.length === 0) {
      return res.status(404).json({ message: "Such subcategory not found" });
    }

    res.status(200).json(productsData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No product with id: ${id}`);
  }

  const productData = await ProductModel.findById(id);

  if (!productData) {
    return res.status(404).json({ error: "Such product not found" });
  }

  res.status(200).json(productData);
};

// Create a new product
const createProduct = async (req, res) => {
  const productsData = req.body; // List of products
  const createdProducts = [];

  for (const item of productsData) {
    try {
      const {
        category,
        subcategory,
        productName,
        manufacturer,
        country,
        price,
        description,
        img,
        discount,
      } = item;
      const product = await ProductModel.create({
        category,
        subcategory,
        productName,
        manufacturer,
        country,
        price,
        description,
        img,
        discount,
      });

      createdProducts.push(product);
    } catch (error) {
      res.status(400).json({ merror: error.message });
    }
  }

  res.status(200).json({ message: "Successful creating", createdProducts });
};

// Update product by ID
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No product with id: ${id}`);
    }

    const productData = await ProductModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!productData) {
      return res.status(404).json({ error: "Such product not found" });
    }

    res
      .status(200)
      .json({ message: `Product id: ${id} is updated`, productData });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No product with id: ${id}`);
    }

    const productData = await ProductModel.findOneAndDelete({ _id: id });

    if (!productData) {
      return res.status(404).json({ error: "Such product not found" });
    }

    res
      .status(200)
      .json({ message: `Product id: ${id} is deleted`, productData });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const productsData = await ProductModel.deleteMany({ category: id });

    if (!productsData) {
      return res.status(404).json({ message: "Such category not found" });
    }

    res
      .status(200)
      .json({ message: `Category id: ${id} is deleted`, productsData });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete subcategory
const deleteSubcategory = async (req, res) => {
  try {
    const { id1, id2 } = req.params;
    const productsData = await ProductModel.deleteMany({
      category: id1,
      subcategory: id2,
    });

    if (!productsData) {
      return res.status(404).json({ message: "Such category not found" });
    }

    res.status(200).json({
      message: `Subcategory: ${id2} is deleted from category: ${id1}`,
      productsData,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProductsBySearch = async (req, res) => {
  try {
    const query = req.params.query;
    const productsData = await ProductModel.find({
      productName: new RegExp(query, "i"),
    });

    if (productsData.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(productsData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductsBySubcategory,
  getProductById,
  getProductsBySearch,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteCategory,
  deleteSubcategory,
};
