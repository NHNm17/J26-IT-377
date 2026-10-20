import React from 'react';
import { ChevronRight } from 'lucide-react';
import { InspectionRecord } from '../../types/inspection';
import { StatusBadge, formatTime } from '../common/ui';

interface RecentInspectionsTableProps {
  records: InspectionRecord[];
  onSelectSample: (sampleId: string) => void;
}

export const RecentInspectionsTable: React.FC<RecentInspectionsTableProps> = ({ records, onSelectSample }) => (
  <ul className="divide-y divide-slate-100 dark:divide-industrial-800 border-t border-slate-100 dark:border-industrial-800">
    {records.map((r) => (
      <li key={r.sampleId}>
        <button
          onClick={() => onSelectSample(r.sampleId)}
          className="w-full flex items-center gap-4 px-5 py-3 text-left hover:bg-slate-50 dark:hover:bg-industrial-850 transition-colors cursor-pointer focus:outline-hidden focus-visible:bg-slate-50 dark:focus-visible:bg-industrial-850"
        >
          {r.imageUrl ? (
            <img src={r.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
          ) : (
            <span className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-industrial-800 shrink-0" />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
              {r.aiClassification?.predictedFabricType ?? 'Unclassified'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">{r.sampleId}</p>
          </div>
          <span className="hidden md:block w-16 text-right text-sm tabular-nums text-slate-600 dark:text-slate-300">
            {r.aiClassification?.confidence !== undefined ? `${r.aiClassification.confidence.toFixed(1)}%` : '—'}
          </span>
          <span className="w-28 flex justify-end"><StatusBadge record={r} /></span>
          <span className="hidden sm:block w-32 text-right text-xs text-slate-500 dark:text-slate-400">{formatTime(r.timestamp)}</span>
          <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
        </button>
      </li>
    ))}
  </ul>
);
