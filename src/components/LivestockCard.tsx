'use client';

import React from 'react';
import { LivestockItem } from '@/lib/types';
import { useApp } from '@/lib/store';
import { TRANSLATIONS } from '@/lib/translations';
import { formatINR } from '@/lib/utils';
import { ShieldCheck, MapPin, Award, CheckCircle2, ShoppingCart, Eye, FileText } from 'lucide-react';

export default function LivestockCard({ item }: { item: LivestockItem }) {
  const { language, addToCart, setSelectedLivestock, setIsPassportOpen } = useApp();
  const t = TRANSLATIONS[language];

  const handleInspectPassport = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLivestock(item);
    setIsPassportOpen(true);
  };

  return (
    <div className="bg-[#091b30] rounded-2xl border border-[#1b3a61] overflow-hidden shadow-lg hover:shadow-2xl hover:border-emerald-500/60 transition-all duration-300 flex flex-col group text-white">
      {/* Image & Official Registry Badges */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#05101d]">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          <span className="inline-flex items-center gap-1.5 bg-[#071526]/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-emerald-300 border border-emerald-500/50 shadow-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Govt. Certified (Score 98/100)</span>
          </span>
          {item.featured && (
            <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider shadow">
              <Award className="w-3 h-3" />
              <span>Elite Breed</span>
            </span>
          )}
        </div>

        {/* Pashu Aadhaar RFID Badge */}
        <div className="absolute bottom-2.5 right-2.5 bg-[#071526]/95 backdrop-blur-md text-amber-300 border border-[#224b7e] px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-tight">
          Pashu Aadhaar: {item.healthPassport.rfidTag}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Species & Location */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-bold uppercase tracking-wider text-[10px] text-blue-300">
              {item.breed} • {item.gender} ({item.ageYears} yrs)
            </span>
            <div className="flex items-center gap-1 text-[11px] text-slate-300">
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>{item.district}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-white leading-snug line-clamp-1 group-hover:text-blue-300 transition-colors font-serif">
            {language === 'mr' ? item.marathiTitle : item.title}
          </h3>

          {/* Productivity / Yield Metric */}
          <div className="mt-2.5 bg-[#061220] p-2.5 rounded-xl border border-[#142d4d] text-xs">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Productivity Record:</span>
            <span className="font-semibold text-slate-200">
              {item.lactationOrWeight}
            </span>
          </div>

          {/* Verified Seller */}
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate">{item.sellerName}</span>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-4 pt-3 border-t border-[#1b3a61] flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block uppercase">Govt. Verified Price</span>
              <span className="text-lg font-black text-white font-serif">
                {formatINR(item.price)}
              </span>
            </div>
            {item.originalPrice && (
              <span className="text-xs text-slate-500 line-through">
                {formatINR(item.originalPrice)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              onClick={handleInspectPassport}
              className="px-2.5 py-2 rounded-xl bg-[#0e2747] hover:bg-[#153864] text-slate-200 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 border border-[#224b7e]"
            >
              <FileText className="w-3.5 h-3.5 text-amber-300" />
              <span>Inspect Passport</span>
            </button>
            <button
              onClick={() => addToCart(item, 'livestock')}
              className="px-2.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Requisition</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
