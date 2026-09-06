'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Activity, Radio, Satellite } from 'lucide-react';

// Dynamic import with ssr: false ensures Leaflet avoids any SSR window errors
const RealGPSMap = dynamic(() => import('./RealGPSMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="relative z-10 space-y-3">
        <div className="w-16 h-16 rounded-full bg-brand-950 border border-brand-500/40 text-brand-400 flex items-center justify-center mx-auto shadow-xl shadow-brand-500/20">
          <Satellite className="w-8 h-8 animate-pulse text-brand-400" />
        </div>
        <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-emerald-400">
          <Radio className="w-4 h-4 animate-ping" />
          <span>CONNECTING TO SATELLITE TELEMETRY...</span>
        </div>
        <p className="text-xs text-slate-500 max-w-sm">
          Calibrating high-resolution GPS aerial tiles and positioning Maharashtra epidemic surveillance nodes
        </p>
      </div>
    </div>
  ),
});

export default function HotspotMap() {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-600" />
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              Tactical GPS Epidemic Surveillance Grid (Real Aerial Imagery)
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Military-grade GPS satellite telemetry, live coordinate tracking, containment perimeters, and multi-tier layer switching
          </p>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 text-xs font-mono font-semibold">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-600 dark:text-emerald-400">
            LIVE GPS SATELLITE FEED (ZERO-KEY OPEN ACCESS)
          </span>
        </div>
      </div>

      {/* Render Real GPS Leaflet Map */}
      <RealGPSMap />
    </div>
  );
}
