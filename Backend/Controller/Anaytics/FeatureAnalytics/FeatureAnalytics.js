const NonNegativeAnalytics = require("../../../Services/Analytics/NonNegativeAnalytics");
let TotalFeatureUsage = require("../../../Services/Analytics/FeatureUsage/TotalFeatureUsage"); //for overall feature usage
let RangeFeatureUsage = require("../../../Services/Analytics/FeatureUsage/RangeFeatureUsage"); //for feature usage in a specific range
let {
  WeeklyFeatureUsage,
  MonthlyFeatureUsage,
  YearlyFeatureUsage,
} = require("../../../Services/Analytics/FeatureUsage/FeatureUsageOverTime"); //feature usage over time and slo it is reutrn a date and day

let FeatureAnalytics = async (req, res) => {
  try {
    let Peroid = req.query.period;
    if (Peroid === "7d") {
      let [Total_Feature_Usage, Range_Feature_Usage, Feature_Usage_Over_Time] =
        await Promise.all([
          TotalFeatureUsage(),
          RangeFeatureUsage("7daysAgo", "yesterday"),
          WeeklyFeatureUsage("7daysAgo", "yesterday"),
        ]);
      res.status(200).json(NonNegativeAnalytics({
        Total_Feature_Usage,
        Range_Feature_Usage,
        Feature_Usage_Over_Time,
      }));
    }

    if (Peroid === "30d") {
      let [Total_Feature_Usage, Range_Feature_Usage, Feature_Usage_Over_Time] =
        await Promise.all([
          TotalFeatureUsage(),
          RangeFeatureUsage("30daysAgo", "yesterday"),
          MonthlyFeatureUsage("30daysAgo", "yesterday"),
        ]);
      res.status(200).json(NonNegativeAnalytics({
        Total_Feature_Usage,
        Range_Feature_Usage,
        Feature_Usage_Over_Time,
      }));
    }

    if (Peroid === "1y") {
      let [Total_Feature_Usage, Range_Feature_Usage, Feature_Usage_Over_Time] =
        await Promise.all([
          TotalFeatureUsage(),
          RangeFeatureUsage("365daysAgo", "yesterday"),
          YearlyFeatureUsage("365daysAgo", "yesterday"),
        ]);
      res.status(200).json(NonNegativeAnalytics({
        Total_Feature_Usage,
        Range_Feature_Usage,
        Feature_Usage_Over_Time,
      }));
    }
  } catch (error) {
    console.error("Error fetching feature analytics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = FeatureAnalytics;
