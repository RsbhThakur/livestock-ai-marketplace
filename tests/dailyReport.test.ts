import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DAILY_SURVEILLANCE_HISTORY,
  PREDICTIVE_FORECAST,
  DISTRICT_REPRODUCTION_RATES,
} from '../src/lib/dailyReportData';

test('Daily Surveillance History - Data Integrity', () => {
  assert.ok(DAILY_SURVEILLANCE_HISTORY.length >= 7, 'Should have at least 7 days of daily records');
  for (const point of DAILY_SURVEILLANCE_HISTORY) {
    assert.ok(point.date.length > 0);
    assert.ok(point.suspectedCases >= point.confirmedHighRisk, 'Suspected cases must be >= confirmed high risk');
    assert.ok(point.deaths >= 0);
    assert.ok(point.mortalityRate >= 0 && point.mortalityRate <= 1);
  }
});

test('Predictive Forecast - Confidence Intervals & Trajectory', () => {
  assert.ok(PREDICTIVE_FORECAST.length >= 7, 'Forecast should cover at least 7 days');
  for (const f of PREDICTIVE_FORECAST) {
    if (f.isForecast) {
      assert.ok(
        f.upperConfidenceBound >= f.projectedCases,
        `Upper bound (${f.upperConfidenceBound}) must be >= projected cases (${f.projectedCases})`
      );
      assert.ok(
        f.projectedCases >= f.lowerConfidenceBound,
        `Projected cases (${f.projectedCases}) must be >= lower bound (${f.lowerConfidenceBound})`
      );
    }
  }
});

test('District Reproduction Rates (Rt) - Thresholds', () => {
  assert.ok(DISTRICT_REPRODUCTION_RATES.length > 0);
  const surgeDistricts = DISTRICT_REPRODUCTION_RATES.filter((d) => d.status === 'SURGE');
  assert.ok(surgeDistricts.length >= 1, 'Should have at least one surge district for emergency triage drill');
  const nashik = DISTRICT_REPRODUCTION_RATES.find((d) => d.district === 'Nashik');
  assert.ok(nashik, 'Nashik must exist');
  assert.ok(nashik.rt > 1.0, 'Nashik Rt must exceed epidemic threshold of 1.0');
});
