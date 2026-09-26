// //weekly acttive user
// let WeeklyNewUser = async (Model, StartDate, EndDate) => {
//   try {
//     StartDate.setDate(StartDate.getDate() - 7);

//     let Weekly_New_User = await Model.countDocuments({
//       CreatedAt: {
//         $gte: StartDate,
//         $lte: EndDate,
//       },
//     });
//     console.log(
//       "so the total number of new user in thsi week is ",
//       Weekly_New_User,
//     );
//     return Weekly_New_User;
//   } catch (error) {
//     console.log(
//       "internal error has been occur duing a weekly New user ",
//       error,
//     );
//   }
// };

// //Montly acttive user
// let MonthlyNewUser = async (Model, StartDate, EndDate) => {
//   try {
//     StartDate.setDate(StartDate.getDate() - 30);

//     let Monthly_New_User = await Model.countDocuments({
//       CreatedAt: {
//         $gte: StartDate,
//         $lte: EndDate,
//       },
//     });
//     console.log(
//       "so the total number of New user in thsi month is ",
//       Monthly_New_User,
//     );
//     return Monthly_New_User;
//   } catch (error) {
//     console.log(
//       "internal error has been occur duing a monthly New user ",
//       error,
//     );
//   }
// };

// //Yearly acttive user
// let YearlyNewUser = async (Model, StartDate, EndDate) => {
//   try {
//     // StartDate.setDate(StartDate.getFullYear() - 1);
//     StartDate.setFullYear(StartDate.getFullYear() - 1);

//     let Yearly_New_User = await Model.countDocuments({
//       CreatedAt: {
//         $gte: StartDate,
//         $lte: EndDate,
//       },
//     });
//     console.log(
//       "so the total number of New user in thsi year is ",
//       Yearly_New_User,
//     );
//     return Yearly_New_User;
//   } catch (error) {
//     console.log(
//       "internal error has been occur duing a Yearly New user ",
//       error,
//     );
//   }
// };

// module.exports = {
//   WeeklyNewUser,
//   MonthlyNewUser,
//   YearlyNewUser,
// };

// Weekly new user

let WeeklyNewUser = async (Model, StartDate, EndDate) => {
  try {
    let WeeklyStartDate = new Date(StartDate);
    let WeeklyEndDate = new Date(EndDate);

    WeeklyStartDate.setDate(WeeklyStartDate.getDate() - 7);

    WeeklyStartDate.setHours(0, 0, 0, 0);
    WeeklyEndDate.setHours(23, 59, 59, 999);

    let Weekly_New_User = await Model.countDocuments({
      CreatedAt: {
        $gte: WeeklyStartDate,
        $lte: WeeklyEndDate,
      },
    });

    console.log(
      "Weekly New User Start:",
      WeeklyStartDate,
      "Weekly New User End:",
      WeeklyEndDate,
    );

    console.log(
      "so the total number of new user in this week is ",
      Weekly_New_User,
    );

    return Weekly_New_User;
  } catch (error) {
    console.log(
      "internal error has been occur during a weekly new user ",
      error,
    );
  }
};

// Monthly new user
let MonthlyNewUser = async (Model, StartDate, EndDate) => {
  try {
    let MonthlyStartDate = new Date(StartDate);
    let MonthlyEndDate = new Date(EndDate);

    MonthlyStartDate.setDate(MonthlyStartDate.getDate() - 30);

    MonthlyStartDate.setHours(0, 0, 0, 0);
    MonthlyEndDate.setHours(23, 59, 59, 999);

    let Monthly_New_User = await Model.countDocuments({
      CreatedAt: {
        $gte: MonthlyStartDate,
        $lte: MonthlyEndDate,
      },
    });

    return Monthly_New_User;
  } catch (error) {
    console.log(
      "internal error has been occur during a monthly new user ",
      error,
    );
  }
};

// Yearly new user
let YearlyNewUser = async (Model, StartDate, EndDate) => {
  try {
    let YearlyStartDate = new Date(StartDate);
    let YearlyEndDate = new Date(EndDate);

    YearlyStartDate.setFullYear(YearlyStartDate.getFullYear() - 1);

    YearlyStartDate.setHours(0, 0, 0, 0);
    YearlyEndDate.setHours(23, 59, 59, 999);

    let Yearly_New_User = await Model.countDocuments({
      CreatedAt: {
        $gte: YearlyStartDate,
        $lte: YearlyEndDate,
      },
    });

    return Yearly_New_User;
  } catch (error) {
    console.log(
      "internal error has been occur during a yearly new user ",
      error,
    );
  }
};

module.exports = {
  WeeklyNewUser,
  MonthlyNewUser,
  YearlyNewUser,
};
