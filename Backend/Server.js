let express = require("express");
const app = express();
require("dotenv").config();
let cookieParser = require("cookie-parser");
const PORT = process.env.PortNo;
let cors = require("cors");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.Frontend,
    credentials: true,
  }),
);
let ConnectDB = require("./Config/db");
let AuthRoute = require("./Routes/Auth");
let ResumeRoute = require("./Routes/ResumeRoute");
let InterviewRoute = require("./Routes/InterviewRoute");
let AnalyzerRoute = require("./Routes/AnalyzerRoute");

ConnectDB();

app.use("/Auth", AuthRoute);
app.use("/Resume", ResumeRoute);
app.use("/AiInterviews", InterviewRoute);
app.use("/ResumeAnalyzer", AnalyzerRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
