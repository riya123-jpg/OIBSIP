const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const session = require("express-session");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  }),
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  }),
);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Authentication API is running",
  });
});

app.use("/api/auth", authRoutes);

module.exports = app;
