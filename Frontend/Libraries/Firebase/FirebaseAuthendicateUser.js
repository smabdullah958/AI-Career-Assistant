import { getFirebaseAnalytics } from "@/Libraries/Firebase/FirebaseConfig";
import { setUserId, setUserProperties, logEvent } from "firebase/analytics";

export const FirebaseAuthenticatedUser = async (userId, method, action) => {
  try {
    console.log("🔥 FirebaseAuthenticatedUser STARTED");
    console.log("🔥 UserId:", userId);
    console.log("🔥 Method:", method);

    if (!userId) {
      console.log("❌ No user ID available");
      return;
    }

    const analytics = await getFirebaseAnalytics();

    if (!analytics) {
      console.log("❌ Firebase Analytics is not available");
      return;
    }

    console.log("✅ Firebase Analytics object received");

    setUserId(analytics, String(userId));

    console.log("✅ Firebase User ID set");

    setUserProperties(analytics, {
      authenticated: "true",
    });

    console.log("✅ authenticated property set");

    logEvent(analytics, action, {
      method,
    });

    console.log("✅ login event sent");
  } catch (error) {
    console.error("❌ Firebase authenticated user error:", error);
  }
};
