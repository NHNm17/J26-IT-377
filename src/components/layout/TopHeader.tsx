import React, { useState, useEffect } from 'react';
import { Clock, Layers } from 'lucide-react';

export const TopHeader: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 border-b border-industrial-800 bg-industrial-900/95 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-40 select-none">
      {/* Left: Project Branding & Subsystem info */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold shadow-inner">
            <Layers className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base tracking-wide text-white">AIMS DASHBOARD</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                v1.0.4 PROTOTYPE
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Automated Apparel Fabric Differentiation & Defect Inspection System
            </p>
          </div>
        </div>
      </div>

      {/* Middle: System metadata */}
      <div className="hidden lg:flex items-center space-x-6 text-xs text-slate-400 border-x border-industrial-800 px-6 py-1">
        <div className="flex items-center space-x-2">
          <span className="text-slate-500">Group:</span>
          <span className="font-mono text-slate-200 bg-industrial-800/80 px-2 py-0.5 rounded border border-industrial-700">
            J26-IT-377
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-slate-500">Module:</span>
          <span className="text-slate-200">Frontend Monitoring & Decision Support</span>
        </div>
      </div>

      {/* Right: Status indicators & Real-time clock */}
      <div className="flex items-center space-x-4">
        {/* Dataset Connection Indicator */}
        <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-emerald-400">System Ready</span>
        </div>

        {/* Live Clock */}
        <div className="flex items-center space-x-2 text-slate-300 font-mono text-xs bg-industrial-850 px-3 py-1.5 rounded-lg border border-industrial-700/60">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{time || '--:--:--'}</span>
        </div>
      </div>
    </header>
  );
};
