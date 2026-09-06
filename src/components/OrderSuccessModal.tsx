'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { formatINR } from '@/lib/utils';
import { CheckCircle, Printer, X, Truck, ShieldCheck } from 'lucide-react';

export default function OrderSuccessModal() {
  const { isOrderSuccessOpen, setIsOrderSuccessOpen, lastOrder } = useApp();

  if (!isOrderSuccessOpen || !lastOrder) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in zoom-in-95 duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl text-center relative">
        <button
          onClick={() => setIsOrderSuccessOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-sm shadow-emerald-500/20">
          <CheckCircle className="w-10 h-10" />
        </div>

        <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
          Order ID: {lastOrder.orderId}
        </span>

        <h3 className="text-xl font-black text-slate-900 dark:text-white mt-2">
          Order Dispatched Successfully!
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
          Delivering to <strong>{lastOrder.customerName}</strong> in <strong>{lastOrder.village}, {lastOrder.district}</strong>.
        </p>

        {/* Status card */}
        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2">
          <div className="flex items-center gap-2 text-brand-700 dark:text-brand-400 font-bold">
            <Truck className="w-4 h-4" />
            <span>ETA: {lastOrder.estimatedDelivery}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Veterinary Inspection Stamp & Bill of Supply Generated</span>
          </div>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-slate-800 dark:text-slate-200">
            <span>Payment ({lastOrder.paymentMethod}):</span>
            <span className="text-brand-700 dark:text-brand-400">{formatINR(lastOrder.total)}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-5 flex gap-2">
          <button
            onClick={() => window.print()}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>
          <button
            onClick={() => setIsOrderSuccessOpen(false)}
            className="flex-1 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/30"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
