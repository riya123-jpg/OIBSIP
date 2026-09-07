const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tokenHash: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      expires: 0,
    },
  },
  {
    timestamps: true,
  },
);

const tokenModel = mongoose.model("Token", tokenSchema);

module.exports = tokenModel;
