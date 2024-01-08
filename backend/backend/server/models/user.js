const mongoose = require("mongoose");

let userSchema = new mongoose.Schema([
  {
    username: { type: String },
    role: { type: String },
    email: { type: String },
    password: { type: String },
  },
]);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
