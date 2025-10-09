import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
const CtaButtons = () => {
  return (
    <div className="flex flex-col place-items-center sm:flex-row gap-4 w-full sm:w-auto">
      <Button
        asChild
        size="lg"
        className="text-white text-base px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
      >
        <Link href="/login">Get Started</Link>
      </Button>

      <Button
        asChild
        variant="outline"
        size="lg"
        className="text-base px-8 py-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-2 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <Link href="/register">Create Account</Link>
      </Button>

      <Button
        asChild
        variant="secondary"
        size="lg"
        className="text-base px-8 py-6 flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
      >
        <Link
          href="https://github.com/johnLelis/nextjs-boilerplate-v2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={'/images/github.svg'}
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
