import test from 'node:test';
import assert from 'node:assert/strict';
import { predictReport } from '../src/lib/predictor';
import { evaluateRules } from '../src/lib/rules';

test('Triage Predictor - Input Validation', () => {
  // Invalid: 0 affected
  const res1 = predictReport({
    species: 'cattle',
    district: 'Nashik',
    block: 'Block-1',
    village: 'Village-1',
    number_affected: 0,
    number_deaths: 0,
    duration_days: 1,
    symptoms: {},
  });
  assert.equal(res1.valid, false);
  assert.ok(res1.errors.some((e) => e.includes('greater than zero')));

  // Invalid: deaths > affected
  const res2 = predictReport({
    species: 'cattle',
    district: 'Nashik',
    block: 'Block-1',
    village: 'Village-1',
    number_affected: 3,
    number_deaths: 5,
    duration_days: 1,
    symptoms: {},
  });
  assert.equal(res2.valid, false);
  assert.ok(res2.errors.some((e) => e.includes('cannot exceed')));
});

test('Triage Predictor - Deterministic Safety Rules', () => {
  // Rule 1: multiple_deaths (deaths >= 3 AND affected >= 5)
  const rule1 = evaluateRules({
    number_affected: 6,
    number_deaths: 3,
    symptoms: { fever: true },
  });
  assert.equal(rule1.triggered, true);
  assert.equal(rule1.rule_name, 'multiple_deaths');

  // Rule 2: high_mortality_rate (mortality >= 30%)
  const rule2 = evaluateRules({
    number_affected: 3,
    number_deaths: 1, // 33.3% mortality
    symptoms: { fever: true },
  });
  assert.equal(rule2.triggered, true);
  assert.equal(rule2.rule_name, 'high_mortality_rate');

  // Rule 3: critical_symptoms (sudden death or neurological)
  const rule3 = evaluateRules({
    number_affected: 1,
    number_deaths: 0,
    symptoms: { sudden_death: true },
  });
  assert.equal(rule3.triggered, true);
  assert.equal(rule3.rule_name, 'critical_symptoms');

  // Rule 4: respiratory_cluster (respiratory distress AND affected >= 3)
  const rule4 = evaluateRules({
    number_affected: 4,
    number_deaths: 0,
    symptoms: { respiratory_distress: true },
  });
  assert.equal(rule4.triggered, true);
  assert.equal(rule4.rule_name, 'respiratory_cluster');

  // Rule 5: rapid_spread
  const rule5 = evaluateRules({
    number_affected: 2,
    number_deaths: 0,
    symptoms: { fever: true },
    rapid_spread: true,
  });
  assert.equal(rule5.triggered, true);
  assert.equal(rule5.rule_name, 'rapid_spread');
});

test('Triage Predictor - End to End Risk Assessment & Safety Override', () => {
  // Benign case
  const benign = predictReport({
    species: 'cattle',
    district: 'Kolhapur',
    block: 'Block-1',
    village: 'Village-1',
    number_affected: 1,
    number_deaths: 0,
    duration_days: 1,
    temperature: 38.6,
    symptoms: { weakness: true },
  });
  assert.equal(benign.valid, true);
  assert.equal(benign.final_risk, 'LOW');
  assert.equal(benign.rule_triggered, false);

  // Severe outbreak case: Should trigger HIGH risk override
  const severe = predictReport({
    species: 'cattle',
    district: 'Nashik',
    block: 'Block-2',
    village: 'Village-1',
    number_affected: 12,
    number_deaths: 4,
    duration_days: 3,
    temperature: 40.5,
    symptoms: {
      fever: true,
      respiratory_distress: true,
      skin_lesions: true,
      sudden_death: true,
    },
  });
  assert.equal(severe.valid, true);
  assert.equal(severe.final_risk, 'HIGH');
  assert.equal(severe.rule_triggered, true);
  assert.ok(severe.explanation.length > 0);
  assert.ok(severe.recommended_products && severe.recommended_products.length > 0);
});
