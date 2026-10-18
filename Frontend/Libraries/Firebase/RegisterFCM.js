"use client";

import { getMessaging, onRegistered, register } from "firebase/messaging";
import app from "./FirebaseConfig";
import toast from "react-hot-toast";
import axios from "axios";
let url = process.env.NEXT_PUBLIC_BackendURL;

export const RegisterFCM = async (registration) => {
  try {
    // Ask user for notification permission
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      toast.error("Notification permision is not granted");
      return;
    }

    // Get Firebase Messaging instance
    const messaging = getMessaging(app);

    // Listen for Firebase Installation ID
    onRegistered(messaging, async (installationId) => {
      //post the token to a backend
      try {
        await axios.post(
          `${url}/NotiicationRoute/token`,
          {
            FcmToken: installationId,
          },
          {
            withCredentials: true,
          },
        );
      } catch {
        // FCM token sync failed silently.
      }
    });

    // Register this browser with FCM
    await register(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID,
      serviceWorkerRegistration: registration,
    });
  } catch {
    // FCM registration failed silently.
  }
};
