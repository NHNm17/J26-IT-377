import React, { useState, useMemo } from 'react';
import { 
  InspectionRecord, 
  DefectStatus, 
  FabricType 
} from '../../types/inspection';
import { 
  Search, 
  Download, 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  HelpCircle,
  BarChart2,
  ArrowUpDown
} from 'lucide-react';

interface HistoryViewProps {
  records: InspectionRecord[];
  onSelectSample: (sampleId: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ records, onSelectSample }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<DefectStatus | 'all'>('all');
  const [selectedFabric, setSelectedFabric] = useState<FabricType | 'all'>('all');
  const [sortField, setSortField] = useState<'timestamp' | 'sampleId' | 'qualityGrade'>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filtered & Sorted Records
  const filteredRecords = useMemo(() => {
    return records
      .filter((record) => {
        // Search text
        if (searchTerm) {
          const q = searchTerm.toLowerCase();
          const matchId = record.sampleId.toLowerCase().includes(q);
          const matchBatch = record.batchNumber.toLowerCase().includes(q);
          const matchFabric = record.aiClassification?.predictedFabricType?.toLowerCase().includes(q);
          if (!matchId && !matchBatch && !matchFabric) return false;
        }

        // Status filter
        if (selectedStatus !== 'all') {
          if (record.defectStatus !== selectedStatus) return false;
        }

        // Fabric filter
        if (selectedFabric !== 'all') {
          if (record.aiClassification?.predictedFabricType !== selectedFabric) return false;
        }

        return true;
      })
      .sort((a, b) => {
        let cmp = 0;
        if (sortField === 'timestamp') {
          cmp = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        } else if (sortField === 'sampleId') {
          cmp = a.sampleId.localeCompare(b.sampleId);
        } else if (sortField === 'qualityGrade') {
          cmp = a.qualityGrade.localeCompare(b.qualityGrade);
        }
        return sortDirection === 'asc' ? cmp : -cmp;
      });
  }, [records, searchTerm, selectedStatus, selectedFabric, sortField, sortDirection]);

