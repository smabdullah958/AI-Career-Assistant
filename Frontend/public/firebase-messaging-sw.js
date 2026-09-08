importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js",
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js",
);
//firebase config
import app from "@/Libraries/Firebase/FirebaseConfig";

app();

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
