require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
const { startLowStockJob } = require("./src/jobs/lowStock.job");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();

    startLowStockJob();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

startServer();
