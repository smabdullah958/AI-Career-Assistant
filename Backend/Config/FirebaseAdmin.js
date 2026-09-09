const admin = require("firebase-admin");
require("dotenv").config();

// const serviceAccount = require("../ai-career-assistant-95041-firebase-adminsdk-fbsvc-6f05675660.json");
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
