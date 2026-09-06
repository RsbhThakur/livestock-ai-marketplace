export type Species = 'cattle' | 'buffalo' | 'goat' | 'sheep' | 'poultry';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type RegionalRiskCategory = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type SymptomKey =
  | 'fever'
  | 'coughing'
  | 'nasal_discharge'
  | 'weakness'
  | 'diarrhea'
  | 'loss_of_appetite'
  | 'reduced_milk_production'
  | 'skin_lesions'
  | 'swelling'
  | 'respiratory_distress'
  | 'neurological_symptoms'
  | 'sudden_death';

export interface SymptomConfig {
  key: SymptomKey;
  label: string;
  marathiLabel: string;
  hindiLabel: string;
  weight: number;
  critical?: boolean;
}

export interface Region {
  district: string;
  block: string;
  village: string;
  latitude: number;
  longitude: number;
}

export interface Report {
  report_id: number;
  date: string; // YYYY-MM-DD
  district: string;
  block: string;
  village: string;
  species: Species;
  number_affected: number;
  number_deaths: number;
  duration_days: number;
  temperature?: number;
  notes?: string;
  symptoms: Partial<Record<SymptomKey, boolean>>;
  mortality_rate: number;
  risk_level: RiskLevel;
}

export interface RuleResult {
  triggered: boolean;
  rule_name?: string;
  explanation?: string;
}

export interface TriageResult {
  valid: boolean;
  errors?: string[];
  ml_prediction: RiskLevel;
  ml_confidence: number;
  ml_probabilities: Record<RiskLevel, number>;
  rule_triggered: boolean;
  rule_name?: string;
  rule_explanation?: string;
  final_risk: RiskLevel;
  recommended_action: string;
  explanation: string[];
  recommended_products?: string[]; // IDs of products to spotlight in cart
  timestamp: string;
}

export interface RegionalRiskScore {
  region_name: string;
  granularity: 'village' | 'block' | 'district';
  district?: string;
  block?: string;
  village?: string;
  latitude?: number;
  longitude?: number;
  risk_score: number; // 0 - 100
  risk_category: RegionalRiskCategory;
  report_count_7d: number;
  report_count_30d: number;
  affected_animals: number;
  deaths: number;
  mortality_rate: number;
  high_concern_count: number;
  high_concern_ratio: number;
  report_growth_rate: number;
  historical_incidence: number;
  sub_score_volume: number;
  sub_score_growth: number;
  sub_score_mortality: number;
  sub_score_high_concern: number;
  sub_score_historical: number;
  explanations: string[];
}

export interface HealthPassport {
  rfidTag: string; // e.g. "IN-MH-2026-9042"
  issueDate: string;
  vetOfficerName: string;
  vetRegistrationNo: string;
  quarantineClearance: boolean;
  biosecurityRating: 'A+' | 'A' | 'B';
  vaccinations: {
    disease: string;
    dateAdministered: string;
    batchNo: string;
    validUntil: string;
    status: 'Active' | 'Due Soon' | 'Expired';
  }[];
  healthCheckLogs: {
    date: string;
    temperature: string;
    vitalSigns: string;
    status: 'Healthy' | 'Observation';
  }[];
}

export interface LivestockItem {
  id: string;
  title: string;
  marathiTitle: string;
  species: Species;
  breed: string;
  ageYears: number;
  gender: 'Female' | 'Male';
  lactationOrWeight: string; // e.g. "18L/day (2nd Lactation)" or "45 kg live weight"
  price: number;
  originalPrice?: number;
  imageUrl: string;
  district: string;
  village: string;
  sellerName: string;
  sellerVerified: boolean;
  healthPassport: HealthPassport;
  featured?: boolean;
  status: 'Available' | 'Reserved' | 'In Quarantine';
}

export interface PharmaProduct {
  id: string;
  name: string;
  marathiName: string;
  category: 'Vaccine' | 'Antibiotic' | 'Electrolyte & Tonics' | 'Disinfectant & Spray' | 'Emergency Kit' | 'Diagnostics';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  dosage: string;
  targetSpecies: Species[];
  symptomIndications: SymptomKey[];
  description: string;
  inStock: boolean;
  badge?: string;
  isEmergencyBundle?: boolean;
}

export interface CartItem {
  product: PharmaProduct | LivestockItem;
  itemType: 'pharma' | 'livestock';
  quantity: number;
}

export interface Order {
  orderId: string;
  date: string;
  customerName: string;
  phone: string;
  district: string;
  village: string;
  pincode: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'UPI' | 'KCC' | 'COD';
  status: 'Confirmed' | 'Dispatched' | 'Delivered';
  estimatedDelivery: string;
  vetPrescriptionAttached: boolean;
}

export interface JudgeDemoScenario {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  description: string;
  actionType: 'triage' | 'outbreak' | 'passport';
}
