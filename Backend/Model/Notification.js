let mongoose = require("mongoose");

let Sch = new mongoose.Schema(
  {
    recipientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    type: {
      type: String,
      required: true,
      enum: [
        "Account_Created",
        "Low_Credits",
        "New_User",
        "Monthly_Report",
        "Weekly_Report",
      ],
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

let NotificationModel = mongoose.model("Notification", Sch);

module.exports = NotificationModel;
