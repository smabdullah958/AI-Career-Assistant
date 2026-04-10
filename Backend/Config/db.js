require("dotenv").config();
let connection = process.env.connection;
//mongose connection
let mongoose = require("mongoose");

let databaseconnection = () => {
  mongoose.connect(connection);
  console.log("Database connected successfully");
};
module.exports = databaseconnection;
