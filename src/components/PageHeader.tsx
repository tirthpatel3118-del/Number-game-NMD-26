import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, icon }) => {
  return (
    <div className="relative mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 px-6 py-8 md:px-10 md:py-12 text-white shadow-xl shadow-slate-900/10">
      {/* Absolute floating math backdrop decorations */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none select-none flex items-center justify-end pr-10 text-[10rem] font-serif italic font-bold">
        ∑
      </div>
      <div className="absolute left-10 bottom-2 opacity-5 pointer-events-none select-none text-6xl font-mono">
        {"f(x) = ∫"}
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl text-amber-400">
                {icon}
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-extrabold font-sans tracking-tight text-white m-0">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="text-sm md:text-base text-slate-300 font-sans font-normal leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
