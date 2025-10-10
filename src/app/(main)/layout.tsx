import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";
import Logout from "@/features/auth/components/logout";
import UserGreeting from "@/features/user/user-greeting";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar greeting={<UserGreeting />} logout={<Logout />} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
