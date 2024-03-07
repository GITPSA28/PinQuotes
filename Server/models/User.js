const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dpurl: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: false,
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
