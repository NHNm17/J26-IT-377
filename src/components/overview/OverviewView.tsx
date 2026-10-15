import React from 'react';
import { 
  Package, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Search,
  ArrowRight
} from 'lucide-react';
import { InspectionRecord, DashboardMetrics } from '../../types/inspection';
import { CircularGauge } from './CircularGauge';
import { FabricTypeDistribution } from './FabricTypeDistribution';
import { RecentInspectionsTable } from './RecentInspectionsTable';

interface OverviewViewProps {
  metrics: DashboardMetrics;
  recentRecords: InspectionRecord[];
  fabricDistribution: { type: string; count: number; percentage: number; color: string }[];
  onSelectSample: (sampleId: string) => void;
  onNavigateTab: (tab: 'inspection' | 'history' | 'status') => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  metrics,
  recentRecords,
  fabricDistribution,
  onSelectSample,
  onNavigateTab
}) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner / Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-industrial-800/80">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <span>Operational Quality & Inspection Overview</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time fabric classification and automated defect detection performance metrics.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigateTab('inspection')}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center space-x-2 transition-all shadow-md shadow-blue-900/30"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Inspect Fabric Sample</span>
          </button>
          <button
            onClick={() => onNavigateTab('history')}
            className="px-3.5 py-2 rounded-xl bg-industrial-800 hover:bg-industrial-700 text-slate-200 text-xs font-medium border border-industrial-700 flex items-center space-x-1.5 transition-all"
          >
            <span>View All Records</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Summary Cards Grid - Strictly Calculated From Loaded Records */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Processed */}
        <div className="p-4 rounded-xl bg-industrial-900 border border-industrial-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Total Samples Processed</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-white tracking-tight">
              {metrics.totalProcessed}
            </span>
            <span className="text-xs text-slate-500 font-mono">samples</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">
            Derived directly from registered data records
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500/40" />
        </div>

        {/* Card 2: Samples Classified */}
        <div className="p-4 rounded-xl bg-industrial-900 border border-industrial-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Samples Classified</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-white tracking-tight">
              {metrics.totalClassified}
            </span>
            <span className="text-xs font-mono text-emerald-400">
              ({metrics.classificationRate}%)
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">
            Verified AI material categorization completed
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500/40" />
        </div>

        {/* Card 3: Defect Flagged */}
        <div className="p-4 rounded-xl bg-industrial-900 border border-industrial-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Flagged For Defects</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-white tracking-tight">
              {metrics.totalFlaggedDefects}
            </span>
            <span className="text-xs font-mono text-rose-400">
              ({metrics.defectRate}%)
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">
            Holes, tears, stains or weaving faults flagged
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500/40" />
        </div>

        {/* Card 4: Awaiting Results */}
        <div className="p-4 rounded-xl bg-industrial-900 border border-industrial-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Awaiting AI Results</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-white tracking-tight">
              {metrics.totalAwaitingResults}
            </span>
            <span className="text-xs text-slate-500 font-mono">in queue</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">
            Pending classification or defect confirmation
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500/40" />
        </div>
      </div>

      {/* Industrial Visualizations: Gauges & Donut Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Industrial Quality Gauges (like 4inlab screenshot) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <CircularGauge
            value={metrics.classificationRate}
            title="Classification Coverage"
            subtitle="Ratio of samples with confirmed AI fabric class"
            color="#0ea5e9"
          />

          <CircularGauge
            value={100 - metrics.defectRate}
            title="Quality Clearance Yield"
            subtitle="Percentage of inspected fabrics cleared without defect"
            color="#10b981"
          />
        </div>

        {/* Right: Fabric Type Distribution (like FLIR screenshot) */}
        <div className="lg:col-span-7">
          <FabricTypeDistribution
            distribution={fabricDistribution}
            totalSamples={metrics.totalProcessed}
          />
        </div>
      </div>

      {/* Recent Inspection Records Table (like 4inlab screenshot) */}
      <RecentInspectionsTable
        records={recentRecords}
        onSelectSample={onSelectSample}
      />
    </div>
  );
};
