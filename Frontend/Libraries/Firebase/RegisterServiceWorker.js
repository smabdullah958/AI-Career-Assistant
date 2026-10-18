export const RegisterServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
      );

      return registration;
    } catch {
      // Service worker registration failed silently.
    }
  }
};
