import React, { useState } from 'react';
import {
  Lock,
  User,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  Sun,
  Moon,
  ScanLine,
  Cpu,
  Activity
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

export interface UserProfile {
  name: string;
  role: string;
  id: string;
  email: string;
  avatar: string;
}

interface LoginViewProps {
  onLoginSuccess: (user: UserProfile) => void;
  onCancel: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Wasana Lakmini',
  role: 'Member 4 · Frontend & Decision Support Lead',
  id: 'IT23362512',
  email: 'it23362512@my.sliit.lk',
  avatar: 'WL',
};

const HIGHLIGHTS = [
  { icon: ScanLine, text: 'Vision-based fabric classification' },
  { icon: Cpu, text: 'Capacitance & ambient sensor fusion' },
  { icon: Activity, text: 'Real-time defect detection' },
];

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onCancel,
  isDarkMode,
  onToggleTheme
}) => {
  const [operatorId, setOperatorId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!operatorId.trim()) {
      setErrorMsg('Enter your username to continue.');
      return;
    }
    if (!password) {
      setErrorMsg('Enter your passcode to continue.');
      return;
    }
    setErrorMsg('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(DEFAULT_PROFILE);
    }, 600);
  };

  const inputClass =
    'w-full h-12 pl-11 pr-4 rounded-xl bg-white dark:bg-industrial-850 border border-slate-300 dark:border-industrial-700 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors hover:border-slate-400 dark:hover:border-industrial-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 focus:outline-hidden';

  return (
    <div className="h-[100dvh] w-full overflow-hidden grid lg:grid-cols-2 bg-[#f8f9fc] dark:bg-[#0c0d12] text-slate-900 dark:text-white">
      {/* ── Form panel ── */}
      <div className="relative flex flex-col px-6 sm:px-12 overflow-y-auto">
        <header className="flex h-20 shrink-0 items-center justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 -ml-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
          )}
        </header>

        <div className="flex flex-1 items-center justify-center py-8">
          <div className="w-full max-w-sm animate-hero-fade-up">
            <BrandLogo size="md" />

            <h1 className="mt-10 text-3xl font-extrabold tracking-tight">Welcome back</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Sign in to access the inspection workspace.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
              {errorMsg && (
                <div
                  role="alert"
                  className="flex items-center gap-2 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 p-3 text-sm text-rose-700 dark:text-rose-300"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMsg}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="login-username" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Username
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="login-username"
                    type="text"
                    autoComplete="username"
                    autoFocus
                    value={operatorId}
                    onChange={(e) => setOperatorId(e.target.value)}
                    className={inputClass}
                    placeholder="Enter your username"
                    aria-invalid={!!errorMsg && !operatorId.trim()}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="login-password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Passcode
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${inputClass} pr-12`}
                    placeholder="Enter your passcode"
                    aria-invalid={!!errorMsg && !!operatorId.trim() && !password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Keep me signed in on this device
              </label>

              <button
                type="submit"
                disabled={loading}
                className="group w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold inline-flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all active:scale-[0.99] cursor-pointer disabled:cursor-wait disabled:opacity-70 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f9fc] dark:focus-visible:ring-offset-[#0c0d12]"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Secured connection · Authorized personnel only
            </p>
          </div>
        </div>
      </div>

      {/* ── Visual panel ── */}
      <aside className="relative hidden lg:block m-3 overflow-hidden rounded-3xl" aria-hidden="true">
        <img src="/fabrics/5.webp" alt="" className="absolute inset-0 w-full h-full object-cover animate-hero-drift" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-[#0c0d12]/50 to-transparent" />

        {/* Scan overlay */}
        <div className="absolute inset-x-0 h-0.5 bg-cyan-300 shadow-[0_0_16px_4px_rgba(103,232,249,0.5)] animate-hero-scan" />
        <span className="absolute top-6 left-6 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-[11px] font-mono text-white backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          System online
        </span>

        <div className="absolute inset-x-0 bottom-0 p-10 text-white">
          <h2 className="text-3xl font-extrabold tracking-tight leading-tight max-w-md">
            Know every fabric,{' '}
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              thread by thread.
            </span>
          </h2>
          <ul className="mt-6 space-y-3">
            {HIGHLIGHTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-white/85">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md border border-white/15">
                  <Icon className="w-4 h-4 text-cyan-300" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};
