const CheckUserNotificaitonOwnership = (req, res, next) => {
  const AuthenticatedUserId = String(req.user?.UserId || "");
  const RequestedUserId = String(req.params.UserId || "");

  if (!AuthenticatedUserId) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  if (AuthenticatedUserId !== RequestedUserId) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to access this user's analytics",
    });
  }

  return next();
};

module.exports = CheckUserNotificaitonOwnership;
