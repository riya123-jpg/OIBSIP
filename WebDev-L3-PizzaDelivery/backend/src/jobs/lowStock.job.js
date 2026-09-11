// scheduled background process

const cron = require("node-cron");
const {
  checkLowStockItems,
  markLowStockAlertSent,
} = require("../services/inventory.service");
const { sendLowStockEmail } = require("../services/email.service");

async function checkLowStockJob() {
  //low stock item

  const lowStockItems = await checkLowStockItems();
  if (!lowStockItems.length) {
    return;
  }
  await sendLowStockEmail(lowStockItems);

  await markLowStockAlertSent(lowStockItems);
}

async function startLowStockJob() {
  cron.schedule("* * * * *", async () => {
    try {
      await checkLowStockJob();
    } catch (err) {
      console.error("Low stock job failed:", error);
    }
  });
}

module.exports = { startLowStockJob };
