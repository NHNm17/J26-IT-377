import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  Scan,
  Zap,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { InspectionRecord, DashboardMetrics } from '../../types/inspection';

interface HomeViewProps {
  metrics: DashboardMetrics;
  records: InspectionRecord[];
  onNavigateTab: (tab: 'inspection' | 'overview' | 'history' | 'status') => void;
  onNavigateLogin: () => void;
  onSelectSample: (sampleId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  metrics,
  records,
  onNavigateTab,
  onNavigateLogin,
  onSelectSample
}) => {
  const [promptInput, setPromptInput] = useState('');

  const promptSuggestions = [
    { label: "✨ Inspect Warp Yarn Tears on Flax", action: () => onNavigateTab('inspection') },
    { label: "🔬 FDC1004 High Capacitance (>5.1 pF)", action: () => onNavigateTab('inspection') },
    { label: "📊 Belgian Slub Linen Weaves", action: () => onNavigateTab('history') },
    { label: "⚡ SLIIT Viva Readiness Audit", action: () => onNavigateTab('status') },
  ];

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promptInput.toLowerCase().includes('status') || promptInput.toLowerCase().includes('sensor')) {
      onNavigateTab('status');
    } else if (promptInput.toLowerCase().includes('history') || promptInput.toLowerCase().includes('record')) {
      onNavigateTab('history');
    } else {
      onNavigateTab('inspection');
    }
  };

  const featuredLinenSamples = records.slice(0, 4);

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-16">
      {/* Hero Section with Google Stitch Style Canvas Aura */}
      <section className="relative overflow-hidden rounded-3xl p-8 md:p-12 border border-slate-200/80 dark:border-white/10 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/50 dark:from-industrial-900/90 dark:via-industrial-900/60 dark:to-industrial-950 shadow-xl backdrop-blur-xl">
        {/* Subtle Ambient Google AI Aura Glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/15 dark:bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-aura" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/15 dark:bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-aura" style={{ animationDelay: '3s' }} />

        <div className="relative z-10 max-w-3xl space-y-6">
          {/* Stitch Pill Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-industrial-800/80 border border-slate-300/80 dark:border-industrial-700/60 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping" />
            <span className="flex h-2 w-2 rounded-full bg-blue-500 -ml-4" />
            <span className="font-semibold text-blue-600 dark:text-blue-400">Stitch</span>
            <span className="text-slate-400 dark:text-slate-500">|</span>
            <span>AIMS Fabric Intelligence System</span>
            <span className="bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold">
              v2.6 AI Canvas
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            AI-Native Canvas for{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Pure Fabric
            </span>{' '}
            Differentiation & Quality
          </h1>

          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Designed on Google Stitch principles. Real-time multi-spectral textile inspection, 
            slub weave defect detection, and tri-sensor telemetry calibrated strictly for natural flax linen.
          </p>

          {/* Stitch Interactive AI Prompt Canvas Bar */}
          <form onSubmit={handlePromptSubmit} className="pt-2">
            <div className="relative group max-w-2xl">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl blur-sm opacity-30 group-hover:opacity-60 transition duration-300" />
              <div className="relative flex items-center bg-white dark:bg-industrial-850 rounded-2xl border border-slate-200 dark:border-industrial-700/80 shadow-lg px-4 py-2.5">
                <Sparkles className="w-5 h-5 text-blue-500 dark:text-blue-400 shrink-0 mr-3 animate-pulse" />
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Ask Stitch Canvas to inspect linen slub, detect pinholes, or query FDC1004..."
                  className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md shrink-0 cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Prompt Suggestion Chips */}
            <div className="flex flex-wrap gap-2 pt-3">
              {promptSuggestions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={item.action}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/80 dark:bg-industrial-850 hover:bg-slate-100 dark:hover:bg-industrial-800 border border-slate-200 dark:border-industrial-700 text-slate-600 dark:text-slate-300 transition-all hover:scale-102 flex items-center space-x-1"
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </form>

          {/* Quick CTA Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => onNavigateTab('inspection')}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold flex items-center space-x-2 transition-all shadow-lg shadow-blue-500/25 cursor-pointer"
            >
              <Scan className="w-4 h-4" />
              <span>Launch Linen Inspector</span>
            </button>
            <button
              onClick={() => onNavigateTab('overview')}
              className="px-5 py-3 rounded-xl bg-white dark:bg-industrial-800 hover:bg-slate-100 dark:hover:bg-industrial-700 text-slate-800 dark:text-slate-200 text-sm font-semibold border border-slate-200 dark:border-industrial-700 flex items-center space-x-2 transition-all cursor-pointer"
            >
              <Activity className="w-4 h-4 text-blue-500" />
              <span>Operational Dashboard</span>
            </button>
            <button
              onClick={onNavigateLogin}
              className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-industrial-850 hover:bg-slate-200 dark:hover:bg-industrial-800 text-slate-700 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-industrial-700/60 flex items-center space-x-2 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>QC Portal Login</span>
            </button>
          </div>
        </div>
      </section>

      {/* Key Metric Highlights Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-industrial-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Linen Batches</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
            {metrics.totalProcessed}
          </p>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center mt-1">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            100% Pure Fabric Samples
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-industrial-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Classification Rate</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
            {metrics.classificationRate}%
          </p>
          <span className="text-xs text-slate-500 font-mono mt-1 block">
            {metrics.totalClassified} verified AI classifications
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-industrial-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Defects Flagged</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
            {metrics.totalFlaggedDefects}
          </p>
          <span className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1 block">
            {metrics.defectRate}% defect rate localized
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-industrial-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Awaiting Pipeline</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
            {metrics.totalAwaitingResults}
          </p>
          <span className="text-xs text-slate-500 font-mono mt-1 block">
            Sensor telemetry ready for YOLO
          </span>
        </div>
      </section>

      {/* Dedicated Pure Linen Showcase Section */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Strict Material Focus</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Pure Natural Linen Samples & Varieties
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              All non-related fabrics (cotton, synthetics, silk) have been removed from the pipeline. 
              The system specializes in detecting natural flax characteristics: slub thickness, moisture affinity, and warp/weft integrity.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('history')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
          >
            <span>View all {records.length} linen batches in catalog</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Linen Sample Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredLinenSamples.map((sample) => (
            <div
              key={sample.sampleId}
              onClick={() => {
                onSelectSample(sample.sampleId);
                onNavigateTab('inspection');
              }}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-industrial-800 hover:border-blue-500 dark:hover:border-blue-500/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Linen Image Container */}
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-industrial-850">
                <img
                  src={sample.imageUrl}
                  alt={sample.sampleId}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Defect or Grade Badge */}
                <div className="absolute top-3 right-3">
                  {sample.defectStatus === 'defect_detected' ? (
                    <span className="px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-rose-500/90 text-white shadow-sm">
                      DEFECT FLAGGED
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-emerald-500/90 text-white shadow-sm">
                      GRADE A PASSED
                    </span>
                  )}
                </div>

                {/* Sample ID Pill */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="text-xs font-mono font-semibold bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-sm">
                    {sample.sampleId}
                  </span>
                  <span className="text-[11px] font-mono text-slate-300">
                    {sample.batchNumber}
                  </span>
                </div>
              </div>

              {/* Sample Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100 group-hover:text-blue-500 transition-colors">
                    {sample.aiClassification?.predictedFabricType || 'Natural Flax Linen'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {sample.operatorNotes || 'Pure natural flax slub texture verified.'}
                  </p>
                </div>

                {/* Sensor Snapshot Chips */}
                <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-100 dark:border-industrial-800 text-[11px] font-mono">
                  <div className="bg-slate-50 dark:bg-industrial-850 p-1.5 rounded-sm">
                    <span className="text-slate-400 dark:text-slate-500 block text-[9px]">CAPACITANCE</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {sample.capacitanceSensor?.ch1_pf.toFixed(2) || '4.95'} pF
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-industrial-850 p-1.5 rounded-sm">
                    <span className="text-slate-400 dark:text-slate-500 block text-[9px]">AI CONFIDENCE</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {sample.aiClassification?.confidence?.toFixed(1) || '95.0'}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tri-Sensor & Research Compliance Grid */}
      <section className="rounded-3xl p-8 bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-industrial-900 dark:to-industrial-850 border border-slate-200 dark:border-industrial-800">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Hardware & Edge Pipeline
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Calibrated for Linen Differentiation
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Natural linen contains microscopic hollow pectin lumina that retain specific moisture levels, 
            detectable via precision capacitive resonance and spectrophotometric reflectance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-industrial-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Scan className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">TCS3200 Optical Sensor</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              RGB + Clear channel optical readings identify natural unbleached ecru, bleached flax, and yarn-dyed linen weave color frequencies.
            </p>
            <div className="pt-2 text-[11px] font-mono text-blue-600 dark:text-blue-400">
              Output: R, G, B, Clear Frequency (Hz)
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-industrial-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">FDC1004 Capacitive Sensor</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Measures dielectric permittivity in picofarads (pF). High-flax natural fibers register distinct 4.8 – 5.4 pF signatures.
            </p>
            <div className="pt-2 text-[11px] font-mono text-purple-600 dark:text-purple-400">
              Output: CH1 Dielectric Capacitance (pF)
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-industrial-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">DHT11 Ambient Chamber</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Captures environmental chamber temperature and humidity to normalize capacitive readings and prevent false moisture anomalies.
            </p>
            <div className="pt-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
              Output: Ambient Temp (°C) & Humidity (%)
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
