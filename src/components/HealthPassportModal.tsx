'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { formatINR } from '@/lib/utils';
import {
  X,
  ShieldCheck,
  QrCode,
  Calendar,
  CheckCircle2,
  FileText,
  Thermometer,
  Award,
  ShoppingCart,
  Printer,
} from 'lucide-react';

export default function HealthPassportModal() {
  const { isPassportOpen, setIsPassportOpen, selectedLivestock, addToCart } = useApp();

  if (!isPassportOpen || !selectedLivestock) return null;

  const { healthPassport } = selectedLivestock;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
        {/* Official Header */}
        <div className="p-6 bg-gradient-to-r from-brand-700 via-emerald-800 to-brand-900 text-white rounded-t-3xl relative">
          <button
            onClick={() => setIsPassportOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              Govt. Certified
            </span>
            <span className="text-xs font-semibold text-emerald-200">
              Biosecurity Rating: {healthPassport.biosecurityRating}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Digital RFID Animal Health Passport
              </h2>
              <p className="text-xs text-emerald-100 mt-0.5 font-mono">
                Official Certificate Tag: {healthPassport.rfidTag}
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-center bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-white/20">
              <QrCode className="w-8 h-8 text-white" />
              <span className="text-[9px] font-mono mt-1">VERIFIED</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Animal Profile Overview */}
          <div className="flex flex-col sm:flex-row gap-4 items-center bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <img
              src={selectedLivestock.imageUrl}
              alt={selectedLivestock.title}
              className="w-24 h-24 rounded-xl object-cover shrink-0 border-2 border-brand-500 shadow-sm"
            />
            <div className="flex-1 text-center sm:text-left">
              <span className="text-xs font-bold text-brand-700 dark:text-brand-400 uppercase tracking-wide">
                {selectedLivestock.species} • {selectedLivestock.breed}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {selectedLivestock.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Age: {selectedLivestock.ageYears} yrs • Gender: {selectedLivestock.gender} • Location: {selectedLivestock.district}, {selectedLivestock.village}
              </p>
              <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Quarantine Cleared
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {formatINR(selectedLivestock.price)}
                </span>
              </div>
            </div>
          </div>

          {/* Attending Veterinary Officer Stamp */}
          <div className="border border-brand-200 dark:border-brand-900 bg-brand-50/50 dark:bg-brand-950/30 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-700 dark:text-brand-400 block">
                Inspecting Veterinary Authority
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {healthPassport.vetOfficerName}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Reg No: {healthPassport.vetRegistrationNo} • Cleared: {healthPassport.issueDate}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-3 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-700 shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Digital Signature Authenticated</span>
            </div>
          </div>

          {/* Vaccination Ledger */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Official Vaccination Ledger</span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                  <tr>
                    <th className="p-2.5">Disease Target</th>
                    <th className="p-2.5">Administered</th>
                    <th className="p-2.5">Batch No.</th>
                    <th className="p-2.5">Valid Until</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {healthPassport.vaccinations.map((vac, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-2.5 font-semibold text-slate-900 dark:text-slate-100">{vac.disease}</td>
                      <td className="p-2.5 text-slate-500 dark:text-slate-400">{vac.dateAdministered}</td>
                      <td className="p-2.5 font-mono text-slate-500 dark:text-slate-400">{vac.batchNo}</td>
                      <td className="p-2.5 text-slate-500 dark:text-slate-400">{vac.validUntil}</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                          {vac.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Health Check Logs */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5" />
              <span>Clinical Vital Signs & Observation Logs</span>
            </h4>
            <div className="space-y-2">
              {healthPassport.healthCheckLogs.map((log, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-400">{log.date}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Temp: {log.temperature}</span>
                    <span className="text-slate-600 dark:text-slate-400 hidden sm:inline">{log.vitalSigns}</span>
                  </div>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-700 rounded-b-3xl flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Certificate</span>
          </button>

          <button
            onClick={() => {
              addToCart(selectedLivestock, 'livestock');
              setIsPassportOpen(false);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-600/30 transition-all active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add Inspected Animal to Cart ({formatINR(selectedLivestock.price)})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
