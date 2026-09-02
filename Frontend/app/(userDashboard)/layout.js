import Header from "@/Component/Header";
import MobileHeader from "@/Component/MobileHeader";

export default function UserLayout({ children }) {
  return (
    <>
      {/* header and also mobile heaer */}
      <MobileHeader />
      <Header />
      {children}
    </>
  );
}
