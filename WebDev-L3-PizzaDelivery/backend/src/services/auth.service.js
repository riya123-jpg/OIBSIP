const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const tokenModel = require("../models/verificationToken.model");
const {
  sendVerificationEmail,
  sendPasswordResetEmail,
} = require("./email.service");
const resetPasswordModel = require("../models/passwordResetToken.model");

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
  console.log("USER FOUND:", userExists);

  if (!/\d/.test(password)) {
    throw new Error("Password must contain at least one number");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username: normalizedUsername,
    email: normalizedEmail,
    passwordHash,
  });
  //raw token generate
  const rawToken = crypto.randomBytes(32).toString("hex");

  //hash token generate
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

  //expireAt
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  //save verification token
  const verificationToken = await tokenModel.create({
    userId: user._id,
    tokenHash,
    expiresAt,
  });

  console.log("TOKEN SAVED:", verificationToken._id);

  await sendVerificationEmail({
    email: user.email,
    username: user.username,
    rawToken,
  });

  return {
    id: user._id,
    username: user.username,
    email: user.email,
  };
}

async function loginUserService({ identifier, password }) {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const user = await userModel.findOne({
    $or: [{ email: normalizedIdentifier }, { username: normalizedIdentifier }],
  });

  if (!user) {
    throw new Error("Invalid username/email or password");
  }

  const comparePassword = await bcrypt.compare(password, user.passwordHash);

  if (!comparePassword) {
    throw new Error("Invalid username/email or password");
  }

  if (user.isEmailVerified === false) {
    throw new Error("Please verify your email before login");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
}

async function verifyEmailService(token) {
  if (!token) {
    throw new Error("invalid verification token");
  }

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const verifyToken = await tokenModel.findOne({ tokenHash });

  if (!verifyToken) {
    throw new Error("invalid or expired verification link");
  }

  const now = new Date();

  if (verifyToken.expiresAt < now) {
    throw new Error("verification link expired");
  }
  const user = await userModel.findById(verifyToken.userId);

  user.isEmailVerified = true;

  await user.save();

  await verifyToken.deleteOne();
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
  };
}

async function resendVerificationServices({ email }) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await userModel.findOne({
    email: normalizedEmail,
  });

  if (!user) {
    return;
  }
  if (user.isEmailVerified) {
    throw new Error("email is already verified");
  }

  await tokenModel.deleteMany({
    userId: user._id,
  });

  const rawToken = await crypto.randomBytes(32).toString("hex");

  const tokenHash = await crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  await tokenModel.create({
    userId: user._id,
    tokenHash,
    expiresAt,
  });
  await sendVerificationEmail({
    email: user.email,
    username: user.username,
    rawToken,
  });
}

async function forgetPasswordService({ email }) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await userModel.findOne({ email: normalizedEmail });

  if (!user) {
    return;
  }
  //delete old reset token
  await resetPasswordModel.deleteMany({
    userId: user._id,
  });
  const rawToken = crypto.randomBytes(32).toString("hex");

  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  await resetPasswordModel.create({
    userId: user._id,
    tokenHash,
    expiresAt,
  });

  await sendPasswordResetEmail({
    email: user.email,
    username: user.username,
    rawToken,
  });
}

async function resetPasswordService({ token, newPassword }) {
  if (!token) {
    throw new Error("failed to reset the password");
  }

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const verifyToken = await resetPasswordModel.findOne({ tokenHash });

  console.log(verifyToken);

  if (!verifyToken) {
    throw new Error("Invalid or expired reset link");
  }

  const now = new Date();

  if (verifyToken.expiresAt < now) {
    throw new Error("verification link expired");
  }

  const user = await userModel.findById(verifyToken.userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (!newPassword) {
    throw new Error("password is required");
  }

  if (newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  if (!/\d/.test(newPassword)) {
    throw new Error("Password must contain at least one number");
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  user.passwordHash = passwordHash;

  await user.save();
  await verifyToken.deleteOne();

  return {
    id: user._id,
    username: user.username,
    email: user.email,
  };
}

module.exports = {
  registerUserService,
  loginUserService,
  verifyEmailService,
  resendVerificationServices,
  forgetPasswordService,
  resetPasswordService,
};
