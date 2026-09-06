'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { formatINR } from '@/lib/utils';
import { X, ShieldCheck, CreditCard, Banknote, Smartphone, CheckCircle2 } from 'lucide-react';

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartTotal, placeOrder, regions } = useApp();

  const [name, setName] = useState('Anandrao More');
  const [phone, setPhone] = useState('9822019482');
  const [district, setDistrict] = useState(regions[0]?.district || 'Nashik');
  const [village, setVillage] = useState(regions[0]?.village || 'Nashik Block-2 Village-1');
  const [pincode, setPincode] = useState('422003');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'KCC' | 'COD'>('UPI');

  if (!isCheckoutOpen) return null;

  const discount = Math.round(cartTotal * 0.2);
  const shipping = cartTotal > 1000 ? 0 : 99;
  const total = cartTotal - discount + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder({
      customerName: name,
      phone,
      district,
      village,
      pincode,
      items: cart,
      subtotal: cartTotal,
      discount,
      shipping,
      total,
      paymentMethod,
      estimatedDelivery: 'Tomorrow, by 2:00 PM (Veterinary Drone/Rural Dispatch)',
      vetPrescriptionAttached: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-brand-700 to-emerald-800 text-white rounded-t-3xl relative flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black">Rural Farmer Checkout</h3>
            <p className="text-xs text-emerald-100">Direct delivery to village farmgate</p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Farmer / Buyer Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Pincode
              </label>
              <input
                type="text"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                District
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
              >
                {Array.from(new Set(regions.map((r) => r.district))).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Village / Wasti
              </label>
              <input
                type="text"
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-2.5 rounded-xl border text-left flex flex-col items-center justify-center gap-1 transition-all ${
                  paymentMethod === 'UPI'
                    ? 'border-brand-600 bg-brand-50 dark:bg-brand-950/80 text-brand-900 dark:text-brand-200'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <Smartphone className="w-5 h-5 text-purple-600" />
                <span className="text-[11px] font-bold">UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('KCC')}
                className={`p-2.5 rounded-xl border text-left flex flex-col items-center justify-center gap-1 transition-all ${
                  paymentMethod === 'KCC'
                    ? 'border-brand-600 bg-brand-50 dark:bg-brand-950/80 text-brand-900 dark:text-brand-200'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <CreditCard className="w-5 h-5 text-amber-600" />
                <span className="text-[11px] font-bold">Kisan Credit</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('COD')}
                className={`p-2.5 rounded-xl border text-left flex flex-col items-center justify-center gap-1 transition-all ${
                  paymentMethod === 'COD'
                    ? 'border-brand-600 bg-brand-50 dark:bg-brand-950/80 text-brand-900 dark:text-brand-200'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <Banknote className="w-5 h-5 text-emerald-600" />
                <span className="text-[11px] font-bold">Cash on Deliv.</span>
              </button>
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <div className="flex justify-between text-slate-500">
              <span>Items Total ({cart.length})</span>
              <span>{formatINR(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>Kisan Subsidy Discount (20%)</span>
              <span>-{formatINR(discount)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Rural Delivery</span>
              <span>{shipping === 0 ? 'FREE' : formatINR(shipping)}</span>
            </div>
            <div className="flex justify-between font-black text-slate-900 dark:text-white pt-1 border-t border-slate-200 dark:border-slate-700 text-sm">
              <span>Net Amount</span>
              <span className="text-brand-700 dark:text-brand-400">{formatINR(total)}</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-md shadow-brand-600/30 transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirm Order & Dispatch to {village}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
