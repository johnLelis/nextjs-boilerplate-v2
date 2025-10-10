const Hero = () => {
  return (
    <div className="max-w-3xl space-y-6 text-center">
      <div className="inline-block">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          Version 2.0
        </span>
      </div>

      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
        <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent dark:from-slate-100 dark:via-blue-200 dark:to-indigo-200">
          Next.js 15
        </span>
        <br />
        <span className="text-slate-700 dark:text-slate-300">Boilerplate</span>
      </h1>

      <p className="mx-auto max-w-2xl text-lg text-slate-600 sm:text-xl dark:text-slate-400">
        A modern, production-ready starter template with the latest Next.js
        features and best practices
      </p>
    </div>
  );
};

export default Hero;
