//weekly acttive user
let WeeklyActiveUser = async (EndDate, StartDate, Model) => {
  try {
    StartDate.setDate(StartDate.getDate() - 7);

    let Weekly_Active_User = await Model.countDocuments({
      LastActiveAt: {
        $gte: StartDate,
        $lte: EndDate,
      },
    });
    console.log(
      "so the total number of Active user in thsi week is ",
      Weekly_Active_User,
    );
    return Weekly_Active_User;
  } catch (error) {
    console.log(
      "internal error has been occur duing a weekly active user ",
      error,
    );
  }
};

//Montly acttive user
let MonthlyActiveUser = async (EndDate, StartDate, Model) => {
  try {
    StartDate.setDate(StartDate.getDate() - 30);

    let Monthly_Active_User = await Model.countDocuments({
      LastActiveAt: {
        $gte: StartDate,
        $lte: EndDate,
      },
    });
    console.log(
      "so the total number of Active user in thsi month is ",
      Monthly_Active_User,
    );
    return Monthly_Active_User;
  } catch (error) {
    console.log(
      "internal error has been occur duing a monthly active user ",
      error,
    );
  }
};

//Yearly acttive user
let YearlyActiveUser = async (EndDate, StartDate, Model) => {
  try {
    StartDate.setDate(StartDate.getFullYear() - 1);

    let Yearly_Active_User = await Model.countDocuments({
      LastActiveAt: {
        $gte: StartDate,
        $lte: EndDate,
      },
    });
    console.log(
      "so the total number of Active user in thsi year is ",
      Yearly_Active_User,
    );
    return Yearly_Active_User;
  } catch (error) {
    console.log(
      "internal error has been occur duing a Yearly active user ",
      error,
    );
  }
};

module.exports = {
  WeeklyActiveUser,
  MonthlyActiveUser,
  YearlyActiveUser,
};
