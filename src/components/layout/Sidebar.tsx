import React from 'react';
import {
  LayoutDashboard,
  Microscope,
  History,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  Moon
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { UserProfile } from '../auth/LoginView';

export type NavigationTab = 'overview' | 'inspection' | 'history';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: NavigationTab) => void;
  recordCount: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onLogout: () => void;
  onGoHome: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  currentUser: UserProfile;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  recordCount,
  isCollapsed,
  onToggleCollapse,
  onLogout,
  onGoHome,
  isDarkMode,
  onToggleTheme,
  currentUser
}) => {
  const navItems = [
    { id: 'overview' as NavigationTab, label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'inspection' as NavigationTab, label: 'Inspection', icon: Microscope, badge: null },
    { id: 'history' as NavigationTab, label: 'History', icon: History, badge: recordCount }
  ];

  const iconButton =
    'p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-industrial-800 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500';

  return (
    <aside
      className={`h-screen shrink-0 flex flex-col bg-white dark:bg-industrial-900 border-r border-slate-200 dark:border-industrial-800 select-none transition-[width] duration-300 ease-in-out ${
        isCollapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      {/* Brand */}
      <div className={`h-16 flex items-center shrink-0 border-b border-slate-200 dark:border-industrial-800 ${isCollapsed ? 'justify-center' : 'px-4'}`}>
        <button
          onClick={onGoHome}
          className="rounded-lg cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
          title="FabricSense home"
        >
          <BrandLogo size="md" showText={!isCollapsed} showTagline={false} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1" aria-label="Workspace">
        {navItems.map(({ id, label, icon: Icon, badge }) => {
          const isActive = currentTab === id;
          return (
            <button
              key={id}
              onClick={() => onSelectTab(id)}
              title={isCollapsed ? label : undefined}
              aria-current={isActive ? 'page' : undefined}
              className={`w-full flex items-center gap-3 rounded-xl text-sm font-medium transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 ${
                isCollapsed ? 'justify-center h-11' : 'px-3 h-10'
              } ${
                isActive
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-industrial-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{label}</span>
                  {badge !== null && (
                    <span className={`text-xs tabular-nums rounded-md px-1.5 ${isActive ? 'bg-blue-100 dark:bg-blue-500/20' : 'bg-slate-100 dark:bg-industrial-800'}`}>
                      {badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer: preferences + account */}
      <div className="shrink-0 border-t border-slate-200 dark:border-industrial-800 p-3 space-y-2">
        <div className={`flex ${isCollapsed ? 'flex-col items-center gap-1' : 'items-center justify-between'}`}>
          <button
            onClick={onToggleTheme}
            className={iconButton}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Light mode' : 'Dark mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={onToggleCollapse}
            className={iconButton}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        <div className={`flex items-center gap-3 rounded-xl ${isCollapsed ? 'flex-col' : 'p-2 bg-slate-50 dark:bg-industrial-850'}`}>
          <div
            className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold"
            title={isCollapsed ? currentUser.name : undefined}
          >
            {currentUser.avatar}
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{currentUser.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{currentUser.id}</p>
            </div>
          )}
          <button
            onClick={onLogout}
            className={`${iconButton} hover:!text-rose-500`}
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
