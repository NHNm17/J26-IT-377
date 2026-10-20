import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { HomeLandingPage } from './components/home/HomeLandingPage';
import { LoginView, UserProfile } from './components/auth/LoginView';
import { OverviewView } from './components/overview/OverviewView';
import { FabricInspectionView } from './components/inspection/FabricInspectionView';
import { HistoryView } from './components/history/HistoryView';
import { dataService } from './services/dataService';

export const App: React.FC = () => {
  // Theme state: defaults to dark, stored in localStorage
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('aims_theme');
    if (saved) return saved === 'dark';
    return true; // Default dark theme like Stitch
  });

  // Sidebar collapse/expand state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(
    () => typeof window !== 'undefined' && window.innerWidth < 1024
  );

  // Current user authentication: null by default (unauthenticated on first load)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Active view: 'home' | 'login' | 'overview' | 'inspection' | 'history'
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Synchronize dark mode class on <html>, <body>, and native color-scheme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      localStorage.setItem('aims_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
      localStorage.setItem('aims_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  // Data loaded from dataService (backed by src/data/fabricData.ts - 100% Pure Linen samples)
  const allRecords = useMemo(() => dataService.getAllRecords(), []);
  const metrics = useMemo(() => dataService.calculateMetrics(), []);
  const recentRecords = useMemo(() => dataService.getRecentRecords(6), []);
  const fabricDistribution = useMemo(() => dataService.getFabricDistribution(), []);

  // Selected sample for deep inspection
  const [selectedRecordId, setSelectedRecordId] = useState<string>(
    allRecords[0]?.sampleId || ''
  );

  const handleSelectSample = (sampleId: string) => {
    setSelectedRecordId(sampleId);
    if (currentUser) {
      setCurrentTab('inspection');
    } else {
      // If guest clicks sample, prompt login
      setCurrentTab('login');
    }
  };

  // Login handler: redirects straight to 'overview' inside the workspace
  const handleLoginSuccess = (profile: UserProfile) => {
    setCurrentUser(profile);
    setCurrentTab('overview');
  };

  // Logout handler: resets auth and brings visitor back to Home landscape page
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentTab('home');
  };

  // 1. UNLOGGED-IN EXPERIENCE: Home Landing Page (Landscape responsive page)
  if (!currentUser && currentTab === 'home') {
    return (
      <div className="min-h-screen bg-[#f8f9fc] dark:bg-[#0c0d12] transition-colors duration-200">
        <HomeLandingPage
          metrics={metrics}
          records={allRecords}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          onOpenLogin={() => setCurrentTab('login')}
          onSelectSample={handleSelectSample}
        />
      </div>
    );
  }

  // 2. UNLOGGED-IN EXPERIENCE: Login Page
  if (!currentUser || currentTab === 'login') {
    return (
      <LoginView
        onLoginSuccess={handleLoginSuccess}
        onCancel={() => setCurrentTab('home')}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />
    );
  }

  // 3. LOGGED-IN EXPERIENCE: full-height sidebar + scrollable content area
  return (
    <div className="h-screen overflow-hidden flex bg-[#f8f9fc] dark:bg-[#0c0d12] text-slate-800 dark:text-slate-100 antialiased transition-colors duration-200">
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        recordCount={allRecords.length}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        onLogout={handleLogout}
        onGoHome={handleLogout}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        currentUser={currentUser}
      />

      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {currentTab === 'overview' && (
            <OverviewView
              metrics={metrics}
              recentRecords={recentRecords}
              fabricDistribution={fabricDistribution}
              onSelectSample={handleSelectSample}
              onNavigateTab={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'inspection' && (
            <FabricInspectionView
              records={allRecords}
              selectedRecordId={selectedRecordId}
              onSelectRecordId={setSelectedRecordId}
            />
          )}

          {currentTab === 'history' && (
            <HistoryView
              records={allRecords}
              onSelectSample={handleSelectSample}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
