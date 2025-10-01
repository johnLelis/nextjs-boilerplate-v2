import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';
import { WithChildren } from '@/types/common';

const MainLayout = ({ children }: WithChildren) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
