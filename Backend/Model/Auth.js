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
});

let model = mongoose.model("user", Schema);

module.exports = model;
