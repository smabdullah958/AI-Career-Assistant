let TotalUser = async (Model, EndDate) => {
  try {
    let Total_User = await Model.countDocuments({ CreatedAt: { $lte: EndDate } });
    console.log("so the total number of user is ", Total_User);
    return Total_User;
  } catch (error) {
    console.log("internal error has been occur in a total user ", error);
  }
};

module.exports = TotalUser;
