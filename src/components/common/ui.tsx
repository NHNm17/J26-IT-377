import React from 'react';
import { CheckCircle2, AlertTriangle, Clock, HelpCircle } from 'lucide-react';
import { InspectionRecord, QualityGrade } from '../../types/inspection';

/** Shared surface used by every workspace panel. */
export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <section className={`rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-industrial-800 ${className}`}>
    {children}
  </section>
);

export const CardHeader: React.FC<{ title: string; action?: React.ReactNode }> = ({ title, action }) => (
  <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-3">
    <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h2>
    {action}
  </div>
);

export const PageHeader: React.FC<{ title: string; subtitle?: string; actions?: React.ReactNode }> = ({
  title,
  subtitle,
  actions
}) => (
  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
    </div>
    {actions && <div className="flex items-center gap-2">{actions}</div>}
  </div>
);

const STATUS_META = {
  no_defect_detected: { label: 'Passed', icon: CheckCircle2, cls: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' },
  defect_detected: { label: 'Defect', icon: AlertTriangle, cls: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' },
  pending: { label: 'Pending', icon: Clock, cls: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' },
  defect_result_unavailable: { label: 'Unavailable', icon: HelpCircle, cls: 'bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-400' }
} as const;

export const StatusBadge: React.FC<{ record: InspectionRecord }> = ({ record }) => {
  const meta = STATUS_META[record.defectStatus];
  const Icon = meta.icon;
  const count = record.defectStatus === 'defect_detected' && record.defects.length > 1 ? ` (${record.defects.length})` : '';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${meta.cls}`}>
      <Icon className="w-3 h-3" />
      {meta.label}{count}
    </span>
  );
};

const GRADE_CLS: Record<QualityGrade, string> = {
  'Grade A': 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 ring-emerald-600/20',
  'Grade B': 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 ring-amber-600/20',
  'Reject': 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 ring-rose-600/20',
  'Pending Review': 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-500/10 ring-slate-500/20'
};

export const GradeBadge: React.FC<{ grade: QualityGrade }> = ({ grade }) => (
  <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ring-inset whitespace-nowrap ${GRADE_CLS[grade]}`}>
    {grade}
  </span>
);

export const formatTime = (iso: string) =>
  new Date(iso).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

export const primaryButton =
  'inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-xs shadow-blue-600/20 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0c0d12]';

export const secondaryButton =
  'inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-industrial-700 bg-white dark:bg-industrial-900 hover:bg-slate-50 dark:hover:bg-industrial-800 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500';
