'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import HotspotMap from './HotspotMap';
import OutbreakSimulator from './OutbreakSimulator';
import RegionalRankingsTable from './RegionalRankingsTable';
import DailyReportAnalytics from './DailyReportAnalytics';
import TrendChart from './TrendChart';
import { ShieldAlert, AlertTriangle, Users, HeartPulse, Activity, FileText, Sparkles } from 'lucide-react';

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
      {/* Top Directorate Banner */}
      <div className="bg-gradient-to-r from-[#071526] via-[#0c2340] to-[#071526] text-white rounded-2xl p-6 border border-[#1b3a61] shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-700/60 text-rose-300 text-xs font-bold mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>State Veterinary Epidemic Directorate • Problem Statement #26128</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-serif">
            MahaPashu Epidemiological Surveillance Directorate
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            In compliance with National Animal Disease Control Programme (NADCP) and IDSP-Vet guidelines. Real-time ST-DBSCAN spatio-temporal clustering, multimodal field telemetry, and 7-day predictive epidemiological forecast.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2 bg-[#061220] px-3.5 py-2 rounded-xl border border-[#1b3a61]">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              24/7 ACTIVE STATE SURVEILLANCE
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards Row (Official Gov Metric Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* KPI 1 */}
        <div className="bg-[#091b30] p-4 rounded-xl border border-[#1b3a61] shadow-sm text-white">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-1">
            <span>Total Syndromic Reports</span>
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-white font-serif">
            {totalReports.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">Across 90+ monitored talukas</span>
        </div>

        {/* KPI 2 */}
        <div className="bg-[#091b30] p-4 rounded-xl border border-[#1b3a61] shadow-sm text-white">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-1">
            <span>Affected Animals</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-2xl font-black text-white font-serif">
            {totalAffected.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">Reported across all species</span>
        </div>

        {/* KPI 3 */}
        <div className="bg-[#091b30] p-4 rounded-xl border border-[#1b3a61] shadow-sm text-white">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-1">
            <span>Confirmed Deaths</span>
            <HeartPulse className="w-4 h-4 text-rose-400" />
          </div>
          <span className="text-2xl font-black text-rose-400 font-serif">
            {totalDeaths.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            Mortality: {totalAffected > 0 ? ((totalDeaths / totalAffected) * 100).toFixed(1) : 0}%
          </span>
        </div>

        {/* KPI 4 */}
        <div className="bg-[#091b30] p-4 rounded-xl border border-[#1b3a61] shadow-sm text-white">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-1">
            <span>High Severity Alerts</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl font-black text-amber-400 font-serif">
            {highConcernCount.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            {totalReports > 0 ? ((highConcernCount / totalReports) * 100).toFixed(1) : 0}% of all reports
          </span>
        </div>

        {/* KPI 5 */}
        <div className="bg-[#091b30] p-4 rounded-xl border border-[#1b3a61] shadow-sm text-white">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-1">
            <span>High-Risk Talukas</span>
            <Activity className="w-4 h-4 text-rose-400" />
          </div>
          <span className="text-2xl font-black text-rose-400 font-serif">
            {highRiskRegions}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">Score &ge; 60/100 alert status</span>
        </div>
      </div>

      {/* Interactive Daily Report Graph & Epidemiological Analytics Suite */}
      <DailyReportAnalytics />

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
