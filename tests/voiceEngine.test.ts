import test from 'node:test';
import assert from 'node:assert/strict';
import {
  extractSymptomsFromText,
  runPresetVoiceInference,
  analyzeUploadedAudio,
  isPhraseNegated,
} from '../src/lib/voiceEngine';

test('Voice Engine - Negation Detection & Lookback Scoping', () => {
  // Case 1: Simple negation
  const text1 = 'there is no fever in the cattle';
  const isNeg1 = isPhraseNegated(text1, 12); // 'fever' starts at 12
  assert.equal(isNeg1, true, 'fever should be detected as negated');

  // Case 2: Affirmative symptom after clause break
  const text2 = 'no fever, but coughing heavily';
  const isNeg2 = isPhraseNegated(text2, 14); // 'coughing' starts at 14
  assert.equal(isNeg2, false, 'coughing should NOT be negated because clause break intervened');

  // Case 3: Negation in Hindi
  const text3 = 'गाय को बुखार नहीं है लेकिन खांसी है';
  const isNeg3 = isPhraseNegated(text3, 7, 5); // 'बुखार'
  assert.equal(isNeg3, true, 'बुखार should be detected as negated by नहीं');
});

test('Voice Engine - Multilingual Symptom Extraction', () => {
  // English affirmative & negated
  const resEn = extractSymptomsFromText('The cow has no fever, but is coughing and has nasal discharge.');
  assert.ok(resEn.detectedSymptoms.includes('coughing'), 'Should detect coughing');
  assert.ok(resEn.detectedSymptoms.includes('nasal_discharge'), 'Should detect nasal discharge');
  assert.ok(resEn.deniedSymptoms.includes('fever'), 'Should deny fever');
  assert.ok(!resEn.detectedSymptoms.includes('fever'), 'Fever should not be in detected list');

  // Marathi phrase
  const resMr = extractSymptomsFromText('गाईला खूप ताप आहे, तोंडाला फोड आले आहेत आणि लाळ गळत आहे');
  assert.ok(resMr.detectedSymptoms.includes('fever'), 'Should detect ताप as fever');
  assert.ok(resMr.detectedSymptoms.includes('skin_lesions'), 'Should detect तोंडाला फोड as skin_lesions');

  // Hindi phrase
  const resHi = extractSymptomsFromText('भैंस को तेज बुखार है और अचानक मौत हो गई');
  assert.ok(resHi.detectedSymptoms.includes('fever'), 'Should detect बुखार as fever');
  assert.ok(resHi.detectedSymptoms.includes('sudden_death'), 'Should detect अचानक मौत as sudden_death');
});

test('Voice Engine - 1-Click Judge Demo Presets', () => {
  // Preset 1: Marathi FMD
  const p1 = runPresetVoiceInference('vp-mr-1');
  assert.equal(p1.detectedLanguage, 'Marathi');
  assert.ok(p1.detectedSymptoms.includes('skin_lesions'));
  assert.ok(p1.detectedSymptoms.includes('fever'));

  // Preset 3: English Anthrax Emergency
  const p3 = runPresetVoiceInference('vp-en-1');
  assert.equal(p3.detectedLanguage, 'English');
  assert.ok(p3.detectedSymptoms.includes('sudden_death'));
  assert.ok(p3.detectedSymptoms.includes('weakness'));

  // Preset 4: English Mild Diarrhea with Negation Check
  const p4 = runPresetVoiceInference('vp-en-2');
  assert.ok(p4.detectedSymptoms.includes('diarrhea'));
  assert.ok(p4.deniedSymptoms.includes('fever'), 'Fever should be denied');
  assert.ok(!p4.detectedSymptoms.includes('fever'), 'Fever should not be detected');
});

test('Voice Engine - Uploaded Audio Note Analysis', () => {
  const uploadRes = analyzeUploadedAudio('fmd_mouth_blister_sample.wav', 'data:audio/wav;base64,...', 'Marathi', 320);
  assert.equal(uploadRes.source, 'audio_upload');
  assert.equal(uploadRes.audioFileName, 'fmd_mouth_blister_sample.wav');
  assert.equal(uploadRes.audioFileSizeKb, 320);
  assert.ok(uploadRes.detectedSymptoms.includes('skin_lesions'), 'Should detect lesions from FMD audio name');
  assert.ok(uploadRes.detectedSymptoms.includes('fever'), 'Should detect fever');
  assert.ok(uploadRes.deniedSymptoms.includes('coughing'), 'Should correctly parse negated coughing');
});
