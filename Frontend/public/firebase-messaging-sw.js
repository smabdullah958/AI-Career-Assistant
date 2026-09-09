importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js",
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js",
);

//firebase config
firebase.initializeApp({
  apiKey: "AIzaSyDSgEgOx19yLa9V6pL6xtU1IOAkqPQ0JhA",
  authDomain: "ai-career-assistant-95041.firebaseapp.com",
  projectId: "ai-career-assistant-95041",
  storageBucket: "ai-career-assistant-95041.firebasestorage.app",
  messagingSenderId: "947539202458",
  appId: "1:947539202458:web:34cc288d3052761120ea23",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background notification received:", payload);

  const notificationTitle = payload.notification?.title;

  const notificationOptions = {
    body: payload.notification?.body,
    icon: "/logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
