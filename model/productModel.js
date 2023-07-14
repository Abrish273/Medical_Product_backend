const mongoose = require("mongoose");

const MedicalProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    productionDate: {
      type: Date,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    dosageForm: {
      type: String,
      required: true,
    },
    storageConditions: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "/uploads/example.jpeg",
    },
  },
  { timestamps: true }
);

const MedicalProduct = mongoose.model("MedicalProduct", MedicalProductSchema);

module.exports = MedicalProduct;
