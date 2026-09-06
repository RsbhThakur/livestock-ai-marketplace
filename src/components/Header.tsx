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
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      {/* 1. Synthetic Data Disclaimer Banner */}
      <div className="bg-amber-500 text-slate-950 px-4 py-1 text-xs font-semibold flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto overflow-hidden text-ellipsis whitespace-nowrap">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>{t.syntheticDataBanner}</span>
        </div>
      </div>

      {/* 2. Real-time Emergency Outbreak Ticker */}
      <div className="bg-rose-50 dark:bg-rose-950/40 border-b border-rose-200 dark:border-rose-900 px-4 py-1.5 text-xs text-rose-800 dark:text-rose-300 font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <p className="truncate">
            <strong className="font-bold">SIH Surveillance Bulletin:</strong> {t.emergencyAdvisory}
          </p>
          <div className="ml-auto shrink-0 flex items-center gap-3">
            <span className="hidden sm:inline text-rose-600 dark:text-rose-400 font-semibold text-[11px]">
              Toll-Free Vet Helpline: 1800-419-PASHU
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Emblem */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white shadow-md shadow-brand-700/20">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  {t.appTitle}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-brand-100 text-brand-800 dark:bg-brand-900/60 dark:text-brand-300 border border-brand-300 dark:border-brand-700">
                  SIH 2026
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[200px] sm:max-w-xs">
                Govt of Maharashtra Early Warning & Market
              </p>
            </div>
          </div>

          {/* District Selector */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300">
            <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              aria-label="Filter district"
              className="bg-transparent border-none focus:outline-none cursor-pointer pr-2 font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="All Maharashtra">All Maharashtra</option>
              {uniqueDistricts.map((d) => (
                <option key={d} value={d}>
                  {d} District
                </option>
              ))}
            </select>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden lg:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 rounded-full text-xs font-medium border border-transparent focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Action Buttons: Triage, Role Toggle, Language, Cart */}
          <div className="flex items-center gap-2.5">
            {/* AI Triage Quick Button */}
            <button
              onClick={() => setIsTriageOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-emerald-600 to-brand-700 hover:from-emerald-700 hover:to-brand-800 text-white rounded-xl text-xs font-bold shadow-sm shadow-brand-700/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">AI Triage</span>
            </button>

            {/* Role Switcher */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setRole('farmer')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  role === 'farmer'
                    ? 'bg-white dark:bg-slate-900 text-brand-700 dark:text-brand-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
                title="Switch to Farmer Market"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Market</span>
              </button>
              <button
                onClick={() => setRole('officer')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  role === 'officer'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
                title="Switch to Government SIH Surveillance Console"
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Surveillance</span>
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 text-xs font-bold text-slate-700 dark:text-slate-300">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded ${language === 'en' ? 'bg-white dark:bg-slate-900 text-brand-700 dark:text-brand-400 shadow-sm' : ''}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-2 py-1 rounded ${language === 'mr' ? 'bg-white dark:bg-slate-900 text-brand-700 dark:text-brand-400 shadow-sm' : ''}`}
              >
                मराठी
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 rounded ${language === 'hi' ? 'bg-white dark:bg-slate-900 text-brand-700 dark:text-brand-400 shadow-sm' : ''}`}
              >
                हिंदी
              </button>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              aria-label="Open Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-md animate-bounce">
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
