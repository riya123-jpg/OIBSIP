const bcrypt = require("bcrypt");
const { getUsers, saveUsers } = require("../data/user.data");
const { createUser } = require("../models/user.model");
async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }

    if (password.length < 8 || !/\d/.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain at least one number",
      });
    }
    const users = await getUsers();

    const userExists = users.find(
      (user) =>
        user.username.toLowerCase() === username.trim().toLowerCase() ||
        user.email.toLowerCase() === email.trim().toLowerCase(),
    );
    if (userExists) {
      return res.status(409).json({
        message: "user already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = createUser({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      hashPassword,
    });

    users.push(newUser);
    await saveUsers(users);

    return res.status(201).json({
      message: "registration successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.log("error in registration", err);
    return res.status(500).json({
      message: "something went wrong",
    });
  }
}

async function loginUser(req, res) {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }
    const users = await getUsers();
    const checkUser = users.find(
      (user) =>
        user.email.trim().toLowerCase() === identifier.trim().toLowerCase() ||
        user.username.trim().toLowerCase() === identifier.trim().toLowerCase(),
    );

    if (!checkUser) {
      return res.status(401).json({
        message: "user not found",
      });
    }
    console.log("entered password:", password);
    console.log("stored hash:", checkUser?.hashPassword);

    const checkPass = await bcrypt.compare(password, checkUser.hashPassword);
    if (!checkPass) {
      return res.status(401).json({
        message: "invalid crenditials",
      });
    }

    req.session.userId = checkUser.id;
    console.log("LOGIN USER ID:", checkUser.id);
    console.log("LOGIN SESSION:", req.session);

    return res.status(200).json({
      message: "login successfully",
      user: {
        id: checkUser.id,
        username: checkUser.username,
        email: checkUser.email,
      },
    });
  } catch (err) {
    console.log("login error", err);
    return res.status(500).json({
      message: "something went wrong",
    });
  }
}

async function getCurrentUser(req, res) {
  try {
    const userId = req.session.userId;

    const users = await getUsers();

    const checkUser = await users.find((user) => user.id === userId);

    if (!checkUser) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    return res.status(200).json({
      message: "user fetched successfully",
      user: {
        id: checkUser.id,
        username: checkUser.username,
        email: checkUser.email,
      },
    });
  } catch (err) {
    console.log("error in getme function");
    return res.status(500).json({
      message: "something went wrong",
    });
  }
}

async function logoutUser(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log("error in logout");
      return res.status(500).json({
        message: "something went wrong",
      });
    }
    return res.status(200).json({
      message: "user logout successfully",
    });
  });
}

module.exports = { registerUser, loginUser, getCurrentUser, logoutUser };
