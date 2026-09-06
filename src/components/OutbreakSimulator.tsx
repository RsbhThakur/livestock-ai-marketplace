'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Sparkles, AlertOctagon, Activity, Play, CheckCircle } from 'lucide-react';

export default function OutbreakSimulator() {
  const { regions, simulateOutbreak } = useApp();
  const [selectedVillage, setSelectedVillage] = useState(regions[0]?.village || 'Nashik Block-2 Village-1');
  const [reportCount, setReportCount] = useState(8);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedLog, setSimulatedLog] = useState<string | null>(null);

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulatedLog(null);

    setTimeout(() => {
      simulateOutbreak(selectedVillage, Number(reportCount));
      setIsSimulating(false);
      setSimulatedLog(`Successfully injected ${reportCount} clustered reports into ${selectedVillage}. Trailing 7-day risk metrics recalculated.`);
    }, 400);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black flex items-center gap-2">
              <span>Interactive Outbreak Simulator (Judge Demonstration)</span>
              <span className="bg-rose-600 text-white px-2 py-0.5 rounded text-[10px] font-extrabold uppercase">
                SIH Early Warning Loop
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Generates synthetic report bursts triaged sequentially through the ML & Rule pipeline to watch regional risk escalate in real-time.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
        {/* Village select */}
        <div className="sm:col-span-6">
          <label className="text-xs font-bold text-slate-300 block mb-1">
            Target Village for Cluster Injection
          </label>
          <select
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-brand-500"
          >
            {regions.map((r) => (
              <option key={r.village} value={r.village}>
                {r.village} ({r.district} - {r.block})
              </option>
            ))}
          </select>
        </div>

        {/* Count */}
        <div className="sm:col-span-3">
          <label className="text-xs font-bold text-slate-300 block mb-1">
            Report Burst Count: <span className="text-amber-400 font-mono font-black">{reportCount}</span>
          </label>
          <input
            type="range"
            min="3"
            max="20"
            value={reportCount}
            onChange={(e) => setReportCount(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500 mt-2"
          />
        </div>

        {/* Action Button */}
        <div className="sm:col-span-3 flex items-end">
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-900/30 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            {isSimulating ? (
              <>
                <Activity className="w-4 h-4 animate-spin" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Trigger Outbreak</span>
              </>
            )}
          </button>
        </div>
      </div>

      {simulatedLog && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{simulatedLog}</span>
        </div>
      )}
    </div>
  );
}
