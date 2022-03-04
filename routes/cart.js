const router = require("express").Router();
const router = require("express").Router();
const Product = require("../models/Product");
const User = require("../models/User");
const { verifyTokenAndAuthorization } = require("../middlewear/verifyToken");



// Updating' a Product
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    //   first i will be find the user Id the i will write a function of what i will be updating
    const user = await User.findById(req.User._id);
    const inCart = users.Cart.some((prod) => prod.id === req.params.id);

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//updates the items in the users cart
router.put("/:id/cart", [auth, getProduct], async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const inCart = user.cart.some((prod) => prod._id == req.params.id);
  if (inCart) {
    product.quantity += req.body.quantity;
    const updatedUser = await user.save();
    try {
      res.status(201).json(updatedUser.cart);
    } catch (error) {
      res.status(500).json(console.log(error));
    }
  } else {
    try {
      // console.log(Array.isArray(user.cart))
      // user.cart = []
      let product_id = res.product._id;
      let title = res.product.title;
      let category = res.product.category;
      let img = res.product.img;
      let price = res.product.price;
      let quantity = req.body;
      let created_by = req.user._id;
      user.cart.push({
        product_id,
        title,
        category,
        img,
        price,
        quantity,
        created_by,
      });
      const updatedUser = await user.save();
      res.status(201).json(updatedUser.cart);
    } catch (error) {
      res.status(500).json(console.log(error));
    }
  }
});

// Delete A Product
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//clears the user cart
router.delete("/:id/cart", [auth, getProduct], async (req, res, next) => {});

//

module.exports = router;
