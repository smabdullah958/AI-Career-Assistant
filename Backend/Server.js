let express = require("express");
const app = express();
require("dotenv").config();
let cookieParser = require("cookie-parser");
const PORT = process.env.PortNo;
let connection = process.env.connection;
app.use(express.json());
app.use(cookieParser());
//mongose connection
let mongoose = require("mongoose");
mongoose.connect(connection);
console.log("Database connected successfully");

let AuthRoute = require("./Routes/Auth");

app.use("/Auth", AuthRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
