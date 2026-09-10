const userModel = require("../models/user.model");
const {
  registerUserService,
  loginUserService,
  verifyEmailService,
  forgetPasswordService,
  resetPasswordService,
  resendVerificationServices,
} = require("../services/auth.service");

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const result = await registerUserService({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "user registered successfully",
      user: {
        id: result.id,
        username: result.username,
        email: result.email,
      },
    });
  } catch (Err) {
    console.log("something wrong in register", Err);
    res.status(500).json({
      message: Err.message,
    });
  }
}

async function loginUser(req, res) {
  try {
    const { identifier, password } = req.body;
    const result = await loginUserService({
      identifier,
      password,
    });

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(200).json({
      success: true,
      message: "user logged in successfully",
      user: {
        id: result.user.id,
        username: result.user.username,
        email: result.user.email,
        role: result.user.role,
      },
    });
  } catch (err) {
    console.log("error in login ", err);
    res.status(500).json({
      message: err.message,
    });
  }
}

async function verifyEmail(req, res) {
  try {
    const { token } = req.query;

    const result = await verifyEmailService(token);

    res.status(200).json({
      success: true,
      message: "email verified successfully",
      user: result,
    });
  } catch (err) {
    console.log("email verification error : ", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function resendVerification(req, res) {
  try {
    const { email } = req.body;
    const result = await resendVerificationServices({ email });

    res.status(200).json({
      success: true,
      message:
        "If an account exists for this email, a verification link has been sent.",
    });
  } catch (err) {
    console.log("error in resendVerification ", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const result = await forgetPasswordService({ email });
    res.status(200).json({
      success: true,
      message:
        "If an account exists for this email, a password reset link has been sent.",
      user: result,
    });
  } catch (err) {
    console.log("error in forget-password : ", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;
    const result = await resetPasswordService({
      token,
      newPassword,
    });
    res.status(201).json({
      success: true,
      message: "password reset successfully",
      user: result,
    });
  } catch (err) {
    console.log("error in reset password : ", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function getMe(req, res) {
  const id = req.user.userId;
  const user = await userModel.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  const safeUser = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
  };

  res.status(200).json({
    success: true,
    message: "user fetched successfully",
    user: safeUser,
  });
}

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  getMe,
};
