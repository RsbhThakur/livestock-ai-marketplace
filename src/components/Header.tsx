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
    <header className="sticky top-0 z-40 bg-[#0a192f] border-b border-[#1e3a5f] shadow-2xl transition-colors text-white">
      {/* 1. Indian National Tricolor Micro-Strip */}
      <div className="h-1 w-full bg-gradient-to-r from-[#f97316] via-white to-[#16a34a]" />

      {/* 2. Official State Government & National Portal Utility Strip */}
      <div className="bg-[#071324] border-b border-[#152a45] px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Government of Maharashtra Official Crest & Department Info */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-base select-none">🏛️</span>
              <div className="leading-tight">
                <span className="text-[11px] font-bold text-slate-200 tracking-wide block">
                  महाराष्ट्र शासन | GOVERNMENT OF MAHARASHTRA
                </span>
                <span className="text-[10px] text-slate-400">
                  पशुसंवर्धन आणि दुग्धव्यवसाय विभाग | Department of Animal Husbandry & Dairying
                </span>
              </div>
            </div>
            <span className="hidden md:inline-block w-px h-4 bg-slate-700 mx-1" />
            <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] text-amber-300/90 font-medium bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
              <span>National Animal Disease Control Programme (NADCP)</span>
            </span>
          </div>

          {/* Right Utilities: Digital India, Helpline, Accessibility, Language */}
          <div className="flex items-center gap-4 text-[11px] shrink-0">
            <div className="hidden lg:flex items-center gap-2 text-slate-400">
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>Toll-Free Kisan Helpline: <strong className="text-white">1800-419-PASHU (72748)</strong></span>
            </div>

            <div className="hidden sm:flex items-center gap-1 bg-[#0c2340] px-2 py-0.5 rounded border border-[#1e3a5f] text-[10px] font-bold text-slate-300">
              <span>A-</span>
              <span className="text-white">A</span>
              <span>A+</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-[#0c2340] rounded-lg p-0.5 text-[11px] font-bold border border-[#1e3a5f]">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded ${language === 'en' ? 'bg-[#1e3a5f] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-2 py-0.5 rounded ${language === 'mr' ? 'bg-[#1e3a5f] text-amber-300 shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                मराठी
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-0.5 rounded ${language === 'hi' ? 'bg-[#1e3a5f] text-amber-300 shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Official State Surveillance Alert Strip */}
      <div className="bg-[#0b1c33] border-b border-[#1b3558] px-4 py-1 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <p className="truncate text-[11px]">
              <strong className="text-amber-400 font-bold uppercase tracking-wider mr-1">
                [राज्य पशु आरोग्य सतर्कता • State Epidemiological Alert]:
              </strong>
              {t.emergencyAdvisory}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 shrink-0 text-[10px]">
            <span className="px-2 py-0.5 rounded bg-[#132c4d] text-slate-300 border border-[#234570] font-semibold">
              SIH 2026 Evaluation Prototype • Problem Statement #26128
            </span>
          </div>
        </div>
      </div>

      {/* 4. Main Official Government Portal Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Official Emblem & Portal Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-b from-[#133054] to-[#0a1e36] border border-[#244c7d] flex items-center justify-center text-amber-300 font-black shadow-lg">
              <ShieldCheck className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-serif">
                  {t.appTitle}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-blue-900/80 text-blue-200 border border-blue-600/60 uppercase tracking-wider">
                  SIH 2026 • PS 26128
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium truncate max-w-[210px] sm:max-w-md">
                National Livestock Disease Surveillance & Bio-Security Network (NLDSN)
              </p>
            </div>
          </div>

          {/* District Administrative Boundary Selector */}
          <div className="hidden md:flex items-center gap-2 bg-[#0c2340] px-3.5 py-2 rounded-xl border border-[#1e3a5f] text-xs font-medium text-slate-300">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="text-left">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">
                Administrative Division:
              </span>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                aria-label="Filter district"
                className="bg-transparent border-none focus:outline-none cursor-pointer pr-2 font-bold text-white text-xs"
              >
                <option value="All Maharashtra" className="bg-[#0c2340] text-white">All Maharashtra (36 Districts)</option>
                {uniqueDistricts.map((d) => (
                  <option key={d} value={d} className="bg-[#0c2340] text-white">
                    {d} District Directorate
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Registry */}
          <div className="flex-1 max-w-xs hidden lg:block">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Pashu Aadhaar RFID, breeds, or generic drugs..."
                className="w-full pl-9 pr-4 py-2 bg-[#0c2340] text-white placeholder-slate-400 rounded-xl text-xs font-medium border border-[#1e3a5f] focus:border-blue-400 focus:outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Navigation Action Portals */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Clinical Screening Trigger */}
            <button
              onClick={() => setIsTriageOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl text-xs font-bold border border-emerald-500/50 shadow-md shadow-emerald-950/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Citizen Triage Desk</span>
              <span className="sm:hidden">Triage Desk</span>
            </button>

            {/* Role Switcher: Citizen/Kisan vs State Officer Console */}
            <div className="flex bg-[#071324] p-1 rounded-xl border border-[#1e3a5f]">
              <button
                onClick={() => setRole('farmer')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  role === 'farmer'
                    ? 'bg-[#15345a] text-white shadow-sm border border-[#2b568a]'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Switch to Kisan & Field Para-Vet Portal"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden xl:inline">Kisan Portal</span>
              </button>
              <button
                onClick={() => setRole('officer')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
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
              className="relative p-2.5 rounded-xl bg-[#0c2340] hover:bg-[#132f52] text-slate-200 border border-[#1e3a5f] transition-colors"
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
