# PashuSetu AI (पशुसेतू AI)
### Unified Livestock Health Early Warning Surveillance & Certified E-Commerce Marketplace

> **A Flagship Hackathon MVP Submission for Smart India Hackathon (SIH) Problem Statement 26128**  
> *Efficient systems for early detection, prevention and management of livestock diseases and animal health issues (Government of Maharashtra)*

---

## 🌟 Executive Summary: Why This Submission Stands Out

Most hackathon entries build a passive dashboard that displays charts in a silo. In rural India, however, **disease outbreaks and rural commerce are inextricably linked**:
1. Unmonitored cattle trading across district borders is the #1 vector of transmission for infectious diseases like **Lumpy Skin Disease (LSD)** and **Foot & Mouth Disease (FMD)**.
2. When health distress strikes, smallholder farmers have no instant access to veterinary medicines, vaccines, or accredited doctor tele-consultations.
3. Traditional AI models act as "black boxes" that clinicians and government officers hesitate to trust during emergencies.

**PashuSetu AI** solves this by fusing a **Figma-grade consumer E-Commerce Marketplace** with a **deterministic, explainable AI disease early warning system**:
- **Certified Livestock Marketplace with Digital RFID Health Passports**: Every listed dairy cow, buffalo, and goat is verified with an immutable health passport, vaccination stamps, and quarantine clearance.
- **AI Health Triage with Deterministic Safety Net**: Supervised classification backed by a 5-rule deterministic override engine (guaranteeing high-hazard signals like sudden death or respiratory clusters are never softened by probabilistic models).
- **Geographical Epidemic Hotspot Map & Outbreak Simulator**: Real-time geospatial surveillance covering Maharashtra districts (Nashik, Pune, Kolhapur, Nagpur, Sambhajinagar, Amravati) with 1-click outbreak simulation for judges.
- **Closed-Loop Treatment Dispatch**: Triaging a sick animal instantly spotlights recommended veterinary medicine packs with 1-click cart addition, Kisan subsidies (code `KISAN2026`), and rural farmgate delivery.

---

## 🛠️ Technology Stack (100% Vercel-Hostable)

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: Reactive React Context Store with LocalStorage caching
- **Hosting**: Native Vercel Serverless / Edge compatible (zero external heavy Python daemons required in production)

---

## 🧠 The AI & Surveillance Architecture

### 1. The Dual-Layer Triage Pipeline
```
[ Farmer / Field Vet Report ]
             │
             ▼
[ Feature Engineering: Mortality Rate, Symptom Severity, Village Context ]
             │
      ┌──────┴──────────────────────────┐
      ▼                                 ▼
[ Random Forest ML Scoring ]    [ Rule-Based Safety Fallback ]
  - Probabilities (LOW/MED/HIGH)  - Multiple Deaths Protocol (>=3 deaths)
  - Calibrated Decision Boundary  - Severe Mortality (>=30%)
                                  - Neurological Tremors / Sudden Death
                                  - Respiratory Clusters (>=3 animals)
                                  - Rapid Village Spread (>=3 reports / 3d)
      └──────┬──────────────────────────┘
             ▼
[ Final Risk Assessment + Transparent Explanations + Recommended Medicine Pack ]
```

### 2. Transparent Regional Risk Formula (0–100)
$$\text{Regional Risk Score} = 0.25 \times \text{Volume} + 0.20 \times \text{Growth} + 0.20 \times \text{Mortality} + 0.20 \times \text{HighConcern} + 0.15 \times \text{Historical}$$

Categories:
- **0 – 29**: LOW (Green)
- **30 – 59**: MEDIUM (Amber)
- **60 – 79**: HIGH (Orange)
- **80 – 100**: CRITICAL (Red)

---

## 🚀 Quick Start & Local Execution

```bash
# 1. Clone the repository
git clone https://github.com/RsbhThakur/livestock-ai-marketplace.git
cd livestock-ai-marketplace

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏆 Judge Quick-Demo Walkthrough (Test in Under 60 Seconds)

Click the **"Judge Quick-Demo Suite"** at the top of the application to run any of the 3 pre-configured scenarios:

1. **Scenario 1: Critical Triage with Safety Override**
   - Click **Run Scenario Live** on Scenario 1.
   - Pre-fills a report with 10 cattle, 4 deaths (40% mortality), and respiratory distress.
   - Click **Evaluate Report & Calculate Risk Triage**.
   - Notice: The model classifies risk as **HIGH**, triggers the **Deterministic Safety Net**, and displays recommended veterinary treatment bundles ready to order.

2. **Scenario 2: Emerging Epidemic in Nashik Block-2**
   - Click **Run Scenario Live** on Scenario 2.
   - Automatically switches to the **Surveillance Console** and injects an 8-case outbreak cluster into Nashik.
   - Notice: The Hotspot Map updates, Nashik turns **CRITICAL (Score: 84/100)**, and the top emergency ticker flashes containment advisories restricting unauthorized livestock transport.

3. **Scenario 3: RFID Health Passport & Cattle Trade**
   - Click **Run Scenario Live** on Scenario 3.
   - Opens the digital **RFID Animal Health Passport** for purebred Gir Cow `#IN-MH-2026-8812`.
   - Inspect the official inspection stamp, vaccination ledger (FMD, LSD, HS, Brucellosis), biosecurity tier (A+), and click **Add Inspected Animal to Cart**.

---

## 📦 Deployment to Vercel

This repository is pre-configured with `vercel.json` for one-click deployment:

1. Push your changes to GitHub (`git push origin master`).
2. Go to [vercel.com](https://vercel.com/) and click **"Add New Project"**.
3. Import `livestock-ai-marketplace`.
4. Deploy! Vercel will automatically build and host the application globally on its high-speed Edge network.

---

## 📜 Synthetic Demo Data Transparency Note
*All health incident records and simulated outbreak clusters in this prototype are synthetic and generated for demonstration and model development purposes in accordance with Smart India Hackathon problem statement guidelines. District names are real Maharashtra administrative districts used as geographic anchors.*
