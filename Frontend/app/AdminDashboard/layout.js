import AdminSidebar from "@/Component/AdminSidebar/SideBar";
import AdminMobileSidebar from "@/Component/AdminSidebar/AdminMobileHeader";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

const AdminLayout = async ({ children }) => {
  const token = (await cookies()).get("token")?.value;
  const secretKey = process.env.SecretKey;

  if (!token || !secretKey) {
    redirect("/");
  }

  try {
    const secret = new TextEncoder().encode(secretKey);
    const { payload } = await jwtVerify(token, secret);

    if (payload.Role !== "Admin" && payload.Role !== "SuperAdmin") {
      redirect("/");
    }
  } catch {
    // Reject missing, expired, invalid, or modified JWTs.
    redirect("/");
  }

  return (
    <div>
      <AdminSidebar />
      <AdminMobileSidebar />

      <main className="md:ml-64">{children}</main>
    </div>
  );
};

export default AdminLayout;
