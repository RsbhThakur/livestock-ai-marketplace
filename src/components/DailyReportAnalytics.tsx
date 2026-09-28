'use client';

import React, { useState } from 'react';
import {
  DAILY_SURVEILLANCE_HISTORY,
  PREDICTIVE_FORECAST,
  DISTRICT_REPRODUCTION_RATES,
  DailySurveillancePoint,
} from '@/lib/dailyReportData';
import {
  TrendingUp,
  Activity,
  AlertOctagon,
  Calendar,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Thermometer,
  CloudRain,
  Share2,
  Info,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function DailyReportAnalytics() {
  const [timeRange, setTimeRange] = useState<'7d' | '14d' | 'forecast'>('7d');
  const [metricView, setMetricView] = useState<'cases' | 'cumulative' | 'mortality'>('cases');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Maharashtra');
  const [hoveredPoint, setHoveredPoint] = useState<DailySurveillancePoint | null>(null);
  const [bulletinExported, setBulletinExported] = useState<boolean>(false);

  // Filter history points based on time range
  const filteredHistory =
    timeRange === '7d'
      ? DAILY_SURVEILLANCE_HISTORY.slice(-7)
      : DAILY_SURVEILLANCE_HISTORY;

  // Max value for SVG scaling
  const maxCases = Math.max(...filteredHistory.map((d) => d.suspectedCases), 220);
  const maxMortality = Math.max(...filteredHistory.map((d) => d.deaths), 25);

  const chartHeight = 220;
  const chartWidth = 720;
  const paddingX = 40;
  const paddingY = 30;

  // Generate SVG coordinates for history
  const getCoordinates = (index: number, value: number, maxVal: number) => {
    const x = paddingX + (index / (filteredHistory.length - 1)) * (chartWidth - 2 * paddingX);
    const y = chartHeight - paddingY - (value / maxVal) * (chartHeight - 2 * paddingY);
    return { x, y };
  };

  const suspectedPoints = filteredHistory.map((d, i) => getCoordinates(i, d.suspectedCases, maxCases));
  const confirmedPoints = filteredHistory.map((d, i) => getCoordinates(i, d.confirmedHighRisk, maxCases));
  const mortalityPoints = filteredHistory.map((d, i) => getCoordinates(i, d.deaths, maxMortality));

  const toSvgPath = (points: { x: number; y: number }[]) => {
    return points.reduce((acc, curr, i) => {
      return i === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
    }, '');
  };

  const suspectedPath = toSvgPath(suspectedPoints);
  const confirmedPath = toSvgPath(confirmedPoints);

  // Area under suspected curve
  const suspectedAreaPath = `${suspectedPath} L ${suspectedPoints[suspectedPoints.length - 1]?.x || 0} ${
    chartHeight - paddingY
  } L ${suspectedPoints[0]?.x || 0} ${chartHeight - paddingY} Z`;

  // Forecast SVG coordinates
  const forecastMax = 350;
  const forecastCoords = PREDICTIVE_FORECAST.map((d, i) => {
    const x = paddingX + (i / (PREDICTIVE_FORECAST.length - 1)) * (chartWidth - 2 * paddingX);
    const y = chartHeight - paddingY - (d.projectedCases / forecastMax) * (chartHeight - 2 * paddingY);
    const yUpper = chartHeight - paddingY - (d.upperConfidenceBound / forecastMax) * (chartHeight - 2 * paddingY);
    const yLower = chartHeight - paddingY - (d.lowerConfidenceBound / forecastMax) * (chartHeight - 2 * paddingY);
    return { x, y, yUpper, yLower, data: d };
  });

  const forecastPath = toSvgPath(forecastCoords);
  const upperConfidencePath = toSvgPath(forecastCoords.map((p) => ({ x: p.x, y: p.yUpper })));
  const lowerConfidenceReverse = [...forecastCoords]
    .reverse()
    .map((p) => `L ${p.x} ${p.yLower}`)
    .join(' ');
  const confidenceBandArea = `${upperConfidencePath} ${lowerConfidenceReverse} Z`;

  const handleExportBulletin = () => {
    setBulletinExported(true);
    setTimeout(() => setBulletinExported(false), 4000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-white overflow-hidden relative">
      {/* Decorative background glow */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header & Live Telemetry Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-red-950/80 text-red-300 border border-red-800/60">
              Live Syndromic Surveillance HUD
            </span>
            <span className="text-xs font-mono text-slate-400">SIH PS-26128 Epidemiological Telemetry</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            Daily Disease Surveillance & 7-Day Outbreak Trajectory
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Real-time multi-district syndromic curve, mortality thresholds, and AI predictive containment forecasting.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Time Filter Tabs */}
          <div className="bg-slate-800/90 p-1 rounded-xl flex items-center border border-slate-700">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                timeRange === '7d' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              7-Day Daily
            </button>
            <button
              onClick={() => setTimeRange('14d')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                timeRange === '14d' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              14-Day Curve
            </button>
            <button
              onClick={() => setTimeRange('forecast')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                timeRange === 'forecast' ? 'bg-amber-600 text-white shadow-md' : 'text-amber-400 hover:text-amber-200'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              7-Day AI Forecast
            </button>
          </div>

          {/* Export Bulletin Button */}
          <button
            onClick={handleExportBulletin}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all border ${
              bulletinExported
                ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            {bulletinExported ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Bulletin Exported (CSV)
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                Export Gov Bulletin
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Top Summary KPI Pill Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-5">
        <div className="bg-slate-800/60 border border-slate-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Today's Total Reports</span>
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1">94</div>
          <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
            <TrendingUp className="w-3 h-3" /> +14.6% vs yesterday
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Active Suspected Cases</span>
            <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300 mt-1">212</div>
          <div className="text-[11px] text-amber-400/90 font-medium mt-0.5">
            4 critical village clusters
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Confirmed High-Risk</span>
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div className="text-2xl font-black text-red-400 mt-1">67</div>
          <div className="text-[11px] text-red-400 font-medium mt-0.5">
            31.6% high-concern ratio
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Case Fatality (7-Day)</span>
            <Thermometer className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-300 mt-1">10.8%</div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">
            23 cumulative mortalities
          </div>
        </div>
      </div>

      {/* 3. Interactive Chart Surface */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 lg:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-3 h-1 bg-amber-400 rounded-full" /> Suspected Cases (Daily)
            </span>
            <span className="flex items-center gap-1.5 text-red-400">
              <span className="w-3 h-1 bg-red-500 rounded-full" /> Confirmed High Concern
            </span>
            {timeRange === 'forecast' && (
              <span className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-3 h-1 bg-cyan-400 border border-cyan-300 border-dashed rounded-full" /> AI 95% Confidence Band
              </span>
            )}
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            Last Synced: 2026-05-06 18:30 IST • Govt of Maharashtra
          </div>
        </div>

        {/* SVG Visualization Canvas */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[680px]">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto cursor-crosshair select-none"
            >
              <defs>
                <linearGradient id="suspectedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="forecastBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = paddingY + ratio * (chartHeight - 2 * paddingY);
                return (
                  <g key={i}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke="#334155"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x={paddingX - 8}
                      y={y + 4}
                      fill="#64748b"
                      fontSize="9"
                      textAnchor="end"
                      fontFamily="monospace"
                    >
                      {timeRange === 'forecast'
                        ? Math.round((1 - ratio) * forecastMax)
                        : Math.round((1 - ratio) * maxCases)}
                    </text>
                  </g>
                );
              })}

              {/* Standard History View */}
              {timeRange !== 'forecast' ? (
                <>
                  {/* Area fill */}
                  <path d={suspectedAreaPath} fill="url(#suspectedGradient)" />

                  {/* Lines */}
                  <path
                    d={suspectedPath}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d={confirmedPath}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Interactive Points */}
                  {suspectedPoints.map((pt, idx) => {
                    const dataPoint = filteredHistory[idx];
                    const isHovered = hoveredPoint?.date === dataPoint.date;
                    return (
                      <g key={idx} className="transition-all">
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isHovered ? 6 : 4}
                          fill="#f59e0b"
                          stroke="#0f172a"
                          strokeWidth="2"
                          onMouseEnter={() => setHoveredPoint(dataPoint)}
                          className="cursor-pointer"
                        />
                        {/* Date label on X-axis */}
                        <text
                          x={pt.x}
                          y={chartHeight - 10}
                          fill={isHovered ? '#f8fafc' : '#94a3b8'}
                          fontSize="10"
                          textAnchor="middle"
                          fontFamily="monospace"
                          fontWeight={isHovered ? 'bold' : 'normal'}
                        >
                          {dataPoint.displayDate}
                        </text>
                      </g>
                    );
                  })}
                </>
              ) : (
                /* 7-Day Forecast View */
                <>
                  {/* Confidence Interval Band */}
                  <path d={confidenceBandArea} fill="url(#forecastBand)" />

                  {/* Upper & Lower Bound Lines */}
                  <path
                    d={upperConfidencePath}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />

                  {/* Mean Forecast Line */}
                  <path
                    d={forecastPath}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Vertical separator between History and Forecast */}
                  <line
                    x1={forecastCoords[2].x}
                    y1={paddingY}
                    x2={forecastCoords[2].x}
                    y2={chartHeight - paddingY}
                    stroke="#e2e8f0"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={forecastCoords[2].x + 6}
                    y={paddingY + 12}
                    fill="#38bdf8"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    AI PROJECTION START (07 MAY)
                  </text>

                  {forecastCoords.map((pt, idx) => (
                    <g key={idx}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={pt.data.isForecast ? 5 : 4}
                        fill={pt.data.isForecast ? '#38bdf8' : '#f59e0b'}
                        stroke="#0f172a"
                        strokeWidth="2"
                      />
                      <text
                        x={pt.x}
                        y={chartHeight - 10}
                        fill="#94a3b8"
                        fontSize="9"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {pt.data.displayDate}
                      </text>
                    </g>
                  ))}
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Interactive Hover Card */}
        {hoveredPoint && (
          <div className="mt-4 p-3.5 bg-slate-900 border border-slate-700/80 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-3 text-xs animate-fadeIn">
            <div>
              <span className="text-slate-400 block">Surveillance Date</span>
              <span className="font-bold text-white text-sm">{hoveredPoint.displayDate}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Suspected Cases</span>
              <span className="font-bold text-amber-300 text-sm">
                {hoveredPoint.suspectedCases} animals
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Top Reported Symptom</span>
              <span className="font-bold text-cyan-300 text-sm">{hoveredPoint.topSymptom}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Atmospheric Risk Factors</span>
              <span className="font-bold text-slate-300 text-sm flex items-center gap-1.5">
                <Thermometer className="w-3 h-3 text-rose-400" /> {hoveredPoint.temperatureC}°C
                <CloudRain className="w-3 h-3 text-cyan-400 ml-1" /> {hoveredPoint.humidityPercent}% RH
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 4. District Effective Reproduction Number (Rt) Matrix */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">
              District Transmission Velocities (Rt Effective Reproduction Number)
            </h3>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Epidemic Threshold = 1.00
            </span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Rt &gt; 1.0 indicates exponential disease spread
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {DISTRICT_REPRODUCTION_RATES.slice(0, 4).map((d) => {
            const isSurge = d.status === 'SURGE';
            const isElevated = d.status === 'ELEVATED';

            return (
              <div
                key={d.district}
                className={`p-4 rounded-xl border transition-all ${
                  isSurge
                    ? 'bg-red-950/20 border-red-800/60 hover:border-red-600'
                    : isElevated
                    ? 'bg-amber-950/20 border-amber-800/60 hover:border-amber-600'
                    : 'bg-emerald-950/20 border-emerald-800/60 hover:border-emerald-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white">{d.district}</h4>
                    <span className="text-[11px] text-slate-400">
                      {d.activeClusters} active village clusters
                    </span>
                  </div>
                  <span
                    className={`text-xs font-mono font-black px-2 py-0.5 rounded-full ${
                      isSurge
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : isElevated
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    Rt {d.rt.toFixed(2)}
                  </span>
                </div>

                {/* Vaccine coverage meter */}
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Ring Vaccine Coverage</span>
                    <span className="font-mono text-slate-300">{d.vaccineCoveragePct}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        d.vaccineCoveragePct > 85 ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${d.vaccineCoveragePct}%` }}
                    />
                  </div>
                </div>

                {/* Status badge */}
                <div className="mt-2.5 flex items-center justify-between text-[11px]">
                  <span
                    className={`font-semibold ${
                      isSurge ? 'text-red-400' : isElevated ? 'text-amber-400' : 'text-emerald-400'
                    }`}
                  >
                    {isSurge ? '● EPIDEMIC SURGE' : isElevated ? '▲ ELEVATED TRANSMISSION' : '✔ CONTAINED'}
                  </span>
                  <span className="text-slate-400 font-mono">
                    {d.quarantineCompliancePct}% quarantine
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
