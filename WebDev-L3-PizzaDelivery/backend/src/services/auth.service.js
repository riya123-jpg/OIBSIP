const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
async function registerUserService({ username, email, password }) {
  const normalizedUsername = username.trim().toLowerCase();
  const normalizedEmail = email.trim().toLowerCase();

  const userExists = await userModel.findOne({
    $or: [{ username: normalizedUsername }, { email: normalizedEmail }],
  });

  if (userExists) {
    throw new Error("username or email already exists");
  }

  if (!password) {
    throw new Error("password is required");
  }
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  if (!/\d/.test(password)) {
    throw new Error("Password must contain at least one number");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username: normalizedUsername,
    email: normalizedEmail,
    passwordHash,
  });
  return user;
}

module.exports = {
  registerUserService,
};
