const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/asyncHandler");

exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Username and password are required");
  }

  const user = await User.findOne({ username });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.password !== password) {
    res.status(401);
    throw new Error("Incorrect password");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.json({
    success: true,
    token,
    user: {
      username: user.username,
      role: user.role,
    },
  });
});
