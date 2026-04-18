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
    required: true,
    min: 6,
  },
  Role: {
    type: String,
    enum: ["User"],
  },
});

let model = mongoose.model("user", Schema);

module.exports = model;
