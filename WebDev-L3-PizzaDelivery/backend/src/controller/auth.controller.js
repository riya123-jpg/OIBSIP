const { registerUserService } = require("../services/auth.service");

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

module.exports = {
  registerUser,
};
