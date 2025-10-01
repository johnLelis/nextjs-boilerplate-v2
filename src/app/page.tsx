'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Footer from '@/components/layouts/footer';
import Image from 'next/image';
import ModeToggle from '@/components/ui/mode-toggle';

const HomePage = () => {
  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <div className="relative flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-12 sm:p-20">
          <div className="w-full max-w-6xl mt-auto">
            <ModeToggle />
          </div>
          <div className="text-center space-y-6 max-w-3xl">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Version 2.0
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-slate-100 dark:via-blue-200 dark:to-indigo-200">
                Next.js 15
              </span>
              <br />
              <span className="text-slate-700 dark:text-slate-300">
                Boilerplate
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              A modern, production-ready starter template with the latest
              Next.js features and best practices
            </p>
          </div>
          <div className="flex flex-col place-items-center sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="text-base px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mt-8">
            {[
              { title: 'Fast', desc: 'Optimized performance' },
              { title: 'Modern', desc: 'Latest Next.js 15' },
              { title: 'Ready', desc: 'Production-ready' },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="w-full max-w-6xl mt-auto">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
