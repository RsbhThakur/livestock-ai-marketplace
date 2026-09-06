'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_LIVESTOCK, INITIAL_PHARMA, INITIAL_REGIONS, INITIAL_REPORTS } from './initialData';
import { calculateRegionalRisk } from './riskScoring';
import { CartItem, LivestockItem, Order, PharmaProduct, Region, RegionalRiskScore, Report, TriageResult } from './types';

export type AppLanguage = 'en' | 'mr' | 'hi';
export type UserRole = 'farmer' | 'officer';

interface AppContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;

  // Catalog
  livestock: LivestockItem[];
  pharma: PharmaProduct[];
  regions: Region[];
  reports: Report[];

  // Cart & Orders
  cart: CartItem[];
  addToCart: (item: PharmaProduct | LivestockItem, type: 'pharma' | 'livestock', quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  lastOrder: Order | null;
  placeOrder: (orderData: Omit<Order, 'orderId' | 'date' | 'status'>) => Order;

  // UI Modals & State
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isTriageOpen: boolean;
  setIsTriageOpen: (open: boolean) => void;
  isPassportOpen: boolean;
  setIsPassportOpen: (open: boolean) => void;
  selectedLivestock: LivestockItem | null;
  setSelectedLivestock: (item: LivestockItem | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderSuccessOpen: boolean;
  setIsOrderSuccessOpen: (open: boolean) => void;

  // AI & Surveillance
  lastTriageResult: TriageResult | null;
  setLastTriageResult: (result: TriageResult | null) => void;
  addReport: (report: Report) => void;
  simulateOutbreak: (village: string, count: number) => void;
  regionalRiskScores: RegionalRiskScore[];
  selectedGranularity: 'village' | 'block' | 'district';
  setSelectedGranularity: (g: 'village' | 'block' | 'district') => void;

  // Filtering & Search
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (d: string) => void;

  // Judge Demo Trigger
  triggerJudgeScenario: (scenarioId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<AppLanguage>('en');
  const [role, setRole] = useState<UserRole>('farmer');

  const [livestock, setLivestock] = useState<LivestockItem[]>(INITIAL_LIVESTOCK);
  const [pharma, setPharma] = useState<PharmaProduct[]>(INITIAL_PHARMA);
  const [regions, setRegions] = useState<Region[]>(INITIAL_REGIONS);
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTriageOpen, setIsTriageOpen] = useState(false);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [selectedLivestock, setSelectedLivestock] = useState<LivestockItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);

  const [lastTriageResult, setLastTriageResult] = useState<TriageResult | null>(null);
  const [selectedGranularity, setSelectedGranularity] = useState<'village' | 'block' | 'district'>('village');

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All Maharashtra');

  // Load from localStorage if present
  useEffect(() => {
    try {
      const savedReports = localStorage.getItem('pashu_reports');
      if (savedReports) setReports(JSON.parse(savedReports));

      const savedCart = localStorage.getItem('pashu_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch {
      // ignore
    }
  }, []);

  const saveReports = (newReports: Report[]) => {
    setReports(newReports);
    try {
      localStorage.setItem('pashu_reports', JSON.stringify(newReports));
    } catch {
      // ignore
    }
  };

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('pashu_cart', JSON.stringify(newCart));
    } catch {
      // ignore
    }
  };

  const addToCart = (item: PharmaProduct | LivestockItem, type: 'pharma' | 'livestock', quantity = 1) => {
    const existingIndex = cart.findIndex((c) => c.product.id === item.id);
    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = [...cart];
      updated[existingIndex].quantity += quantity;
    } else {
      updated = [...cart, { product: item, itemType: type, quantity }];
    }
    saveCart(updated);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    const updated = cart.filter((c) => c.product.id !== id);
    saveCart(updated);
  };

  const updateCartQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    const updated = cart.map((c) => (c.product.id === id ? { ...c, quantity: qty } : c));
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const placeOrder = (orderData: Omit<Order, 'orderId' | 'date' | 'status'>) => {
    const order: Order = {
      ...orderData,
      orderId: `ORD-MH-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString(),
      status: 'Confirmed',
    };
    setLastOrder(order);
    clearCart();
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);
    return order;
  };

  const addReport = (report: Report) => {
    const updated = [report, ...reports];
    saveReports(updated);
  };

  const simulateOutbreak = (village: string, count: number) => {
    const targetRegion = regions.find((r) => r.village === village) || regions[0];
    const newReports: Report[] = [];
    const today = new Date().toISOString().split('T')[0];

    const currentMaxId = reports.reduce((max, r) => Math.max(max, r.report_id || 0), 200);

    for (let i = 0; i < count; i++) {
      const progress = i / Math.max(1, count - 1);
      const affected = Math.floor(3 + progress * 10);
      const mortalityTarget = 0.15 + progress * 0.35;
      const deaths = Math.min(affected, Math.round(affected * mortalityTarget));

      newReports.push({
        report_id: currentMaxId + 1 + i,
        date: today,
        district: targetRegion.district,
        block: targetRegion.block,
        village: targetRegion.village,
        species: i % 2 === 0 ? 'cattle' : 'buffalo',
        number_affected: affected,
        number_deaths: deaths,
        duration_days: Math.floor(1 + Math.random() * 3),
        temperature: Number((39.8 + Math.random() * 1.5).toFixed(1)),
        notes: `Simulated outbreak cluster observation #${i + 1}`,
        symptoms: {
          fever: true,
          respiratory_distress: Math.random() < 0.7,
          skin_lesions: Math.random() < 0.6,
          sudden_death: deaths > 2,
          weakness: true,
        },
        mortality_rate: Number((deaths / affected).toFixed(3)),
        risk_level: 'HIGH',
      });
    }

    const updated = [...newReports, ...reports];
    saveReports(updated);
  };

  const regionalRiskScores = calculateRegionalRisk(reports, regions, selectedGranularity);

  const triggerJudgeScenario = (scenarioId: string) => {
    if (scenarioId === 'demo-triage-override') {
      setIsTriageOpen(true);
    } else if (scenarioId === 'demo-outbreak-nashik') {
      simulateOutbreak('Nashik Block-2 Village-1', 8);
      setRole('officer');
    } else if (scenarioId === 'demo-health-passport') {
      setSelectedLivestock(livestock[0]);
      setIsPassportOpen(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        role,
        setRole,
        livestock,
        pharma,
        regions,
        reports,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartTotal,
        lastOrder,
        placeOrder,
        isCartOpen,
        setIsCartOpen,
        isTriageOpen,
        setIsTriageOpen,
        isPassportOpen,
        setIsPassportOpen,
        selectedLivestock,
        setSelectedLivestock,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        lastTriageResult,
        setLastTriageResult,
        addReport,
        simulateOutbreak,
        regionalRiskScores,
        selectedGranularity,
        setSelectedGranularity,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedDistrict,
        setSelectedDistrict,
        triggerJudgeScenario,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
