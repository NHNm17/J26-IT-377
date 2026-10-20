import React, { useEffect, useState } from 'react';
import { ArrowRight, Sun, Moon, ScanLine, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { InspectionRecord, DashboardMetrics } from '../../types/inspection';

interface HomeLandingPageProps {
  metrics: DashboardMetrics;
  records: InspectionRecord[];
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenLogin: () => void;
  onSelectSample?: (sampleId: string) => void;
}

// Showcase samples cycled in the live-scan preview card
const SHOWCASE = [
  { src: '/fabrics/3.webp', label: 'Linen', confidence: 98.4 },
  { src: '/fabrics/4.webp', label: 'Cotton Canvas', confidence: 96.1 },
  { src: '/fabrics/2.webp', label: 'Polyester Piqué', confidence: 97.3 },
  { src: '/fabrics/5.webp', label: 'Cotton Poplin', confidence: 95.8 },
  { src: '/fabrics/1.webp', label: 'Silk Satin', confidence: 94.6 }
];

export const HomeLandingPage: React.FC<HomeLandingPageProps> = ({
  isDarkMode,
  onToggleTheme,
  onOpenLogin
}) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive(i => (i + 1) % SHOWCASE.length), 3000);
    return () => window.clearInterval(id);
  }, []);

  const sample = SHOWCASE[active];

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#f8f9fc] dark:bg-[#0c0d12] text-slate-900 dark:text-white">
      {/* Background: softly blurred fabric with theme-aware wash */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src="/fabrics/1.webp"
          alt=""
          className="w-full h-full object-cover blur-2xl opacity-60 dark:opacity-40 animate-hero-drift"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-white/30 dark:from-[#0c0d12] dark:via-[#0c0d12]/85 dark:to-[#0c0d12]/40" />
        <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-12 h-20">
        <BrandLogo size="md" />
        <button
          onClick={onToggleTheme}
          className="p-2.5 rounded-xl bg-white/70 hover:bg-white dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md border border-slate-200 dark:border-white/15 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>
      </header>

      {/* Hero */}
      <main className="relative z-10 mx-auto grid h-[calc(100dvh-5rem)] max-w-7xl items-center gap-12 px-6 sm:px-12 pb-20 lg:grid-cols-[1.1fr_1fr]">
        {/* Copy */}
        <div className="space-y-7 animate-hero-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            AI + Sensor Fusion
          </span>

          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.05]">
            Automated Fabric{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-purple-300">
              Identification
            </span>
          </h1>

          <p className="max-w-xl text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Classify fabric type and flag defects in seconds — no lab required.
          </p>

          <button
            onClick={onOpenLogin}
            className="group inline-flex items-center gap-2.5 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/40 active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0c0d12]"
          >
            Start Inspection
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Live scan preview */}
        <div className="relative hidden lg:block animate-hero-fade-up" style={{ animationDelay: '150ms' }} aria-hidden="true">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-blue-500/25 via-indigo-500/15 to-purple-500/25 blur-3xl" />

          <div className="relative rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/5 p-3 shadow-2xl backdrop-blur-xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 dark:bg-industrial-850">
              {SHOWCASE.map((s, i) => (
                <img
                  key={s.src}
                  src={s.src}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === active ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}

              {/* Scan beam */}
              <div className="absolute inset-x-0 h-0.5 bg-cyan-300 shadow-[0_0_16px_4px_rgba(103,232,249,0.6)] animate-hero-scan" />

              {/* Corner brackets */}
              {['top-4 left-4 border-t-2 border-l-2', 'top-4 right-4 border-t-2 border-r-2', 'bottom-4 left-4 border-b-2 border-l-2', 'bottom-4 right-4 border-b-2 border-r-2'].map(pos => (
                <span key={pos} className={`absolute h-6 w-6 border-white/90 ${pos}`} />
              ))}

              <span className="absolute top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-[11px] font-mono font-medium text-white backdrop-blur-md">
                <ScanLine className="w-3.5 h-3.5 text-cyan-300" />
                Scanning
              </span>
            </div>

            {/* Result row */}
            <div className="flex items-center justify-between px-2 pt-3 pb-1">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">Identified</p>
                  <p key={sample.label} className="text-sm font-bold animate-hero-fade-up">{sample.label}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">Confidence</p>
                <p key={sample.confidence} className="text-sm font-bold font-mono text-blue-600 dark:text-blue-400 animate-hero-fade-up">
                  {sample.confidence.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-1.5 pt-2 pb-1">
              {SHOWCASE.map((s, i) => (
                <span
                  key={s.src}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-blue-500' : 'w-1.5 bg-slate-300 dark:bg-white/20'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
