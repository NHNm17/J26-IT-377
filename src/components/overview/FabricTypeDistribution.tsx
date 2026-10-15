import React from 'react';
import { Layers } from 'lucide-react';

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
  // SVG Donut calculation
  const size = 160;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="p-5 rounded-2xl bg-industrial-900 border border-industrial-800 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-semibold text-slate-200">Fabric Class Distribution</h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-industrial-800/80 px-2 py-0.5 rounded border border-industrial-700/60">
          {distribution.length} Classes Registered
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Donut Chart with Center Total */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative" style={{ width: size, height: size }}>
            <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
              {/* Background ring */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#1e293b"
                strokeWidth={strokeWidth}
                fill="transparent"
              />

              {/* Segment rings */}
              {distribution.map((item, idx) => {
                const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
                accumulatedPercent += item.percentage;

                return (
                  <circle
                    key={idx}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={item.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    fill="transparent"
                    className="transition-all duration-500 hover:opacity-90 cursor-pointer"
                  />
                );
              })}
            </svg>

            {/* Inner Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-2xl font-bold font-mono text-white leading-none">
                {totalSamples}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 mt-1 font-medium">
                Total
              </span>
            </div>
          </div>
        </div>

        {/* Legend Grid */}
        <div className="md:col-span-7 grid grid-cols-2 gap-2.5">
          {distribution.map((item) => (
            <div
              key={item.type}
              className="p-2.5 rounded-lg bg-industrial-850/80 border border-industrial-800 flex items-center justify-between"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-medium text-slate-300 truncate" title={item.type}>
                  {item.type}
                </span>
              </div>
              <div className="text-right shrink-0 ml-2">
                <span className="text-xs font-mono font-bold text-white block">
                  {item.count}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
