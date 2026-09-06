'use client';

import React from 'react';
import { PharmaProduct } from '@/lib/types';
import { useApp } from '@/lib/store';
import { formatINR } from '@/lib/utils';
import { Star, ShoppingCart, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ProductCard({ product }: { product: PharmaProduct }) {
  const { language, addToCart } = useApp();

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Product Image & Badges */}
        <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-900 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Category Chip */}
          <div className="absolute top-2.5 left-2.5">
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold shadow-xs ${
                product.isEmergencyBundle
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200'
              }`}
            >
              {product.category}
            </span>
          </div>

          {/* Custom Badge */}
          {product.badge && (
            <div className="absolute bottom-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md text-amber-300 px-2 py-0.5 rounded-md text-[10px] font-bold">
              {product.badge}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewCount})</span>
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
              <CheckCircle2 className="w-3 h-3" /> In Stock
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
            {language === 'mr' ? product.marathiName : product.name}
          </h3>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            {product.description}
          </p>

          {/* Dosage info */}
          <div className="mt-2.5 p-2 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
            <span className="font-bold text-slate-700 dark:text-slate-300">Dosage: </span>
            <span className="line-clamp-1">{product.dosage}</span>
          </div>

          {/* Symptom indications */}
          <div className="mt-2 flex flex-wrap gap-1">
            {product.symptomIndications.slice(0, 3).map((sym) => (
              <span
                key={sym}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 capitalize"
              >
                {sym.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & Add to Cart */}
      <div className="p-4 pt-0">
        <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Kisan Price</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900 dark:text-white">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 'pharma')}
            className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm shadow-brand-600/20 active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
