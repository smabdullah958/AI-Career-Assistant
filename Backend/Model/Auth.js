let mongoose = require("mongoose");

let Schema = new mongoose.Schema(
  {
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
      enum: ["User", "Admin", "SuperAdmin"],
      default: "User",
    },
    GoogleId: {
      type: String,
    },
    Provider: {
      type: String,
      enum: ["Local", "Google"],
      default: "Local",
    },
    CreatedAt: {
      type: Date,
      default: Date.now,
    },

    LastActiveAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

let model = mongoose.model("user", Schema);

module.exports = model;
