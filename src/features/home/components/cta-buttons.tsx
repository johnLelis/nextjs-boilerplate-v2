import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const CtaButtons = () => {
  return (
    <div className="flex w-full flex-col place-items-center gap-4 sm:w-auto sm:flex-row">
      <Button
        asChild
        size="lg"
        className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-base text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
      >
        <Link href="/login">Get Started</Link>
      </Button>

      <Button
        asChild
        variant="outline"
        size="lg"
        className="border-2 bg-white/50 px-8 py-6 text-base shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-lg dark:bg-slate-800/50 dark:hover:bg-slate-800"
      >
        <Link href="/register">Create Account</Link>
      </Button>

      <Button
        asChild
        variant="secondary"
        size="lg"
        className="flex items-center gap-2 px-8 py-6 text-base shadow-md transition-all duration-300 hover:shadow-lg"
      >
        <Link
          href="https://github.com/johnLelis/nextjs-boilerplate-v2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={"/images/github.svg"}
            alt="github"
            width={24}
            height={24}
          />
          Clone Me!
        </Link>
      </Button>
    </div>
  );
};

export default CtaButtons;
