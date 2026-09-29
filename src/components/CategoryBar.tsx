'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { TRANSLATIONS } from '@/lib/translations';
import { SPECIES_LIST } from '@/lib/config';
import { Tag, ShieldCheck, Pill, Stethoscope, AlertTriangle, Layers } from 'lucide-react';

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
    { id: 'all', label: language === 'mr' ? 'सर्व नोंदी (All)' : 'All Listings', icon: <Layers className="w-3.5 h-3.5 text-blue-300" /> },
    { id: 'livestock', label: language === 'mr' ? 'प्रमाणित पशु (Livestock)' : 'Pashu Aadhaar Livestock', icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'pharma', label: language === 'mr' ? 'शासकीय औषधी (PMBJP-Vet)' : 'PMBJP-Vet Formulations', icon: <Pill className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'emergency', label: language === 'mr' ? 'उद्रेक संच (Emergency Kits)' : 'Epidemic Outbreak Bundles', icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> },
    { id: 'tele-vet', label: language === 'mr' ? 'पशुवैद्यकीय सल्ला (Tele-Vet)' : 'Tele-Vet Polyclinic Pass', icon: <Stethoscope className="w-3.5 h-3.5 text-amber-400" /> },
  ];

  return (
    <div className="bg-[#0b1320] border-b border-[#1e3252] sticky top-20 sm:top-22 z-30 shadow-md text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Main Category Tabs */}
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${
                  activeCategory === cat.id
                    ? 'bg-[#0284c7] text-white border border-[#38bdf8]/50'
                    : 'bg-[#131f33] text-slate-300 hover:bg-[#1a2b47] hover:text-white border border-[#1e3252]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Species Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1 hidden md:inline">
              Species Filter:
            </span>
            <button
              onClick={() => setSelectedSpeciesFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                selectedSpeciesFilter === 'all'
                  ? 'bg-[#0284c7] text-white'
                  : 'bg-[#131f33] text-slate-400 hover:text-white border border-[#1e3252]'
              }`}
            >
              All Species
            </button>
            {SPECIES_LIST.map((sp) => (
              <button
                key={sp}
                onClick={() => setSelectedSpeciesFilter(sp)}
                className={`capitalize px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                  selectedSpeciesFilter === sp
                    ? 'bg-[#0284c7] text-white'
                    : 'bg-[#131f33] text-slate-400 hover:text-white border border-[#1e3252]'
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
