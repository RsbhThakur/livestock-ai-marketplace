'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import HotspotMap from './HotspotMap';
import OutbreakSimulator from './OutbreakSimulator';
import RegionalRankingsTable from './RegionalRankingsTable';
import TrendChart from './TrendChart';
import { ShieldAlert, AlertTriangle, Users, HeartPulse, Activity, FileText } from 'lucide-react';

export default function SurveillanceConsole() {
  const { reports, regionalRiskScores } = useApp();

  const totalReports = reports.length;
  const totalAffected = reports.reduce((sum, r) => sum + (r.number_affected || 0), 0);
  const totalDeaths = reports.reduce((sum, r) => sum + (r.number_deaths || 0), 0);
  const highConcernCount = reports.filter((r) => r.risk_level === 'HIGH').length;
  const highRiskRegions = regionalRiskScores.filter((r) =>
    ['HIGH', 'CRITICAL'].includes(r.risk_category)
  ).length;

  return (
    <div className="space-y-6 py-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-bold mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-brand-400" />
            <span>State Veterinary Epidemic Directorate • Problem Statement #26128</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            Livestock Health Surveillance & Early Warning Center
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Live telemetry monitoring village-level incidence, rolling spatial-temporal growth, mortality triggers, and rule-based safety overrides.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Live Stream Connected
          </span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* KPI 1 */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold mb-1">
            <span>Total Reports</span>
            <FileText className="w-4 h-4 text-brand-600" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {totalReports.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">Across 90+ monitored villages</span>
        </div>

        {/* KPI 2 */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold mb-1">
            <span>Affected Animals</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {totalAffected.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">Reported across all species</span>
        </div>

        {/* KPI 3 */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold mb-1">
            <span>Confirmed Deaths</span>
            <HeartPulse className="w-4 h-4 text-rose-600" />
          </div>
          <span className="text-2xl font-black text-rose-600 dark:text-rose-400">
            {totalDeaths.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            Mortality: {totalAffected > 0 ? ((totalDeaths / totalAffected) * 100).toFixed(1) : 0}%
          </span>
        </div>

        {/* KPI 4 */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold mb-1">
            <span>HIGH Alerts</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-2xl font-black text-amber-600 dark:text-amber-400">
            {highConcernCount.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            {totalReports > 0 ? ((highConcernCount / totalReports) * 100).toFixed(1) : 0}% of all reports
          </span>
        </div>

        {/* KPI 5 */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold mb-1">
            <span>High-Risk Regions</span>
            <Activity className="w-4 h-4 text-rose-500" />
          </div>
          <span className="text-2xl font-black text-rose-600 dark:text-rose-400">
            {highRiskRegions}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">Score &ge; 60/100 alert status</span>
        </div>
      </div>

      {/* Outbreak Simulator Panel */}
      <OutbreakSimulator />

      {/* Hotspot Map */}
      <HotspotMap />

      {/* Trends Graph */}
      <TrendChart />

      {/* Detailed Risk Rankings Table */}
      <RegionalRankingsTable />
    </div>
  );
}
