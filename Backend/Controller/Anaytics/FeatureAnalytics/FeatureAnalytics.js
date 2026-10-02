let TotalFeatureUsage = require("../../../Services/Analytics/FeatureUsage/TotalFeatureUsage");

let FeatureAnalytics = async (req, res) => {
  try {
    let Peroid=req.query.period
    let Total_Feature_Usage = await TotalFeatureUsage();
    res.status(200).json({
      Total_Feature_Usage,
    });
  } catch (error) {
    console.error("Error fetching feature analytics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = FeatureAnalytics;
