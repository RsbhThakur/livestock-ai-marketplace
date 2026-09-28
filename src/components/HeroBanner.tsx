'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { TRANSLATIONS } from '@/lib/translations';
import {
  Sparkles,
  ShieldCheck,
  Activity,
  ArrowRight,
  HeartPulse,
  Truck,
  Stethoscope,
  Mic,
  Camera,
  CheckCircle2,
  Building2,
  Cpu,
  Clock,
  PhoneCall,
} from 'lucide-react';

export default function HeroBanner() {
  const { language, setIsTriageOpen, setActiveCategory, setRole } = useApp();
  const t = TRANSLATIONS[language];

  const scrollToStudio = () => {
    const el = document.getElementById('ai-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsTriageOpen(true);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-14 sm:py-20 border-b border-slate-800 text-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 -mt-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Official SIH Problem Statement Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/70 text-emerald-300 text-xs font-bold tracking-wide shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Smart India Hackathon 2026 • Problem Statement #26128 • Government of Maharashtra</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
            {t.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Unified rural animal-health surveillance, multi-modal voice & visual diagnostic triage, and tamper-proof RFID livestock health passports.
          </p>

          {/* Primary Action Buttons with Generous Padding */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={scrollToStudio}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-sm font-extrabold shadow-xl shadow-emerald-500/25 flex items-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Mic className="w-4 h-4 text-emerald-200" />
              <span>Try Multi-Modal AI Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setRole('officer');
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold flex items-center gap-2.5 border border-slate-700 transition-all hover:border-slate-500 shadow-lg"
            >
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Surveillance Map & Forecast</span>
            </button>

            <button
              onClick={() => setActiveCategory('livestock')}
              className="px-6 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-sm font-semibold flex items-center gap-2 border border-slate-700/80 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Verified Breeds</span>
            </button>
          </div>

          {/* Key Metric Highlights Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-3xl mx-auto">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xl font-black text-emerald-400 block">90+</span>
              <span className="text-xs text-slate-400 font-medium">Villages Monitored</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xl font-black text-cyan-400 block">&lt; 120ms</span>
              <span className="text-xs text-slate-400 font-medium">Model Inference</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xl font-black text-indigo-400 block">100%</span>
              <span className="text-xs text-slate-400 font-medium">Offline STT & CLIP</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xl font-black text-amber-400 block">24/7</span>
              <span className="text-xs text-slate-400 font-medium">Toll-Free Helpline</span>
            </div>
          </div>
        </div>

        {/* 4 Feature Pillars Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-12">
          <div
            onClick={() => setActiveCategory('livestock')}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/60 cursor-pointer transition-all group shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-emerald-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
              RFID-Verified Livestock
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Certified purebred dairy cows & goats with tamper-proof digital vaccination passports.
            </p>
          </div>

          <div
            onClick={() => setActiveCategory('emergency')}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/60 cursor-pointer transition-all group shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-950 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-rose-800">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">
              Outbreak Emergency Kits
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Rapid epidemic response medicine packs dispatched directly to village containment zones.
            </p>
          </div>

          <div
            onClick={() => setActiveCategory('tele-vet')}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/60 cursor-pointer transition-all group shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-950 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-blue-800">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              Tele-Vet Consultations
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Instant video consultation passes with certified state veterinary officers for ₹199.
            </p>
          </div>

          <div
            onClick={() => setIsTriageOpen(true)}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/60 cursor-pointer transition-all group shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-950 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-amber-800">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
              Deterministic Safety Net
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Hardcoded clinical override rules for anthrax, severe tremor, and sudden high mortality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
