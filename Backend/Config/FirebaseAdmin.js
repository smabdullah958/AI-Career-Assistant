const admin = require("firebase-admin");

const serviceAccount = require("../ai-career-assistant-95041-firebase-adminsdk-fbsvc-6f05675660.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
