import {
  NORMALIZATION_CAPS,
  RISK_WEIGHTS,
  ROLLING_WINDOW_LONG_DAYS,
  ROLLING_WINDOW_SHORT_DAYS,
  riskScoreToCategory,
} from './config';
import { Region, RegionalRiskScore, Report } from './types';

function normalize(value: number, cap: number): number {
  if (cap <= 0) return 0;
  return Math.max(0, Math.min(100, (value / cap) * 100));
}

export function calculateRegionalRisk(
  reports: Report[],
  regions: Region[],
  granularity: 'village' | 'block' | 'district',
  asOfDateStr?: string
): RegionalRiskScore[] {
  const asOf = asOfDateStr ? new Date(asOfDateStr) : new Date();

  const shortWindowStart = new Date(asOf);
  shortWindowStart.setDate(shortWindowStart.getDate() - (ROLLING_WINDOW_SHORT_DAYS - 1));

  const longWindowStart = new Date(asOf);
  longWindowStart.setDate(longWindowStart.getDate() - (ROLLING_WINDOW_LONG_DAYS - 1));

  const prevShortWindowStart = new Date(shortWindowStart);
  prevShortWindowStart.setDate(prevShortWindowStart.getDate() - ROLLING_WINDOW_SHORT_DAYS);
  const prevShortWindowEnd = new Date(shortWindowStart);
  prevShortWindowEnd.setDate(prevShortWindowEnd.getDate() - 1);

  // Group reports by granularity key
  const groupedReports = new Map<string, Report[]>();

  reports.forEach((r) => {
    const key = r[granularity];
    if (!key) return;
    if (!groupedReports.has(key)) groupedReports.set(key, []);
    groupedReports.get(key)!.push(r);
  });

  // Ensure all known regions are represented even with 0 reports
  const allKeys = new Set<string>();
  regions.forEach((reg) => {
    const key = reg[granularity];
    if (key) allKeys.add(key);
  });

  const scores: RegionalRiskScore[] = [];

  allKeys.forEach((key) => {
    const allRegionReports = groupedReports.get(key) || [];

    const shortReports = allRegionReports.filter((r) => {
      const d = new Date(r.date);
      return d >= shortWindowStart && d <= asOf;
    });

    const longReports = allRegionReports.filter((r) => {
      const d = new Date(r.date);
      return d >= longWindowStart && d <= asOf;
    });

    const prevReports = allRegionReports.filter((r) => {
      const d = new Date(r.date);
      return d >= prevShortWindowStart && d <= prevShortWindowEnd;
    });

    const histReports = allRegionReports.filter((r) => {
      const d = new Date(r.date);
      return d < asOf;
    });

    const reportCount7d = shortReports.length;
    const reportCount30d = longReports.length;
    const reportCountPrev7d = prevReports.length;

    const affectedAnimals = shortReports.reduce((sum, r) => sum + (r.number_affected || 0), 0);
    const deaths = shortReports.reduce((sum, r) => sum + (r.number_deaths || 0), 0);
    const mortalityRate = affectedAnimals > 0 ? deaths / affectedAnimals : 0;

    const highConcernCount = shortReports.filter((r) => r.risk_level === 'HIGH').length;
    const highConcernRatio = reportCount7d > 0 ? highConcernCount / reportCount7d : 0;

    const reportGrowthRate = reportCountPrev7d > 0 ? reportCount7d / reportCountPrev7d : reportCount7d;
    const historicalIncidence = histReports.filter((r) => r.risk_level === 'HIGH').length;

    // Normalization sub-scores against documented caps
    const volumeScore = normalize(reportCount7d, NORMALIZATION_CAPS.report_volume_cap);
    const growthScore = normalize(Math.max(0, reportGrowthRate - 1.0), NORMALIZATION_CAPS.recent_growth_cap);
    const mortalityScore = normalize(mortalityRate, NORMALIZATION_CAPS.mortality_rate_cap);
    const highConcernScore = normalize(highConcernRatio, 1.0);
    const historicalScore = normalize(historicalIncidence, NORMALIZATION_CAPS.historical_incidence_cap);

    // Weighted 0 - 100 risk score
    const w = RISK_WEIGHTS;
    const totalScoreRaw =
      w.report_volume * volumeScore +
      w.recent_growth * growthScore +
      w.mortality * mortalityScore +
      w.high_concern_ratio * highConcernScore +
      w.historical_incidence * historicalScore;

    const totalScore = Number(Math.max(0, Math.min(100, totalScoreRaw)).toFixed(1));
    const category = riskScoreToCategory(totalScore);

    // Build human-readable explanations
    const explanations: string[] = [];
    if (mortalityScore >= 40) {
      explanations.push(`Elevated mortality rate of ${(mortalityRate * 100).toFixed(1)}% over trailing 7 days.`);
    }
    if (growthScore >= 30) {
      explanations.push(`Accelerating reporting velocity: ${reportGrowthRate.toFixed(2)}x growth ratio vs prior week.`);
    }
    if (volumeScore >= 40) {
      explanations.push(`Significant cluster volume (${reportCount7d} incident reports in 7 days).`);
    }
    if (highConcernScore >= 30) {
      explanations.push(`High proportion of critical cases (${(highConcernRatio * 100).toFixed(0)}% flagged HIGH).`);
    }
    if (historicalScore >= 30) {
      explanations.push(`Prior recurrent outbreak history (${historicalIncidence} historical high-severity events).`);
    }
    if (explanations.length === 0) {
      explanations.push('Baseline surveillance quiet — no single risk metric exceeds alert thresholds.');
    }

    // Match coordinates if available
    const matchingRegion = regions.find((reg) => reg[granularity] === key);

    scores.push({
      region_name: key,
      granularity,
      district: matchingRegion?.district,
      block: matchingRegion?.block,
      village: matchingRegion?.village,
      latitude: matchingRegion?.latitude,
      longitude: matchingRegion?.longitude,
      risk_score: totalScore,
      risk_category: category,
      report_count_7d: reportCount7d,
      report_count_30d: reportCount30d,
      affected_animals: affectedAnimals,
      deaths,
      mortality_rate: Number(mortalityRate.toFixed(3)),
      high_concern_count: highConcernCount,
      high_concern_ratio: Number(highConcernRatio.toFixed(3)),
      report_growth_rate: Number(reportGrowthRate.toFixed(2)),
      historical_incidence: historicalIncidence,
      sub_score_volume: Number(volumeScore.toFixed(1)),
      sub_score_growth: Number(growthScore.toFixed(1)),
      sub_score_mortality: Number(mortalityScore.toFixed(1)),
      sub_score_high_concern: Number(highConcernScore.toFixed(1)),
      sub_score_historical: Number(historicalScore.toFixed(1)),
      explanations,
    });
  });

  return scores.sort((a, b) => b.risk_score - a.risk_score);
}
