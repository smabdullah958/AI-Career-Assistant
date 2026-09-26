let RetentionRate = (TotalUser, ActiveUser) => {
  try {
    if (TotalUser === 0) {
      return 0;
    }
    let RetentionRate = (ActiveUser / TotalUser) * 100;
    return Number(RetentionRate.toFixed(2));
  } catch (error) {
    console.log("internal error has been occur in a Retention Rate ", error);
  }
};

module.exports = RetentionRate;
