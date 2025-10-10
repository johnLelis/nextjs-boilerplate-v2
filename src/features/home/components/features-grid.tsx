const FeaturesGrid = () => {
  return (
    <div className="mt-8 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
      {[
        { title: "Fast", desc: "Optimized performance" },
        { title: "Modern", desc: "Latest Next.js 15" },
        { title: "Ready", desc: "Production-ready" },
      ].map((feature, i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/60"
        >
          <h3 className="mb-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
            {feature.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {feature.desc}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesGrid;
