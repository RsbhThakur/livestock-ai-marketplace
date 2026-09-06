'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { CATEGORY_COLORS } from '@/lib/config';
import { Search, ChevronDown, ChevronUp, Layers } from 'lucide-react';

export default function RegionalRankingsTable() {
  const { regionalRiskScores, selectedGranularity, setSelectedGranularity } = useApp();
  const [filterText, setFilterText] = useState('');
  const [sortField, setSortField] = useState<'risk_score' | 'report_count_7d' | 'affected_animals' | 'deaths'>('risk_score');
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = regionalRiskScores
    .filter((r) => r.region_name.toLowerCase().includes(filterText.toLowerCase()))
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      return sortAsc ? valA - valB : valB - valA;
    });

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-600" />
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              Regional Risk Ranking & Aggregation Ledger
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Transparent 0-100 formula (volume 25%, growth 20%, mortality 20%, high-concern 20%, historical 15%)
          </p>
        </div>

        {/* Controls: Granularity tabs & search */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Granularity Switcher */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
            {(['village', 'block', 'district'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGranularity(g)}
                className={`capitalize px-3 py-1.5 rounded-lg transition-all ${
                  selectedGranularity === g
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Filter region..."
              className="pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 w-36 sm:w-44"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-3">Category</th>
              <th className="p-3">Region Name</th>
              <th
                onClick={() => handleSort('risk_score')}
                className="p-3 cursor-pointer hover:text-brand-600 select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Score (0-100)</span>
                  {sortField === 'risk_score' && (sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                </div>
              </th>
              <th
                onClick={() => handleSort('report_count_7d')}
                className="p-3 cursor-pointer hover:text-brand-600 select-none"
              >
                <div className="flex items-center gap-1">
                  <span>7d Reports</span>
                  {sortField === 'report_count_7d' && (sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                </div>
              </th>
              <th
                onClick={() => handleSort('affected_animals')}
                className="p-3 cursor-pointer hover:text-brand-600 select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Affected</span>
                  {sortField === 'affected_animals' && (sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                </div>
              </th>
              <th
                onClick={() => handleSort('deaths')}
                className="p-3 cursor-pointer hover:text-brand-600 select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Fatalities</span>
                  {sortField === 'deaths' && (sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                </div>
              </th>
              <th className="p-3">Mortality %</th>
              <th className="p-3">High-Concern</th>
              <th className="p-3">Primary Factor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {filtered.slice(0, 25).map((row) => {
              const color = CATEGORY_COLORS[row.risk_category];
              return (
                <tr key={row.region_name} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-black text-white uppercase inline-block shadow-xs"
                      style={{ backgroundColor: color.hex }}
                    >
                      {row.risk_category}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">
                    {row.region_name}
                  </td>
                  <td className="p-3 font-black text-slate-900 dark:text-white">
                    {row.risk_score}
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-300 font-semibold">
                    {row.report_count_7d}
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">
                    {row.affected_animals}
                  </td>
                  <td className="p-3 font-bold text-rose-600 dark:text-rose-400">
                    {row.deaths}
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">
                    {(row.mortality_rate * 100).toFixed(1)}%
                  </td>
                  <td className="p-3 font-bold text-amber-600">
                    {row.high_concern_count}
                  </td>
                  <td className="p-3 text-[11px] text-slate-500 dark:text-slate-400 max-w-xs truncate">
                    {row.explanations[0] || 'Nominal'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
