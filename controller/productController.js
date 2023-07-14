const ProductModel = require("../model/productModel.js");
const mongoose = require("mongoose");

// get all products
const getProducts = async (req, res) => {
  const products = await ProductModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(products);
};
//get single product
const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Product" });
  }
  const product = await ProductModel.findById(id);
  if (!product) {
    return res.status(404).json({ error: "No such Product" });
  }
  response.status(200).json(product);
};

//Image upload function
const uploadImage = async (req, res, next) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "No File Uploaded" });
    }

    const productImage = req.files.image;

    if (!productImage.mimetype.startsWith("image")) {
      return res.status(400).json({ error: "Please Upload Image" });
    }

    const maxSize = 1024 * 1024;

    if (productImage.size > maxSize) {
      return res
        .status(400)
        .json({ error: "Please upload image smaller than 1MB" });
    }

    const imagePath = path.join(
      __dirname,
      "../public/uploads/",
      productImage.name
    );

    await productImage.mv(imagePath);

    req.imagePath = `/uploads/${productImage.name}`;
    next();
  } catch (error) {
    next(error);
  }
};

// create new product
const createProduct = async (req, res) => {
  const {
    name,
    manufacturer,
    description,
    price,
    expiryDate,
    productionDate,
    ingredients,
    dosageForm,
    storageConditions,
  } = req.body;

  let emptyFields = []; // all fields are required we use this to check if there is an empty field and to respond to the frontend
  if (!name) {
    emptyFields.push("name");
  }
  if (!manufacturer) {
    emptyFields.push("manufacturer");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!price) {
    emptyFields.push("price");
  }
  if (!expiryDate) {
    emptyFields.push("expiryDate");
  }
  if (!productionDate) {
    emptyFields.push("productionDate");
  }
  if (!ingredients) {
    emptyFields.push("ingredients");
  }
  if (!dosageForm) {
    emptyFields.push("dosageForm");
  }
  if (!storageConditions) {
    emptyFields.push("storageConditions");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all fields", emptyFields });
  }

  try {
    const product = await ProductModel.create({
      name,
      manufacturer,
      description,
      price,
      expiryDate,
      productionDate,
      ingredients,
      dosageForm,
      storageConditions,
      image: req.imagePath, // Retrieve the image path from the req object
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a single product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Product" });
  }
  const product = await ProductModel.findOneAndDelete({ _id: id });
  if (!product) {
    res.status(404).json({ error: "No such Product" });
  }
  res.status(200).json({ product });
};

//update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Product" });
  }
  const product = await ProductModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!product) {
    res.status(404).json({ error: "No such Product" });
  }
  res.status(200).json({ product });
};

module.exports = {
  getProducts,
  getProduct,
  uploadImage,
  createProduct,
  updateProduct,
  deleteProduct,
};
