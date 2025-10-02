const Hero = () => {
  return (
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
        <span className="text-slate-700 dark:text-slate-300">Boilerplate</span>
      </h1>

      <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        A modern, production-ready starter template with the latest Next.js
        features and best practices
      </p>
    </div>
  );
};

export default Hero;
