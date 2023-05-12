const mongoose = require("mongoose");

const auth = new mongoose.Schema({
  email: { type: String, required: true },
  userId: { type: String, required: true },
  extraId: { type: String, default: null },
});

module.exports = mongoose.model("gauth", auth);
