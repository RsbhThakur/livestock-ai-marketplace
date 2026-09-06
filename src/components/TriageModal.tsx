'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { SYMPTOMS_MASTER, SPECIES_LIST } from '@/lib/config';
import { predictReport, TriageInput } from '@/lib/predictor';
import { Report, Species, SymptomKey, TriageResult } from '@/lib/types';
import { formatINR } from '@/lib/utils';
import {
  X,
  Sparkles,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Thermometer,
  Activity,
  ShoppingCart,
  Send,
  HelpCircle,
  FileCheck,
} from 'lucide-react';

export default function TriageModal() {
  const {
    isTriageOpen,
    setIsTriageOpen,
    regions,
    addReport,
    pharma,
    addToCart,
    lastTriageResult,
    setLastTriageResult,
  } = useApp();

  const [species, setSpecies] = useState<Species>('cattle');
  const [district, setDistrict] = useState(regions[0]?.district || 'Nashik');
  const [block, setBlock] = useState(regions[0]?.block || 'Nashik Block-2');
  const [village, setVillage] = useState(regions[0]?.village || 'Nashik Block-2 Village-1');
  const [affected, setAffected] = useState<number>(4);
  const [deaths, setDeaths] = useState<number>(1);
  const [duration, setDuration] = useState<number>(2);
  const [temperature, setTemperature] = useState<number>(39.8);
  const [notes, setNotes] = useState<string>('Observed acute respiratory signs in milking herd.');
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, boolean>>({
    fever: true,
    respiratory_distress: true,
  });

  const [triageResult, setTriageResult] = useState<TriageResult | null>(lastTriageResult);

  if (!isTriageOpen) return null;

  const handleToggleSymptom = (key: SymptomKey) => {
    setSelectedSymptoms((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePreFillSevere = () => {
    setSpecies('cattle');
    setDistrict('Nashik');
    setBlock('Nashik Block-2');
    setVillage('Nashik Block-2 Village-1');
    setAffected(10);
    setDeaths(4);
    setDuration(2);
    setTemperature(40.6);
    setNotes('Rapid mortality onset, multiple animal collapse in morning grazing.');
    setSelectedSymptoms({
      fever: true,
      respiratory_distress: true,
      sudden_death: true,
      weakness: true,
    });
  };

  const handleRunTriage = (e: React.FormEvent) => {
    e.preventDefault();

    const input: TriageInput = {
      species,
      district,
      block,
      village,
      number_affected: Number(affected),
      number_deaths: Number(deaths),
      duration_days: Number(duration),
      temperature: Number(temperature),
      notes,
      symptoms: selectedSymptoms as Partial<Record<SymptomKey, boolean>>,
      rapid_spread: true,
    };

    const result = predictReport(input);
    setTriageResult(result);
    setLastTriageResult(result);

    if (result.valid) {
      // Create new official surveillance record
      const newReport: Report = {
        report_id: Math.floor(1000 + Math.random() * 9000),
        date: new Date().toISOString().split('T')[0],
        district,
        block,
        village,
        species,
        number_affected: Number(affected),
        number_deaths: Number(deaths),
        duration_days: Number(duration),
        temperature: Number(temperature),
        notes,
        symptoms: selectedSymptoms,
        mortality_rate: Number((deaths / affected).toFixed(3)),
        risk_level: result.final_risk,
      };
      addReport(newReport);
    }
  };

  // Recommended products for this triage result
  const recommendedPharma = pharma.filter((p) =>
    triageResult?.recommended_products?.includes(p.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-brand-700 via-emerald-800 to-slate-900 text-white rounded-t-3xl relative">
          <button
            onClick={() => setIsTriageOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-200 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>SIH Problem #26128 AI Clinical Triage</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            AI Animal Health Triage & Early Warning
          </h2>
          <p className="text-xs text-slate-200 mt-1">
            Supervised Random Forest classification with deterministic rule-based safety net fallback
          </p>

          <button
            type="button"
            onClick={handlePreFillSevere}
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-black transition-colors"
          >
            <span>⚡ Pre-fill Critical Outbreak Case (4 Deaths / 10 Cattle)</span>
          </button>
        </div>

        {/* Modal Form Content */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleRunTriage} className="space-y-5">
            {/* Row 1: Species & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Species
                </label>
                <select
                  value={species}
                  onChange={(e) => setSpecies(e.target.value as Species)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white capitalize focus:outline-none focus:border-brand-500"
                >
                  {SPECIES_LIST.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  District
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
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
                  Block / Taluka
                </label>
                <select
                  value={block}
                  onChange={(e) => setBlock(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                >
                  {Array.from(new Set(regions.filter((r) => r.district === district).map((r) => r.block))).map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Village
                </label>
                <select
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 truncate"
                >
                  {regions
                    .filter((r) => r.district === district && r.block === block)
                    .map((v) => (
                      <option key={v.village} value={v.village}>
                        {v.village}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Row 2: Animal counts, duration, temp */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Animals Affected
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={affected}
                  onChange={(e) => setAffected(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Fatalities (Deaths)
                </label>
                <input
                  type="number"
                  min="0"
                  max={affected}
                  value={deaths}
                  onChange={(e) => setDeaths(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Duration (Days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Body Temp (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="36.0"
                  max="44.0"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Row 3: Observed Symptoms Checkboxes */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Observed Clinical Symptoms (Select all observed)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {SYMPTOMS_MASTER.map((sym) => {
                  const isChecked = Boolean(selectedSymptoms[sym.key]);
                  return (
                    <button
                      type="button"
                      key={sym.key}
                      onClick={() => handleToggleSymptom(sym.key)}
                      className={`text-left p-2 rounded-xl text-xs font-medium border transition-all flex items-start gap-1.5 ${
                        isChecked
                          ? sym.critical
                            ? 'bg-rose-50 dark:bg-rose-950/80 border-rose-400 dark:border-rose-700 text-rose-900 dark:text-rose-200'
                            : 'bg-brand-50 dark:bg-brand-950/80 border-brand-500 text-brand-900 dark:text-brand-200'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        readOnly
                        className="mt-0.5 rounded text-brand-600 focus:ring-0"
                      />
                      <div>
                        <span className="block font-bold">{sym.label}</span>
                        <span className="text-[10px] text-slate-400 block">{sym.marathiLabel}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Field Observations & Notes
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional notes from farmer or local field veterinary worker..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Submit Triage Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-600/30 flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Evaluate Report & Calculate Risk Triage</span>
            </button>
          </form>

          {/* Results Output Section */}
          {triageResult && triageResult.valid && (
            <div className="mt-6 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 space-y-4 animate-in slide-in-from-bottom-2">
              {/* Risk Level Badge & Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm font-black tracking-wider uppercase flex items-center gap-1.5 shadow-xs ${
                      triageResult.final_risk === 'HIGH'
                        ? 'bg-rose-600 text-white'
                        : triageResult.final_risk === 'MEDIUM'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>FINAL RISK: {triageResult.final_risk}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      ML Confidence: {(triageResult.ml_confidence * 100).toFixed(0)}%
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Probabilities: LOW: {(triageResult.ml_probabilities.LOW * 100).toFixed(0)}% | MED: {(triageResult.ml_probabilities.MEDIUM * 100).toFixed(0)}% | HIGH: {(triageResult.ml_probabilities.HIGH * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Safety Rule Trigger Indicator */}
                <div
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${
                    triageResult.rule_triggered
                      ? 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-800'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {triageResult.rule_triggered
                      ? 'Deterministic Safety Net Triggered'
                      : 'Standard ML Classification (No Override)'}
                  </span>
                </div>
              </div>

              {/* Recommended Action */}
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-black uppercase text-brand-700 dark:text-brand-400 tracking-wider block mb-1">
                  Veterinary Protocol & Next Steps:
                </span>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {triageResult.recommended_action}
                </p>
              </div>

              {/* Explainability Bullets */}
              <div>
                <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">
                  Explainable Decision Factors:
                </span>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  {triageResult.explanation.map((factor, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-brand-600 font-bold">•</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Care Kits directly tied to E-Commerce Store */}
              {recommendedPharma.length > 0 && (
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <ShoppingCart className="w-3.5 h-3.5 text-brand-600" />
                      <span>Recommended Veterinary Supplies for this Condition</span>
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600">
                      Dispatched within 2 hours
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {recommendedPharma.map((pack) => (
                      <div
                        key={pack.id}
                        className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={pack.imageUrl}
                            alt={pack.name}
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                          />
                          <div className="truncate">
                            <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {pack.name}
                            </h5>
                            <span className="text-xs font-black text-brand-700 dark:text-brand-400">
                              {formatINR(pack.price)}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => addToCart(pack, 'pharma')}
                          className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shrink-0 transition-colors"
                        >
                          + Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
