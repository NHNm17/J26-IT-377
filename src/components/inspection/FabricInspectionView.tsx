import React, { useState } from 'react';
import { 
  InspectionRecord 
} from '../../types/inspection';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle, 
  HelpCircle, 
  Clock, 
  Thermometer, 
  Droplets, 
  Zap, 
  Eye, 
  Info,
  Calendar,
  Tag
} from 'lucide-react';

interface FabricInspectionViewProps {
  records: InspectionRecord[];
  selectedRecordId: string;
  onSelectRecordId: (id: string) => void;
}

export const FabricInspectionView: React.FC<FabricInspectionViewProps> = ({
  records,
  selectedRecordId,
  onSelectRecordId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDefectOverlay, setShowDefectOverlay] = useState(true);
  const [lightingMode, setLightingMode] = useState<'standard' | 'topLight' | 'infrared'>('standard');

  const currentIndex = records.findIndex(r => r.sampleId === selectedRecordId);
  const activeRecord = records[currentIndex] || records[0];

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectRecordId(records[currentIndex - 1].sampleId);
    }
  };

  const handleNext = () => {
    if (currentIndex < records.length - 1) {
      onSelectRecordId(records[currentIndex + 1].sampleId);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Sample Navigation Bar */}
      <div className="p-4 rounded-2xl bg-industrial-900 border border-industrial-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Sample ID Selector */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <button
              onClick={handlePrev}
              disabled={currentIndex <= 0}
              className="p-2 rounded-lg bg-industrial-850 hover:bg-industrial-800 disabled:opacity-30 disabled:cursor-not-allowed border border-industrial-700/60 text-slate-300 transition-colors"
              title="Previous Sample"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= records.length - 1}
              className="p-2 rounded-lg bg-industrial-850 hover:bg-industrial-800 disabled:opacity-30 disabled:cursor-not-allowed border border-industrial-700/60 text-slate-300 transition-colors"
              title="Next Sample"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <select
              value={activeRecord?.sampleId || ''}
              onChange={(e) => onSelectRecordId(e.target.value)}
              className="bg-industrial-850 border border-industrial-700 text-slate-200 text-sm rounded-xl px-4 py-2 font-mono font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer pr-10 appearance-none"
            >
              {records.map((r) => (
                <option key={r.sampleId} value={r.sampleId}>
                  {r.sampleId} ({r.aiClassification?.predictedFabricType || 'Pending'}) - {r.batchNumber}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              ▼
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span>Sample {currentIndex + 1} of {records.length}</span>
          </div>
        </div>

        {/* Search Filter */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Quick search by ID, batch..."
            className="w-full bg-industrial-850 border border-industrial-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Main Inspection Grid (Inspired by Smartex & 4inlab layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Fabric Image Viewer & Defect Annotations (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl bg-industrial-900 border border-industrial-800 shadow-md overflow-hidden">
            {/* Viewer Header */}
            <div className="p-4 border-b border-industrial-800 bg-industrial-850/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/30">
                  {activeRecord.sampleId}
                </span>
                <span className="text-xs text-slate-400 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{new Date(activeRecord.timestamp).toLocaleString()}</span>
                </span>
                <span className="text-xs font-mono text-slate-400 bg-industrial-800 px-2 py-0.5 rounded">
                  Batch: {activeRecord.batchNumber}
                </span>
              </div>

              {/* View & Lighting Mode Toggles (Smartex style) */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowDefectOverlay(!showDefectOverlay)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center space-x-1.5 transition-colors ${
                    showDefectOverlay
                      ? 'bg-blue-600/20 text-blue-300 border-blue-500/40'
                      : 'bg-industrial-800 text-slate-400 border-industrial-700'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Anomaly Overlay</span>
                </button>

                <div className="flex items-center bg-industrial-800 p-0.5 rounded-lg border border-industrial-700 text-xs">
                  <button
                    onClick={() => setLightingMode('standard')}
                    className={`px-2 py-1 rounded-md font-medium transition-colors ${
                      lightingMode === 'standard' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setLightingMode('topLight')}
                    className={`px-2 py-1 rounded-md font-medium transition-colors ${
                      lightingMode === 'topLight' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Top Light
                  </button>
                  <button
                    onClick={() => setLightingMode('infrared')}
                    className={`px-2 py-1 rounded-md font-medium transition-colors ${
                      lightingMode === 'infrared' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Infrared
                  </button>
                </div>
              </div>
            </div>

            {/* Fabric Image & Coordinate Grid Canvas */}
            <div className="relative bg-industrial-950 p-3 min-h-[420px] flex items-center justify-center overflow-hidden">
              {activeRecord.imageUrl ? (
                <div className="relative w-full max-w-2xl aspect-[4/3] rounded-xl overflow-hidden border border-industrial-700/60 shadow-2xl">
                  {/* Fabric Photo with simulated optical light filter */}
                  <img
                    src={activeRecord.imageUrl}
                    alt={activeRecord.sampleId}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      lightingMode === 'topLight'
                        ? 'brightness-125 contrast-110'
                        : lightingMode === 'infrared'
                        ? 'filter invert hue-rotate-180 brightness-90 contrast-125'
                        : 'brightness-100'
                    }`}
                  />

                  {/* Industrial Weave Grid Markers (Inspired by Smartex Screenshot) */}
                  <div className="absolute inset-0 pointer-events-none bg-grid-pattern opacity-40" />

                  {/* Weave Coordinate Ruler Labels */}
                  <div className="absolute top-2 left-2 bg-industrial-950/80 backdrop-blur px-2 py-1 rounded text-[10px] font-mono text-slate-300 border border-slate-700">
                    Pos: 0.20m — 1.60m | Optical Zoom: 2.4x
                  </div>

                  {/* Defect Bounding Boxes Overlay */}
                  {showDefectOverlay && activeRecord.defects && activeRecord.defects.length > 0 && (
                    <>
                      {activeRecord.defects.map((defect) => {
                        if (!defect.boundingBox) return null;
                        return (
                          <div
                            key={defect.id}
                            style={{
                              left: `${defect.boundingBox.x}%`,
                              top: `${defect.boundingBox.y}%`,
                              width: `${defect.boundingBox.width}%`,
                              height: `${defect.boundingBox.height}%`
                            }}
                            className="absolute border-2 border-rose-500 bg-rose-500/20 backdrop-blur-[1px] rounded shadow-lg animate-pulse"
                          >
                            <div className="absolute -top-6 left-0 bg-rose-600 text-white font-mono text-[10px] px-1.5 py-0.5 rounded shadow flex items-center space-x-1 whitespace-nowrap">
                              <span>{defect.label}</span>
                              {defect.confidence && (
                                <span className="text-rose-200">({defect.confidence.toFixed(1)}%)</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center p-10 text-slate-500">
                  <HelpCircle className="w-12 h-12 mx-auto text-slate-600 mb-2" />
                  <p className="text-sm">Fabric image not captured or available for this sample.</p>
                </div>
              )}
            </div>

            {/* Operator Notes Footer */}
            <div className="p-3 bg-industrial-850/50 border-t border-industrial-800 text-xs text-slate-400 flex items-start space-x-2">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-300">Observation Notes: </span>
                <span>{activeRecord.operatorNotes || 'No anomalies recorded during optical pass.'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Sensor Readouts & AI Decision Support (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* AI Results & Classification Card (Member 3 Output) */}
          <div className="p-5 rounded-2xl bg-industrial-900 border border-industrial-800 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-industrial-800">
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-slate-200">AI Differentiation Results</h3>
              </div>
              <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold ${
                activeRecord.qualityGrade === 'Grade A' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : activeRecord.qualityGrade === 'Grade B'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : activeRecord.qualityGrade === 'Reject'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'bg-slate-700/40 text-slate-400 border border-slate-600/40'
              }`}>
                {activeRecord.qualityGrade}
              </span>
            </div>

            {/* Fabric Classification */}
            <div className="p-3.5 rounded-xl bg-industrial-850/80 border border-industrial-800 space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
                Predicted Fabric Material
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-bold text-white tracking-tight">
                  {activeRecord.aiClassification?.predictedFabricType || (
                    <span className="text-slate-500 italic font-normal text-sm">
                      {activeRecord.aiClassification?.status === 'pending' ? 'Pending AI Worker' : 'Not Available'}
                    </span>
                  )}
                </span>
                {activeRecord.aiClassification?.confidence !== undefined && (
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {activeRecord.aiClassification.confidence.toFixed(1)}% Confidence
                  </span>
                )}
              </div>
            </div>

            {/* Defect Status Box */}
            <div className="p-3.5 rounded-xl bg-industrial-850/80 border border-industrial-800 space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
                Defect Detection (YOLOv8)
              </span>

              {activeRecord.defectStatus === 'defect_detected' ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-rose-400 text-xs font-semibold">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{activeRecord.defects.length} Defect(s) Identified</span>
                  </div>
                  <div className="space-y-1.5">
                    {activeRecord.defects.map(d => (
                      <div key={d.id} className="p-2 rounded bg-industrial-900 border border-rose-500/20 text-xs flex justify-between items-center">
                        <div>
                          <span className="text-slate-200 font-medium">{d.label}</span>
                          <span className="text-[10px] text-slate-500 block uppercase font-mono">{d.type}</span>
                        </div>
                        {d.confidence && (
                          <span className="text-rose-400 font-mono text-[11px]">
                            {d.confidence.toFixed(1)}%
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : activeRecord.defectStatus === 'no_defect_detected' ? (
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-medium py-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>No defect detected. Surface weave clean.</span>
                </div>
              ) : activeRecord.defectStatus === 'defect_result_unavailable' ? (
                <div className="flex items-center space-x-2 text-slate-400 text-xs font-medium py-1">
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                  <span>Defect result unavailable for this sample.</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-amber-400 text-xs font-medium py-1">
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>Pending defect inference from model worker.</span>
                </div>
              )}
            </div>
          </div>

          {/* Integrated Multi-Sensor Telemetry */}
          <div className="p-5 rounded-2xl bg-industrial-900 border border-industrial-800 shadow-md space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-industrial-800">
              <Zap className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-slate-200">Hardware Sensor Telemetry</h3>
            </div>

            {/* TCS3200 Optical Sensor Readings */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px]">TCS3200 Optical Sensor</span>
                {activeRecord.opticalSensor && (
                  <div className="flex items-center space-x-1.5">
                    <span 
                      className="w-3 h-3 rounded-full border border-slate-600 shadow-inner"
                      style={{ backgroundColor: activeRecord.opticalSensor.dominantColorHex }}
                    />
                    <span className="font-mono text-[10px] text-slate-400">
                      {activeRecord.opticalSensor.dominantColorHex}
                    </span>
                  </div>
                )}
              </div>

              {activeRecord.opticalSensor ? (
                <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
                  <div className="bg-industrial-850 p-2 rounded-lg border border-industrial-800">
                    <span className="text-[9px] text-rose-400 block font-bold">R</span>
                    <span className="text-xs font-semibold text-slate-200">{activeRecord.opticalSensor.red}</span>
                  </div>
                  <div className="bg-industrial-850 p-2 rounded-lg border border-industrial-800">
                    <span className="text-[9px] text-emerald-400 block font-bold">G</span>
                    <span className="text-xs font-semibold text-slate-200">{activeRecord.opticalSensor.green}</span>
                  </div>
                  <div className="bg-industrial-850 p-2 rounded-lg border border-industrial-800">
                    <span className="text-[9px] text-blue-400 block font-bold">B</span>
                    <span className="text-xs font-semibold text-slate-200">{activeRecord.opticalSensor.blue}</span>
                  </div>
                  <div className="bg-industrial-850 p-2 rounded-lg border border-industrial-800">
                    <span className="text-[9px] text-slate-400 block font-bold">CLEAR</span>
                    <span className="text-xs font-semibold text-slate-200">{activeRecord.opticalSensor.clear}</span>
                  </div>
                </div>
              ) : (
                <div className="p-2.5 rounded bg-industrial-850 text-xs text-slate-500 font-mono text-center">
                  TCS3200 reading not received
                </div>
              )}
            </div>

            {/* FDC1004 Capacitive Sensor Readings */}
            <div className="space-y-1.5 pt-2 border-t border-industrial-800">
              <span className="text-slate-400 font-mono text-[11px] block">FDC1004 Capacitive Sensor</span>
              {activeRecord.capacitanceSensor && activeRecord.capacitanceSensor.status === 'connected' ? (
                <div className="p-2.5 rounded-lg bg-industrial-850 border border-industrial-800 flex items-center justify-between font-mono">
                  <span className="text-xs text-slate-400">CH1 Capacitance:</span>
                  <span className="text-xs font-bold text-cyan-400">
                    {activeRecord.capacitanceSensor.ch1_pf.toFixed(2)} pF
                  </span>
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-industrial-850/50 border border-industrial-800 text-xs text-slate-500 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <span>Not connected / Bypassed</span>
                </div>
              )}
            </div>

            {/* DHT11 Environmental Ambient Readings */}
            <div className="space-y-1.5 pt-2 border-t border-industrial-800">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-mono text-[11px]">DHT11 Environmental Sensor</span>
                <span className="text-[9px] text-slate-500 font-mono">Ambient Only</span>
              </div>

              {activeRecord.ambientSensor ? (
                <div className="grid grid-cols-2 gap-2 font-mono">
                  <div className="p-2 rounded-lg bg-industrial-850 border border-industrial-800 flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-[9px] text-slate-500 block">AMBIENT TEMP</span>
                      <span className="text-xs font-semibold text-slate-200">
                        {activeRecord.ambientSensor.temperatureC.toFixed(1)}°C
                      </span>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-industrial-850 border border-industrial-800 flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-blue-400 shrink-0" />
                    <div>
                      <span className="text-[9px] text-slate-500 block">AMBIENT HUMIDITY</span>
                      <span className="text-xs font-semibold text-slate-200">
                        {activeRecord.ambientSensor.humidityPercent.toFixed(1)}% RH
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-2 rounded bg-industrial-850 text-xs text-slate-500 font-mono text-center">
                  DHT11 ambient telemetry not available
                </div>
              )}

              <p className="text-[10px] text-slate-500 italic mt-1">
                * Note: Labeled as ambient temperature & humidity; does not measure internal fabric moisture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
