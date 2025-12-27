/**
 * MINDTRX IMII v2 - Quiz Questions
 * 27 items total: 14 Communication + 13 Trust
 */

import { QuizQuestion } from './types';

export const quizQuestions: QuizQuestion[] = [
  // Section 1: Communication with the Inner Mind (1-14)
  {
    id: 1,
    section: 'communication',
    text: 'I journal about dreams, thoughts, or emotions.',
  },
  {
    id: 2,
    section: 'communication',
    text: 'I meditate or sit in silence regularly.',
  },
  {
    id: 3,
    section: 'communication',
    text: 'I use self-hypnosis / mental rehearsal.',
  },
  {
    id: 4,
    section: 'communication',
    text: 'I visualize goals or healing imagery intentionally.',
  },
  {
    id: 5,
    section: 'communication',
    text: 'I listen to Paraliminals or guided audio.',
  },
  {
    id: 6,
    section: 'communication',
    text: 'I engage in prayer or spiritual dialogue.',
  },
  {
    id: 7,
    section: 'communication',
    text: 'I use affirmations (spoken, written, displayed).',
  },
  {
    id: 8,
    section: 'communication',
    text: 'I maintain a vision board / symbolic imagery collection.',
  },
  {
    id: 9,
    section: 'communication',
    text: 'I participate in spiritual ceremonies / energy rituals.',
  },
  {
    id: 10,
    section: 'communication',
    text: 'I track or interpret my dreams.',
  },
  {
    id: 11,
    section: 'communication',
    text: 'I do automatic writing / freewriting.',
  },
  {
    id: 12,
    section: 'communication',
    text: 'I practice somatic techniques (breathwork, yoga, dance).',
  },
  {
    id: 13,
    section: 'communication',
    text: 'I use biofeedback or neurofeedback tools.',
  },
  {
    id: 14,
    section: 'communication',
    text: 'I explore altered states (float tanks, trance, Holosync, Audio Visual Entrainment, Shamanic journeying).',
  },
  // Section 2: Trust in the Inner Mind (15-27)
  {
    id: 15,
    section: 'trust',
    text: 'I believe the inner mind holds valuable insights.',
  },
  {
    id: 16,
    section: 'trust',
    text: 'I trust my intuitive nudges and gut feelings.',
  },
  {
    id: 17,
    section: 'trust',
    text: 'I act on synchronicities or inner signs.',
  },
  {
    id: 18,
    section: 'trust',
    text: 'I apply dream insights or symbolic messages.',
  },
  {
    id: 19,
    section: 'trust',
    text: 'I study intuition / transformation / inner development.',
  },
  {
    id: 20,
    section: 'trust',
    text: 'I join workshops / retreats / coaching for growth.',
  },
  {
    id: 21,
    section: 'trust',
    text: 'I have used psychedelics/entheogens for awakening to higher consciousness.',
  },
  {
    id: 22,
    section: 'trust',
    text: 'I trust non-linear inspiration and creative flow.',
  },
  {
    id: 23,
    section: 'trust',
    text: 'I feel guided by a deeper or higher self.',
  },
  {
    id: 24,
    section: 'trust',
    text: 'I integrate intuitive insights into decisions.',
  },
  {
    id: 25,
    section: 'trust',
    text: 'I surrender control to inner knowing when appropriate.',
  },
  {
    id: 26,
    section: 'trust',
    text: 'I feel confident in the spontaneous insights and inspiration that come to me.',
  },
  {
    id: 27,
    section: 'trust',
    text: "I'm comfortable with paradox, ambiguity, and symbolic meaning.",
  },
];

export const sectionInfo = {
  communication: {
    title: 'Communication with the Inner Mind',
    description: 'How actively do you engage in practices that connect you with your inner self?',
    maxScore: 70,
  },
  trust: {
    title: 'Trust in the Inner Mind',
    description: 'How much do you trust and act upon your inner wisdom and intuition?',
    maxScore: 65,
  },
};

