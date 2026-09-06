import { Species, SymptomConfig, SymptomKey } from './types';

export const SPECIES_LIST: Species[] = ['cattle', 'buffalo', 'goat', 'sheep', 'poultry'];

export const SYMPTOMS_MASTER: SymptomConfig[] = [
  { key: 'fever', label: 'High Fever', marathiLabel: 'तीव्र ताप', hindiLabel: 'तेज बुखार', weight: 1 },
  { key: 'coughing', label: 'Persistent Coughing', marathiLabel: 'खोकला', hindiLabel: 'खांसी', weight: 1 },
  { key: 'nasal_discharge', label: 'Nasal Discharge', marathiLabel: 'नाकातून स्त्राव', hindiLabel: 'नाक बहना', weight: 1 },
  { key: 'weakness', label: 'Lethargy & Weakness', marathiLabel: 'अशक्तपणा', hindiLabel: 'कमजोरी', weight: 1 },
  { key: 'diarrhea', label: 'Severe Diarrhea', marathiLabel: 'अतिसार / जुलाब', hindiLabel: 'दस्त', weight: 2 },
  { key: 'loss_of_appetite', label: 'Loss of Appetite', marathiLabel: 'भूक मंदावणे', hindiLabel: 'भूख न लगना', weight: 2 },
  { key: 'reduced_milk_production', label: 'Sudden Milk Drop', marathiLabel: 'दूध उत्पादनात अचानक घट', hindiLabel: 'दूध में भारी गिरावट', weight: 2 },
  { key: 'skin_lesions', label: 'Nodules & Skin Lesions', marathiLabel: 'त्वचेवर गाठी (Lumpy/व्रण)', hindiLabel: 'त्वचा पर गांठें / घाव', weight: 3 },
  { key: 'swelling', label: 'Joint / Jaw Swelling', marathiLabel: 'सांधे किंवा जबड्याला सूज', hindiLabel: 'जोड़ों / जबड़े में सूजन', weight: 3 },
  { key: 'respiratory_distress', label: 'Respiratory Distress', marathiLabel: 'श्वास घेण्यास तीव्र त्रास', hindiLabel: 'सांस लेने में गंभीर कठिनाई', weight: 4, critical: true },
  { key: 'neurological_symptoms', label: 'Neurological Tremors / Circling', marathiLabel: 'मज्जासंस्था विकार (थरथरणे)', hindiLabel: 'कंपकंपी / चक्कर आना', weight: 5, critical: true },
  { key: 'sudden_death', label: 'Peracute Sudden Death', marathiLabel: 'अचानक मृत्यू (विना लक्षण)', hindiLabel: 'अचानक मौत', weight: 5, critical: true },
];

export const SYMPTOM_SEVERITY_MAP: Record<SymptomKey, number> = SYMPTOMS_MASTER.reduce(
  (acc, s) => ({ ...acc, [s.key]: s.weight }),
  {} as Record<SymptomKey, number>
);

// Safety Fallback Rule Thresholds (from SIH baseline rules.py)
export const RULE_MIN_DEATHS_WITH_AFFECTED = 3;
export const RULE_MIN_AFFECTED_FOR_DEATH_RULE = 5;
export const RULE_MORTALITY_RATE_THRESHOLD = 0.30;
export const RULE_RESPIRATORY_MIN_AFFECTED = 3;
export const RAPID_SPREAD_WINDOW_DAYS = 3;
export const RAPID_SPREAD_MIN_REPORTS = 3;

// Regional Risk Score Weights (Sum must equal 1.0)
export const RISK_WEIGHTS = {
  report_volume: 0.25,
  recent_growth: 0.20,
  mortality: 0.20,
  high_concern_ratio: 0.20,
  historical_incidence: 0.15,
};

export const ROLLING_WINDOW_SHORT_DAYS = 7;
export const ROLLING_WINDOW_LONG_DAYS = 30;

export const NORMALIZATION_CAPS = {
  report_volume_cap: 20,
  recent_growth_cap: 3.0,
  mortality_rate_cap: 0.5,
  historical_incidence_cap: 10,
};

export function riskScoreToCategory(score: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
  const bounded = Math.max(0, Math.min(100, score));
  if (bounded < 30) return 'LOW';
  if (bounded < 60) return 'MEDIUM';
  if (bounded < 80) return 'HIGH';
  return 'CRITICAL';
}

export const CATEGORY_COLORS = {
  LOW: { bg: 'bg-emerald-100 dark:bg-emerald-950/60', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-300 dark:border-emerald-800', badge: 'bg-emerald-500', hex: '#10b981' },
  MEDIUM: { bg: 'bg-amber-100 dark:bg-amber-950/60', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-300 dark:border-amber-800', badge: 'bg-amber-500', hex: '#f59e0b' },
  HIGH: { bg: 'bg-orange-100 dark:bg-orange-950/60', text: 'text-orange-700 dark:text-orange-400', border: 'border-orange-300 dark:border-orange-800', badge: 'bg-orange-500', hex: '#f97316' },
  CRITICAL: { bg: 'bg-rose-100 dark:bg-rose-950/60', text: 'text-rose-700 dark:text-rose-400', border: 'border-rose-300 dark:border-rose-800', badge: 'bg-rose-600', hex: '#e11d48' },
};
