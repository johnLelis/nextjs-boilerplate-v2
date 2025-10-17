import Footer from "@/components/layouts/footer";
import ModeToggle from "@/components/ui/mode-toggle";
import CtaButtons from "@/features/home/components/cta-buttons";
import FeaturesGrid from "@/features/home/components/features-grid";
import Hero from "@/features/home/components/hero";

const HomePage = () => {
  return (
    <>
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
    </>
  );
};

export default HomePage;
