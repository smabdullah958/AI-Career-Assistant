import HeaderWrapper from "@/Component/HeaderWrapper";
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Login/Logout button — only on mobile, top right */}
      <div className="flex justify-end px-6 py-3 md:hidden">
        <HeaderWrapper />
      </div>

      {/* Home page content */}
      <div className="h-screen flex items-center justify-center">
        this is a home page
      </div>
    </div>
  );
}
