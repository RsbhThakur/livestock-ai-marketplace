'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { TRANSLATIONS } from '@/lib/translations';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  MapPin,
  HeartPulse,
  Activity,
  ArrowRight,
  Stethoscope,
} from 'lucide-react';

export default function HeroBanner() {
  const { language, setIsTriageOpen, setActiveCategory, setRole } = useApp();
  const t = TRANSLATIONS[language];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 py-8 border-b border-slate-200 dark:border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950/80 border border-brand-300 dark:border-brand-700 text-brand-800 dark:text-brand-300 text-xs font-bold mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
              <span>Smart India Hackathon #26128 Prototype</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {t.heroTitle}
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
              {t.heroDesc}
            </p>

            {/* Micro value props */}
            <div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center font-bold">
                  ✓
                </div>
                <span>RFID Digital Health Passports</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center font-bold">
                  ✓
                </div>
                <span>Explainable AI Risk Triage</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center font-bold">
                  ✓
                </div>
                <span>Kisan Subsidy & Rural COD</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsTriageOpen(true)}
                className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold shadow-md shadow-brand-600/30 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Launch AI Health Triage</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setRole('officer');
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-sm font-bold flex items-center gap-2 transition-all border border-slate-700"
              >
                <Activity className="w-4 h-4 text-amber-400" />
                <span>Open Surveillance Map</span>
              </button>
            </div>
          </div>

          {/* Quick Action Bento Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {/* Card 1: AI Triage */}
            <div
              onClick={() => setIsTriageOpen(true)}
              className="bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-brand-500 cursor-pointer transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">AI Health Triage</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Enter symptoms & get clinical risk level in 30 seconds
              </p>
              <span className="inline-block mt-3 text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
                Start Screening →
              </span>
            </div>

            {/* Card 2: Certified Livestock */}
            <div
              onClick={() => setActiveCategory('livestock')}
              className="bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-brand-500 cursor-pointer transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Verified Livestock</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                100% disease-free cattle with RFID health passports
              </p>
              <span className="inline-block mt-3 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                Explore Breeds →
              </span>
            </div>

            {/* Card 3: Emergency Vet Store */}
            <div
              onClick={() => setActiveCategory('emergency')}
              className="bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-rose-500 cursor-pointer transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Emergency Kits</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Lumpy-Care & Respiratory epidemic dispatch packs
              </p>
              <span className="inline-block mt-3 text-xs font-bold text-rose-600 dark:text-rose-400 group-hover:translate-x-1 transition-transform">
                Order Kits →
              </span>
            </div>

            {/* Card 4: Tele-Vet Consultation */}
            <div
              onClick={() => setActiveCategory('tele-vet')}
              className="bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-blue-500 cursor-pointer transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Tele-Vet Booking</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Live video consult with certified state vet officers
              </p>
              <span className="inline-block mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                Book ₹199 Pass →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
