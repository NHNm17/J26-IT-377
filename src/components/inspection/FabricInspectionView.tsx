import React, { useState } from 'react';
import { InspectionRecord } from '../../types/inspection';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Clock,
  Thermometer,
  Droplets,
  Zap,
  Eye,
  EyeOff,
  ZoomIn,
  ZoomOut,
  ImageOff
} from 'lucide-react';
import { Card, CardHeader, GradeBadge, formatTime, secondaryButton } from '../common/ui';

interface FabricInspectionViewProps {
  records: InspectionRecord[];
  selectedRecordId: string;
  onSelectRecordId: (id: string) => void;
}

type LightingMode = 'standard' | 'topLight' | 'infrared';

const LIGHTING: { id: LightingMode; label: string; filter: string }[] = [
  { id: 'standard', label: 'Standard', filter: '' },
  { id: 'topLight', label: 'Top light', filter: 'brightness-125 contrast-125 saturate-110' },
  { id: 'infrared', label: 'Near-IR', filter: 'invert hue-rotate-180 contrast-125 grayscale' }
];

export const FabricInspectionView: React.FC<FabricInspectionViewProps> = ({
  records,
  selectedRecordId,
  onSelectRecordId
}) => {
  const [showDefects, setShowDefects] = useState(true);
  const [lighting, setLighting] = useState<LightingMode>('standard');
  const [zoom, setZoom] = useState(1);

  const foundIndex = records.findIndex(r => r.sampleId === selectedRecordId);
  const currentIndex = foundIndex === -1 ? 0 : foundIndex;
  const record = records[currentIndex];
  if (!record) return null;

  const go = (delta: number) => {
    const next = records[currentIndex + delta];
    if (next) onSelectRecordId(next.sampleId);
  };

  const ai = record.aiClassification;
  const lightingFilter = LIGHTING.find(l => l.id === lighting)?.filter ?? '';
  const navButton = `${secondaryButton} !px-2.5 disabled:opacity-40 disabled:cursor-not-allowed`;

  return (
    <div className="space-y-6">
      {/* Sample switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Inspection</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Batch {record.batchNumber} · {formatTime(record.timestamp)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => go(-1)} disabled={currentIndex === 0} className={navButton} aria-label="Previous sample">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="relative">
            <label htmlFor="sample-select" className="sr-only">Sample</label>
            <select
              id="sample-select"
              value={record.sampleId}
              onChange={(e) => onSelectRecordId(e.target.value)}
              className="appearance-none h-10 rounded-xl border border-slate-200 dark:border-industrial-700 bg-white dark:bg-industrial-900 pl-3.5 pr-9 text-sm font-mono font-medium text-slate-900 dark:text-white cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              {records.map((r) => (
                <option key={r.sampleId} value={r.sampleId}>{r.sampleId}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
          <span className="hidden sm:block text-sm tabular-nums text-slate-500 dark:text-slate-400 px-1">
            {currentIndex + 1}/{records.length}
          </span>
          <button onClick={() => go(1)} disabled={currentIndex === records.length - 1} className={navButton} aria-label="Next sample">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Viewer */}
        <Card className="xl:col-span-2 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-200 dark:border-industrial-800">
            <div className="inline-flex rounded-lg bg-slate-100 dark:bg-industrial-850 p-1" role="radiogroup" aria-label="Lighting">
              {LIGHTING.map(({ id, label }) => (
                <button
                  key={id}
                  role="radio"
                  aria-checked={lighting === id}
                  onClick={() => setLighting(id)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    lighting === id
                      ? 'bg-white dark:bg-industrial-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {record.defects.length > 0 && (
                <button
                  onClick={() => setShowDefects(v => !v)}
                  aria-pressed={showDefects}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-industrial-800 transition-colors cursor-pointer"
                >
                  {showDefects ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  Defects
                </button>
              )}
              <div className="inline-flex items-center rounded-lg bg-slate-100 dark:bg-industrial-850 p-1">
                <button
                  onClick={() => setZoom(z => Math.max(1, +(z - 0.25).toFixed(2)))}
                  disabled={zoom <= 1}
                  className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 cursor-pointer"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="w-11 text-center text-xs tabular-nums text-slate-600 dark:text-slate-300">{zoom.toFixed(2)}×</span>
                <button
                  onClick={() => setZoom(z => Math.min(2, +(z + 0.25).toFixed(2)))}
                  disabled={zoom >= 2}
                  className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 cursor-pointer"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
            {record.imageUrl ? (
              <div className="absolute inset-0 transition-transform duration-300" style={{ transform: `scale(${zoom})` }}>
                <img
                  src={record.imageUrl}
                  alt={`Fabric sample ${record.sampleId}`}
                  className={`w-full h-full object-cover transition-[filter] duration-300 ${lightingFilter}`}
                />
                {showDefects && record.defects.map((d) => d.boundingBox && (
                  <div
                    key={d.id}
                    className="absolute rounded-md border-2 border-rose-500 bg-rose-500/15"
                    style={{
                      left: `${d.boundingBox.x}%`,
                      top: `${d.boundingBox.y}%`,
                      width: `${d.boundingBox.width}%`,
                      height: `${d.boundingBox.height}%`
                    }}
                  >
                    <span className="absolute -top-6 left-[-2px] whitespace-nowrap rounded-md bg-rose-600 px-1.5 py-0.5 text-[11px] font-semibold text-white">
                      {d.label}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-400">
                <ImageOff className="w-10 h-10" />
                <p className="text-sm">No image captured for this sample</p>
              </div>
            )}
          </div>

          {record.operatorNotes && (
            <p className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-industrial-800">
              {record.operatorNotes}
            </p>
          )}
        </Card>

        {/* Results + sensors */}
        <div className="space-y-4">
          <Card>
            <CardHeader title="Result" action={<GradeBadge grade={record.qualityGrade} />} />
            <div className="px-5 pb-5 space-y-5">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Fabric type</p>
                <p className="mt-1 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {ai?.predictedFabricType ?? (ai?.status === 'pending' ? 'Awaiting model…' : 'Not available')}
                </p>
                {ai?.confidence !== undefined && (
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-industrial-800 overflow-hidden">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: `${ai.confidence}%` }} />
                    </div>
                    <span className="text-sm font-semibold tabular-nums text-slate-900 dark:text-white">{ai.confidence.toFixed(1)}%</span>
                  </div>
                )}
              </div>

              <div className="pt-5 border-t border-slate-100 dark:border-industrial-800">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Defects</p>
                {record.defectStatus === 'defect_detected' ? (
                  <ul className="mt-2 space-y-2">
                    {record.defects.map(d => (
                      <li key={d.id} className="flex items-center gap-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 px-3 py-2.5">
                        <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{d.label}</p>
                          <p className="text-xs capitalize text-slate-500 dark:text-slate-400">{d.type.replace('_', ' ')} · {d.severity}</p>
                        </div>
                        {d.confidence !== undefined && (
                          <span className="text-sm font-semibold tabular-nums text-rose-600 dark:text-rose-400">{d.confidence.toFixed(1)}%</span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    {record.defectStatus === 'no_defect_detected' && <><CheckCircle2 className="w-4 h-4 text-emerald-500" />No defects found</>}
                    {record.defectStatus === 'pending' && <><Clock className="w-4 h-4 text-amber-500" />Awaiting defect model</>}
                    {record.defectStatus === 'defect_result_unavailable' && <><HelpCircle className="w-4 h-4 text-slate-400" />Result unavailable</>}
                  </p>
                )}
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Sensors" />
            <div className="px-5 pb-5 space-y-4">
              {/* Optical */}
              <div className="flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-xl ring-1 ring-inset ring-black/10 shrink-0"
                  style={{ backgroundColor: record.opticalSensor?.dominantColorHex ?? 'transparent' }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Colour (TCS3200)</p>
                  {record.opticalSensor ? (
                    <p className="text-sm font-mono text-slate-900 dark:text-white">
                      <span className="text-rose-500">R</span> {record.opticalSensor.red}{' '}
                      <span className="text-emerald-500">G</span> {record.opticalSensor.green}{' '}
                      <span className="text-blue-500">B</span> {record.opticalSensor.blue}
                    </p>
                  ) : (
                    <p className="text-sm text-slate-400">No reading</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    icon: Zap, tone: 'text-cyan-500', label: 'Capacitance',
                    value: record.capacitanceSensor?.status === 'connected' ? `${record.capacitanceSensor.ch1_pf.toFixed(2)} pF` : '—'
                  },
                  {
                    icon: Thermometer, tone: 'text-amber-500', label: 'Temp',
                    value: record.ambientSensor ? `${record.ambientSensor.temperatureC.toFixed(1)}°C` : '—'
                  },
                  {
                    icon: Droplets, tone: 'text-blue-500', label: 'Humidity',
                    value: record.ambientSensor ? `${record.ambientSensor.humidityPercent.toFixed(0)}%` : '—'
                  }
                ].map(({ icon: Icon, tone, label, value }) => (
                  <div key={label} className="rounded-xl bg-slate-50 dark:bg-industrial-850 p-3">
                    <Icon className={`w-4 h-4 ${tone}`} />
                    <p className="mt-2 text-sm font-semibold tabular-nums text-slate-900 dark:text-white">{value}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
