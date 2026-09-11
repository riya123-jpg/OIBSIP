//what email should be sent
const transporter = require("../config/mail");

async function sendVerificationEmail({ email, username, rawToken }) {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${rawToken}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Verify your pizza delivery account`,
    html: `
    <h2>Hello ${username}</h2>
    <p>Please verify your email address.</p>
    <a href="${verificationUrl}">
      Verify Email
    </a>
    <p>This link expires in 30 minutes.</p>
    `,
  });
}

async function sendPasswordResetEmail({ email, username, rawToken }) {
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset your Pizza Delivery password",
    html: `
      <h2>Hello ${username}</h2>

      <p>We received a request to reset your password.</p>

      <p>
        <a href="${resetPasswordUrl}">
          Reset Password
        </a>
      </p>

      <p>This link expires in 30 minutes.</p>

      <p>If you did not request this, you can ignore this email.</p>
    `,
  });
}

async function sendLowStockEmail(lowStockItems) {
  if (!lowStockItems.length) {
    return;
  }

  const emailContent = lowStockItems
    .map(
      (item) => `
      <div>
        <h3>${item.name}</h3>
        <p>Current Stock: ${item.stock}</p>
        <p>Threshold: ${item.lowStockThreshold}</p>
      </div>
    `,
    )
    .join("");

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "Low Stock Alert - Pizza Platform",
    html: `
      <h2>Low Stock Alert</h2>
      <p>
        The following inventory items are below their configured threshold:
      </p>

      ${emailContent}
    `,
  });
}
module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendLowStockEmail,
};
