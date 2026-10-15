import React from 'react';
import { 
  LayoutDashboard, 
  Microscope, 
  History, 
  Cpu, 
  Activity
} from 'lucide-react';

export type NavigationTab = 'overview' | 'inspection' | 'history' | 'status';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  recordCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab, recordCount }) => {
  const navItems = [
    {
      id: 'overview' as NavigationTab,
      label: 'Overview',
      subtitle: 'System metrics & live stats',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'inspection' as NavigationTab,
      label: 'Fabric Inspection',
      subtitle: 'Sensors & defect analysis',
      icon: Microscope,
      badge: 'Interactive'
    },
    {
      id: 'history' as NavigationTab,
      label: 'Inspection History',
      subtitle: 'Searchable inspection logs',
      icon: History,
      badge: `${recordCount} items`
    },
    {
      id: 'status' as NavigationTab,
      label: 'System Status',
      subtitle: 'Pipeline nodes & diagnostics',
      icon: Cpu,
      badge: 'Verified'
    }
  ];

  return (
    <aside className="w-64 bg-industrial-900 border-r border-industrial-800 flex flex-col justify-between shrink-0 select-none">
      <div className="p-4 space-y-6">
        {/* Navigation Category Label */}
        <div>
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Monitoring Modules
          </p>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-start space-x-3 px-3.5 py-3 rounded-xl transition-all duration-150 text-left relative ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-medium shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-industrial-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm tracking-tight">{item.label}</span>
                      {item.badge && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                          isActive 
                            ? 'bg-blue-500/20 text-blue-300' 
                            : 'bg-industrial-800 text-slate-400'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 block truncate">
                      {item.subtitle}
                    </span>
                  </div>
                  {isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-l-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Prototype Specifications Card */}
        <div className="p-3.5 rounded-xl bg-industrial-850/80 border border-industrial-800 text-xs text-slate-400 space-y-2.5">
          <div className="flex items-center space-x-2 text-slate-300 font-medium">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>Integrated Sensors</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
            <div className="bg-industrial-900/90 p-1.5 rounded border border-industrial-800">
              <span className="text-slate-500 block text-[9px]">OPTICAL</span>
              <span className="text-slate-300 font-semibold">TCS3200</span>
            </div>
            <div className="bg-industrial-900/90 p-1.5 rounded border border-industrial-800">
              <span className="text-slate-500 block text-[9px]">CAPACITANCE</span>
              <span className="text-slate-300 font-semibold">FDC1004</span>
            </div>
            <div className="bg-industrial-900/90 p-1.5 rounded border border-industrial-800 col-span-2">
              <span className="text-slate-500 block text-[9px]">ENVIRONMENTAL</span>
              <span className="text-slate-300 font-semibold">DHT11 Ambient Temp/Hum</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Operator Info */}
      <div className="p-4 border-t border-industrial-800/80 bg-industrial-950/40">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-300">
            WL
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-slate-200 truncate">Wasana Lakmini</p>
            <p className="text-[10px] text-slate-500 font-mono truncate">IT23362512 · QC Lead</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
