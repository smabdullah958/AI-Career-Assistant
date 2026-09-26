let Model = require("../../../Model/Auth");

//active user
const {
  WeeklyActiveUser,
  MonthlyActiveUser,
  YearlyActiveUser,
} = require("../../../Services/Analytics/UserAnalytics/ActiveUser");

let UserAnalytics = async (req, res) => {
  try {
    let StartDate = new Date();
    let EndDate = new Date();
    EndDate.setDate(EndDate.getDate() - 1);
    let Period = req.query.period;

    //for weekly
    if (Period === "7d") {
      let result = await Promise.all([
        WeeklyActiveUser(StartDate, EndDate, Model),
      ]);
      console.log("so the weekly resturn data is : ", result);
      res.status(200).json(result);
    }

    //for monthly
    if (Period === "30d") {
      let result = await promise.all([
        MonthlyActiveUser(StartDate, EndDate, Model),
      ]);
      console.log("so the monthly resturn data is : ", result);
      res.status(200).json(result);
    }

    //for yearly
    if (Period === "1y") {
      let result = await promise.all([
        YearlyActiveUser(StartDate, EndDate, Model),
      ]);
      console.log("so the yearly resturn data is : ", result);
      res.status(200).json(result);
    }
  } catch (error) {
    console.log("interanl error has been occur ina  controller ", error);
  }
};

module.exports = UserAnalytics;
