'use client';

import React, { useMemo } from 'react';
import { useApp } from '@/lib/store';
import { TrendingUp } from 'lucide-react';

export default function TrendChart() {
  const { reports } = useApp();

  // Aggregate reports by date
  const trendData = useMemo(() => {
    const map = new Map<string, { total: number; high: number }>();

    reports.forEach((r) => {
      const date = r.date;
      if (!map.has(date)) {
        map.set(date, { total: 0, high: 0 });
      }
      const entry = map.get(date)!;
      entry.total += 1;
      if (r.risk_level === 'HIGH') entry.high += 1;
    });

    const sortedDates = Array.from(map.keys()).sort();
    // Take the last 20 active days
    const recentDates = sortedDates.slice(-20);

    return recentDates.map((date) => ({
      date: date.slice(5), // MM-DD
      total: map.get(date)?.total || 0,
      high: map.get(date)?.high || 0,
    }));
  }, [reports]);

  const maxVal = Math.max(5, ...trendData.map((d) => d.total));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-brand-600" />
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              Daily Reporting Volume & Epidemic Spike Trends
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Trailing temporal analysis tracking high-concern case surges vs normal background reporting
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-brand-500" />
            <span className="text-slate-600 dark:text-slate-400">Total Reports</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="text-slate-600 dark:text-slate-400">High-Concern (Spikes)</span>
          </div>
        </div>
      </div>

      {/* SVG Bar / Area visualization */}
      <div className="h-48 w-full flex items-end gap-1.5 pt-6 pb-2 px-2 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
        {trendData.map((item, index) => {
          const totalHeightPercent = (item.total / maxVal) * 100;
          const highHeightPercent = (item.high / maxVal) * 100;

          return (
            <div
              key={index}
              className="flex-1 h-full flex flex-col justify-end items-center group relative cursor-pointer"
            >
              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center bg-slate-900 text-white text-[10px] p-2 rounded-lg whitespace-nowrap shadow-lg pointer-events-none z-30 border border-slate-700">
                <span className="font-bold text-slate-300">Date: {item.date}</span>
                <span className="text-brand-400">Total Reports: {item.total}</span>
                <span className="text-rose-400">High-Concern: {item.high}</span>
              </div>

              {/* Bar Stack */}
              <div className="w-full max-w-[20px] bg-slate-200 dark:bg-slate-700 rounded-t-sm overflow-hidden flex flex-col justify-end h-full">
                {/* Total bar portion */}
                <div
                  style={{ height: `${totalHeightPercent}%` }}
                  className="w-full bg-brand-500/70 rounded-t-sm flex flex-col justify-end transition-all duration-300 group-hover:bg-brand-500"
                >
                  {/* High concern overlay */}
                  <div
                    style={{ height: `${(item.high / Math.max(1, item.total)) * 100}%` }}
                    className="w-full bg-rose-500 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Date label */}
              <span className="text-[9px] font-mono text-slate-400 mt-1.5 truncate max-w-full">
                {item.date}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
