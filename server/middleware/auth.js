const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ msg: "Please login" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decodedToken.user.email });
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ msg: "Session expired. Please login again." });
  }
};
