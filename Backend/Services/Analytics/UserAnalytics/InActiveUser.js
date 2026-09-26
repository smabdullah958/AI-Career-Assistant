let InActiveUser = (TotalUser, ActiveUser) => {
  try {
    let InActiveUser = TotalUser - ActiveUser;
    console.log("so the total number of In active user is ", InActiveUser);
    return InActiveUser;
  } catch (error) {
    console.log("internal error has been occur duing a inactiver user ", error);
  }
};

module.exports = InActiveUser;
