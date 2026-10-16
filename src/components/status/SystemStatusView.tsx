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
      statusDetail: 'Calibrated payload contracts ready for Node-RED broker.',
      icon: Radio,
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
    },
    {
      id: 'nodered',
      name: 'Member 2: Node-RED Automation & Database',
      protocol: 'HTTP REST / JSON',
      hardware: 'Node-RED Flows + Centralized Database (MySQL/Mongo)',
      status: 'pending_deployment',
      statusLabel: 'API Ready for Hookup',
      statusDetail: 'Endpoints configured: GET /api/latest-readings, GET /api/history',
      icon: Server,
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    },
    {
      id: 'ai',
      name: 'Member 3: YOLO Classification & Defect Detection',
      protocol: 'Inference Worker API',
      hardware: 'YOLOv8 + OpenCV Image Preprocessing',
      status: 'verified_format',
      statusLabel: 'Schema Integrated',
      statusDetail: 'Supports defect bounding boxes, confidence score, and fabric classes.',
      icon: Brain,
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
    },
    {
      id: 'frontend',
      name: 'Member 4: Frontend Monitoring & Decision Support',
      protocol: 'Client Application (React/TypeScript)',
      hardware: 'Web Dashboard (Wasana Lakmini · IT23362512)',
      status: 'active',
      statusLabel: 'Active & Verified',
      statusDetail: 'Deriving metrics from local dataset records with strict zero-hallucination compliance.',
      icon: Layers,
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Heading */}
      <div className="pb-2 border-b border-industrial-800/80">
        <h1 className="text-xl font-bold text-white tracking-tight">System Status & Integration Diagnostics</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review pipeline status across the 4 research modules (Sensors, Node-RED, AI, and Dashboard).
        </p>
      </div>

      {/* Architecture Pipeline Flow Diagram */}
      <div className="p-5 rounded-2xl bg-industrial-900 border border-industrial-800 shadow-md">
        <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-4">
          AIMS System Integration Pipeline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
          <div className="p-3.5 rounded-xl bg-industrial-850 border border-industrial-800 relative">
            <span className="text-[10px] font-mono text-slate-500 block uppercase">Step 1 · Hardware</span>
            <span className="text-sm font-semibold text-slate-200 block mt-0.5">ESP32 & Sensors</span>
            <span className="text-xs text-slate-400 block mt-1">TCS3200 + FDC1004 + DHT11</span>
          </div>

          <div className="p-3.5 rounded-xl bg-industrial-850 border border-industrial-800 relative">
            <span className="text-[10px] font-mono text-slate-500 block uppercase">Step 2 · Middleware</span>
            <span className="text-sm font-semibold text-slate-200 block mt-0.5">MQTT & Node-RED</span>
            <span className="text-xs text-slate-400 block mt-1">Data filtering, DB sync, REST API</span>
          </div>

          <div className="p-3.5 rounded-xl bg-industrial-850 border border-industrial-800 relative">
            <span className="text-[10px] font-mono text-slate-500 block uppercase">Step 3 · Intelligence</span>
            <span className="text-sm font-semibold text-slate-200 block mt-0.5">YOLO AI Vision</span>
            <span className="text-xs text-slate-400 block mt-1">Material class & defect localization</span>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-600/10 border border-blue-500/30 relative">
            <span className="text-[10px] font-mono text-blue-400 block uppercase">Step 4 · Presentation</span>
            <span className="text-sm font-semibold text-blue-300 block mt-0.5">AIMS Dashboard</span>
            <span className="text-xs text-slate-300 block mt-1">QC monitoring & decision support</span>
          </div>
        </div>
      </div>

      {/* Integration Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pipelineNodes.map((node) => {
          const Icon = node.icon;
          return (
            <div key={node.id} className="p-5 rounded-2xl bg-industrial-900 border border-industrial-800 shadow-md space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-industrial-850 border border-industrial-700/60 text-slate-300">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">{node.name}</h4>
                    <span className="text-xs text-slate-400 font-mono">{node.protocol}</span>
                  </div>
                </div>
                <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border font-medium ${node.badgeColor}`}>
                  {node.statusLabel}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-industrial-850/80 border border-industrial-800 text-xs space-y-1">
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Component Specs:</span>
                <span className="text-slate-300 block font-medium">{node.hardware}</span>
                <p className="text-slate-400 text-[11px] pt-1">{node.statusDetail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Data Contract & Payload Inspector */}
      <div className="rounded-2xl bg-industrial-900 border border-industrial-800 shadow-md overflow-hidden">
        <div className="p-4 border-b border-industrial-800 bg-industrial-850/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-slate-200">Data Contract & Verified Schema Inspector</h3>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={() => setActiveJsonTab('sample')}
              className={`px-3 py-1 rounded-lg font-mono transition-colors ${
                activeJsonTab === 'sample' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-industrial-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Full Inspection Record
            </button>
            <button
              onClick={() => setActiveJsonTab('sensors')}
              className={`px-3 py-1 rounded-lg font-mono transition-colors ${
                activeJsonTab === 'sensors' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-industrial-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Sensors Telemetry
            </button>
            <button
              onClick={() => setActiveJsonTab('yolo')}
              className={`px-3 py-1 rounded-lg font-mono transition-colors ${
                activeJsonTab === 'yolo' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-industrial-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              YOLO Defect Schema
            </button>
          </div>
        </div>

        {/* Code Block Container */}
        <div className="p-4 bg-industrial-950 font-mono text-xs overflow-x-auto text-emerald-400/90 leading-relaxed max-h-[380px]">
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

        <div className="p-3 bg-industrial-850/50 border-t border-industrial-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Schema verified for Member 2 (Node-RED) & Member 3 (AI) API contract handoff.</span>
          <span className="font-mono text-slate-500">ISO 8601 · UTF-8 JSON</span>
        </div>
      </div>
    </div>
  );
};
