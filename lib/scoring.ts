/**
 * MINDTRX IMII v2 - Scoring Logic
 * Maps raw scores to normalized 50-point scale and determines quadrant/position
 */

import { Band, Quadrant, Position, IMIIResult } from './types';

/**
 * Convert a 50-point value to a band
 * @param v - Value from 0-50
 * @returns Band classification
 */
const band50 = (v: number): Band => {
  if (v <= 12) return 'lowLow';
  if (v <= 25) return 'lowHigh';
  if (v <= 38) return 'highLow';
  return 'highHigh';
};

/**
 * Main IMII v2 mapping function
 * @param comm_raw - Raw communication score (0-70)
 * @param trust_raw - Raw trust score (0-65)
 * @returns Complete IMII result with quadrant and position
 */
export function mapIMII(comm_raw: number, trust_raw: number): IMIIResult {
  // Normalize to 50-point scale
  const comm50 = Math.round((comm_raw / 70) * 50);
  const trust50 = Math.round((trust_raw / 65) * 50);
  
  // Get bands
  const commBand = band50(comm50);
  const trustBand = band50(trust50);
  
  // Determine quadrant (cutoff at 26)
  let quadrant: Quadrant;
  if (trust50 < 26 && comm50 < 26) {
    quadrant = 'Disengaged Mind';
  } else if (trust50 < 26 && comm50 >= 26) {
    quadrant = 'Skeptical Explorer';
  } else if (trust50 >= 26 && comm50 < 26) {
    quadrant = 'Faithful Seeker';
  } else {
    quadrant = 'Integrated Alchemist';
  }
  
  // Determine position based on quadrant and bands
  let position: Position;
  
  if (quadrant === 'Disengaged Mind') {
    if (commBand === 'lowLow' && trustBand === 'lowLow') {
      position = 'Detached Observer';
    } else if (commBand === 'lowHigh' && trustBand === 'lowLow') {
      position = 'Overstimulated Skeptic';
    } else if (commBand === 'lowLow' && trustBand === 'lowHigh') {
      position = 'Conditioned Thinker';
    } else {
      position = 'Frozen Potential';
    }
  } else if (quadrant === 'Skeptical Explorer') {
    if (commBand === 'highLow' && trustBand === 'lowLow') {
      position = 'Methodical Practitioner';
    } else if (commBand === 'highHigh' && trustBand === 'lowLow') {
      position = 'Hopeful Doubter';
    } else if (commBand === 'highLow' && trustBand === 'lowHigh') {
      position = 'Spiritual Technician';
    } else {
      position = 'Experimental Learner';
    }
  } else if (quadrant === 'Faithful Seeker') {
    if (commBand === 'lowLow' && trustBand === 'highLow') {
      position = 'Inner Believer';
    } else if (commBand === 'lowHigh' && trustBand === 'highLow') {
      position = 'Visionary Dreamer';
    } else if (commBand === 'lowLow' && trustBand === 'highHigh') {
      position = 'Sacred Observer';
    } else {
      position = 'Intentional Yearner';
    }
  } else {
    // Integrated Alchemist
    if (commBand === 'highLow' && trustBand === 'highLow') {
      position = 'Grounded Mystic';
    } else if (commBand === 'highHigh' && trustBand === 'highLow') {
      position = 'Creative Conduit';
    } else if (commBand === 'highLow' && trustBand === 'highHigh') {
      position = 'Symbolic Strategist';
    } else {
      position = 'Embodied Transformer';
    }
  }
  
  return {
    comm50,
    trust50,
    quadrant,
    position,
    commBand,
    trustBand,
    commRaw: comm_raw,
    trustRaw: trust_raw,
    timestamp: Date.now(),
    version: 'v2',
  };
}

/**
 * Calculate raw scores from answers
 */
export function calculateRawScores(answers: { [key: number]: number }): {
  commRaw: number;
  trustRaw: number;
} {
  let commRaw = 0;
  let trustRaw = 0;
  
  // Section 1: Communication (questions 1-14)
  for (let i = 1; i <= 14; i++) {
    commRaw += answers[i] || 0;
  }
  
  // Section 2: Trust (questions 15-27)
  for (let i = 15; i <= 27; i++) {
    trustRaw += answers[i] || 0;
  }
  
  return { commRaw, trustRaw };
}

