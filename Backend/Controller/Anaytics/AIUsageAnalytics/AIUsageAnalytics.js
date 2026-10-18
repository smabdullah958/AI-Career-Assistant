const NonNegativeAnalytics = require("../../../Services/Analytics/NonNegativeAnalytics");
let TotalAICalls = require("../../../Services/Analytics/AIUsageAnalytics/TotalAICalls");
let AICallsByFeature = require("../../../Services/Analytics/FeatureUsage/RangeFeatureUsage"); //for feature usage in a specific range

let {
  WeeklyAICallsTrend,
  MonthlyAICallsTrend,
  YearlyAICallsTrend,
} = require("../../../Services/Analytics/AIUsageAnalytics/AICallsTrend");

let SuccessRatio = require("../../../Services/Analytics/AIUsageAnalytics/SuccessRatio");

let AverageFeatureUsage = require("../../../Services/Analytics/AIUsageAnalytics/AverageFeatureUsage ");

let AIUsageAnalytics = async (req, res) => {
  try {
    let Peroid = req.query.period;
    if (Peroid === "7d") {
      let [
        Total_AI_Calls,
        AI_Calls_By_Feature,
        AI_Calls_Trend,
        Success_Ratio,
        Average_Feature_Usage,
      ] = await Promise.all([
        TotalAICalls(),
        AICallsByFeature("7daysAgo", "yesterday"),
        WeeklyAICallsTrend("7daysAgo", "yesterday"),
        SuccessRatio("7daysAgo", "yesterday"),
        AverageFeatureUsage("7daysAgo", "yesterday"),
      ]);
      res.status(200).json(NonNegativeAnalytics({
        Total_AI_Calls,
        AI_Calls_By_Feature,
        AI_Calls_Trend,
        Success_Ratio,
        Average_Feature_Usage,
      }));
    }

    if (Peroid === "30d") {
      let [
        Total_AI_Calls,
        AI_Calls_By_Feature,
        AI_Calls_Trend,
        Success_Ratio,
        Average_Feature_Usage,
      ] = await Promise.all([
        TotalAICalls(),
        AICallsByFeature("30daysAgo", "yesterday"),
        MonthlyAICallsTrend("30daysAgo", "yesterday"),
        SuccessRatio("30daysAgo", "yesterday"),
        AverageFeatureUsage("30daysAgo", "yesterday"),
      ]);
      res.status(200).json(NonNegativeAnalytics({
        Total_AI_Calls,
        AI_Calls_By_Feature,
        AI_Calls_Trend,
        Success_Ratio,
        Average_Feature_Usage,
      }));
    }

    if (Peroid === "1y") {
      let [
        Total_AI_Calls,
        AI_Calls_By_Feature,
        AI_Calls_Trend,
        Success_Ratio,
        Average_Feature_Usage,
      ] = await Promise.all([
        TotalAICalls(),
        AICallsByFeature("365daysAgo", "yesterday"),
        YearlyAICallsTrend("365daysAgo", "yesterday"),
        SuccessRatio("365daysAgo", "yesterday"),
        AverageFeatureUsage("365daysAgo", "yesterday"),
      ]);
      res.status(200).json(NonNegativeAnalytics({
        Total_AI_Calls,
        AI_Calls_By_Feature,
        AI_Calls_Trend,
        Success_Ratio,
        Average_Feature_Usage,
      }));
    }
  } catch (error) {
    console.error("Error fetching feature analytics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = AIUsageAnalytics;
