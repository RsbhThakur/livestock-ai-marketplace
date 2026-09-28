'use client';

import React from 'react';
import { LivestockItem } from '@/lib/types';
import { useApp } from '@/lib/store';
import { TRANSLATIONS } from '@/lib/translations';
import { formatINR } from '@/lib/utils';
import { ShieldCheck, MapPin, Award, CheckCircle2, ShoppingCart, Eye } from 'lucide-react';

export default function LivestockCard({ item }: { item: LivestockItem }) {
  const { language, addToCart, setSelectedLivestock, setIsPassportOpen } = useApp();
  const t = TRANSLATIONS[language];

  const handleInspectPassport = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLivestock(item);
    setIsPassportOpen(true);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-lg hover:shadow-2xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col group text-white">
      {/* Image & Badges */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          <span className="inline-flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-extrabold text-emerald-400 border border-emerald-500/50 shadow-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Health Score 98/100 (A+)</span>
          </span>
          {item.featured && (
            <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow">
              <Award className="w-3 h-3" />
              <span>Elite Breed</span>
            </span>
          )}
        </div>

        {/* Bottom Tag */}
        <div className="absolute bottom-2.5 right-2.5 bg-slate-950/90 backdrop-blur-md text-cyan-300 border border-slate-800 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold tracking-tight">
          RFID: {item.healthPassport.rfidTag}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Species & Location */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-bold uppercase tracking-wider text-[10px] text-cyan-400">
              {item.breed} • {item.gender} ({item.ageYears} yrs)
            </span>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <MapPin className="w-3 h-3 text-slate-500" />
              <span>{item.district}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-white leading-snug line-clamp-1 group-hover:text-cyan-400 transition-colors">
            {language === 'mr' ? item.marathiTitle : item.title}
          </h3>

          {/* Productivity / Yield Metric */}
          <div className="mt-2.5 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 text-xs">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Productivity Record:</span>
            <span className="font-semibold text-slate-200">
              {item.lactationOrWeight}
            </span>
          </div>

          {/* Verified Seller */}
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            <span className="truncate">{item.sellerName}</span>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block uppercase">Verified Price</span>
              <span className="text-lg font-black text-white">
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
              className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 border border-slate-700"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Passport</span>
            </button>
            <button
              onClick={() => addToCart(item, 'livestock')}
              className="px-2.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
