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
    <div className="relative overflow-hidden bg-[#0b1320] py-20 sm:py-28 border-b border-[#1e3252] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Header */}
        <div className="max-w-4xl mx-auto text-center space-y-7">
          {/* Official SIH & Ministry Emblem Banner */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#131f33] border border-[#1e3252] text-slate-200 text-xs font-semibold shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-pulse" />
            <span className="text-white font-bold">महाराष्ट्र शासन • Smart India Hackathon 2026</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">Problem Statement #26128 • Animal Husbandry</span>
          </div>

          {/* Bilingual Headline */}
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-bold text-[#38bdf8] tracking-widest uppercase block">
              राष्ट्रीय पशु रोग पूर्वसूचना, नियंत्रण आणि डिजिटल पशु आरोग्य प्रणाली
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.14]">
              National Livestock Disease Early Warning & Bio-Security System
            </h1>
          </div>

          {/* Institutional Description */}
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed pt-1">
            An indigenous Digital Public Infrastructure (DPI) establishing real-time syndromic surveillance across 90+ talukas, automated vernacular triage via speech & clinical imaging, and tamper-evident RFID digital health passports.
          </p>

          {/* Primary Action Buttons with Solid e-Governance Styling */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 pt-3">
            <button
              onClick={scrollToStudio}
              className="px-7 py-3.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-sm font-bold shadow-md flex items-center gap-2.5 transition-all"
            >
              <Mic className="w-4 h-4 text-white" />
              <span>Citizen AI Diagnostic Desk</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setRole('officer');
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl bg-[#131f33] hover:bg-[#1a2b47] text-white text-sm font-bold flex items-center gap-2.5 border border-[#1e3252] shadow-sm transition-all"
            >
              <Activity className="w-4 h-4 text-[#38bdf8]" />
              <span>State Epidemiological Bulletin & GIS</span>
            </button>

            <button
              onClick={() => setActiveCategory('livestock')}
              className="px-6 py-3.5 rounded-xl bg-[#131f33] hover:bg-[#1a2b47] text-slate-200 text-sm font-semibold flex items-center gap-2.5 border border-[#1e3252] shadow-sm transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
              <span>Pashu Aadhaar Registry</span>
            </button>
          </div>

          {/* Key National Indicators Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-10 sm:pt-14 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-[#131f33] border border-[#1e3252] shadow-sm text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-white block mb-1">36 Districts</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">90+ Talukas Monitored</span>
            </div>
            <div className="p-6 rounded-2xl bg-[#131f33] border border-[#1e3252] shadow-sm text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#38bdf8] block mb-1">&lt; 120ms</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Edge Model Latency</span>
            </div>
            <div className="p-6 rounded-2xl bg-[#131f33] border border-[#1e3252] shadow-sm text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-white block mb-1">100% Offline</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Rural Field Inference</span>
            </div>
            <div className="p-6 rounded-2xl bg-[#131f33] border border-[#1e3252] shadow-sm text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#38bdf8] block mb-1">NADCP Aligned</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">National Disease Protocol</span>
            </div>
          </div>
        </div>

        {/* 4 Feature Pillars Bento Grid (Styled as Clean Solid Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-16 sm:pt-20 border-t border-[#1e3252]/60 mt-16 sm:mt-20">
          <div
            onClick={() => setActiveCategory('livestock')}
            className="p-6 sm:p-7 rounded-2xl bg-[#131f33] border border-[#1e3252] hover:border-[#38bdf8]/60 cursor-pointer transition-all shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0b1320] text-[#38bdf8] flex items-center justify-center mb-4 border border-[#1e3252]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#38bdf8]">
                  Pashu Aadhaar
                </span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">
                INAPH Certified Livestock
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Certified indigenous dairy cows & goats with tamper-evident digital RFID vaccination stamps.
              </p>
            </div>
          </div>

          <div
            onClick={() => setActiveCategory('emergency')}
            className="p-6 sm:p-7 rounded-2xl bg-[#131f33] border border-[#1e3252] hover:border-[#38bdf8]/60 cursor-pointer transition-all shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0b1320] text-[#38bdf8] flex items-center justify-center mb-4 border border-[#1e3252]">
                <Truck className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#38bdf8]">
                  Emergency Bio-Security
                </span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">
                Outbreak Containment Packs
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Rapid response antiviral, antibiotic, and antiseptic packs dispatched to village containment zones.
              </p>
            </div>
          </div>

          <div
            onClick={() => setActiveCategory('tele-vet')}
            className="p-6 sm:p-7 rounded-2xl bg-[#131f33] border border-[#1e3252] hover:border-[#38bdf8]/60 cursor-pointer transition-all shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0b1320] text-[#38bdf8] flex items-center justify-center mb-4 border border-[#1e3252]">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#38bdf8]">
                  e-Sanjeevani Vet
                </span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">
                Tele-Veterinary Polyclinic
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Real-time video consultation with state block veterinary officers and automated prescription generation.
              </p>
            </div>
          </div>

          <div
            onClick={() => setActiveCategory('pharma')}
            className="p-6 sm:p-7 rounded-2xl bg-[#131f33] border border-[#1e3252] hover:border-[#38bdf8]/60 cursor-pointer transition-all shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0b1320] text-[#38bdf8] flex items-center justify-center mb-4 border border-[#1e3252]">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#38bdf8]">
                  Generic Formulations
                </span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">
                PMBJP-Vet Subsidized Drugs
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Direct state depot requisition of quality generic veterinary drugs at 50-80% subsidized prices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
