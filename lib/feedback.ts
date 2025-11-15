/**
 * Position-specific feedback and descriptions
 */

import { Position, Quadrant } from './types';

export const quadrantDescriptions: Record<Quadrant, string> = {
  'Disengaged Mind': 'Low communication and trust with the inner mind. An opportunity for awakening and exploration awaits.',
  'Skeptical Explorer': 'Active practices but low trust in inner wisdom. You are experimenting but not yet fully believing.',
  'Faithful Seeker': 'Strong trust but limited active communication. Your faith is there, waiting for deeper practice.',
  'Integrated Alchemist': 'High communication and trust. You are actively engaging with and trusting your inner wisdom.',
};

export const positionDescriptions: Record<Position, { short: string; long: string }> = {
  // Disengaged Mind
  'Detached Observer': {
    short: 'Minimal engagement with inner processes.',
    long: 'You observe life from a distance, rarely engaging with your inner world. Consider beginning with simple mindfulness or journaling practices to open the door to your inner mind.',
  },
  'Overstimulated Skeptic': {
    short: 'Some practices but without belief or consistency.',
    long: 'You may have tried various practices but remain skeptical. This position suggests overwhelm or distrust. Focus on one simple, enjoyable practice and approach it with curiosity rather than expectation.',
  },
  'Conditioned Thinker': {
    short: 'Some openness but limited by old beliefs.',
    long: 'You have a degree of trust but have not developed practices to engage your inner wisdom. Your conditioning may be holding you back. Explore practices that feel natural and aligned with your values.',
  },
  'Frozen Potential': {
    short: 'Caught between wanting to engage and resistance.',
    long: 'You are at a threshold—some trust, some practice, but not enough to create momentum. This is a pivotal point. Choose one practice and commit to it for 30 days to break through the freeze.',
  },
  
  // Skeptical Explorer
  'Methodical Practitioner': {
    short: 'Consistent practice but with analytical distance.',
    long: 'You engage regularly but may treat it like a task rather than a relationship. Your practices are solid, but deeper trust could transform them from routine to revelation. Allow yourself to feel, not just do.',
  },
  'Hopeful Doubter': {
    short: 'High engagement with lingering skepticism.',
    long: 'You are deeply involved in practices yet question their efficacy. This tension can be productive—keep practicing while staying open to unexpected insights. Trust may come through experience, not logic.',
  },
  'Spiritual Technician': {
    short: 'Skilled in methods but tentative in trust.',
    long: 'You have developed a toolkit and some faith, but you may still be testing the waters. You are on the verge of integration. Notice the moments when your practices produce results—let them build your trust.',
  },
  'Experimental Learner': {
    short: 'Actively exploring with growing openness.',
    long: 'You are in a powerful growth phase, trying many things with increasing trust. This is a fertile time. Track what works, notice patterns, and let your experiments guide you toward deeper practices.',
  },
  
  // Faithful Seeker
  'Inner Believer': {
    short: 'Strong trust, minimal structured practice.',
    long: 'You believe in the power of the inner mind but have not established regular practices. Your faith is a strong foundation—now build upon it with consistent, intentional engagement.',
  },
  'Visionary Dreamer': {
    short: 'Faith and occasional practice, not yet integrated.',
    long: 'You trust your inner wisdom and practice sporadically. You are in touch with insights and visions but need more structure to fully embody them. Regular practice will ground your vision in daily life.',
  },
  'Sacred Observer': {
    short: 'Deep trust with receptive, contemplative energy.',
    long: 'You have profound faith and a contemplative stance. Your trust is high, and you are beginning to practice more. This is a beautiful position—consider deepening your practices to match your spiritual openness.',
  },
  'Intentional Yearner': {
    short: 'High faith, growing practice, seeking deeper integration.',
    long: 'You are close to full integration. Your trust is strong, and your practices are increasing. You yearn for deeper connection. The next step is consistency and experimentation—you are ready for transformation.',
  },
  
  // Integrated Alchemist
  'Grounded Mystic': {
    short: 'Steady practice and trust, rooted in reality.',
    long: 'You have a balanced, grounded relationship with your inner mind. Your practice is steady, your trust is solid. You integrate inner wisdom into daily life with grace and pragmatism. Continue deepening.',
  },
  'Creative Conduit': {
    short: 'High practice and trust, flowing with inspiration.',
    long: 'You are a channel for creative insight and inner wisdom. Your practices are robust, and you trust what comes through. This is a powerful position for creative work, teaching, and transformation. Share your gifts.',
  },
  'Symbolic Strategist': {
    short: 'Deep trust and practice with symbolic mastery.',
    long: 'You work skillfully with symbols, dreams, and inner guidance. Your high trust and disciplined practice allow you to navigate life with inner clarity. You may be called to guide others on their path.',
  },
  'Embodied Transformer': {
    short: 'Fully integrated inner-outer alignment and mastery.',
    long: 'You have achieved deep integration between inner wisdom and outer action. Your practice is strong, your trust is unwavering. You embody the alchemical transformation. You are likely a teacher, healer, or transformational leader.',
  },
};

export function getFeedback(quadrant: Quadrant, position: Position) {
  return {
    quadrant: quadrantDescriptions[quadrant],
    position: positionDescriptions[position],
  };
}
