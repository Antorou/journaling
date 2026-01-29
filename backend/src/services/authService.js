const User = require('../models/User');
const generateToken = require('../config/generateToken');

const registerUser = async (userData) => {
  const { name, email, password } = userData;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('Cet utilisateur existe déjà');
  }

  const user = await User.create({ name, email, password });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Email ou mot de passe incorrect');
  }
};

module.exports = { registerUser, loginUser };