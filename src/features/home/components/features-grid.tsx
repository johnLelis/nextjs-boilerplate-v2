const FeaturesGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mt-8">
      {[
        { title: "Fast", desc: "Optimized performance" },
        { title: "Modern", desc: "Latest Next.js 15" },
        { title: "Ready", desc: "Production-ready" },
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
  );
};

export default FeaturesGrid;
