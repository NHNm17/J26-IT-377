import React from 'react';
import { Layers, CheckCircle2, AlertTriangle, Clock, ScanLine } from 'lucide-react';
import { InspectionRecord, DashboardMetrics } from '../../types/inspection';
import { Card, CardHeader, PageHeader, primaryButton } from '../common/ui';
import { FabricTypeDistribution } from './FabricTypeDistribution';
import { RecentInspectionsTable } from './RecentInspectionsTable';

interface OverviewViewProps {
  metrics: DashboardMetrics;
  recentRecords: InspectionRecord[];
  fabricDistribution: { type: string; count: number; percentage: number; color: string }[];
  onSelectSample: (sampleId: string) => void;
  onNavigateTab: (tab: 'inspection' | 'history') => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  metrics,
  recentRecords,
  fabricDistribution,
  onSelectSample,
  onNavigateTab
}) => {
  const passRate = 100 - metrics.defectRate;

  const kpis = [
    { label: 'Samples', value: metrics.totalProcessed, note: null, icon: Layers, tone: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10' },
    { label: 'Classified', value: metrics.totalClassified, note: `${metrics.classificationRate}%`, icon: CheckCircle2, tone: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10' },
    { label: 'Defects', value: metrics.totalFlaggedDefects, note: `${metrics.defectRate}%`, icon: AlertTriangle, tone: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10' },
    { label: 'Pending', value: metrics.totalAwaitingResults, note: null, icon: Clock, tone: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10' }
  ];

  const rates = [
    { label: 'Classification rate', value: metrics.classificationRate, bar: 'bg-blue-500' },
    { label: 'First-pass yield', value: passRate, bar: 'bg-emerald-500' },
    { label: 'Defect rate', value: metrics.defectRate, bar: 'bg-rose-500' }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Overview"
        subtitle="Classification and defect detection at a glance."
        actions={
          <button onClick={() => onNavigateTab('inspection')} className={primaryButton}>
            <ScanLine className="w-4 h-4" />
            Inspect sample
          </button>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(({ label, value, note, icon: Icon, tone }) => (
          <Card key={label} className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</span>
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${tone}`}>
                <Icon className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight tabular-nums text-slate-900 dark:text-white">{value}</span>
              {note && <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{note}</span>}
            </div>
          </Card>
        ))}
      </div>

      {/* Distribution + quality rates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader title="Fabric types" />
          <FabricTypeDistribution distribution={fabricDistribution} totalSamples={metrics.totalProcessed} />
        </Card>

        <Card>
          <CardHeader title="Quality" />
          <div className="px-5 pb-5 space-y-5">
            {rates.map(({ label, value, bar }) => (
              <div key={label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">{label}</span>
                  <span className="font-semibold tabular-nums text-slate-900 dark:text-white">{value}%</span>
                </div>
                <div
                  className="mt-2 h-2 rounded-full bg-slate-100 dark:bg-industrial-800 overflow-hidden"
                  role="progressbar"
                  aria-label={label}
                  aria-valuenow={value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className={`h-full rounded-full ${bar} transition-all duration-700`} style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Recent inspections"
          action={
            <button
              onClick={() => onNavigateTab('history')}
              className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              View all
            </button>
          }
        />
        <RecentInspectionsTable records={recentRecords} onSelectSample={onSelectSample} />
      </Card>
    </div>
  );
};
