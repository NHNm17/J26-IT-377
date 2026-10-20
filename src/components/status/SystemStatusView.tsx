import React, { useState } from 'react';
import { 
  Server, 
  Brain, 
  Layers, 
  Radio, 
  Code2
} from 'lucide-react';
import { INITIAL_FABRIC_RECORDS } from '../../data/fabricData';

export const SystemStatusView: React.FC = () => {
  const [activeJsonTab, setActiveJsonTab] = useState<'sample' | 'sensors' | 'yolo'>('sample');

  const pipelineNodes = [
    {
      id: 'sensors',
      name: 'Member 1: Multi-Sensor Module (ESP32)',
      protocol: 'MQTT (TLS Encrypted)',
      hardware: 'TCS3200 (Optical), FDC1004 (Capacitive), DHT11 (Ambient)',
      status: 'verified_format',
      statusLabel: 'Data Schema Mapped',
      statusDetail: 'Calibrated payload contracts ready for pure linen dielectric capacitance & optical reflectance.',
      icon: Radio,
      badgeColor: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/30'
    },
    {
      id: 'nodered',
      name: 'Member 2: Node-RED Automation & Database',
      protocol: 'HTTP REST / JSON',
      hardware: 'Node-RED Flows + Centralized Database (MySQL/Mongo)',
      status: 'pending_deployment',
      statusLabel: 'API Ready for Hookup',
      statusDetail: 'Endpoints configured: GET /api/latest-readings, GET /api/history for linen batches.',
      icon: Server,
      badgeColor: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30'
    },
    {
      id: 'ai',
      name: 'Member 3: YOLO Classification & Defect Detection',
      protocol: 'Inference Worker API',
      hardware: 'YOLOv8 + OpenCV Image Preprocessing',
      status: 'verified_format',
      statusLabel: 'Schema Integrated',
      statusDetail: 'Supports linen defect bounding boxes, slub tear severity rating, and flax material classes.',
      icon: Brain,
      badgeColor: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/30'
    },
    {
      id: 'frontend',
      name: 'Member 4: Frontend Monitoring & Decision Support',
      protocol: 'Client Application (React/TypeScript)',
      hardware: 'Stitch × AIMS Web Dashboard (Wasana Lakmini · IT23362512)',
      status: 'active',
      statusLabel: 'Active & Verified',
      statusDetail: 'Deriving metrics from local pure linen dataset records with zero-hallucination compliance.',
      icon: Layers,
      badgeColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Heading */}
      <div className="pb-2 border-b border-slate-200 dark:border-industrial-800/80">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold uppercase tracking-wider">
            Architecture Node Map
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            SLIIT J26-IT-377
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          System Status & Integration Diagnostics
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review pipeline status across the 4 research modules (Sensors, Node-RED, AI Vision, and Decision Dashboard).
        </p>
      </div>

      {/* Architecture Pipeline Flow Diagram */}
      <div className="p-5 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200/90 dark:border-industrial-800 shadow-xs transition-colors">
        <h3 className="text-xs uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 mb-4 font-semibold">
          AIMS Linen System Integration Pipeline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-industrial-850 border border-slate-200 dark:border-industrial-800 relative">
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 block uppercase font-bold">Step 1 · Hardware</span>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-200 block mt-0.5">ESP32 & Linen Sensors</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">TCS3200 + FDC1004 + DHT11</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-industrial-850 border border-slate-200 dark:border-industrial-800 relative">
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 block uppercase font-bold">Step 2 · Middleware</span>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-200 block mt-0.5">MQTT & Node-RED</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">Data filtering, DB sync, REST API</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-industrial-850 border border-slate-200 dark:border-industrial-800 relative">
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 block uppercase font-bold">Step 3 · Intelligence</span>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-200 block mt-0.5">YOLO AI Vision</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">Flax slub tears & pinhole detection</span>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-600/10 border border-blue-200 dark:border-blue-500/30 relative">
            <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 block uppercase font-bold">Step 4 · Presentation</span>
            <span className="text-sm font-bold text-blue-700 dark:text-blue-300 block mt-0.5">Stitch × AIMS Canvas</span>
            <span className="text-xs text-slate-600 dark:text-slate-300 block mt-1">QC monitoring & decision support</span>
          </div>
        </div>
      </div>

      {/* Integration Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pipelineNodes.map((node) => {
          const Icon = node.icon;
          return (
            <div key={node.id} className="p-5 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200/90 dark:border-industrial-800 shadow-xs space-y-3 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-industrial-850 border border-slate-200 dark:border-industrial-700/60 text-blue-600 dark:text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200">{node.name}</h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{node.protocol}</span>
                  </div>
                </div>
                <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border font-bold ${node.badgeColor}`}>
                  {node.statusLabel}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-industrial-850/80 border border-slate-200 dark:border-industrial-800 text-xs space-y-1">
                <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-mono font-semibold">
                  Component Specifications:
                </span>
                <span className="text-slate-800 dark:text-slate-300 block font-semibold">{node.hardware}</span>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] pt-1">{node.statusDetail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Data Contract & Payload Inspector */}
      <div className="rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200/90 dark:border-industrial-800 shadow-xs overflow-hidden transition-colors">
        <div className="p-4 border-b border-slate-200 dark:border-industrial-800 bg-slate-50/70 dark:bg-industrial-850/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Data Contract & Verified Linen Schema Inspector
            </h3>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={() => setActiveJsonTab('sample')}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-colors cursor-pointer ${
                activeJsonTab === 'sample' 
                  ? 'bg-blue-600 text-white font-semibold shadow-xs' 
                  : 'bg-slate-100 dark:bg-industrial-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Full Inspection Record
            </button>
            <button
              onClick={() => setActiveJsonTab('sensors')}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-colors cursor-pointer ${
                activeJsonTab === 'sensors' 
                  ? 'bg-blue-600 text-white font-semibold shadow-xs' 
                  : 'bg-slate-100 dark:bg-industrial-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Sensors Telemetry
            </button>
            <button
              onClick={() => setActiveJsonTab('yolo')}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-colors cursor-pointer ${
                activeJsonTab === 'yolo' 
                  ? 'bg-blue-600 text-white font-semibold shadow-xs' 
                  : 'bg-slate-100 dark:bg-industrial-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              YOLO Defect Schema
            </button>
          </div>
        </div>

        {/* Code Block Container */}
        <div className="p-4 bg-slate-950 font-mono text-xs overflow-x-auto text-emerald-400 leading-relaxed max-h-[380px]">
          <pre>
            {activeJsonTab === 'sample' && JSON.stringify(INITIAL_FABRIC_RECORDS[0], null, 2)}
            {activeJsonTab === 'sensors' && JSON.stringify({
              sampleId: INITIAL_FABRIC_RECORDS[0].sampleId,
              timestamp: INITIAL_FABRIC_RECORDS[0].timestamp,
              opticalSensor_TCS3200: INITIAL_FABRIC_RECORDS[0].opticalSensor,
              capacitanceSensor_FDC1004: INITIAL_FABRIC_RECORDS[0].capacitanceSensor,
              environmentalSensor_DHT11_ambient: INITIAL_FABRIC_RECORDS[0].ambientSensor
            }, null, 2)}
            {activeJsonTab === 'yolo' && JSON.stringify({
              sampleId: INITIAL_FABRIC_RECORDS[0].sampleId,
              aiClassification: INITIAL_FABRIC_RECORDS[0].aiClassification,
              defectStatus: INITIAL_FABRIC_RECORDS[0].defectStatus,
              defects: INITIAL_FABRIC_RECORDS[0].defects,
              qualityGrade: INITIAL_FABRIC_RECORDS[0].qualityGrade
            }, null, 2)}
          </pre>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-industrial-850/50 border-t border-slate-200 dark:border-industrial-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Schema verified for Member 2 (Node-RED) & Member 3 (AI) API contract handoff.</span>
          <span className="font-mono text-slate-400">ISO 8601 · UTF-8 JSON</span>
        </div>
      </div>
    </div>
  );
};
