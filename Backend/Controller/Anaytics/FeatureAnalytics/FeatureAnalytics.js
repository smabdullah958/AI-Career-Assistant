let TotalFeatureUsage = require("../../../Services/Analytics/FeatureUsage/TotalFeatureUsage"); //for overall feature usage
let RangeFeatureUsage = require("../../../Services/Analytics/FeatureUsage/RangeFeatureUsage"); //for feature usage in a specific range

let FeatureAnalytics = async (req, res) => {
  try {
    let Peroid = req.query.period;
    if (Peroid === "7d") {
      let [Total_Feature_Usage, Range_Feature_Usage] = await Promise.all([
        TotalFeatureUsage(),
        RangeFeatureUsage("7daysAgo", "today"),
      ]);
      res.status(200).json({
        Total_Feature_Usage,
        Range_Feature_Usage,
      });
    }

    if (Peroid === "30d") {
      let [Total_Feature_Usage, Range_Feature_Usage] = await Promise.all([
        TotalFeatureUsage(),
        RangeFeatureUsage("30daysAgo", "today"),
      ]);
      res.status(200).json({
        Total_Feature_Usage,
        Range_Feature_Usage,
      });
    }

    if (Peroid === "1y") {
      let [Total_Feature_Usage, Range_Feature_Usage] = await Promise.all([
        TotalFeatureUsage(),
        RangeFeatureUsage("365daysAgo", "today"),
      ]);
      res.status(200).json({
        Total_Feature_Usage,
        Range_Feature_Usage,
      });
    }
  } catch (error) {
    console.error("Error fetching feature analytics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = FeatureAnalytics;
