const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/auth.route");
const pizzaRoute = require("./routes/pizza.route");
const orderRoute = require("./routes/order.route");
const paymentRoute = require("./routes/payment.route");
const adminRoute = require("./routes/admin.route");

const cookieParser = require("cookie-parser");

// global middleware
const app = express();
app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRoute);

app.use("/api", pizzaRoute);

app.use("/api/orders", orderRoute);

app.use("/api/payments", paymentRoute);

app.use("/api/admin", adminRoute);

module.exports = app;
