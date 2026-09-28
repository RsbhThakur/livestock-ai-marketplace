import test from 'node:test';
import assert from 'node:assert/strict';
import { runPresetVisionInference, analyzeUploadedImage } from '../src/lib/visionEngine';

test('Vision Engine - CLIP ViT-L/14 Presets & Diagnosis', () => {
  // Preset 1: Foot and Mouth Disease (FMD)
  const fmd = runPresetVisionInference('vis-fmd');
  assert.equal(fmd.presetId, 'vis-fmd');
  assert.ok(fmd.diseaseDiagnosis.includes('Foot') && fmd.diseaseDiagnosis.includes('Mouth'));
  assert.ok(fmd.detectedSymptoms.includes('skin_lesions'));
  assert.ok(fmd.detectedSymptoms.includes('fever'));
  assert.ok(fmd.topMatches.length > 0);
  assert.ok(fmd.topMatches[0].similarity >= 0.22, 'Top match should exceed 0.22 CLIP threshold');

  // Preset 2: Lumpy Skin Disease (LSD)
  const lsd = runPresetVisionInference('vis-lsd');
  assert.ok(lsd.diseaseDiagnosis.includes('Lumpy Skin Disease'));
  assert.ok(lsd.detectedSymptoms.includes('skin_lesions'));
  assert.ok(lsd.detectedSymptoms.includes('swelling'));

  // Preset 3: Bovine Respiratory Disease (BRD / HS)
  const brd = runPresetVisionInference('vis-brd');
  assert.ok(lsd.diseaseDiagnosis.length > 0);
  assert.ok(brd.detectedSymptoms.includes('nasal_discharge'));
  assert.ok(brd.detectedSymptoms.includes('respiratory_distress'));

  // Preset 4: Healthy Bovine Control
  const healthy = runPresetVisionInference('vis-healthy');
  assert.equal(healthy.detectedSymptoms.length, 0, 'Healthy animal should have 0 disease symptoms');
  assert.ok(healthy.diseaseDiagnosis.includes('Healthy'));
});

test('Vision Engine - Custom Image Upload Simulation', () => {
  const result = analyzeUploadedImage('blob:http://localhost:3000/mock-image');
  assert.ok(result.imageUrl.length > 0);
  assert.ok(result.topMatches.length > 0);
  assert.ok(result.processingTimeMs > 0);
});
