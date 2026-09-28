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
  FileCheck2,
  Award,
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
    <div className="relative overflow-hidden bg-gradient-to-b from-[#071526] via-[#0c2340] to-[#081729] py-12 sm:py-16 border-b border-[#1b3a61] text-white">
      {/* Subtle Government Geometric Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Header */}
        <div className="max-w-4xl mx-auto text-center space-y-5">
          {/* Official SIH & Ministry Emblem Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1e36] border border-[#234c7c] text-slate-200 text-xs font-semibold shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-amber-300 font-bold">महाराष्ट्र शासन • Smart India Hackathon 2026</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">Problem Statement #26128 • Animal Husbandry</span>
          </div>

          {/* Bilingual Headline */}
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-bold text-amber-300/90 tracking-wider uppercase block">
              राष्ट्रीय पशु रोग पूर्वसूचना, नियंत्रण आणि डिजिटल पशु आरोग्य प्रणाली
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.18] font-serif">
              National Livestock Disease Early Warning & Bio-Security System
            </h1>
          </div>

          {/* Institutional Description */}
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            An indigenous Digital Public Infrastructure (DPI) establishing real-time syndromic surveillance across 90+ talukas, automated vernacular triage via speech & clinical imaging, and tamper-evident RFID digital health passports.
          </p>

          {/* Primary Action Buttons with Formal Gov Styling */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={scrollToStudio}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-sm font-extrabold shadow-lg shadow-emerald-950/60 flex items-center gap-2.5 border border-emerald-500/50 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Mic className="w-4 h-4 text-emerald-200" />
              <span>Citizen AI Diagnostic Desk</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setRole('officer');
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl bg-[#0f2747] hover:bg-[#163864] text-white text-sm font-bold flex items-center gap-2.5 border border-[#224b7e] transition-all shadow-md"
            >
              <Activity className="w-4 h-4 text-amber-400" />
              <span>State Epidemiological Bulletin & GIS</span>
            </button>

            <button
              onClick={() => setActiveCategory('livestock')}
              className="px-6 py-3.5 rounded-xl bg-[#0a1c33] hover:bg-[#112a4c] text-slate-200 text-sm font-semibold flex items-center gap-2 border border-[#1b3a61] transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Pashu Aadhaar Registry</span>
            </button>
          </div>

          {/* Key National Indicators Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-3xl mx-auto text-left">
            <div className="p-3 rounded-xl bg-[#081a30] border border-[#1b3a61]">
              <span className="text-lg font-black text-emerald-400 block font-serif">36 Districts</span>
              <span className="text-[11px] text-slate-400 font-medium">90+ Talukas Monitored</span>
            </div>
            <div className="p-3 rounded-xl bg-[#081a30] border border-[#1b3a61]">
              <span className="text-lg font-black text-blue-300 block font-serif">&lt; 120ms</span>
              <span className="text-[11px] text-slate-400 font-medium">Edge Model Latency</span>
            </div>
            <div className="p-3 rounded-xl bg-[#081a30] border border-[#1b3a61]">
              <span className="text-lg font-black text-amber-300 block font-serif">100% Offline</span>
              <span className="text-[11px] text-slate-400 font-medium">Rural Field Inference</span>
            </div>
            <div className="p-3 rounded-xl bg-[#081a30] border border-[#1b3a61]">
              <span className="text-lg font-black text-emerald-400 block font-serif">NADCP Aligned</span>
              <span className="text-[11px] text-slate-400 font-medium">National Disease Protocol</span>
            </div>
          </div>
        </div>

        {/* 4 Feature Pillars Bento Grid (Styled as Official National Schemes & Programmes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10">
          <div
            onClick={() => setActiveCategory('livestock')}
            className="p-5 rounded-2xl bg-[#091b30] border border-[#1b3a61] hover:border-emerald-500/60 cursor-pointer transition-all group shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-950/70 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-emerald-800/80">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/50 px-1.5 py-0.2 rounded border border-amber-800/40">
                Pashu Aadhaar
              </span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
              INAPH Certified Livestock
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Certified indigenous dairy cows & goats with tamper-evident digital RFID vaccination stamps.
            </p>
          </div>

          <div
            onClick={() => setActiveCategory('emergency')}
            className="p-5 rounded-2xl bg-[#091b30] border border-[#1b3a61] hover:border-rose-500/60 cursor-pointer transition-all group shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-950/70 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-rose-800/80">
              <Truck className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-rose-300 bg-rose-950/50 px-1.5 py-0.2 rounded border border-rose-800/40">
                Emergency Bio-Security
              </span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">
              Outbreak Containment Packs
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Rapid response antiviral, antibiotic, and antiseptic packs dispatched to village containment zones.
            </p>
          </div>

          <div
            onClick={() => setActiveCategory('tele-vet')}
            className="p-5 rounded-2xl bg-[#091b30] border border-[#1b3a61] hover:border-blue-500/60 cursor-pointer transition-all group shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-950/70 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-blue-800/80">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-blue-300 bg-blue-950/50 px-1.5 py-0.2 rounded border border-blue-800/40">
                e-Sanjeevani Vet
              </span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
              State Tele-Vet Polyclinic
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Official video tele-consultations with certified state veterinary officers for remote livestock owners.
            </p>
          </div>

          <div
            onClick={() => setIsTriageOpen(true)}
            className="p-5 rounded-2xl bg-[#091b30] border border-[#1b3a61] hover:border-amber-500/60 cursor-pointer transition-all group shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-950/70 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-amber-800/80">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/50 px-1.5 py-0.2 rounded border border-amber-800/40">
                IDSP Protocol
              </span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
              Clinical Safety Overrides
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Deterministic epidemiological safety rules overriding AI on anthrax, acute tremor, or sudden mortality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
