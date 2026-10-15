import React from 'react';
import { InspectionRecord } from '../../types/inspection';
import { Clock, Eye, AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';

interface RecentInspectionsTableProps {
  records: InspectionRecord[];
  onSelectSample: (sampleId: string) => void;
}

export const RecentInspectionsTable: React.FC<RecentInspectionsTableProps> = ({
  records,
  onSelectSample
}) => {
  const getStatusBadge = (record: InspectionRecord) => {
    switch (record.defectStatus) {
      case 'no_defect_detected':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            <span>Passed (No Defect)</span>
          </span>
        );
      case 'defect_detected':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="w-3 h-3" />
            <span>Defect Flagged</span>
          </span>
        );
      case 'defect_result_unavailable':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20">
            <HelpCircle className="w-3 h-3" />
            <span>Result Unavailable</span>
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3 h-3 animate-pulse" />
            <span>Pending AI</span>
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl bg-industrial-900 border border-industrial-800 shadow-md overflow-hidden">
      <div className="p-4 border-b border-industrial-800/80 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-semibold text-slate-200">Recent Inspection Records</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Last {records.length} Processed
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-industrial-850/90 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-industrial-800">
            <tr>
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4">Sample ID</th>
              <th className="py-3 px-4">Batch ID</th>
              <th className="py-3 px-4">Classification</th>
              <th className="py-3 px-4">Confidence</th>
              <th className="py-3 px-4">Defect Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-industrial-800/60 font-sans">
            {records.map((r) => {
              const timeFormatted = new Date(r.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              });

              return (
                <tr
                  key={r.sampleId}
                  className="hover:bg-industrial-800/40 transition-colors group cursor-pointer"
                  onClick={() => onSelectSample(r.sampleId)}
                >
                  <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">
                    {timeFormatted}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-blue-400 whitespace-nowrap">
                    {r.sampleId}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">
                    {r.batchNumber}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-200">
                    {r.aiClassification?.status === 'completed' ? (
                      <span className="px-2 py-0.5 rounded bg-industrial-800 border border-industrial-700/60">
                        {r.aiClassification.predictedFabricType}
                      </span>
                    ) : (
                      <span className="text-slate-500 italic">
                        {r.aiClassification?.status === 'pending' ? 'Pending' : 'Unavailable'}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    {r.aiClassification?.confidence !== undefined ? (
                      `${r.aiClassification.confidence.toFixed(1)}%`
                    ) : (
                      <span className="text-slate-600">--</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getStatusBadge(r)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
