import React from 'react';

interface DistributionItem {
  type: string;
  count: number;
  percentage: number;
  color: string;
}

interface FabricTypeDistributionProps {
  distribution: DistributionItem[];
  totalSamples: number;
}

export const FabricTypeDistribution: React.FC<FabricTypeDistributionProps> = ({
  distribution,
  totalSamples
}) => {
  const size = 168;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = distribution.reduce((sum, d) => sum + d.count, 0) || 1;

  let offset = 0;

  return (
    <div className="px-5 pb-5 flex flex-col sm:flex-row items-center gap-8">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Fabric type distribution">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-100 dark:text-industrial-800"
          />
          {distribution.map((item) => {
            const length = (item.count / total) * circumference;
            const dash = `${Math.max(length - 2, 0)} ${circumference}`;
            const el = (
              <circle
                key={item.type}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={dash}
                strokeDashoffset={-offset}
                fill="transparent"
              >
                <title>{`${item.type}: ${item.count}`}</title>
              </circle>
            );
            offset += length;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-extrabold tabular-nums text-slate-900 dark:text-white">{totalSamples}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">samples</span>
        </div>
      </div>

      <ul className="w-full grid grid-cols-1 2xl:grid-cols-2 gap-x-6 gap-y-2.5">
        {distribution.map((item) => (
          <li key={item.type} className="flex items-center gap-2.5 text-sm min-w-0">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
            <span className="flex-1 truncate text-slate-700 dark:text-slate-300" title={item.type}>{item.type}</span>
            <span className="font-semibold tabular-nums text-slate-900 dark:text-white">{item.count}</span>
            <span className="w-10 text-right tabular-nums text-xs text-slate-400">{item.percentage}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
