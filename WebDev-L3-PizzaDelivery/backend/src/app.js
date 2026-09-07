const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/auth.route");

// global middleware
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRoute);

module.exports = app;
