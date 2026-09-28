export interface DailySurveillancePoint {
  date: string;
  displayDate: string;
  totalReports: number;
  suspectedCases: number;
  confirmedHighRisk: number;
  deaths: number;
  mortalityRate: number;
  topSymptom: string;
  activeDistricts: number;
  temperatureC: number;
  humidityPercent: number;
  rainfallMm: number;
}

export interface PredictiveForecastPoint {
  date: string;
  displayDate: string;
  projectedCases: number;
  upperConfidenceBound: number;
  lowerConfidenceBound: number;
  projectedMortality: number;
  isForecast: boolean;
}

export interface DistrictReproductionRate {
  district: string;
  rt: number;
  status: 'SURGE' | 'ELEVATED' | 'CONTROLLED';
  activeClusters: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  vaccineCoveragePct: number;
  quarantineCompliancePct: number;
}

export const DAILY_SURVEILLANCE_HISTORY: DailySurveillancePoint[] = [
  {
    date: '2026-04-24',
    displayDate: '24 Apr',
    totalReports: 14,
    suspectedCases: 28,
    confirmedHighRisk: 4,
    deaths: 1,
    mortalityRate: 0.035,
    topSymptom: 'Fever',
    activeDistricts: 3,
    temperatureC: 34.2,
    humidityPercent: 52,
    rainfallMm: 0,
  },
  {
    date: '2026-04-25',
    displayDate: '25 Apr',
    totalReports: 18,
    suspectedCases: 36,
    confirmedHighRisk: 6,
    deaths: 2,
    mortalityRate: 0.055,
    topSymptom: 'Fever',
    activeDistricts: 4,
    temperatureC: 35.0,
    humidityPercent: 50,
    rainfallMm: 0,
  },
  {
    date: '2026-04-26',
    displayDate: '26 Apr',
    totalReports: 22,
    suspectedCases: 48,
    confirmedHighRisk: 9,
    deaths: 3,
    mortalityRate: 0.062,
    topSymptom: 'Skin Lesions',
    activeDistricts: 4,
    temperatureC: 36.1,
    humidityPercent: 48,
    rainfallMm: 0,
  },
  {
    date: '2026-04-27',
    displayDate: '27 Apr',
    totalReports: 31,
    suspectedCases: 64,
    confirmedHighRisk: 14,
    deaths: 5,
    mortalityRate: 0.078,
    topSymptom: 'Skin Lesions',
    activeDistricts: 5,
    temperatureC: 35.8,
    humidityPercent: 55,
    rainfallMm: 2.4,
  },
  {
    date: '2026-04-28',
    displayDate: '28 Apr',
    totalReports: 39,
    suspectedCases: 82,
    confirmedHighRisk: 21,
    deaths: 7,
    mortalityRate: 0.085,
    topSymptom: 'Swelling',
    activeDistricts: 6,
    temperatureC: 33.4,
    humidityPercent: 68,
    rainfallMm: 12.0,
  },
  {
    date: '2026-04-29',
    displayDate: '29 Apr',
    totalReports: 45,
    suspectedCases: 98,
    confirmedHighRisk: 29,
    deaths: 9,
    mortalityRate: 0.091,
    topSymptom: 'Oral Vesicles',
    activeDistricts: 6,
    temperatureC: 32.8,
    humidityPercent: 74,
    rainfallMm: 18.5,
  },
  {
    date: '2026-04-30',
    displayDate: '30 Apr',
    totalReports: 58,
    suspectedCases: 124,
    confirmedHighRisk: 38,
    deaths: 12,
    mortalityRate: 0.096,
    topSymptom: 'Respiratory Distress',
    activeDistricts: 7,
    temperatureC: 31.9,
    humidityPercent: 79,
    rainfallMm: 24.0,
  },
  {
    date: '2026-05-01',
    displayDate: '01 May',
    totalReports: 62,
    suspectedCases: 138,
    confirmedHighRisk: 42,
    deaths: 14,
    mortalityRate: 0.101,
    topSymptom: 'Oral Vesicles',
    activeDistricts: 7,
    temperatureC: 32.5,
    humidityPercent: 72,
    rainfallMm: 8.0,
  },
  {
    date: '2026-05-02',
    displayDate: '02 May',
    totalReports: 74,
    suspectedCases: 165,
    confirmedHighRisk: 51,
    deaths: 17,
    mortalityRate: 0.103,
    topSymptom: 'Skin Lesions',
    activeDistricts: 8,
    temperatureC: 33.0,
    humidityPercent: 66,
    rainfallMm: 4.2,
  },
  {
    date: '2026-05-03',
    displayDate: '03 May',
    totalReports: 68,
    suspectedCases: 152,
    confirmedHighRisk: 46,
    deaths: 13,
    mortalityRate: 0.085,
    topSymptom: 'Skin Lesions',
    activeDistricts: 8,
    temperatureC: 34.2,
    humidityPercent: 60,
    rainfallMm: 0,
  },
  {
    date: '2026-05-04',
    displayDate: '04 May',
    totalReports: 71,
    suspectedCases: 159,
    confirmedHighRisk: 49,
    deaths: 15,
    mortalityRate: 0.094,
    topSymptom: 'Respiratory Distress',
    activeDistricts: 8,
    temperatureC: 35.1,
    humidityPercent: 57,
    rainfallMm: 0,
  },
  {
    date: '2026-05-05',
    displayDate: '05 May',
    totalReports: 82,
    suspectedCases: 184,
    confirmedHighRisk: 58,
    deaths: 19,
    mortalityRate: 0.103,
    topSymptom: 'Sudden Death',
    activeDistricts: 9,
    temperatureC: 35.8,
    humidityPercent: 54,
    rainfallMm: 0,
  },
  {
    date: '2026-05-06',
    displayDate: '06 May (Today)',
    totalReports: 94,
    suspectedCases: 212,
    confirmedHighRisk: 67,
    deaths: 23,
    mortalityRate: 0.108,
    topSymptom: 'Skin Lesions',
    activeDistricts: 9,
    temperatureC: 36.4,
    humidityPercent: 51,
    rainfallMm: 0,
  },
];

