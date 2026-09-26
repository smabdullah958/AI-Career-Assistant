// Weekly Growth
let WeeklyUserGrowth = async (Model, EndDate) => {
  try {
    let Growth = [];

    for (let i = 6; i >= 0; i--) {
      let DayStart = new Date(EndDate);
      DayStart.setDate(DayStart.getDate() - i);
      DayStart.setHours(0, 0, 0, 0);

      let DayEnd = new Date(DayStart);
      DayEnd.setHours(23, 59, 59, 999);

      const [Active_User, New_User, Total_User] = await Promise.all([
        Model.countDocuments({
          LastActiveAt: {
            $gte: DayStart,
            $lte: DayEnd,
          },
        }),

        Model.countDocuments({
          CreatedAt: {
            $gte: DayStart,
            $lte: DayEnd,
          },
        }),

        Model.countDocuments({
          CreatedAt: {
            $lte: DayEnd,
          },
        }),
      ]);

      Growth.push({
        label: DayStart.toLocaleDateString("en-PK", {
          timeZone: "Asia/Karachi",
          month: "short",
          day: "numeric",
        }),

        Active_User,
        New_User,
        Total_User,
      });
    }

    return Growth;
  } catch (error) {
    console.log(
      "internal error has been occur during weekly user growth ",
      error,
    );

    return [];
  }
};

// Monthly Growth
let MonthlyUserGrowth = async (Model, EndDate) => {
  try {
    let Growth = [];

    for (let i = 3; i >= 0; i--) {
      let WeekEnd = new Date(EndDate);

      WeekEnd.setDate(WeekEnd.getDate() - i * 7);

      WeekEnd.setHours(23, 59, 59, 999);

      let WeekStart = new Date(WeekEnd);

      WeekStart.setDate(WeekStart.getDate() - 6);

      WeekStart.setHours(0, 0, 0, 0);

      const [Active_User, New_User, Total_User] = await Promise.all([
        Model.countDocuments({
          LastActiveAt: {
            $gte: WeekStart,
            $lte: WeekEnd,
          },
        }),

        Model.countDocuments({
          CreatedAt: {
            $gte: WeekStart,
            $lte: WeekEnd,
          },
        }),

        Model.countDocuments({
          CreatedAt: {
            $lte: WeekEnd,
          },
        }),
      ]);

      Growth.push({
        label: `Week ${4 - i}`,

        Active_User,
        New_User,
        Total_User,
      });
    }

    return Growth;
  } catch (error) {
    console.log(
      "internal error has been occur during monthly user growth ",
      error,
    );

    return [];
  }
};

// Yearly Growth
let YearlyUserGrowth = async (Model, EndDate) => {
  try {
    let Growth = [];

    for (let i = 11; i >= 0; i--) {
      let MonthStart = new Date(EndDate);

      MonthStart.setMonth(MonthStart.getMonth() - i);

      MonthStart.setDate(1);
      MonthStart.setHours(0, 0, 0, 0);

      let MonthEnd = new Date(MonthStart);

      MonthEnd.setMonth(MonthEnd.getMonth() + 1);

      MonthEnd.setDate(0);
      MonthEnd.setHours(23, 59, 59, 999);

      const [Active_User, New_User, Total_User] = await Promise.all([
        Model.countDocuments({
          LastActiveAt: {
            $gte: MonthStart,
            $lte: MonthEnd,
          },
        }),

        Model.countDocuments({
          CreatedAt: {
            $gte: MonthStart,
            $lte: MonthEnd,
          },
        }),

        Model.countDocuments({
          CreatedAt: {
            $lte: MonthEnd,
          },
        }),
      ]);

      Growth.push({
        label: MonthStart.toLocaleDateString("en-PK", {
          timeZone: "Asia/Karachi",
          month: "short",
        }),

        Active_User,
        New_User,
        Total_User,
      });
    }

    return Growth;
  } catch (error) {
    console.log(
      "internal error has been occur during yearly user growth ",
      error,
    );

    return [];
  }
};

module.exports = {
  WeeklyUserGrowth,
  MonthlyUserGrowth,
  YearlyUserGrowth,
};
