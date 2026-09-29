// Weekly Retention Rate
let WeeklyRetentionRate = async (Model, EndDate) => {
  try {
    let Retention = [];

    for (let i = 6; i >= 0; i--) {
      let DayStart = new Date(EndDate);

      DayStart.setDate(DayStart.getDate() - i);
      DayStart.setHours(0, 0, 0, 0);

      let DayEnd = new Date(DayStart);
      DayEnd.setHours(23, 59, 59, 999);

      // Total users registered up to this day
      let TotalUser = await Model.countDocuments({
        CreatedAt: {
          $lte: DayEnd,
        },
      });

      // Users active on this day
      let ActiveUser = await Model.countDocuments({
        LastActiveAt: {
          $gte: DayStart,
          $lte: DayEnd,
        },
      });

      let RetentionRate =
        TotalUser === 0
          ? 0
          : Number(((ActiveUser / TotalUser) * 100).toFixed(2));

      Retention.push({
        label: DayStart.toLocaleDateString("en-PK", {
          timeZone: "Asia/Karachi",
          weekday: "short",
        }),

        startDate: DayStart,
        endDate: DayEnd,

        RetentionRate,
      });
    }

    return Retention;
  } catch (error) {
    console.log(
      "internal error has been occur during weekly retention rate ",
      error,
    );

    return [];
  }
};

// Monthly Retention Rate
let MonthlyRetentionRate = async (Model, EndDate) => {
  try {
    let Retention = [];

    for (let i = 3; i >= 0; i--) {
      let WeekEnd = new Date(EndDate);

      WeekEnd.setDate(WeekEnd.getDate() - i * 7);
      WeekEnd.setHours(23, 59, 59, 999);

      let WeekStart = new Date(WeekEnd);

      WeekStart.setDate(WeekStart.getDate() - 6);
      WeekStart.setHours(0, 0, 0, 0);

      // Total users registered up to the end of this week
      let TotalUser = await Model.countDocuments({
        CreatedAt: {
          $lte: WeekEnd,
        },
      });

      // Users active during this week
      let ActiveUser = await Model.countDocuments({
        LastActiveAt: {
          $gte: WeekStart,
          $lte: WeekEnd,
        },
      });

      let RetentionRate =
        TotalUser === 0
          ? 0
          : Number(((ActiveUser / TotalUser) * 100).toFixed(2));

      Retention.push({
        label: `Week ${4 - i}`,

        startDate: WeekStart,
        endDate: WeekEnd,

        RetentionRate,
      });
    }

    return Retention;
  } catch (error) {
    console.log(
      "internal error has been occur during monthly retention rate ",
      error,
    );

    return [];
  }
};

// Yearly Retention Rate
let YearlyRetentionRate = async (Model, EndDate) => {
  try {
    let Retention = [];

    for (let i = 11; i >= 0; i--) {
      let MonthStart = new Date(EndDate);

      MonthStart.setMonth(MonthStart.getMonth() - i);
      MonthStart.setDate(1);
      MonthStart.setHours(0, 0, 0, 0);

      let MonthEnd = new Date(MonthStart);

      MonthEnd.setMonth(MonthEnd.getMonth() + 1);
      MonthEnd.setDate(0);
      MonthEnd.setHours(23, 59, 59, 999);

      // Total users registered up to the end of this month
      let TotalUser = await Model.countDocuments({
        CreatedAt: {
          $lte: MonthEnd,
        },
      });

      // Users active during this month
      let ActiveUser = await Model.countDocuments({
        LastActiveAt: {
          $gte: MonthStart,
          $lte: MonthEnd,
        },
      });

      let RetentionRate =
        TotalUser === 0
          ? 0
          : Number(((ActiveUser / TotalUser) * 100).toFixed(2));

      Retention.push({
        label: MonthStart.toLocaleDateString("en-PK", {
          timeZone: "Asia/Karachi",
          month: "short",
        }),

        startDate: MonthStart,
        endDate: MonthEnd,

        RetentionRate,
      });
    }

    return Retention;
  } catch (error) {
    console.log(
      "internal error has been occur during yearly retention rate ",
      error,
    );

    return [];
  }
};

module.exports = {
  WeeklyRetentionRate,
  MonthlyRetentionRate,
  YearlyRetentionRate,
};