export const PREDICTIVE_FORECAST: PredictiveForecastPoint[] = [
  // 3 anchor history points
  {
    date: '2026-05-04',
    displayDate: '04 May',
    projectedCases: 159,
    upperConfidenceBound: 159,
    lowerConfidenceBound: 159,
    projectedMortality: 15,
    isForecast: false,
  },
  {
    date: '2026-05-05',
    displayDate: '05 May',
    projectedCases: 184,
    upperConfidenceBound: 184,
    lowerConfidenceBound: 184,
    projectedMortality: 19,
    isForecast: false,
  },
  {
    date: '2026-05-06',
    displayDate: '06 May (Now)',
    projectedCases: 212,
    upperConfidenceBound: 212,
    lowerConfidenceBound: 212,
    projectedMortality: 23,
    isForecast: false,
  },
  // 7 Projected Points (May 7 to May 13)
  {
    date: '2026-05-07',
    displayDate: '07 May (D+1)',
    projectedCases: 238,
    upperConfidenceBound: 260,
    lowerConfidenceBound: 218,
    projectedMortality: 26,
    isForecast: true,
  },
  {
    date: '2026-05-08',
    displayDate: '08 May (D+2)',
    projectedCases: 265,
    upperConfidenceBound: 295,
    lowerConfidenceBound: 235,
    projectedMortality: 29,
    isForecast: true,
  },
  {
    date: '2026-05-09',
    displayDate: '09 May (D+3)',
    projectedCases: 289,
    upperConfidenceBound: 330,
    lowerConfidenceBound: 248,
    projectedMortality: 32,
    isForecast: true,
  },
  {
    date: '2026-05-10',
    displayDate: '10 May (D+4)',
    projectedCases: 275, // Projected to peak if ring vaccination is maintained
    upperConfidenceBound: 325,
    lowerConfidenceBound: 230,
    projectedMortality: 28,
    isForecast: true,
  },
  {
    date: '2026-05-11',
    displayDate: '11 May (D+5)',
    projectedCases: 245,
    upperConfidenceBound: 305,
    lowerConfidenceBound: 195,
    projectedMortality: 24,
    isForecast: true,
  },
  {
    date: '2026-05-12',
    displayDate: '12 May (D+6)',
    projectedCases: 210,
    upperConfidenceBound: 275,
    lowerConfidenceBound: 160,
    projectedMortality: 18,
    isForecast: true,
  },
  {
    date: '2026-05-13',
    displayDate: '13 May (D+7)',
    projectedCases: 172,
    upperConfidenceBound: 240,
    lowerConfidenceBound: 125,
    projectedMortality: 12,
    isForecast: true,
  },
];

export const DISTRICT_REPRODUCTION_RATES: DistrictReproductionRate[] = [
  {
    district: 'Nashik',
    rt: 1.84,
    status: 'SURGE',
    activeClusters: 4,
    trend: 'increasing',
    vaccineCoveragePct: 62.4,
    quarantineCompliancePct: 78.1,
  },
  {
    district: 'Chhatrapati Sambhajinagar',
    rt: 1.45,
    status: 'SURGE',
    activeClusters: 3,
    trend: 'increasing',
    vaccineCoveragePct: 68.2,
    quarantineCompliancePct: 81.0,
  },
  {
    district: 'Pune',
    rt: 1.28,
    status: 'ELEVATED',
    activeClusters: 2,
    trend: 'stable',
    vaccineCoveragePct: 84.5,
    quarantineCompliancePct: 89.2,
  },
  {
    district: 'Ahmednagar',
    rt: 1.15,
    status: 'ELEVATED',
    activeClusters: 2,
    trend: 'stable',
    vaccineCoveragePct: 79.0,
    quarantineCompliancePct: 85.4,
  },
  {
    district: 'Amravati',
    rt: 0.88,
    status: 'CONTROLLED',
    activeClusters: 1,
    trend: 'decreasing',
    vaccineCoveragePct: 91.2,
    quarantineCompliancePct: 94.6,
  },
  {
    district: 'Kolhapur',
    rt: 0.72,
    status: 'CONTROLLED',
    activeClusters: 1,
    trend: 'decreasing',
    vaccineCoveragePct: 93.8,
    quarantineCompliancePct: 96.1,
  },
  {
    district: 'Nagpur',
    rt: 0.65,
    status: 'CONTROLLED',
    activeClusters: 1,
    trend: 'decreasing',
    vaccineCoveragePct: 94.7,
    quarantineCompliancePct: 97.0,
  },
];
