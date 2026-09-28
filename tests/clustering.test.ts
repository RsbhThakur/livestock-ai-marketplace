import test from 'node:test';
import assert from 'node:assert/strict';
import { haversineDistanceKm, detectOutbreakClusters } from '../src/lib/clusteringEngine';

test('Clustering Engine - Haversine Distance Calculation', () => {
  // Nashik coordinates: ~20.00°N, 73.78°E
  // Pune coordinates: ~18.52°N, 73.85°E
  const distNashikPune = haversineDistanceKm(20.00, 73.78, 18.52, 73.85);
  // Expected distance is approx 160-170 km
  assert.ok(distNashikPune > 150 && distNashikPune < 180, `Expected ~165km, got ${distNashikPune.toFixed(1)}km`);

  // Same point distance should be 0
  const distZero = haversineDistanceKm(19.8762, 75.3433, 19.8762, 75.3433);
  assert.equal(distZero, 0);
});

test('Clustering Engine - Outbreak Cluster Grouping', () => {
  // Synthesize reports close in space and time
  const reports = [
    {
      report_id: 1,
      date: '2026-05-01',
      latitude: 20.042,
      longitude: 73.855,
      district: 'Nashik',
      village: 'Nashik Block-2 Village-1',
      number_affected: 15,
      number_deaths: 6,
      mortality_rate: 0.4,
      risk_level: 'HIGH' as const,
      species: 'cattle' as const,
      block: 'Nashik Block-2',
      duration_days: 2,
      symptoms: { fever: true },
    },
    {
      report_id: 2,
      date: '2026-05-02',
      latitude: 20.045,
      longitude: 73.857,
      district: 'Nashik',
      village: 'Nashik Block-2 Village-1',
      number_affected: 12,
      number_deaths: 4,
      mortality_rate: 0.33,
      risk_level: 'HIGH' as const,
      species: 'cattle' as const,
      block: 'Nashik Block-2',
      duration_days: 2,
      symptoms: { fever: true },
    },
    {
      report_id: 3,
      date: '2026-05-02',
      latitude: 20.043,
      longitude: 73.856,
      district: 'Nashik',
      village: 'Nashik Block-2 Village-1',
      number_affected: 8,
      number_deaths: 2,
      mortality_rate: 0.25,
      risk_level: 'HIGH' as const,
      species: 'cattle' as const,
      block: 'Nashik Block-2',
      duration_days: 1,
      symptoms: { fever: true },
    },
  ];

  const clusters = detectOutbreakClusters(reports);
  assert.ok(clusters.length >= 1, 'Should detect at least 1 cluster in Nashik');
  const mainCluster = clusters[0];
  assert.equal(mainCluster.district, 'Nashik');
  assert.ok(mainCluster.totalAffected >= 20);
  assert.ok(mainCluster.isConfirmedOutbreak, 'Should be flagged as an active outbreak');
});
