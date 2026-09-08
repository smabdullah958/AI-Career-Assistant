export const RegisterServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
      );

      console.log("Firebase Service Worker registered:", registration);

      return registration;
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }
};
