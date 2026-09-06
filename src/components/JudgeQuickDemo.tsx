'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { JUDGE_DEMO_SCENARIOS } from '@/lib/initialData';
import { Award, ChevronDown, ChevronUp, Play, ShieldAlert, Activity, CheckCircle2, Sparkles } from 'lucide-react';

export default function JudgeQuickDemo() {
  const [isOpen, setIsOpen] = useState(true);
  const { triggerJudgeScenario } = useApp();

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-brand-500/10 to-blue-500/10 border-y border-amber-500/30 py-2.5 px-4 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-amber-500 text-slate-950">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                Judge Quick-Demo Suite
                <span className="bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded text-[10px] font-extrabold lowercase">
                  1-click test
                </span>
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 hidden sm:block">
                Instantly trigger high-impact evaluation scenarios to test explainable AI, safety rules, and surveillance
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 bg-white/70 dark:bg-slate-800/70 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700"
          >
            <span>{isOpen ? 'Minimize' : 'Expand Demo Scenarios'}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {isOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mt-2.5">
            {JUDGE_DEMO_SCENARIOS.map((scenario) => {
              const iconMap: Record<string, React.ReactNode> = {
                ShieldAlert: <ShieldAlert className="w-4 h-4 text-rose-600" />,
                Activity: <Activity className="w-4 h-4 text-amber-600" />,
                CheckCircle2: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
              };

              return (
                <div
                  key={scenario.id}
                  className="bg-white dark:bg-slate-800/90 rounded-xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {iconMap[scenario.icon] || <Sparkles className="w-3 h-3" />}
                        {scenario.badge}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                      {scenario.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                      {scenario.description}
                    </p>
                  </div>
                  <button
                    onClick={() => triggerJudgeScenario(scenario.id)}
                    className="mt-2.5 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-brand-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run Scenario Live</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
