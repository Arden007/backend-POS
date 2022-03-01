const router = require("express").Router();
const Product = require("../models/Product");

// Create a Product
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Updating' a Product
router.put("/:id", async (req, res) => {
  try {
    //   first i will be find the user Id the i will write a function of what i will be updating
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        //this how we update the user by say $set ,what this basically does is take everything in the request body and set it to those values
        $set: req.body,
        // this wont return the updatedUser to provent this we need to add {new:true} after
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete A Product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get A Product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all Product
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
