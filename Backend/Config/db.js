require("dotenv").config();
let connection = process.env.connection;
//mongose connection
let mongoose = require("mongoose");
mongoose.connect(connection, () => {
  console.log("Database connected successfully");
});
console.log("Database connected successfully");
