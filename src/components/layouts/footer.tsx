import dayjs from "dayjs";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const year = dayjs().year();

  const defaultStyles =
    "border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm";

  return (
    <footer className={className || defaultStyles}>
      <div className="mx-auto flex h-auto max-w-7xl flex-col place-items-center justify-between gap-4 px-6 py-4 text-sm text-slate-600 sm:h-16 sm:flex-row sm:gap-0 sm:py-0 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-900 dark:text-slate-100">
            PenLelis
          </span>
          <span className="text-slate-400 dark:text-slate-600">•</span>
          <span>© {year} All rights reserved</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 px-3 py-1 dark:border-blue-800 dark:from-blue-500/20 dark:to-indigo-500/20">
            <div className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
              Built with Next.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
