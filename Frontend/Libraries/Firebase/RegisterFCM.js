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

    console.log("Notification permission:", permission);

    if (permission !== "granted") {
      console.log("Notification permission was not granted.");
      toast.error("Notification permision is not granted");
      return;
    }

    // Get Firebase Messaging instance
    const messaging = getMessaging(app);

    // Listen for Firebase Installation ID
    onRegistered(messaging, async (installationId) => {
      console.log("Firebase Installation ID:", installationId);

      //post the token to a backend
      try {
        const response = await axios.post(
          `${url}/NotiicationRoute/token`,
          {
            FcmToken: installationId,
          },
          {
            withCredentials: true,
          },
        );
        console.log("FID sent to backend:", response.data);
      } catch (err) {
        console.log("internal issue in a axios : ", err);
      }
    });
    console.log("so the registrariton is a ", registration);
    // Register this browser with FCM
    await register(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID,
      serviceWorkerRegistration: registration,
    });

    console.log("FCM registration completed.");
  } catch (error) {
    console.error("FCM registration error:", error);
  }
};
