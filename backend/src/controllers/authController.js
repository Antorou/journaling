const asyncHandler = require('../middlewares/asyncHandler');
const authService = require('../services/authService');

const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);
  res.status(201).json({ success: true, data: user });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUser(email, password);
  res.status(200).json({ success: true, data: user });
});

module.exports = { register, login };