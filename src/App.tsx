import React, { useState, useMemo } from 'react';
import { TopHeader } from './components/layout/TopHeader';
import { Sidebar, NavigationTab } from './components/layout/Sidebar';
import { OverviewView } from './components/overview/OverviewView';
import { FabricInspectionView } from './components/inspection/FabricInspectionView';
import { HistoryView } from './components/history/HistoryView';
import { SystemStatusView } from './components/status/SystemStatusView';
import { dataService } from './services/dataService';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('overview');
  
  // Data loaded from dataService (backed by src/data/fabricData.ts)
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
    setCurrentTab('inspection');
  };

  return (
    <div className="min-h-screen bg-industrial-950 text-slate-100 flex flex-col antialiased">
      {/* Top Header - No demo banner as requested */}
      <TopHeader />

      {/* Main Workspace: Sidebar + Dynamic Page Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          recordCount={allRecords.length}
        />

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-industrial-950/90">
          {currentTab === 'overview' && (
            <OverviewView
              metrics={metrics}
              recentRecords={recentRecords}
              fabricDistribution={fabricDistribution}
              onSelectSample={handleSelectSample}
              onNavigateTab={(tab) => setCurrentTab(tab as NavigationTab)}
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

          {currentTab === 'status' && (
            <SystemStatusView />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
