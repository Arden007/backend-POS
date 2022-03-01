const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productTitle: {
      type: String,
      require: true,
      unique: true,
    },
    productCategory: {
      type: Array,
    },
    productDescription: {
      type: String,
      require: true,
    },
    productImage: {
      type: String,
      require: true,
    },
    productPrice: {
      type: Number,
      require: true,
    },
    productColor: {
      type: String,
    },
    productSize: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
