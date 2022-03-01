const express = require("express");
// now we got to let app allow us to USE express
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();


// next we need to set up our database connection
mongoose.connect(process.env.MANGO_CONNECT);
// now lets store that connection in a const
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected To DataBase"));

// This allows the server to accept Json
app.use(express.json());

// Lets SET-UP the routes our server is going to use
// USER ROUTER
const userRouter = require("./routes/user");
app.use("/users", userRouter);

// AUTH ROUTER
const authRouter = require("./middlewear/auth");
app.use("/auth", authRouter);


// POST ROUTER
const postRouter = require("./routes/product");
app.use("/products", postRouter);


app.listen(5000, () => console.log("Server Started!"));