  // Aggregate stats for the analytics bar (Screenshot Page 4 style)
  const batchCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    records.forEach(r => {
      counts[r.batchNumber] = (counts[r.batchNumber] || 0) + 1;
    });
    return Object.entries(counts);
  }, [records]);

  const statusCounts = useMemo(() => {
    const passed = records.filter(r => r.defectStatus === 'no_defect_detected').length;
    const defect = records.filter(r => r.defectStatus === 'defect_detected').length;
    const pending = records.filter(r => r.defectStatus === 'pending' || r.defectStatus === 'defect_result_unavailable').length;
    return { passed, defect, pending, total: records.length };
  }, [records]);

  // Client-side CSV export
  const handleExportCSV = () => {
    const headers = ["Sample ID", "Timestamp", "Batch Number", "Fabric Type", "Confidence", "Defect Status", "Defect Count", "Quality Grade", "Ambient Temp C", "Ambient Hum RH"];
    const rows = filteredRecords.map(r => [
      r.sampleId,
      r.timestamp,
      r.batchNumber,
      r.aiClassification?.predictedFabricType || "Pending",
      r.aiClassification?.confidence ? `${r.aiClassification.confidence}%` : "N/A",
      r.defectStatus,
      r.defects.length,
      r.qualityGrade,
      r.ambientSensor?.temperatureC || "N/A",
      r.ambientSensor?.humidityPercent || "N/A"
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `aims_inspection_history_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleSort = (field: 'timestamp' | 'sampleId' | 'qualityGrade') => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getStatusBadge = (r: InspectionRecord) => {
    switch (r.defectStatus) {
      case 'no_defect_detected':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="w-3 h-3" />
            <span>Passed</span>
          </span>
        );
      case 'defect_detected':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="w-3 h-3" />
            <span>Defect ({r.defects.length})</span>
          </span>
        );
      case 'defect_result_unavailable':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20">
            <HelpCircle className="w-3 h-3" />
            <span>Unavailable</span>
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3 h-3 animate-pulse" />
            <span>Pending</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-industrial-800/80">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Inspection History & Batch Analytics</h1>
          <p className="text-xs text-slate-400 mt-1">
            Query, filter, and inspect verified sample telemetry and quality grading archives.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-3.5 py-2 rounded-xl bg-industrial-800 hover:bg-industrial-700 text-slate-200 text-xs font-medium border border-industrial-700 flex items-center space-x-2 transition-all self-start md:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-blue-400" />
          <span>Export CSV Report</span>
        </button>
      </div>

      {/* Analytics Mini-Dashboard (Inspired by Screenshot Page 4) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Samples per Batch */}
        <div className="p-4 rounded-xl bg-industrial-900 border border-industrial-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Batch Distribution</span>
            <BarChart2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="space-y-2 mt-3">
            {batchCounts.slice(0, 3).map(([batch, count]) => (
              <div key={batch} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">{batch}</span>
                  <span className="text-slate-400">{count} samples</span>
                </div>
                <div className="w-full bg-industrial-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{ width: `${(count / records.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metric 2: Inspection Pass Yield */}
        <div className="p-4 rounded-xl bg-industrial-900 border border-industrial-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Yield Clearance</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline space-x-2 my-2">
            <span className="text-3xl font-bold font-mono text-emerald-400">
              {statusCounts.total > 0 ? Math.round((statusCounts.passed / statusCounts.total) * 100) : 0}%
            </span>
            <span className="text-xs text-slate-400 font-mono">
              ({statusCounts.passed} of {statusCounts.total} cleared)
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            Grade A specification met without defects
          </p>
        </div>

        {/* Metric 3: Defect & Pending Ratio */}
        <div className="p-4 rounded-xl bg-industrial-900 border border-industrial-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Quality Exceptions</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="flex items-center space-x-4 my-2">
            <div>
              <span className="text-2xl font-bold font-mono text-rose-400 block">
                {statusCounts.defect}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Defects Caught</span>
            </div>
            <div className="h-8 w-px bg-industrial-800" />
            <div>
              <span className="text-2xl font-bold font-mono text-amber-400 block">
                {statusCounts.pending}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Inference Queue</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            Derived strictly from recorded samples
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-industrial-900 border border-industrial-800 shadow-md flex flex-wrap items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Sample ID, Batch, or Fabric..."
            className="w-full bg-industrial-850 border border-industrial-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Dropdown */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <span>Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="bg-industrial-850 border border-industrial-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="no_defect_detected">Passed (No Defect)</option>
              <option value="defect_detected">Defect Flagged</option>
              <option value="pending">Pending AI</option>
              <option value="defect_result_unavailable">Result Unavailable</option>
            </select>
          </div>

          {/* Fabric Type Dropdown */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <span>Fabric:</span>
            <select
              value={selectedFabric}
              onChange={(e) => setSelectedFabric(e.target.value as any)}
              className="bg-industrial-850 border border-industrial-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Fabrics</option>
              <option value="Cotton">Cotton</option>
              <option value="Polyester">Polyester</option>
              <option value="Linen">Linen</option>
              <option value="Silk">Silk</option>
              <option value="Cotton-Poly Blend">Cotton-Poly Blend</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Historical Records Table */}
      <div className="rounded-2xl bg-industrial-900 border border-industrial-800 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-industrial-850/90 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-industrial-800">
              <tr>
                <th 
                  className="py-3 px-4 cursor-pointer hover:text-white select-none"
                  onClick={() => toggleSort('timestamp')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Timestamp</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="py-3 px-4 cursor-pointer hover:text-white select-none"
                  onClick={() => toggleSort('sampleId')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Sample ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4">Batch</th>
                <th className="py-3 px-4">Fabric Type</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Defect State</th>
                <th 
                  className="py-3 px-4 cursor-pointer hover:text-white select-none"
                  onClick={() => toggleSort('qualityGrade')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Quality Grade</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4">Ambient Conditions</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-industrial-800/60 font-sans">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((r) => (
                  <tr
                    key={r.sampleId}
                    className="hover:bg-industrial-800/40 transition-colors group cursor-pointer"
                    onClick={() => onSelectSample(r.sampleId)}
                  >
                    <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">
                      {new Date(r.timestamp).toLocaleDateString()} {new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-blue-400 whitespace-nowrap">
                      {r.sampleId}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">
                      {r.batchNumber}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-200 whitespace-nowrap">
                      {r.aiClassification?.predictedFabricType || (
                        <span className="text-slate-500 italic text-[11px]">Pending</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300 whitespace-nowrap">
                      {r.aiClassification?.confidence !== undefined ? (
                        `${r.aiClassification.confidence.toFixed(1)}%`
                      ) : (
                        <span className="text-slate-600">--</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(r)}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-semibold ${
                        r.qualityGrade === 'Grade A'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : r.qualityGrade === 'Grade B'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : r.qualityGrade === 'Reject'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-slate-700/30 text-slate-400 border border-slate-600/30'
                      }`}>
                        {r.qualityGrade}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap text-[11px]">
                      {r.ambientSensor ? (
                        <span>{r.ambientSensor.temperatureC.toFixed(1)}°C · {r.ambientSensor.humidityPercent.toFixed(1)}%</span>
                      ) : (
                        <span className="text-slate-600">--</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSample(r.sampleId);
                        }}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 text-[11px] font-medium transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500 font-mono">
                    No inspection records match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-3 bg-industrial-850/60 border-t border-industrial-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Showing {filteredRecords.length} of {records.length} total entries</span>
          <span>Filtered from local dataset</span>
        </div>
      </div>
    </div>
  );
};
