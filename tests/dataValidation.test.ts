import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_LIVESTOCK, INITIAL_PHARMA, INITIAL_REGIONS, JUDGE_DEMO_SCENARIOS } from '../src/lib/initialData';
import { TRANSLATIONS } from '../src/lib/translations';

test('Data Integrity - Certified Livestock & Health Passports', () => {
  assert.ok(INITIAL_LIVESTOCK.length >= 5, 'Should have multiple verified livestock listings');

  for (const animal of INITIAL_LIVESTOCK) {
    assert.ok(animal.id, 'Animal must have an ID');
    assert.ok(animal.title && animal.marathiTitle, 'Must support bilingual titles');
    assert.ok(animal.price > 0, 'Price must be positive');
    assert.ok(animal.healthPassport, 'Animal must have an RFID Health Passport');
    
    const passport = animal.healthPassport;
    assert.match(passport.rfidTag, /^IN-MH-\d{4}-\d{4}$/, 'RFID tag must match official national standard');
    assert.ok(passport.quarantineClearance, 'Marketplace livestock must have valid quarantine clearance');
    assert.ok(passport.vaccinations.length > 0, 'Must have at least one recorded vaccination');
    assert.ok(['A+', 'A', 'B'].includes(passport.biosecurityRating), 'Must have an official biosecurity rating');
  }
});

test('Data Integrity - Veterinary Pharmaceuticals & Emergency Outbreak Bundles', () => {
  assert.ok(INITIAL_PHARMA.length >= 6, 'Should have veterinary pharmaceutical inventory');

  const emergencyBundles = INITIAL_PHARMA.filter((p) => p.isEmergencyBundle);
  assert.ok(emergencyBundles.length >= 2, 'Must feature emergency outbreak response packs');

  for (const product of INITIAL_PHARMA) {
    assert.ok(product.id, 'Product must have an ID');
    assert.ok(product.price > 0, 'Product must have a valid price');
    assert.ok(product.targetSpecies.length > 0, 'Must designate target species');
    assert.ok(product.dosage, 'Must provide clear clinical dosage instructions');
  }
});

test('Data Integrity - Multi-District Coverage & Geographic Demarcation', () => {
  assert.ok(INITIAL_REGIONS.length >= 10, 'Should cover multiple Maharashtra districts');

  const districts = new Set(INITIAL_REGIONS.map((r) => r.district));
  assert.ok(districts.has('Nashik'), 'Must cover Nashik disease surveillance corridor');
  assert.ok(districts.has('Pune'), 'Must cover Pune dairy zone');
  assert.ok(districts.has('Kolhapur'), 'Must cover Kolhapur sugar & livestock belt');

  for (const reg of INITIAL_REGIONS) {
    assert.ok(reg.latitude >= 15 && reg.latitude <= 22, 'Latitude must be within Maharashtra borders');
    assert.ok(reg.longitude >= 72 && reg.longitude <= 81, 'Longitude must be within Maharashtra borders');
  }
});

test('Data Integrity - Multilingual Localization (English, Marathi, Hindi)', () => {
  const languages = ['en', 'mr', 'hi'] as const;
  const criticalKeys = [
    'appTitle',
    'tagline',
    'roleFarmer',
    'roleOfficer',
    'triageButton',
    'emergencyAdvisory',
    'heroTitle',
  ];

  for (const lang of languages) {
    assert.ok(TRANSLATIONS[lang], `Must have translation table for language: ${lang}`);
    for (const key of criticalKeys) {
      assert.ok(
        TRANSLATIONS[lang][key] && TRANSLATIONS[lang][key].length > 0,
        `Language ${lang} is missing key: ${key}`
      );
    }
  }
});

test('Data Integrity - Hackathon Judge Demo Scenarios', () => {
  assert.equal(JUDGE_DEMO_SCENARIOS.length, 4, 'Must provide 4 distinct evaluation scenarios');

  const scenarioIds = JUDGE_DEMO_SCENARIOS.map((s) => s.id);
  assert.ok(scenarioIds.includes('demo-triage-override'), 'Must provide multimodal triage scenario');
  assert.ok(scenarioIds.includes('demo-forecast-graph'), 'Must provide daily forecast graph scenario');
  assert.ok(scenarioIds.includes('demo-outbreak-nashik'), 'Must provide ST-DBSCAN outbreak scenario');
  assert.ok(scenarioIds.includes('demo-health-passport'), 'Must provide RFID health passport scenario');
});
