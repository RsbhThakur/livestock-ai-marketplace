'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { TRANSLATIONS } from '@/lib/translations';
import { SPECIES_LIST } from '@/lib/config';
import { Tag, ShieldCheck, Pill, Stethoscope, AlertTriangle } from 'lucide-react';

interface CategoryBarProps {
  selectedSpeciesFilter: string;
  setSelectedSpeciesFilter: (species: string) => void;
}

export default function CategoryBar({
  selectedSpeciesFilter,
  setSelectedSpeciesFilter,
}: CategoryBarProps) {
  const { language, activeCategory, setActiveCategory } = useApp();
  const t = TRANSLATIONS[language];

  const categories = [
    { id: 'all', label: t.tabAll, icon: <Tag className="w-3.5 h-3.5" /> },
    { id: 'livestock', label: t.tabLivestock, icon: <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'pharma', label: t.tabPharma, icon: <Pill className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: 'emergency', label: t.tabEmergency, icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> },
    { id: 'tele-vet', label: t.tabTeleVet, icon: <Stethoscope className="w-3.5 h-3.5 text-emerald-400" /> },
  ];

  return (
    <div className="bg-slate-950/90 backdrop-blur-md border-b border-slate-800 sticky top-16 z-30 shadow-md text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Main Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 ring-1 ring-emerald-500'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Species Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 hidden md:inline">
              Species:
            </span>
            <button
              onClick={() => setSelectedSpeciesFilter('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                selectedSpeciesFilter === 'all'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All
            </button>
            {SPECIES_LIST.map((sp) => (
              <button
                key={sp}
                onClick={() => setSelectedSpeciesFilter(sp)}
                className={`capitalize px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  selectedSpeciesFilter === sp
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
