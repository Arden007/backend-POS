// require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token || token == null)
    return res.status(401).send({ message: "User not logged in" });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) res.status(403).send({ message: err.message });
    // console.log("from auth: ", user)
    req.user = user;
    return next();
  });
}

module.exports = authenticateToken;

// REGISTER
router.post("/", async (req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPassword: CryptoJS.AES.encrypt(
      req.body.userPassword,
      process.env.PASSWORD_SECRET
    ).toString(),
    userContact: req.body.userContact,
  });

  try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    !user && res.status(401).json("Wrong Credentails!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.userPassword,
      process.env.PASSWORD_SECRET
    );
    const password = hashedPassword.toString(CryptoJS.enc.Utf8);

    password !== req.body.userPassword &&
      res.status(401).json("Wrong Credentails!");

    // create an access token with JWT where we store the Id of the user and isAdmin property , if it is Admin then they can delete any user and create any CRUD operations in our DB
    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      // lets set an expiredate on our acces token so we will have to login again
      { expiresIn: "3d" }
    );

    //This here will prevent the password from being sent
    // MongoDB stores our in info in a _doc folder so to display the info we requesting add ._doc after user
    // ...(is know as the spread operator which display your info more neatly and hide others when)
    const { userPassword, ...others } = user._doc;
    // when adding our accessToken to the request we need to wrap  it in an object
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
