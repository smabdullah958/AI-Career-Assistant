"use client";

import { getMessaging, onRegistered, register } from "firebase/messaging";
import app from "./FirebaseConfig";
import toast from "react-hot-toast";

export const RegisterFCM = async () => {
  try {
    // Ask user for notification permission
    const permission = await Notification.requestPermission();

    console.log("Notification permission:", permission);

    if (permission !== "granted") {
      console.log("Notification permission was not granted.");
      toast.error("Notification permision is not granted");
      return;
    }

    // Get Firebase Messaging instance
    const messaging = getMessaging(app);

    // Listen for Firebase Installation ID
    onRegistered(messaging, (installationId) => {
      console.log("Firebase Installation ID:", installationId);

      // IMPORTANT:
      // Later we will send this installationId to Express.
      // For now, only testing.
    });

    // Register this browser with FCM
    await register(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID,
    });

    console.log("FCM registration completed.");
  } catch (error) {
    console.error("FCM registration error:", error);
  }
};
