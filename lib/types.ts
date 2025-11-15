/**
 * MINDTRX IMII v2 - Type Definitions
 */

export type Band = 'lowLow' | 'lowHigh' | 'highLow' | 'highHigh';

export type Quadrant = 
  | 'Disengaged Mind'
  | 'Skeptical Explorer'
  | 'Faithful Seeker'
  | 'Integrated Alchemist';

export type Position =
  // Disengaged Mind
  | 'Detached Observer'
  | 'Overstimulated Skeptic'
  | 'Conditioned Thinker'
  | 'Frozen Potential'
  // Skeptical Explorer
  | 'Methodical Practitioner'
  | 'Hopeful Doubter'
  | 'Spiritual Technician'
  | 'Experimental Learner'
  // Faithful Seeker
  | 'Inner Believer'
  | 'Visionary Dreamer'
  | 'Sacred Observer'
  | 'Intentional Yearner'
  // Integrated Alchemist
  | 'Grounded Mystic'
  | 'Creative Conduit'
  | 'Symbolic Strategist'
  | 'Embodied Transformer';

export interface QuizQuestion {
  id: number;
  section: 'communication' | 'trust';
  text: string;
}

export interface QuizAnswers {
  [questionId: number]: number;
}

export interface IMIIResult {
  comm50: number;
  trust50: number;
  quadrant: Quadrant;
  position: Position;
  commBand: Band;
  trustBand: Band;
  commRaw: number;
  trustRaw: number;
  timestamp: number;
  version: 'v2';
}

export interface StoredResult extends IMIIResult {
  code: string;
  answers: QuizAnswers;
}

