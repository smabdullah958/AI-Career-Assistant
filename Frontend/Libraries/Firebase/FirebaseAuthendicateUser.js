import { getFirebaseAnalytics } from "@/Libraries/Firebase/FirebaseConfig";
import { setUserId, setUserProperties, logEvent } from "firebase/analytics";

export const FirebaseAuthenticatedUser = async (userId, method, action) => {
  try {
    if (!userId) {
      return;
    }

    const analytics = await getFirebaseAnalytics();

    if (!analytics) {
      return;
    }

    setUserId(analytics, String(userId));

    setUserProperties(analytics, {
      authenticated: "true",
      app_user_id: String(userId),
    });

    logEvent(analytics, action, {
      method,
    });
  } catch {
    // Firebase auth analytics setup failed silently.
  }
};
