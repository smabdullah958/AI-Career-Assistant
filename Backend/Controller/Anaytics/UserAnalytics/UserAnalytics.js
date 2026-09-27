let Model = require("../../../Model/Auth");

//active user
const {
  WeeklyActiveUser,
  MonthlyActiveUser,
  YearlyActiveUser,
} = require("../../../Services/Analytics/UserAnalytics/ActiveUser");

const {
  WeeklyNewUser,
  MonthlyNewUser,
  YearlyNewUser,
} = require("../../../Services/Analytics/UserAnalytics/NewUser");

const {
  WeeklyUserGrowth,
  MonthlyUserGrowth,
  YearlyUserGrowth,
} = require("../../../Services/Analytics/UserAnalytics/UserGrowth");

//In Active User
let InActiveUser = require("../../../Services/Analytics/UserAnalytics/InActiveUser");

//RetentionRate
let RetentionRate = require("../../../Services/Analytics/UserAnalytics/RetentionRate");

//total User
let TotalUser = require("../../../Services/Analytics/UserAnalytics/TotalUser");

//analtyice the user device
let DeviceAnalytics = require("../../../Services/Analytics/UserAnalytics/DeviceAnalytics");

//analyze user by teir country
let UserByCountry = require("../../../Services/Analytics/UserAnalytics/UserByCountry");

let UserAnalytics = async (req, res) => {
  try {
    let StartDate = new Date();
    let EndDate = new Date();
    EndDate.setDate(EndDate.getDate());
    let Period = req.query.period;

    //for weekly
    if (Period === "7d") {
      let [
        Active_User,
        Total_User,
        New_User,
        User_Growth,
        Device_Analytics,
        UserBy_Country,
      ] = await Promise.all([
        WeeklyActiveUser(Model, StartDate, EndDate),
        TotalUser(Model),
        WeeklyNewUser(Model, StartDate, EndDate),
        WeeklyUserGrowth(Model, EndDate),
        DeviceAnalytics(),
        UserByCountry("7daysAgo", "today"),
      ]);

      const In_Active_User = InActiveUser(Total_User, Active_User);

      const Retention_Rate = RetentionRate(Total_User, Active_User);

      console.log(
        "so the weekly resturn data is : ",
        Active_User,
        Total_User,
        In_Active_User,
        Retention_Rate,
        New_User,
        User_Growth,
        Device_Analytics,
        UserBy_Country,
      );
      res.status(200).json({
        Active_User,
        Total_User,
        In_Active_User,
        Retention_Rate,
        New_User,
        User_Growth,
        Device_Analytics,
        UserBy_Country,
      });
    }

    //for monthly
    if (Period === "30d") {
      let [
        Active_User,
        Total_User,
        New_User,
        User_Growth,
        Device_Analytics,
        UserBy_Country,
      ] = await Promise.all([
        MonthlyActiveUser(Model, StartDate, EndDate),
        TotalUser(Model),
        MonthlyNewUser(Model, StartDate, EndDate),
        MonthlyUserGrowth(Model, EndDate),
        DeviceAnalytics(),
        UserByCountry("7daysAgo", "today"),
      ]);

      const In_Active_User = InActiveUser(Total_User, Active_User);

      const Retention_Rate = RetentionRate(Total_User, Active_User);

      console.log(
        "so the monthly resturn data is : ",
        Active_User,
        Total_User,
        In_Active_User,
        Retention_Rate,
        New_User,
        User_Growth,
        Device_Analytics,
        UserBy_Country,
      );
      res.status(200).json({
        Active_User,
        Total_User,
        In_Active_User,
        Retention_Rate,
        New_User,
        User_Growth,
        Device_Analytics,
        UserBy_Country,
      });
    }

    //for yearly
    if (Period === "1y") {
      let [
        Active_User,
        Total_User,
        New_User,
        User_Growth,
        Device_Analytics,
        UserBy_Country,
      ] = await Promise.all([
        YearlyActiveUser(Model, StartDate, EndDate),
        TotalUser(Model),
        YearlyNewUser(Model, StartDate, EndDate),
        YearlyUserGrowth(Model, EndDate),
        DeviceAnalytics(),
        UserByCountry("7daysAgo", "today"),
      ]);

      const In_Active_User = InActiveUser(Total_User, Active_User);

      const Retention_Rate = RetentionRate(Total_User, Active_User);

      console.log(
        "so the yearly resturn data is : ",
        Active_User,
        Total_User,
        In_Active_User,
        Retention_Rate,
        New_User,
        User_Growth,
        Device_Analytics,
        UserBy_Country,
      );
      res.status(200).json({
        Active_User,
        Total_User,
        In_Active_User,
        Retention_Rate,
        New_User,
        User_Growth,
        Device_Analytics,
        UserBy_Country,
      });
    }
  } catch (error) {
    console.log("interanl error has been occur ina  controller ", error);
  }
};

module.exports = UserAnalytics;
