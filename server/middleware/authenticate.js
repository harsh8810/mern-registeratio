const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const authenticate = async (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    return res
      .status(401)
      .json({ error: "no authoriztion Access denied. No token provided." });
  } else {
    const tokenArr = authorization.split(" ");
    var token = tokenArr[1];
    var str = token.substring(1, token.length - 1);

    console.log(`here is my token in middleware ${str}`);
  }

  try {
    const decoded = await jwt.verify(
      str,
      "HADHFHFHDIRNVKDNVIDNGINGKDFNDFNDKFDGNDKVNDJ"
    );
    const rootUser = await User.findOne({
      _id: decoded._id,
      "tokens.token": str,
    });
    req.user = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (error) {
    console.log(`this is error in auth - ${error}`);
    res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = authenticate;
