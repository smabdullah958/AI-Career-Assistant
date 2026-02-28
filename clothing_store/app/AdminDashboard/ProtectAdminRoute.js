// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";

// const ProtectAdminRoute = ({ children }) => {
//   const router = useRouter();
//   const { Role, IsLoggIn } = useSelector((state) => state.LogInSlice);

//   useEffect(() => {
//     // If user is not logged in or not admin → redirect to home
//     if (!IsLoggIn || Role !== "Admin") {
//       router.replace("/"); // redirect to home
//     }
//   }, [IsLoggIn, Role]);

//   // While checking, you can return null or loader
//   if (!IsLoggIn || Role !== "Admin") return null;

//   // If admin → render page
//   return <>{children}</>;
// };

// export default ProtectAdminRoute;
