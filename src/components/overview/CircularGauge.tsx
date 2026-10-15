import React from 'react';

interface CircularGaugeProps {
  value: number; // 0 to 100
  title: string;
  subtitle: string;
  color?: string; // hex or tailwind class
  size?: number;
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({
  value,
  title,
  subtitle,
  color = '#06b6d4',
  size = 120
}) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex items-center space-x-5 p-4 rounded-xl bg-industrial-900 border border-industrial-800 shadow-md">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-bold font-mono tracking-tight text-white">
            {value}%
          </span>
        </div>
      </div>

      <div className="min-w-0">
        <h4 className="text-sm font-semibold text-slate-200 tracking-tight">{title}</h4>
        <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        <div className="mt-2 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-[11px] font-mono text-slate-400">
            {value > 80 ? 'Optimal Range' : 'Under Observation'}
          </span>
        </div>
      </div>
    </div>
  );
};
