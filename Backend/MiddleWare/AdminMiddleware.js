let jwt = require("jsonwebtoken");

let AdminMiddleWare = (req, res, next) => {
  try {
    let token = req.cookies.token; //get token from cookie
    if (!token) {
      return res.status(400).json({ message: "user is not authendicated" });
    }
    // Verify token using your Secret Key
    const decoded = jwt.verify(token, process.env.SecretKey);

    if (decoded.Role !== "Admin" && decoded.Role !== "SuperAdmin") {
      console.log("access is denied");
      return res.status(403).json({ message: "accesss is denied" });
    }

    // Attach the REAL ID from the token to the request
    req.user = decoded;
    next();
  } catch (error) {
    console.log("invalid token", error);
    return res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = AdminMiddleWare;
