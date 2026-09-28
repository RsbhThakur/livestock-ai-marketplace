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
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-xl transition-colors text-white">
      {/* Global Surveillance Bulletin & Synthetic Data Notice */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <p className="truncate text-[11px] sm:text-xs">
              <strong className="text-white font-bold">Maharashtra Epidemic Advisory:</strong> {t.emergencyAdvisory}
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-3 shrink-0 text-[11px]">
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700 font-semibold text-[10px]">
              Prototype Simulation Data
            </span>
            <span className="text-slate-400 font-medium">
              Helpline: <strong className="text-white">1800-419-PASHU</strong>
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Emblem */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white">
                  {t.appTitle}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  SIH 2026
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium truncate max-w-[190px] sm:max-w-xs">
                Govt of Maharashtra Animal Health & Marketplace
              </p>
            </div>
          </div>

          {/* District Selector */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-medium text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              aria-label="Filter district"
              className="bg-transparent border-none focus:outline-none cursor-pointer pr-2 font-bold text-white text-xs"
            >
              <option value="All Maharashtra" className="bg-slate-900 text-white">All Maharashtra</option>
              {uniqueDistricts.map((d) => (
                <option key={d} value={d} className="bg-slate-900 text-white">
                  {d} District
                </option>
              ))}
            </select>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-sm hidden lg:block">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-4 py-2 bg-slate-900 text-white placeholder-slate-500 rounded-xl text-xs font-medium border border-slate-800 focus:border-cyan-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Action Buttons: Multi-Modal Studio, Role, Language, Cart */}
          <div className="flex items-center gap-2">
            {/* AI Multi-modal Quick Trigger */}
            <button
              onClick={() => setIsTriageOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white rounded-xl text-xs font-black shadow-md shadow-cyan-600/25 hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">AI Triage Studio</span>
              <span className="sm:hidden">AI Triage</span>
            </button>

            {/* Role Switcher */}
            <div className="flex bg-slate-900 p-0.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setRole('farmer')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  role === 'farmer'
                    ? 'bg-slate-800 text-emerald-400 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Switch to Farmer Marketplace"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Market</span>
              </button>
              <button
                onClick={() => setRole('officer')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  role === 'officer'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Switch to Government SIH Surveillance Console"
              >
                <Activity className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Surveillance</span>
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex bg-slate-900 rounded-xl p-0.5 text-xs font-bold text-slate-300 border border-slate-800">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-lg ${language === 'en' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-2 py-1 rounded-lg ${language === 'mr' ? 'bg-slate-800 text-cyan-400 shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                मराठी
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 rounded-lg ${language === 'hi' ? 'bg-slate-800 text-cyan-400 shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                हिंदी
              </button>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors"
              aria-label="Open Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center shadow-md animate-bounce">
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
