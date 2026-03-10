const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/asyncHandler");

// REGISTER
exports.register = asyncHandler(async (req, res) => {
  const { username, email, password, role, branch } = req.body;

  if (!username || !email || !password || !role || !branch) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userExists = await User.findOne({ $or: [{ username }, { email }] });
  if (userExists) {
    res.status(400);
    throw new Error("User with this username or email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    branch,
    role,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: { id: user._id, username, email, role, branch },
  });
});

// LOGIN
exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Username and password are required");
  }

  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // Generate Token (Including branch for the middleware to use)
  const token = jwt.sign(
    { id: user._id, role: user.role, branch: user.branch, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  
  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      role: user.role,
      branch: user.branch,
    },
  });
});

// UPDATE USER
exports.updateUser = asyncHandler(async (req, res) => {
  const { username, email, password, role, branch } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (username) user.username = username;
  if (email) user.email = email;
  if (role) user.role = role;
  if (branch) user.branch = branch;
  
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();
  res.status(200).json({ success: true, user: updatedUser });
});

// DELETE USER
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({ success: true, message: "User deleted successfully" });
});

// GET ALL USERS 
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json({ success: true, users });
});
