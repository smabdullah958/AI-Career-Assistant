let mongoose = require("mongoose");

let Schema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    default: null,
  },
  Role: {
    type: String,
    enum: ["User"],
  },
  GoogleId: {
    type: String,
  },
  Provider: {
    type: String,
    enum: ["Local", "Google"],
    default: "Local",
  },
});

let model = mongoose.model("user", Schema);

module.exports = model;
