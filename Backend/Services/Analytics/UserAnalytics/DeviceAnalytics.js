let Model = require("../../../Model/Auth");

let DeviceAnalytics = async (EndDate) => {
  try {
    let DevicesType = await Model.aggregate([
      {
        $match: {
          CreatedAt: { $lte: EndDate },
          DeviceType: {
            $in: ["desktop", "mobile", "tablet"],
          },
        },
      },
      {
        $group: {
          _id: "$DeviceType",
          users: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          device: "$_id",
          users: 1,
        },
      },
    ]);

    return DevicesType;
  } catch (error) {
    console.error("Device Analytics Error:", error);
    throw error;
  }
};

module.exports = DeviceAnalytics;
