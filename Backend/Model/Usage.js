let mongoose = require("mongoose");

let Sch = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  LastCallDate: {
    type: String,
    requried: true,
  },
  ApiCallCount: {
    type: Number,
    default: 10,
  },
});

let UsageModel = mongoose.model("DailyUsage", Sch);

module.exports = UsageModel;
