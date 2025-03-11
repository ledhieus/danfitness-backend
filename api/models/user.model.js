const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  permission: { type: String, required: true },
  token: String,
  sessionToken: { type: String, default: null },
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  deleteAt: Date
});

module.exports = mongoose.model("User", userSchema, "user");
