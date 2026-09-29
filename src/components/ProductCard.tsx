'use client';

import React from 'react';
import { PharmaProduct } from '@/lib/types';
import { useApp } from '@/lib/store';
import { formatINR } from '@/lib/utils';
import { Star, ShoppingCart, CheckCircle2, Pill } from 'lucide-react';

export default function ProductCard({ product }: { product: PharmaProduct }) {
  const { language, addToCart } = useApp();

  return (
    <div className="bg-[#131f33] rounded-2xl border border-[#1e3252] overflow-hidden shadow-sm hover:border-[#38bdf8]/50 transition-all duration-300 flex flex-col justify-between group text-white">
      <div>
        {/* Product Image & Badges */}
        <div className="relative aspect-[4/3] bg-[#0b1320] overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Category Chip */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-3 py-1.5 rounded-md text-[10px] font-bold shadow-sm ${
                product.isEmergencyBundle
                  ? 'bg-rose-700 text-white'
                  : 'bg-[#0b1320]/90 backdrop-blur-md text-[#38bdf8] border border-[#1e3252]'
              }`}
            >
              {product.category}
            </span>
          </div>

          {/* PMBJP-Vet Custom Badge */}
          {product.badge && (
            <div className="absolute bottom-3 left-3 bg-[#0b1320]/90 backdrop-blur-md text-amber-300 px-2.5 py-1 rounded-md text-[10px] font-bold border border-[#1e3252]">
              {product.badge}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-slate-500 font-normal">({product.reviewCount})</span>
            </div>
            <span className="text-[10px] text-[#38bdf8] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> State Depot Stocked
            </span>
          </div>

          <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-[#38bdf8] transition-colors">
            {language === 'mr' ? product.marathiName : product.name}
          </h3>

          <p className="mt-1.5 text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Dosage info */}
          <div className="mt-3 p-2.5 bg-[#0b1320] rounded-xl border border-[#1e3252] text-xs text-slate-300">
            <span className="font-semibold text-slate-200">Prescription Regimen: </span>
            <span className="line-clamp-1">{product.dosage}</span>
          </div>

          {/* Symptom indications */}
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {product.symptomIndications.slice(0, 3).map((sym) => (
              <span
                key={sym}
                className="text-[10px] font-medium px-2.5 py-0.5 rounded-md bg-[#0b1320] text-[#38bdf8] capitalize border border-[#1e3252]"
              >
                {sym.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & Requisition */}
      <div className="p-5 sm:p-6 pt-0">
        <div className="pt-3.5 border-t border-[#1e3252] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 block uppercase">Govt. Subsidized Price</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-white">
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
            className="px-4 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Requisition</span>
          </button>
        </div>
      </div>
    </div>
  );
}
