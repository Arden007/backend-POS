const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const autherHeader = req.headers.token;
  if (autherHeader) {
    const token = autherHeader.split(" ")[1];
    // we verify the in info and then other return an err or data
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(token);
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not Authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json("You are not Authorizated!");
    }
  });
};

module.exports = { verifyTokenAndAuthorization };
