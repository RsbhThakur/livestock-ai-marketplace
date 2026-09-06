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
    <div className="flex-1 flex flex-col">
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

            {/* Category & Species Filter Bar */}
            <CategoryBar
              selectedSpeciesFilter={selectedSpeciesFilter}
              setSelectedSpeciesFilter={setSelectedSpeciesFilter}
            />

            {/* Marketplace Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
              {/* Active Emergency Outbreak Alert Banner if in Nashik / High zone */}
              <div className="p-4 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent border border-rose-300 dark:border-rose-900 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-600 text-white rounded-xl shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-400">
                      Regional Containment Advisory (Nashik & Pune Corridors)
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Only livestock with active RFID vaccination stamps are cleared for district transport. Need rapid animal triage?
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsTriageOpen(true)}
                  className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs rounded-xl shrink-0 hover:bg-brand-700 transition-colors"
                >
                  Run Triage Now →
                </button>
              </div>

              {/* Section A: Verified Livestock Listings */}
              {(activeCategory === 'all' || activeCategory === 'livestock') && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        <span>AI-Certified Disease-Free Livestock</span>
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Each listing includes verifiable RFID ear-tag history, vaccination stamps, and veterinary health passports
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-400">
                      {filteredLivestock.length} animals available
                    </span>
                  </div>

                  {filteredLivestock.length === 0 ? (
                    <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <p className="text-xs text-slate-500">No livestock listings match your filter criteria.</p>
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
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-500" />
                        <span>Veterinary Pharmaceuticals & Outbreak Emergency Packs</span>
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Prescription-grade veterinary medications, diagnostic dipsticks, and fast rural dispatch bundles
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-400">
                      {filteredPharma.length} products listed
                    </span>
                  </div>

                  {filteredPharma.length === 0 ? (
                    <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                      <p className="text-xs text-slate-500">No veterinary products match your filter criteria.</p>
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 flex items-center justify-center shrink-0 font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">100% Health Guarantee</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">All livestock pre-screened with digital RFID health passports</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 font-bold">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Rural Doorstep Delivery</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Veterinary medicines dispatched directly to village farmgates</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 font-bold">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Govt. Kisan Subsidy</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">20% automatic discount applied with code KISAN2026</p>
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

      {/* Footer */}
      <footer className="bg-slate-950 text-white border-t border-slate-800 py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white">PashuSetu AI</span>
                <span className="text-[10px] font-extrabold bg-brand-600 px-1.5 py-0.5 rounded text-white">
                  SIH #26128
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Efficient systems for early detection, prevention and management of livestock diseases and animal health issues (Government of Maharashtra).
              </p>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 mb-3">
                Early Warning Engine
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>• Explainable Random Forest Classifier</li>
                <li>• Deterministic Safety Net Rule Fallback</li>
                <li>• 0-100 Regional Risk Index</li>
                <li>• Space-Time Outbreak Clustering (ST-DBSCAN)</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 mb-3">
                Rural Commerce & Trust
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>• Digital RFID Animal Health Passports</li>
                <li>• Certified Purebred Dairy Cattle</li>
                <li>• Emergency Epidemic Medicine Bundles</li>
                <li>• Kisan Credit Card & Subsidy Integration</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 mb-3">
                Veterinary Helpline
              </h4>
              <p className="text-xs text-slate-400">
                State Animal Husbandry Dept. 24/7 Emergency Response:
              </p>
              <div className="mt-2 text-sm font-black text-brand-400 flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4" />
                <span>1800-419-PASHU (Toll-Free)</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 font-mono">
                Prototype deployed on Vercel Edge Serverless
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
            <p>
              Smart India Hackathon 2026 Submission • Designed with Senior Consultant Quality • All surveillance data is synthetic demo data.
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
