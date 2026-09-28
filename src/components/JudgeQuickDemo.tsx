'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { JUDGE_DEMO_SCENARIOS } from '@/lib/initialData';
import { Award, ChevronDown, ChevronUp, Play, ShieldAlert, Activity, CheckCircle2, Sparkles } from 'lucide-react';

export default function JudgeQuickDemo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { triggerJudgeScenario } = useApp();

  const iconMap: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-3.5 h-3.5 text-cyan-400" />,
    ShieldAlert: <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />,
    Activity: <Activity className="w-3.5 h-3.5 text-amber-400" />,
    CheckCircle2: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
  };

  return (
    <div className="bg-slate-900/95 border-b border-slate-800 py-2 px-4 backdrop-blur-md relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Left Title & 1-Click Scenario Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold shrink-0">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>SIH 2026 Evaluation Suite</span>
            </div>

            {/* Quick 1-Click Action Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              {JUDGE_DEMO_SCENARIOS.map((sc, idx) => (
                <button
                  key={sc.id}
                  onClick={() => triggerJudgeScenario(sc.id)}
                  title={sc.description}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 hover:border-cyan-500/50 transition-all group"
                >
                  <Play className="w-2.5 h-2.5 text-cyan-400 fill-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-slate-300 group-hover:text-white">
                    Scenario {idx + 1}:
                  </span>
                  <span className="text-slate-400 group-hover:text-cyan-300 truncate max-w-[130px] md:max-w-none">
                    {sc.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Expand/Collapse Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-800 shrink-0 self-end sm:self-auto transition-colors"
          >
            <span>{isExpanded ? 'Collapse' : 'Details'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Expanded Details Grid (Styled to match obsidian dark theme) */}
        {isExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-3 pt-3 border-t border-slate-800 animate-in fade-in duration-200">
            {JUDGE_DEMO_SCENARIOS.map((scenario) => (
              <div
                key={scenario.id}
                className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 border border-slate-700">
                      {iconMap[scenario.icon] || <Sparkles className="w-3 h-3" />}
                      {scenario.badge}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">
                    {scenario.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {scenario.description}
                  </p>
                </div>
                <button
                  onClick={() => triggerJudgeScenario(scenario.id)}
                  className="mt-3 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Execute Scenario Live</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
