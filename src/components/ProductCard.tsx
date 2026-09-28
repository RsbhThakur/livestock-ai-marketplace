'use client';

import React from 'react';
import { PharmaProduct } from '@/lib/types';
import { useApp } from '@/lib/store';
import { formatINR } from '@/lib/utils';
import { Star, ShoppingCart, CheckCircle2, Pill } from 'lucide-react';

export default function ProductCard({ product }: { product: PharmaProduct }) {
  const { language, addToCart } = useApp();

  return (
    <div className="bg-[#091b30] rounded-2xl border border-[#1b3a61] overflow-hidden shadow-lg hover:shadow-2xl hover:border-blue-500/60 transition-all duration-300 flex flex-col justify-between group text-white">
      <div>
        {/* Product Image & Badges */}
        <div className="relative aspect-[4/3] bg-[#05101d] overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Category Chip */}
          <div className="absolute top-2.5 left-2.5">
            <span
              className={`px-2.5 py-1 rounded-md text-[10px] font-bold shadow-md ${
                product.isEmergencyBundle
                  ? 'bg-rose-700 text-white'
                  : 'bg-[#071526]/95 backdrop-blur-md text-blue-200 border border-[#224b7e]'
              }`}
            >
              {product.category}
            </span>
          </div>

          {/* PMBJP-Vet Custom Badge */}
          {product.badge && (
            <div className="absolute bottom-2.5 left-2.5 bg-[#071526]/95 backdrop-blur-md text-amber-300 px-2 py-0.5 rounded-md text-[10px] font-bold border border-[#224b7e]">
              {product.badge}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-slate-500 font-normal">({product.reviewCount})</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
              <CheckCircle2 className="w-3 h-3" /> State Depot Stocked
            </span>
          </div>

          <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-blue-300 transition-colors font-serif">
            {language === 'mr' ? product.marathiName : product.name}
          </h3>

          <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Dosage info */}
          <div className="mt-2.5 p-2 bg-[#061220] rounded-xl border border-[#142d4d] text-[11px] text-slate-300">
            <span className="font-bold text-slate-200">Prescription Regimen: </span>
            <span className="line-clamp-1">{product.dosage}</span>
          </div>

          {/* Symptom indications */}
          <div className="mt-2 flex flex-wrap gap-1">
            {product.symptomIndications.slice(0, 3).map((sym) => (
              <span
                key={sym}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#0f2747] text-blue-200 capitalize border border-[#1e426d]"
              >
                {sym.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & Requisition */}
      <div className="p-4 pt-0">
        <div className="pt-3 border-t border-[#1b3a61] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 block uppercase">Govt. Subsidized Price</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-white font-serif">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 'pharma')}
            className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Requisition</span>
          </button>
        </div>
      </div>
    </div>
  );
}
