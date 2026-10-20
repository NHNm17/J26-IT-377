import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  showTagline = true,
  className = ''
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-2.5 ${className} select-none`}>
      {/* Bespoke Geometric Linen Weave + Optical Sensor AI Logo */}
      <div className={`relative ${iconDimensions[size]} shrink-0 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 p-[1.5px] shadow-md group-hover:scale-105 transition-transform duration-300`}>
        <div className="w-full h-full bg-white dark:bg-industrial-900 rounded-[10px] flex items-center justify-center p-1 relative overflow-hidden">
          {/* Subtle Google Stitch Aura Glow inside logo */}
          <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/20 blur-xs pointer-events-none" />
          
          <svg 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full relative z-10"
          >
            {/* Warp & Weft Interlocking Linen Weave Strands */}
            <path
              d="M10 8V32"
              stroke="url(#linen-grad-blue)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="4 2"
            />
            <path
              d="M20 8V32"
              stroke="url(#linen-grad-indigo)"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M30 8V32"
              stroke="url(#linen-grad-purple)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="4 2"
            />
            
            {/* Horizontal Weft Fibers */}
            <path
              d="M8 14H32"
              stroke="#60a5fa"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeOpacity="0.8"
            />
            <path
              d="M8 20H32"
              stroke="url(#linen-grad-cyan)"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M8 26H32"
              stroke="#a78bfa"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeOpacity="0.8"
            />

            {/* Central Optical Lens / Diamond Sensor Node */}
            <rect
              x="16"
              y="16"
              width="8"
              height="8"
              rx="2"
              fill="url(#linen-node-grad)"
              stroke="#ffffff"
              strokeWidth="1.2"
              transform="rotate(45 20 20)"
            />
            <circle cx="20" cy="20" r="1.5" fill="#ffffff" />

            {/* Gradients */}
            <defs>
              <linearGradient id="linen-grad-blue" x1="10" y1="8" x2="10" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="linen-grad-indigo" x1="20" y1="8" x2="20" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563eb" />
                <stop offset="1" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient id="linen-grad-purple" x1="30" y1="8" x2="30" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366f1" />
                <stop offset="1" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="linen-grad-cyan" x1="8" y1="20" x2="32" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#06b6d4" />
                <stop offset="1" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="linen-node-grad" x1="16" y1="16" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563eb" />
                <stop offset="1" stopColor="#9333ea" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center space-x-1.5 leading-none">
            <span className={`font-extrabold tracking-tight ${titleSizes[size]} text-slate-900 dark:text-white`}>
              FabricSense
            </span>
            
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              AIMS
            </span>
          </div>
          {showTagline && (
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-tight mt-0.5">
              Fabric Differentiation & Quality Platform
            </span>
          )}
        </div>
      )}
    </div>
  );
};
