require("dotenv").config();
const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const {
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../middlewear/verifyToken");
const product = require("../models/Product");


// Updating' a user
router.put("/:id", verifyToken, async (req, res) => {
  // be4 updating we will be checking the password again cause user can change the password so I will be encrypting it again
  if (req.body.userPassword) {
    req.body.userPassword = CryptoJS.AES.encrypt(
      req.body.userPassword,
      process.env.PASSWORD_SECRET
    ).toString();
  }
  //    after the encryption we will be updating the user

  try {
    //   first i will be find the user Id the i will write a function of what i will be updating
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        //this how we update the user by say $set ,what this basically does is take everything in the request body and set it to those values
        $set: req.body,
        // this wont return the updatedUser to provent this we need to add {new:true} after
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete A User
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get A User
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { userPassword, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
  const users = await User.find();
    res.status(200).json(users);
    console.log(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// USER CART

// Create a Product
router.post(
  "/cart/:id",
  [verifyToken],
  async (req, res) => {
    const user = await User.findById(req.users._id);
    // product info
    var productId = req.product._id;
    var productTitle = req.products.productTitle;
    var productCategory = req.products.productCategory;
    var productDescription = req.products.productDescription;
    var productImage = req.products.productImage;
    var productPrice = req.products.productPrice;
    var productColor = req.products.productColor;
    var productSize = req.products.productSize;
    var productQuantity = req.body;
    var createdBy = req.user._id;

    try {
   const usercart = new User.Cart.push({
        productId,
        productTitle,
        productCategory,
        productDescription,
        productImage,
        productPrice,
        productColor,
        productSize,
        productQuantity,
        createdBy,
      });
      const cart = await User.Cart.save();
      console.log(cart);
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);


module.exports = router;
