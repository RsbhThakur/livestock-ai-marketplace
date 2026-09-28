'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import Header from '@/components/Header';
import JudgeQuickDemo from '@/components/JudgeQuickDemo';
import HeroBanner from '@/components/HeroBanner';
import CategoryBar from '@/components/CategoryBar';
import LivestockCard from '@/components/LivestockCard';
import ProductCard from '@/components/ProductCard';
import SurveillanceConsole from '@/components/SurveillanceConsole';
import HealthPassportModal from '@/components/HealthPassportModal';
import TriageModal from '@/components/TriageModal';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import OrderSuccessModal from '@/components/OrderSuccessModal';
import MultimodalStudio from '@/components/MultimodalStudio';
import {
  ShieldCheck,
  Truck,
  HeartHandshake,
  Stethoscope,
  Sparkles,
  PhoneCall,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';

export default function Home() {
  const {
    role,
    setRole,
    livestock,
    pharma,
    activeCategory,
    searchQuery,
    selectedDistrict,
    setIsTriageOpen,
  } = useApp();

  const [selectedSpeciesFilter, setSelectedSpeciesFilter] = useState('all');

  // Filter Livestock
  const filteredLivestock = livestock.filter((item) => {
    // Category check
    if (activeCategory === 'pharma' || activeCategory === 'emergency' || activeCategory === 'tele-vet') {
      return false;
    }
    // Species filter
    if (selectedSpeciesFilter !== 'all' && item.species !== selectedSpeciesFilter) {
      return false;
    }
    // District filter
    if (selectedDistrict !== 'All Maharashtra' && item.district !== selectedDistrict) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q) || item.marathiTitle.toLowerCase().includes(q);
      const matchBreed = item.breed.toLowerCase().includes(q);
      const matchVillage = item.village.toLowerCase().includes(q);
      if (!matchTitle && !matchBreed && !matchVillage) return false;
    }
    return true;
  });

  // Filter Pharma & Kits
  const filteredPharma = pharma.filter((item) => {
    // Category check
    if (activeCategory === 'livestock') return false;
    if (activeCategory === 'emergency' && !item.isEmergencyBundle) return false;
    if (activeCategory === 'tele-vet' && item.id !== 'pharma-vet-telepass') return false;

    // Species filter
    if (selectedSpeciesFilter !== 'all' && !item.targetSpecies.includes(selectedSpeciesFilter as any)) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q) || item.marathiName.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchDosage = item.dosage.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchDosage) return false;
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#061220] text-white min-h-screen">
      {/* 1. Global Header & Disclaimer */}
      <Header />

      {/* 2. Judge Quick-Demo Walkthrough Panel */}
      <JudgeQuickDemo />

      {/* 3. Main Body */}
      <main className="flex-1">
        {role === 'farmer' ? (
          <div>
            {/* Hero Banner with Quick Actions */}
            <HeroBanner />

            {/* Flagship Interactive Multi-Modal AI Diagnostic Studio Section */}
            <section id="ai-studio" className="py-12 md:py-16 border-b border-[#1b3a61] bg-[#071526] relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a1e36] border border-[#234c7c] text-blue-200 text-xs font-bold mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>National Animal Disease Control Programme (NADCP)</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
                      Kisan & Para-Veterinary AI Diagnostic Studio
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                      Speak cattle symptoms in Marathi, Hindi, or English, or upload lesion photos for instant CLIP ViT-L/14 classification and bounding box telemetry.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsTriageOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-[#0f2747] hover:bg-[#163864] text-blue-200 text-xs font-bold border border-[#224b7e] transition flex items-center gap-1.5 self-start sm:self-auto shadow-md"
                  >
                    <span>Full Clinical Predictor Modal</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <MultimodalStudio />
              </div>
            </section>

            {/* Category & Species Filter Bar */}
            <CategoryBar
              selectedSpeciesFilter={selectedSpeciesFilter}
              setSelectedSpeciesFilter={setSelectedSpeciesFilter}
            />

            {/* Marketplace Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
              {/* Active Emergency Outbreak Alert Banner if in Nashik / High zone */}
              <div className="p-4 bg-[#0a192f] border border-[#234c7c] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-600 text-slate-950 rounded-xl shrink-0 shadow-md">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      State Bio-Security Advisory (Nashik & Pune Transit Corridors)
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Inter-district livestock transit restricted to animals bearing verified digital RFID vaccination certificates.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsTriageOpen(true)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shrink-0 transition-all shadow-md"
                >
                  Verify Health Status →
                </button>
              </div>

              {/* Section A: Verified Livestock Listings */}
              {(activeCategory === 'all' || activeCategory === 'livestock') && (
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 font-serif">
                        <ShieldCheck className="w-6 h-6 text-emerald-400" />
                        <span>Pashu Aadhaar Certified Livestock Registry</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Each listing includes verifiable RFID ear-tag history, vaccination stamps, and veterinary health passports
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-300 bg-[#091b30] px-3 py-1.5 rounded-xl border border-[#1b3a61]">
                      {filteredLivestock.length} Certified Animals
                    </span>
                  </div>

                  {filteredLivestock.length === 0 ? (
                    <div className="p-12 text-center bg-[#091b30] rounded-2xl border border-[#1b3a61]">
                      <p className="text-xs text-slate-400">No livestock listings match your filter criteria.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredLivestock.map((item) => (
                        <LivestockCard key={item.id} item={item} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Section B: Veterinary Medicines & Emergency Packs */}
              {(activeCategory === 'all' ||
                activeCategory === 'pharma' ||
                activeCategory === 'emergency' ||
                activeCategory === 'tele-vet') && (
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 font-serif">
                        <Truck className="w-6 h-6 text-blue-400" />
                        <span>PMBJP-Vet Essential Formulations & Epidemic Bundles</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Government-subsidized veterinary medicines, emergency epidemic kits, and tele-vet polyclinic passes
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-300 bg-[#091b30] px-3 py-1.5 rounded-xl border border-[#1b3a61]">
                      {filteredPharma.length} Formulations Listed
                    </span>
                  </div>

                  {filteredPharma.length === 0 ? (
                    <div className="p-12 text-center bg-slate-900/60 rounded-2xl border border-slate-800">
                      <p className="text-xs text-slate-400">No veterinary products match your filter criteria.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {filteredPharma.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Trust & Rural Service Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800">
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex items-center gap-3 shadow-md">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 font-bold border border-emerald-800">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">INAPH / RFID Traceability</h4>
                    <p className="text-[11px] text-slate-400">100% digital validation via state animal health records</p>
                  </div>
                </div>

                <div className="bg-[#091b30] p-4 rounded-2xl border border-[#1b3a61] flex items-center gap-3 shadow-md">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/70 text-blue-400 flex items-center justify-center shrink-0 font-bold border border-blue-800">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Rural Doorstep Delivery</h4>
                    <p className="text-[11px] text-slate-400">Veterinary medicines dispatched directly to village farmgates</p>
                  </div>
                </div>

                <div className="bg-[#091b30] p-4 rounded-2xl border border-[#1b3a61] flex items-center gap-3 shadow-md">
                  <div className="w-10 h-10 rounded-xl bg-amber-950/70 text-amber-400 flex items-center justify-center shrink-0 font-bold border border-amber-800">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Govt. Kisan Subsidy</h4>
                    <p className="text-[11px] text-slate-400">20% automatic discount applied with code KISAN2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Veterinary Officer / SIH Surveillance Console Mode */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SurveillanceConsole />
          </div>
        )}
      </main>

      {/* Authentic National Portal & Govt of Maharashtra Footer */}
      <footer className="bg-[#050e18] text-white border-t border-[#152e4f] py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Directorate Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 border-b border-[#152e4f]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0b203a] border border-[#1e4370] flex items-center justify-center text-amber-300 font-serif font-black text-sm">
                🏛️
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide font-serif">
                  महाराष्ट्र शासन | GOVERNMENT OF MAHARASHTRA
                </h3>
                <p className="text-xs text-slate-400">
                  Department of Animal Husbandry, Dairying & Fisheries • Central Building, Pune - 411001
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300 bg-[#091a30] px-3.5 py-1.5 rounded-xl border border-[#1b3a61]">
              <span className="text-amber-300 font-bold">Smart India Hackathon 2026</span>
              <span className="text-slate-500">•</span>
              <span>Problem Statement #26128</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight text-white font-serif">PashuSetu AI</span>
                <span className="text-[10px] font-extrabold bg-blue-900 text-blue-200 border border-blue-700 px-1.5 py-0.5 rounded">
                  DPI-AH
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                National Digital Public Infrastructure for early detection, prevention, and management of livestock diseases across rural Maharashtra.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                National Programs & Protocols
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>• National Animal Disease Control (NADCP)</li>
                <li>• Integrated Disease Surveillance (IDSP-Vet)</li>
                <li>• INAPH & Pashu Aadhaar RFID Registry</li>
                <li>• ICAR-NIVEDI Epidemiology Standards</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                Key Official Portals
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>• Department of Animal Husbandry & Dairying (DAHD)</li>
                <li>• National Digital Livestock Mission (NDLM)</li>
                <li>• e-GOPALA Digital Breeding Platform</li>
                <li>• PMBJP-Vet Generic Formulations Scheme</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                Emergency Veterinary Helpline
              </h4>
              <p className="text-xs text-slate-400">
                24/7 State Emergency Tele-Veterinary Assistance:
              </p>
              <div className="mt-2 text-sm font-bold text-emerald-400 flex items-center gap-1.5 font-mono">
                <PhoneCall className="w-4 h-4" />
                <span>1800-419-PASHU (72748)</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Toll-free across all 36 Maharashtra districts
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#152e4f] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>
              © 2026 Government of Maharashtra. All rights reserved. Developed for Smart India Hackathon 2026.
            </p>
            <p className="font-mono text-[10px]">
              DPI Standards: ONDC / INAPH / NDHM-Vet Architecture
            </p>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <TriageModal />
      <HealthPassportModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
    </div>
  );
}
