"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function CheckLogin() {
  const router = useRouter();

  useEffect(() => {
    console.log("useeffec is mounted");
    const role = "any";

    if (role === "Admin") {
      router.push("/AdminDashboard");
    }
  }, []);

  return null;
}

export default CheckLogin;
