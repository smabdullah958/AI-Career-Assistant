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
        AICallsByFeature("7daysAgo", "today"),
        WeeklyAICallsTrend("7daysAgo", "today"),
        SuccessRatio("7daysAgo", "today"),
        AverageFeatureUsage("7daysAgo", "today"),
      ]);
      res.status(200).json({
        Total_AI_Calls,
        AI_Calls_By_Feature,
        AI_Calls_Trend,
        Success_Ratio,
        Average_Feature_Usage,
      });
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
        AICallsByFeature("30daysAgo", "today"),
        MonthlyAICallsTrend("30daysAgo", "today"),
        SuccessRatio("30daysAgo", "today"),
        AverageFeatureUsage("30daysAgo", "today"),
      ]);
      res.status(200).json({
        Total_AI_Calls,
        AI_Calls_By_Feature,
        AI_Calls_Trend,
        Success_Ratio,
        Average_Feature_Usage,
      });
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
        AICallsByFeature("365daysAgo", "today"),
        YearlyAICallsTrend("365daysAgo", "today"),
        SuccessRatio("365daysAgo", "today"),
        AverageFeatureUsage("365daysAgo", "today"),
      ]);
      res.status(200).json({
        Total_AI_Calls,
        AI_Calls_By_Feature,
        AI_Calls_Trend,
        Success_Ratio,
        Average_Feature_Usage,
      });
    }
  } catch (error) {
    console.error("Error fetching feature analytics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = AIUsageAnalytics;
