import {
  RULE_MIN_AFFECTED_FOR_DEATH_RULE,
  RULE_MIN_DEATHS_WITH_AFFECTED,
  RULE_MORTALITY_RATE_THRESHOLD,
  RULE_RESPIRATORY_MIN_AFFECTED,
  RAPID_SPREAD_MIN_REPORTS,
  RAPID_SPREAD_WINDOW_DAYS,
} from './config';
import { RuleResult, SymptomKey } from './types';

export interface ReportInputForRules {
  number_affected: number;
  number_deaths: number;
  symptoms: Partial<Record<SymptomKey, boolean>>;
  rapid_spread?: boolean;
}

export function evaluateRules(report: ReportInputForRules): RuleResult {
  const affected = Number(report.number_affected) || 0;
  const deaths = Number(report.number_deaths) || 0;
  const mortalityRate = affected > 0 ? deaths / affected : 0;

  const neurological = Boolean(report.symptoms?.neurological_symptoms);
  const suddenDeath = Boolean(report.symptoms?.sudden_death);
  const respiratory = Boolean(report.symptoms?.respiratory_distress);
  const rapidSpread = Boolean(report.rapid_spread);

  // Rule 1: Multiple deaths in herd
  if (deaths >= RULE_MIN_DEATHS_WITH_AFFECTED && affected >= RULE_MIN_AFFECTED_FOR_DEATH_RULE) {
    return {
      triggered: true,
      rule_name: 'multiple_deaths',
      explanation: `${deaths} deaths recorded out of ${affected} affected animals — breached multiple-mortality emergency protocol.`,
    };
  }

  // Rule 2: High mortality rate >= 30%
  if (mortalityRate >= RULE_MORTALITY_RATE_THRESHOLD) {
    return {
      triggered: true,
      rule_name: 'high_mortality_rate',
      explanation: `Mortality rate of ${(mortalityRate * 100).toFixed(1)}% exceeds the configured emergency threshold of ${(RULE_MORTALITY_RATE_THRESHOLD * 100).toFixed(0)}%.`,
    };
  }

  // Rule 3: Peracute / Neurological symptoms
  if (neurological || suddenDeath) {
    return {
      triggered: true,
      rule_name: 'critical_symptoms',
      explanation: 'Neurological tremors or sudden death observed — treated as an immediate high-hazard infectious alert.',
    };
  }

  // Rule 4: Respiratory cluster across herd
  if (respiratory && affected >= RULE_RESPIRATORY_MIN_AFFECTED) {
    return {
      triggered: true,
      rule_name: 'respiratory_cluster',
      explanation: `Acute respiratory distress documented across ${affected} animals (>= ${RULE_RESPIRATORY_MIN_AFFECTED} cluster threshold).`,
    };
  }

  // Rule 5: Rapid spatial-temporal outbreak spread
  if (rapidSpread) {
    return {
      triggered: true,
      rule_name: 'rapid_spread',
      explanation: `${RAPID_SPREAD_MIN_REPORTS}+ synchronized reports from this village within ${RAPID_SPREAD_WINDOW_DAYS} days — outbreak cluster flagged.`,
    };
  }

  return {
    triggered: false,
  };
}
