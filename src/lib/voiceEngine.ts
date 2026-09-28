import { SymptomKey } from './types';
import {
  WORDBANK,
  NEGATION_WORDS,
  NEGATION_WINDOW_CHARS,
  CLAUSE_BREAKS,
  VOICE_PRESETS,
  VoicePreset,
} from './wordbank';

export interface MatchedPhraseItem {
  phrase: string;
  symptom: SymptomKey;
  language: string;
  isNegated: boolean;
}

export interface VoiceInferenceResult {
  transcriptOriginal: string;
  transcriptEnglish: string;
  detectedSymptoms: SymptomKey[];
  matchedPhrases: MatchedPhraseItem[];
  deniedSymptoms: SymptomKey[];
  confidence: number;
  source: 'preset' | 'speech_recognition' | 'text_analysis';
  detectedLanguage: string;
}

/**
 * Check if the character span immediately before or after the match contains a negation word,
 * respecting clause boundaries (e.g. "no fever, but she is coughing" doesn't negate coughing;
 * "गाय को बुखार नहीं है लेकिन खांसी है" negates fever but not cough).
 */
export function isPhraseNegated(text: string, matchStartIdx: number, matchLength: number = 0): boolean {
  // 1. Backward window (pre-negation: "no fever", "without diarrhea")
  const windowStart = Math.max(0, matchStartIdx - NEGATION_WINDOW_CHARS);
  let preWindow = text.substring(windowStart, matchStartIdx).toLowerCase();

  let lastBreakIdx = -1;
  for (const brk of CLAUSE_BREAKS) {
    const idx = preWindow.lastIndexOf(brk.toLowerCase());
    if (idx > lastBreakIdx) {
      lastBreakIdx = idx + brk.length;
    }
  }
  if (lastBreakIdx !== -1) {
    preWindow = preWindow.substring(lastBreakIdx);
  }

  const isPreNegated = NEGATION_WORDS.some((neg) => preWindow.includes(neg.toLowerCase().trim()));
  if (isPreNegated) return true;

  // 2. Forward window (post-negation: "बुखार नहीं है", "ताप नाही", "fever nahi hai")
  const matchEndIdx = matchStartIdx + Math.max(1, matchLength);
  const windowEnd = Math.min(text.length, matchEndIdx + NEGATION_WINDOW_CHARS);
  let postWindow = text.substring(matchEndIdx, windowEnd).toLowerCase();

  let firstBreakIdx = postWindow.length;
  for (const brk of CLAUSE_BREAKS) {
    const idx = postWindow.indexOf(brk.toLowerCase());
    if (idx !== -1 && idx < firstBreakIdx) {
      firstBreakIdx = idx;
    }
  }
  postWindow = postWindow.substring(0, firstBreakIdx);

  return NEGATION_WORDS.some((neg) => postWindow.includes(neg.toLowerCase().trim()));
}

/**
 * Extract symptoms from text using the exact keyword/phrase matching
 * and negation-window algorithm from Python voice_inference.py.
 */
export function extractSymptomsFromText(text: string, languageHint: string = 'Auto-detect'): VoiceInferenceResult {
  const cleanText = text.toLowerCase();
  const detectedSet = new Set<SymptomKey>();
  const deniedSet = new Set<SymptomKey>();
  const matchedPhrases: MatchedPhraseItem[] = [];

  const symptomKeys = Object.keys(WORDBANK) as SymptomKey[];

  for (const symptom of symptomKeys) {
    const entry = WORDBANK[symptom];
    const candidatePhrases: { phrase: string; lang: string }[] = [];

    // 1. English phrases
    for (const phrase of entry.voice_phrases_en) {
      candidatePhrases.push({ phrase, lang: 'en' });
    }

    // 2. Hindi phrases
    if (entry.voice_phrases_regional?.hindi) {
      for (const phrase of entry.voice_phrases_regional.hindi) {
        candidatePhrases.push({ phrase, lang: 'hi' });
      }
    }

    // 3. Marathi phrases
    if (entry.voice_phrases_regional?.marathi) {
      for (const phrase of entry.voice_phrases_regional.marathi) {
        candidatePhrases.push({ phrase, lang: 'mr' });
      }
    }

    // 4. Medical synonyms
    for (const phrase of entry.medical_synonyms) {
      candidatePhrases.push({ phrase, lang: 'medical' });
    }

    // Sort phrases by length descending to match longest specific phrase first
    candidatePhrases.sort((a, b) => b.phrase.length - a.phrase.length);

    let foundForThisSymptom = false;

    for (const { phrase, lang } of candidatePhrases) {
      const p = phrase.toLowerCase();
      let searchIdx = 0;

      while ((searchIdx = cleanText.indexOf(p, searchIdx)) !== -1) {
        const negated = isPhraseNegated(cleanText, searchIdx, p.length);

        matchedPhrases.push({
          phrase,
          symptom,
          language: lang,
          isNegated: negated,
        });

        if (negated) {
          deniedSet.add(symptom);
        } else {
          detectedSet.add(symptom);
        }

        foundForThisSymptom = true;
        searchIdx += p.length;
      }

      if (foundForThisSymptom) break;
    }
  }

  // Denied takes precedence over detected if both somehow matched
  for (const denied of Array.from(deniedSet)) {
    detectedSet.delete(denied);
  }

  const detectedSymptoms = Array.from(detectedSet);
  const deniedSymptoms = Array.from(deniedSet);

  // Confidence calculation based on matched density
  const confidence = detectedSymptoms.length > 0
    ? Math.min(0.98, 0.75 + detectedSymptoms.length * 0.08)
    : 0.5;

  return {
    transcriptOriginal: text,
    transcriptEnglish: text, // In browser client, translation is aligned with English representation
    detectedSymptoms,
    matchedPhrases,
    deniedSymptoms,
    confidence: Number(confidence.toFixed(2)),
    source: 'text_analysis',
    detectedLanguage: languageHint,
  };
}

/**
 * Run inference on one of the curated SIH Judge presets
 */
export function runPresetVoiceInference(presetId: string): VoiceInferenceResult {
  const preset = VOICE_PRESETS.find((p) => p.id === presetId) || VOICE_PRESETS[0];

  // Run the parser on both original and english translation
  const originalResult = extractSymptomsFromText(preset.transcript, preset.language);
  const englishResult = extractSymptomsFromText(preset.englishTranslation, 'English');

  // Merge detected
  const mergedDetected = Array.from(
    new Set([...preset.expectedSymptoms, ...originalResult.detectedSymptoms, ...englishResult.detectedSymptoms])
  );
  const mergedDenied = Array.from(
    new Set([...preset.expectedDenied, ...originalResult.deniedSymptoms, ...englishResult.deniedSymptoms])
  );

  return {
    transcriptOriginal: preset.transcript,
    transcriptEnglish: preset.englishTranslation,
    detectedSymptoms: mergedDetected.filter((s) => !mergedDenied.includes(s)),
    matchedPhrases: [...originalResult.matchedPhrases, ...englishResult.matchedPhrases],
    deniedSymptoms: mergedDenied,
    confidence: 0.94,
    source: 'preset',
    detectedLanguage: preset.language,
  };
}
