'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { CATEGORY_COLORS } from '@/lib/config';
import { RegionalRiskScore } from '@/lib/types';
import { MapPin, ShieldAlert, Activity, Info, Sparkles } from 'lucide-react';

export default function HotspotMap() {
  const { regionalRiskScores, simulateOutbreak } = useApp();
  const [selectedNode, setSelectedNode] = useState<RegionalRiskScore | null>(null);

  // Geographic bounds for Maharashtra simulation viewport
  // Lat range approx: 16.5 to 21.5, Lon range approx: 73.5 to 79.5
  const minLat = 16.2;
  const maxLat = 21.8;
  const minLon = 73.2;
  const maxLon = 79.8;

  const project = (lat?: number, lon?: number) => {
    if (!lat || !lon) return { x: 50, y: 50 };
    const x = ((lon - minLon) / (maxLon - minLon)) * 100;
    const y = (1 - (lat - minLat) / (maxLat - minLat)) * 100;
    return {
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y)),
    };
  };

  const handleNodeClick = (node: RegionalRiskScore) => {
    setSelectedNode(node);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-600" />
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              Geographical Epidemic Hotspot Map (Maharashtra)
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time space-time cluster surveillance across Nashik, Pune, Kolhapur, Nagpur, and Sambhajinagar
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-xs font-bold">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="text-[11px] text-slate-600 dark:text-slate-400">Low (0-29)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="text-[11px] text-slate-600 dark:text-slate-400">Med (30-59)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />
            <span className="text-[11px] text-slate-600 dark:text-slate-400">High (60-79)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-rose-600 inline-block" />
            <span className="text-[11px] text-slate-600 dark:text-slate-400">Critical (80+)</span>
          </div>
        </div>
      </div>

      {/* Map Canvas / Visualization Container */}
      <div className="relative aspect-[16/9] w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(circle, #38bdf8 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
            backgroundSize: '40px 40px, 80px 80px, 80px 80px',
          }}
        />

        {/* Stylized State Boundary SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M 15 25 Q 35 15, 60 20 T 90 35 Q 85 65, 75 80 T 45 85 Q 25 75, 15 50 Z"
            fill="#0284c7"
            stroke="#38bdf8"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />
        </svg>

        {/* District Center Labels */}
        <div className="absolute top-[32%] left-[22%] text-[10px] font-mono font-black text-slate-600 tracking-widest pointer-events-none">
          NASHIK
        </div>
        <div className="absolute top-[60%] left-[24%] text-[10px] font-mono font-black text-slate-600 tracking-widest pointer-events-none">
          PUNE
        </div>
        <div className="absolute top-[85%] left-[26%] text-[10px] font-mono font-black text-slate-600 tracking-widest pointer-events-none">
          KOLHAPUR
        </div>
        <div className="absolute top-[40%] left-[44%] text-[10px] font-mono font-black text-slate-600 tracking-widest pointer-events-none">
          SAMBHAJINAGAR
        </div>
        <div className="absolute top-[32%] left-[68%] text-[10px] font-mono font-black text-slate-600 tracking-widest pointer-events-none">
          AMRAVATI
        </div>
        <div className="absolute top-[28%] left-[86%] text-[10px] font-mono font-black text-slate-600 tracking-widest pointer-events-none">
          NAGPUR
        </div>

        {/* Nodes (Villages/Regions) */}
        {regionalRiskScores.map((node) => {
          const { x, y } = project(node.latitude, node.longitude);
          const isCritical = node.risk_category === 'CRITICAL';
          const isHigh = node.risk_category === 'HIGH';
          const colorConfig = CATEGORY_COLORS[node.risk_category];
          const isSelected = selectedNode?.region_name === node.region_name;

          return (
            <button
              key={node.region_name}
              onClick={() => handleNodeClick(node)}
              style={{ left: `${x}%`, top: `${y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-20 cursor-pointer"
              aria-label={`Region ${node.region_name} score ${node.risk_score}`}
            >
              {/* Pulsing ring for high / critical */}
              {(isHigh || isCritical) && (
                <span
                  className="absolute -inset-2 rounded-full animate-ping opacity-60 pointer-events-none"
                  style={{ backgroundColor: colorConfig.hex }}
                />
              )}

              {/* Pin circle */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-lg transition-transform ${
                  isSelected ? 'scale-125 ring-4 ring-white' : 'hover:scale-115'
                }`}
                style={{ backgroundColor: colorConfig.hex }}
              >
                {Math.round(node.risk_score)}
              </div>

              {/* Label on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap shadow-md pointer-events-none z-30 border border-slate-700">
                {node.region_name} ({node.risk_category} {node.risk_score}/100)
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 animate-in slide-in-from-top-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase text-white shadow-xs`}
                style={{ backgroundColor: CATEGORY_COLORS[selectedNode.risk_category].hex }}
              >
                {selectedNode.risk_category} — {selectedNode.risk_score}/100
              </span>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">
                {selectedNode.region_name}
              </h4>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                ({selectedNode.block}, {selectedNode.district})
              </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span>7d Reports: <strong>{selectedNode.report_count_7d}</strong></span>
              <span>Affected: <strong>{selectedNode.affected_animals}</strong></span>
              <span>Fatalities: <strong className="text-rose-600">{selectedNode.deaths}</strong></span>
              <span>Mortality: <strong>{(selectedNode.mortality_rate * 100).toFixed(1)}%</strong></span>
              <span>HIGH Alerts: <strong className="text-amber-600">{selectedNode.high_concern_count}</strong></span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 italic">
              Factors: {selectedNode.explanations.join(' ')}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={() => {
                simulateOutbreak(selectedNode.region_name, 6);
              }}
              className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Simulate Cluster Burst (+6 Cases)</span>
            </button>
            <button
              onClick={() => setSelectedNode(null)}
              className="px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
