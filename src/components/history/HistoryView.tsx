import React, { useState, useMemo } from 'react';
import { InspectionRecord, DefectStatus } from '../../types/inspection';
import { Search, Download, ChevronDown, ChevronUp, ChevronRight, SearchX } from 'lucide-react';
import { Card, PageHeader, StatusBadge, GradeBadge, formatTime, secondaryButton } from '../common/ui';

interface HistoryViewProps {
  records: InspectionRecord[];
  onSelectSample: (sampleId: string) => void;
}

type SortField = 'timestamp' | 'sampleId' | 'qualityGrade';
type StatusFilter = 'all' | 'no_defect_detected' | 'defect_detected' | 'pending';

const STATUS_FILTERS: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'no_defect_detected', label: 'Passed' },
  { id: 'defect_detected', label: 'Defect' },
  { id: 'pending', label: 'Pending' }
];

const isPending = (s: DefectStatus) => s === 'pending' || s === 'defect_result_unavailable';

export const HistoryView: React.FC<HistoryViewProps> = ({ records, onSelectSample }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [fabric, setFabric] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const fabricOptions = useMemo(
    () => Array.from(new Set(records.map(r => r.aiClassification?.predictedFabricType).filter(Boolean) as string[])).sort(),
    [records]
  );

  const counts = useMemo(() => ({
    all: records.length,
    no_defect_detected: records.filter(r => r.defectStatus === 'no_defect_detected').length,
    defect_detected: records.filter(r => r.defectStatus === 'defect_detected').length,
    pending: records.filter(r => isPending(r.defectStatus)).length
  }), [records]);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return records
      .filter((r) => {
        if (q && ![r.sampleId, r.batchNumber, r.aiClassification?.predictedFabricType ?? '']
          .some(v => v.toLowerCase().includes(q))) return false;
        if (status === 'pending' ? !isPending(r.defectStatus) : status !== 'all' && r.defectStatus !== status) return false;
        if (fabric !== 'all' && r.aiClassification?.predictedFabricType !== fabric) return false;
        return true;
      })
      .sort((a, b) => {
        const cmp = sortField === 'timestamp'
          ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          : a[sortField].localeCompare(b[sortField]);
        return sortDirection === 'asc' ? cmp : -cmp;
      });
  }, [records, searchTerm, status, fabric, sortField, sortDirection]);

  const handleExportCSV = () => {
    const headers = ['Sample ID', 'Timestamp', 'Batch', 'Fabric Type', 'Confidence', 'Defect Status', 'Defect Count', 'Quality Grade', 'Temp C', 'Humidity %'];
    const rows = filtered.map(r => [
      r.sampleId,
      r.timestamp,
      r.batchNumber,
      r.aiClassification?.predictedFabricType ?? '',
      r.aiClassification?.confidence ?? '',
      r.defectStatus,
      r.defects.length,
      r.qualityGrade,
      r.ambientSensor?.temperatureC ?? '',
      r.ambientSensor?.humidityPercent ?? ''
    ]);
    const csv = [headers, ...rows].map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `fabricsense_history_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortHeader = (field: SortField, label: string) => {
    const active = sortField === field;
    const Icon = active && sortDirection === 'asc' ? ChevronUp : ChevronDown;
    return (
      <th
        key={field}
        className="px-5 py-3 font-medium"
        aria-sort={active ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
      >
        <button onClick={() => toggleSort(field)} className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-white cursor-pointer">
          {label}
          <Icon className={`w-3.5 h-3.5 ${active ? 'opacity-100' : 'opacity-30'}`} />
        </button>
      </th>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="History"
        subtitle={`${records.length} inspected samples`}
        actions={
          <button onClick={handleExportCSV} className={secondaryButton} disabled={filtered.length === 0}>
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="inline-flex rounded-xl bg-slate-100 dark:bg-industrial-900 p-1 self-start" role="tablist" aria-label="Filter by status">
          {STATUS_FILTERS.map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={status === id}
              onClick={() => setStatus(id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                status === id
                  ? 'bg-white dark:bg-industrial-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {label}
              <span className="text-xs tabular-nums opacity-60">{counts[id]}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-1 gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search sample, batch or fabric"
              aria-label="Search records"
              className="w-full h-10 rounded-xl border border-slate-200 dark:border-industrial-700 bg-white dark:bg-industrial-900 pl-10 pr-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <select
              value={fabric}
              onChange={(e) => setFabric(e.target.value)}
              aria-label="Filter by fabric type"
              className="appearance-none h-10 rounded-xl border border-slate-200 dark:border-industrial-700 bg-white dark:bg-industrial-900 pl-3.5 pr-9 text-sm text-slate-900 dark:text-white cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All fabrics</option>
              {fabricOptions.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-industrial-800">
              <tr>
                {sortHeader('sampleId', 'Sample')}
                <th className="px-5 py-3 font-medium">Fabric type</th>
                <th className="px-5 py-3 font-medium text-right">Confidence</th>
                <th className="px-5 py-3 font-medium">Status</th>
                {sortHeader('qualityGrade', 'Grade')}
                {sortHeader('timestamp', 'Inspected')}
                <th className="w-10" aria-label="Open" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-industrial-800">
              {filtered.map((r) => (
                <tr
                  key={r.sampleId}
                  tabIndex={0}
                  onClick={() => onSelectSample(r.sampleId)}
                  onKeyDown={(e) => e.key === 'Enter' && onSelectSample(r.sampleId)}
                  className="group hover:bg-slate-50 dark:hover:bg-industrial-850 cursor-pointer focus:outline-hidden focus-visible:bg-slate-50 dark:focus-visible:bg-industrial-850"
                >
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <p className="font-mono font-semibold text-slate-900 dark:text-white">{r.sampleId}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Batch {r.batchNumber}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    {r.aiClassification?.predictedFabricType ?? <span className="text-slate-400">—</span>}
                  </td>
                  <td className="px-5 py-3.5 text-right tabular-nums text-slate-700 dark:text-slate-300">
                    {r.aiClassification?.confidence !== undefined ? `${r.aiClassification.confidence.toFixed(1)}%` : '—'}
                  </td>
                  <td className="px-5 py-3.5"><StatusBadge record={r} /></td>
                  <td className="px-5 py-3.5"><GradeBadge grade={r.qualityGrade} /></td>
                  <td className="px-5 py-3.5 whitespace-nowrap text-slate-500 dark:text-slate-400">{formatTime(r.timestamp)}</td>
                  <td className="pr-4">
                    <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 transition-colors" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-16 flex flex-col items-center gap-3 text-center">
              <SearchX className="w-8 h-8 text-slate-300 dark:text-slate-600" />
              <p className="text-sm text-slate-500 dark:text-slate-400">No samples match these filters.</p>
              <button
                onClick={() => { setSearchTerm(''); setStatus('all'); setFabric('all'); }}
                className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
