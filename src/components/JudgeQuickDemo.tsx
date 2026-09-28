'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { JUDGE_DEMO_SCENARIOS } from '@/lib/initialData';
import { Award, ChevronDown, ChevronUp, Play, ShieldAlert, Activity, CheckCircle2, Sparkles, FileCheck2 } from 'lucide-react';

export default function JudgeQuickDemo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { triggerJudgeScenario } = useApp();

  const iconMap: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-3.5 h-3.5 text-blue-400" />,
    ShieldAlert: <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />,
    Activity: <Activity className="w-3.5 h-3.5 text-amber-400" />,
    CheckCircle2: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
  };

  return (
    <div className="bg-[#091a30] border-b border-[#1b3a61] py-2 px-4 relative z-20 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Left Title & 1-Click Scenario Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-600/40 text-amber-300 text-xs font-bold shrink-0">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>SIH 2026 Jury Bench • PS #26128</span>
            </div>

            {/* Quick 1-Click Action Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              {JUDGE_DEMO_SCENARIOS.map((sc, idx) => (
                <button
                  key={sc.id}
                  onClick={() => triggerJudgeScenario(sc.id)}
                  title={sc.description}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0f2747] hover:bg-[#163864] text-slate-200 text-xs font-medium border border-[#224b7e] hover:border-blue-400 transition-all group"
                >
                  <Play className="w-2.5 h-2.5 text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-slate-300 group-hover:text-white">
                    Scenario {idx + 1}:
                  </span>
                  <span className="text-slate-300 group-hover:text-amber-300 truncate max-w-[130px] md:max-w-none">
                    {sc.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Expand/Collapse Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0f2747] hover:bg-[#163864] border border-[#224b7e] shrink-0 self-end sm:self-auto transition-colors"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-slate-400" />
            <span>{isExpanded ? 'Hide Rubric' : 'Evaluation Rubric'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Expanded Details Grid (Styled to match institutional theme) */}
        {isExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-3 pt-3 border-t border-[#1b3a61] animate-in fade-in duration-200">
            {JUDGE_DEMO_SCENARIOS.map((scenario) => (
              <div
                key={scenario.id}
                className="bg-[#071526] rounded-xl p-3.5 border border-[#1e4370] hover:border-blue-400 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#0f2a4d] text-blue-300 border border-[#245084]">
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

                <div className="mt-3 pt-2.5 border-t border-[#152e4f] flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">
                    Criteria: {scenario.id}
                  </span>
                  <button
                    onClick={() => triggerJudgeScenario(scenario.id)}
                    className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 transition-colors"
                  >
                    <span>Run Verification</span>
                    <Play className="w-2.5 h-2.5 fill-current" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
