// Weekly active user
let WeeklyActiveUser = async (Model, StartDate, EndDate) => {
  try {
    let WeeklyStartDate = new Date(StartDate);
    let WeeklyEndDate = new Date(EndDate);

    WeeklyStartDate.setDate(WeeklyStartDate.getDate() - 7);

    WeeklyStartDate.setHours(0, 0, 0, 0);
    WeeklyEndDate.setHours(23, 59, 59, 999);

    let Weekly_Active_User = await Model.countDocuments({
      LastActiveAt: {
        $gte: WeeklyStartDate,
        $lte: WeeklyEndDate,
      },
    });

    console.log("Weekly Start:", WeeklyStartDate, "Weekly End:", WeeklyEndDate);

    console.log(
      "so the total number of Active user in this week is ",
      Weekly_Active_User,
    );

    return Weekly_Active_User;
  } catch (error) {
    console.log(
      "internal error has been occur during a weekly active user ",
      error,
    );
  }
};

// Monthly active user
let MonthlyActiveUser = async (Model, StartDate, EndDate) => {
  try {
    let MonthlyStartDate = new Date(StartDate);
    let MonthlyEndDate = new Date(EndDate);

    MonthlyStartDate.setDate(MonthlyStartDate.getDate() - 30);

    MonthlyStartDate.setHours(0, 0, 0, 0);
    MonthlyEndDate.setHours(23, 59, 59, 999);

    let Monthly_Active_User = await Model.countDocuments({
      LastActiveAt: {
        $gte: MonthlyStartDate,
        $lte: MonthlyEndDate,
      },
    });

    return Monthly_Active_User;
  } catch (error) {
    console.log(
      "internal error has been occur during a monthly active user ",
      error,
    );
  }
};

// Yearly active user
let YearlyActiveUser = async (Model, StartDate, EndDate) => {
  try {
    let YearlyStartDate = new Date(StartDate);
    let YearlyEndDate = new Date(EndDate);

    YearlyStartDate.setFullYear(YearlyStartDate.getFullYear() - 1);

    YearlyStartDate.setHours(0, 0, 0, 0);
    YearlyEndDate.setHours(23, 59, 59, 999);

    let Yearly_Active_User = await Model.countDocuments({
      LastActiveAt: {
        $gte: YearlyStartDate,
        $lte: YearlyEndDate,
      },
    });

    return Yearly_Active_User;
  } catch (error) {
    console.log(
      "internal error has been occur during a yearly active user ",
      error,
    );
  }
};

module.exports = {
  WeeklyActiveUser,
  MonthlyActiveUser,
  YearlyActiveUser,
};
