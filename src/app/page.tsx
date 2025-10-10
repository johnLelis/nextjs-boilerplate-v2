import Footer from "@/components/layouts/footer";
import ModeToggle from "@/components/ui/mode-toggle";
import CtaButtons from "@/features/home/components/cta-buttons";
import FeaturesGrid from "@/features/home/components/features-grid";
import Hero from "@/features/home/components/hero";

const HomePage = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="mx-auto mt-10 w-full max-w-6xl">
        <ModeToggle />
      </div>

      <main className="relative flex flex-grow flex-col items-center justify-center gap-8 sm:p-10">
        <Hero />
        <CtaButtons />
        <FeaturesGrid />
      </main>

      <footer className="mx-auto w-full max-w-6xl">
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
