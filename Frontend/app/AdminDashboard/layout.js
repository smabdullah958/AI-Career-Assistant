import AdminSidebar from "@/Component/AdminSidebar/SideBar";
import AdminMobileSidebar from "@/Component/AdminSidebar/AdminMobileHeader";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <AdminSidebar />
      <AdminMobileSidebar />

      <main className="md:ml-64">{children}</main>
    </div>
  );
};

export default AdminLayout;
