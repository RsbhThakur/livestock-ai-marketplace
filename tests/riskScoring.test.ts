import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRegionalRisk } from '../src/lib/riskScoring';
import { INITIAL_REGIONS } from '../src/lib/initialData';
import { Report } from '../src/lib/types';

test('Risk Scoring - Regional Risk Rollup & Scoring Baseline', () => {
  // Baseline with empty reports: all regions should score 0 and have LOW risk
  const baselineScores = calculateRegionalRisk([], INITIAL_REGIONS, 'district');
  assert.ok(baselineScores.length > 0);
  for (const s of baselineScores) {
    assert.equal(s.risk_score, 0);
    assert.equal(s.risk_category, 'LOW');
  }

  // Outbreak cluster in Nashik
  const todayStr = new Date().toISOString().split('T')[0];
  const outbreakReports: Report[] = Array.from({ length: 15 }, (_, i) => ({
    report_id: 100 + i,
    date: todayStr,
    species: 'cattle',
    district: 'Nashik',
    block: 'Nashik Block-2',
    village: 'Nashik Block-2 Village-1',
    number_affected: 8,
    number_deaths: 3,
    mortality_rate: 0.375,
    risk_level: 'HIGH',
    symptoms: { fever: true, sudden_death: true },
    duration_days: 2,
  }));

  const districtScores = calculateRegionalRisk(outbreakReports, INITIAL_REGIONS, 'district');
  const nashikScore = districtScores.find((d) => d.region_name === 'Nashik');
  assert.ok(nashikScore, 'Nashik score must be present');
  assert.ok(nashikScore.risk_score > 30, `Nashik score should be elevated (> 30), got ${nashikScore.risk_score}`);
  assert.ok(nashikScore.explanations.length > 0, 'Explanation bullets should be generated');
});

test('Risk Scoring - Multi-Granularity Rollups', () => {
  const dummyReports: Report[] = [
    {
      report_id: 1,
      date: new Date().toISOString().split('T')[0],
      species: 'cattle',
      district: 'Pune',
      block: 'Pune Block-1',
      village: 'Pune Block-1 Village-1',
      number_affected: 4,
      number_deaths: 0,
      mortality_rate: 0,
      risk_level: 'LOW',
      symptoms: { fever: true },
      duration_days: 1,
    },
  ];

  const villageScores = calculateRegionalRisk(dummyReports, INITIAL_REGIONS, 'village');
  assert.ok(villageScores.length >= INITIAL_REGIONS.length);

  const blockScores = calculateRegionalRisk(dummyReports, INITIAL_REGIONS, 'block');
  assert.ok(blockScores.length > 0);

  const districtScores = calculateRegionalRisk(dummyReports, INITIAL_REGIONS, 'district');
  assert.ok(districtScores.length > 0);
});
