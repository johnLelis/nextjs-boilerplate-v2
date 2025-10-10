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
      <div className="flex flex-col sm:flex-row h-auto sm:h-16 place-items-center justify-between px-6 py-4 sm:py-0 text-sm text-slate-600 dark:text-slate-400 gap-4 sm:gap-0 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-900 dark:text-slate-100">
            PenLelis
          </span>
          <span className="text-slate-400 dark:text-slate-600">•</span>
          <span>© {year} All rights reserved</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 border border-blue-200 dark:border-blue-800">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse"></div>
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
