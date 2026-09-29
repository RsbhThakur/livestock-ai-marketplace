'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { TRANSLATIONS } from '@/lib/translations';
import {
  AlertTriangle,
  HeartPulse,
  MapPin,
  Search,
  ShoppingCart,
  ShieldCheck,
  UserCheck,
  Stethoscope,
  Sparkles,
  Mic,
  Camera,
  Activity,
  PhoneCall,
  Building2,
  FileText,
} from 'lucide-react';

export default function Header() {
  const {
    language,
    setLanguage,
    role,
    setRole,
    cartCount,
    setIsCartOpen,
    setIsTriageOpen,
    searchQuery,
    setSearchQuery,
    selectedDistrict,
    setSelectedDistrict,
    regions,
  } = useApp();

  const t = TRANSLATIONS[language];
  const uniqueDistricts = Array.from(new Set(regions.map((r) => r.district)));

  return (
    <header className="sticky top-0 z-40 bg-[#0d1726] border-b border-[#1e3252] shadow-xl transition-colors text-white">
      {/* 1. Indian National Tricolor Micro-Strip */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#f97316] via-white to-[#16a34a]" />

      {/* 2. Official State Government & National Portal Utility Strip */}
      <div className="bg-[#08111d] border-b border-[#152336] px-4 sm:px-6 lg:px-8 py-2 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Government of Maharashtra Official Crest & Department Info */}
          <div className="flex items-center gap-3.5">
            <div className="flex items-center gap-2.5">
              <span className="text-lg select-none">🏛️</span>
              <div className="leading-tight">
                <span className="text-xs font-bold text-white tracking-wide block">
                  महाराष्ट्र शासन | GOVERNMENT OF MAHARASHTRA
                </span>
                <span className="text-[11px] text-slate-400">
                  पशुसंवर्धन आणि दुग्धव्यवसाय विभाग | Department of Animal Husbandry & Dairying
                </span>
              </div>
            </div>
            <span className="hidden lg:inline-block w-px h-5 bg-slate-700/80 mx-2" />
            <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] text-amber-300 font-medium bg-[#131f33] px-2.5 py-0.5 rounded-md border border-amber-800/40">
              <span>National Animal Disease Control Programme (NADCP)</span>
            </span>
          </div>

          {/* Right Utilities: Helpline, Accessibility, Language */}
          <div className="flex items-center gap-5 text-xs shrink-0">
            <div className="hidden md:flex items-center gap-2 text-slate-300">
              <PhoneCall className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Toll-Free Kisan Helpline: <strong className="text-white font-bold">1800-419-PASHU (72748)</strong></span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 bg-[#131f33] px-2.5 py-1 rounded-md border border-[#1e3252] text-[11px] font-bold text-slate-300">
              <span className="cursor-pointer hover:text-white">A-</span>
              <span className="text-white cursor-pointer">A</span>
              <span className="cursor-pointer hover:text-white">A+</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-[#131f33] rounded-lg p-0.5 text-xs font-bold border border-[#1e3252]">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded ${language === 'en' ? 'bg-[#0284c7] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-2.5 py-1 rounded ${language === 'mr' ? 'bg-[#0284c7] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                मराठी
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 rounded ${language === 'hi' ? 'bg-[#0284c7] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Official State Surveillance Alert Strip */}
      <div className="bg-[#0b1322] border-b border-[#182a45] px-4 sm:px-6 lg:px-8 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <p className="truncate text-xs">
              <strong className="text-amber-400 font-bold uppercase tracking-wider mr-1.5">
                [राज्य पशु आरोग्य सतर्कता • State Epidemiological Alert]:
              </strong>
              {t.emergencyAdvisory}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 shrink-0 text-[11px]">
            <span className="px-2.5 py-0.5 rounded bg-[#131f33] text-slate-300 border border-[#1e3252] font-semibold">
              SIH 2026 Evaluation Prototype • Problem Statement #26128
            </span>
          </div>
        </div>
      </div>

      {/* 4. Main Official Government Portal Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22 gap-6">
          {/* Official Emblem & Portal Title */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-[#131f33] border border-[#1e3252] flex items-center justify-center text-[#38bdf8] font-black shadow-md">
              <ShieldCheck className="w-7 h-7 text-[#38bdf8]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-serif">
                  {t.appTitle}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#131f33] text-[#38bdf8] border border-[#1e3252] uppercase tracking-wider">
                  SIH 2026 • PS 26128
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium truncate max-w-[220px] sm:max-w-md mt-0.5">
                National Livestock Disease Surveillance & Bio-Security Network (NLDSN)
              </p>
            </div>
          </div>

          {/* District Administrative Boundary Selector */}
          <div className="hidden lg:flex items-center gap-2.5 bg-[#131f33] px-4 py-2.5 rounded-xl border border-[#1e3252] text-xs font-medium text-slate-300 shadow-sm">
            <MapPin className="w-4 h-4 text-[#38bdf8] shrink-0" />
            <div className="text-left">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block leading-none mb-1">
                Administrative Division
              </span>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                aria-label="Filter district"
                className="bg-transparent border-none focus:outline-none cursor-pointer pr-3 font-bold text-white text-xs leading-none"
              >
                <option value="All Maharashtra" className="bg-[#131f33] text-white">All Maharashtra (36 Districts)</option>
                {uniqueDistricts.map((d) => (
                  <option key={d} value={d} className="bg-[#131f33] text-white">
                    {d} District Directorate
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Navigation Action Portals */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* AI Clinical Screening Trigger */}
            <button
              onClick={() => setIsTriageOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold border border-[#38bdf8]/40 shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Citizen Triage Desk</span>
              <span className="sm:hidden">Triage Desk</span>
            </button>

            {/* Role Switcher: Citizen/Kisan vs State Officer Console */}
            <div className="flex bg-[#101b2d] p-1 rounded-xl border border-[#1e3252] gap-1 shadow-inner">
              <button
                onClick={() => setRole('farmer')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  role === 'farmer'
                    ? 'bg-[#0284c7] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Switch to Kisan & Field Para-Vet Portal"
              >
                <UserCheck className="w-3.5 h-3.5 text-white" />
                <span className="hidden xl:inline">Kisan Portal</span>
              </button>
              <button
                onClick={() => setRole('officer')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  role === 'officer'
                    ? 'bg-amber-600 text-slate-950 font-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Switch to State Veterinary Surveillance Console"
              >
                <Activity className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">State Surveillance</span>
              </button>
            </div>

            {/* Cart / Essential Medicine Requisition */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-[#131f33] hover:bg-[#1a2b47] text-slate-200 border border-[#1e3252] transition-colors shadow-sm"
              aria-label="Open Requisition Cart"
              title="Essential Veterinary Requisition"
            >
              <ShoppingCart className="w-4 h-4 text-slate-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
