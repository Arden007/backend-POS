const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      unique: true,
    },
    userEmail: {
      type: String,
      require: true,
      unique: true,
    },
    userPassword: {
      type: String,
      require: true,
    },
    userContact: {
      type: "number",
      require: true,
    },
    Cart: {
      type: Array,
      require: true,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
