const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  tokenId: {
    type: String,
    default: ""
  }, 
  expiresAt: {
    type: Date
  }
})

let userSchema = new mongoose.Schema([
  {
    username: { type: String },
    role: { type: String },
    email: { type: String },
    password: { type: String },
    token: tokenSchema
  },
]);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
