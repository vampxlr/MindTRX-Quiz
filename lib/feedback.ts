/**
 * Position-specific feedback and descriptions
 */

import { Position, Quadrant } from './types';

interface FeedbackContent {
  summary: string;
  detailed: string;
}

export const quadrantFeedback: Record<Quadrant, FeedbackContent> = {
  "Disengaged Mind": {
    summary: "You're in the early stages of exploring your inner landscape. There's untapped potential waiting to be discovered.",
    detailed: "In this quadrant, you may not yet have established consistent practices for communicating with your inner mind, nor do you fully trust its guidance. This is a natural starting point for many people. The opportunity here is immense: as you begin to develop practices like journaling, meditation, or simply sitting in silence, you'll start to hear the whispers of your deeper wisdom. The key is to approach this journey with curiosity rather than judgment. Your inner mind is always present, always communicating—it's simply a matter of learning its language and building trust in what it reveals."
  },
  "Skeptical Explorer": {
    summary: "You actively engage in inner-mind practices but approach their insights with healthy skepticism.",
    detailed: "You've developed a rich toolkit of practices for communicating with your inner mind—perhaps meditation, journaling, visualization, or other contemplative techniques. However, you maintain a certain distance from fully trusting what emerges. This position reflects a thoughtful, analytical approach. You're willing to experiment and observe, but you need evidence before accepting inner guidance as valid. This is actually a strength in many contexts, as it protects you from self-deception. The growth edge here is learning when to balance your analytical mind with surrender, recognizing that some truths can only be validated through direct experience rather than logical proof."
  },
  "Faithful Seeker": {
    summary: "You deeply trust your inner wisdom, even if consistent practices for accessing it aren't yet established.",
    detailed: "Your relationship with your inner mind is characterized by deep faith and trust. You believe in the power of intuition, synchronicity, and inner guidance, and you're willing to follow where it leads. However, you may not yet have developed consistent, structured practices for regularly accessing this wisdom. It's like having a deep reverence for a sacred place but not having established a regular pilgrimage there. The opportunity is to develop practices that allow you to access your inner wisdom more reliably and intentionally. This isn't about becoming rigid or formulaic—it's about creating containers that help you connect more consistently with the guidance you already trust."
  },
  "Integrated Alchemist": {
    summary: "You've integrated both practice and trust, regularly accessing and applying your inner wisdom in daily life.",
    detailed: "You've achieved a powerful synthesis of practice and trust. You've developed consistent methods for communicating with your inner mind, and you genuinely trust what emerges from these practices. You understand that your inner mind is not separate from you—it's a deeper, wiser aspect of your being. You've likely experienced the fruits of this integration: increased synchronicity, clearer decision-making, creative breakthroughs, and a sense of being guided through life's complexities. This doesn't mean you never doubt or struggle, but you've developed the capacity to navigate these moments while maintaining connection to your inner wisdom. The journey continues to deepen as you refine your practices and expand your trust into new domains of life."
  }
};

export const positionFeedback: Record<Position, FeedbackContent> = {
  // Disengaged Mind Positions
  "Frozen Potential": {
    summary: "You're at the very beginning of your inner journey, with minimal practice and trust.",
    detailed: "Your inner landscape is like uncharted territory—vast with potential but not yet explored. You may feel disconnected from your intuition or inner guidance, perhaps even skeptical that such things exist. This is actually a powerful position because everything lies ahead of you. The first step is simply curiosity: What would it be like to sit quietly for five minutes and notice what arises? What if you wrote down a dream or a fleeting thought? These small experiments can be the first thaw of your frozen potential. There's no pressure to believe or commit to anything—just a gentle invitation to explore."
  },
  "Detached Observer": {
    summary: "You've begun to practice inner awareness techniques but remain emotionally distant from what emerges.",
    detailed: "You're engaging in some practices—perhaps meditation, journaling, or contemplation—but you experience them more as interesting experiments than as deeply meaningful connections. You observe your inner world from a safe distance, analyzing it rather than feeling it. This detachment can be protective, keeping you from being overwhelmed, but it also keeps the full power of inner wisdom at arm's length. The invitation is to allow yourself to feel as well as think, to let the insights from your practices move from your head to your heart. What would it be like to not just observe your inner experience, but to be touched by it?"
  },
  "Conditioned Thinker": {
    summary: "You trust certain beliefs about the inner mind but lack personal practices to verify them.",
    detailed: "You've absorbed ideas about intuition, inner wisdom, or spiritual guidance—perhaps from books, teachers, or cultural conditioning—and you believe in them intellectually. However, these beliefs haven't yet been tested in the laboratory of your own direct experience through consistent practice. It's like knowing the theory of swimming without ever getting in the water. The opportunity here is to move from borrowed beliefs to lived experience. Start simple: choose one practice that resonates with you and commit to it for 30 days. Let your beliefs be hypotheses that you're willing to test through direct experience."
  },
  "Overstimulated Skeptic": {
    summary: "You're actively experimenting with practices while simultaneously doubting their value.",
    detailed: "You're in a fascinating paradox: you're doing the practices but constantly questioning whether they're actually doing anything. You might journal regularly but dismiss what you write as random thoughts. You might meditate but wonder if you're just sitting there fooling yourself. This internal battle can be exhausting. The invitation is to give yourself permission to experiment without immediately judging the results. What if you approached your practices the way a scientist approaches an experiment—with genuine curiosity about the outcome rather than predetermined conclusions? It's okay to be skeptical and to practice simultaneously. In fact, this combination can lead to the most authentic discoveries."
  },
  
  // Skeptical Explorer Positions
  "Methodical Practitioner": {
    summary: "You maintain consistent practices but approach their insights with careful, measured consideration.",
    detailed: "You've built a solid foundation of practices—perhaps meditation, journaling, or other reflective techniques—and you approach them with discipline and consistency. However, you're cautious about accepting what emerges as genuine guidance. You want evidence, patterns, repeated validation before you trust an insight or intuition. This methodical approach is a strength in many ways; it protects you from wishful thinking and self-deception. The growth edge is learning to distinguish between healthy skepticism and self-protective doubt. Some insights from your inner mind can't be validated in advance—they can only be verified by acting on them and seeing what unfolds. The question becomes: how might you run small, safe experiments in trusting your inner guidance?"
  },
  "Hopeful Doubter": {
    summary: "You've developed rich practices and hope they'll lead somewhere, even as doubt persists.",
    detailed: "You're deeply engaged in practices for inner exploration—meditation, visualization, dreamwork, or creative expression. You've invested time and energy in these practices because part of you genuinely hopes they'll unlock something meaningful. Yet doubt shadows your efforts. After a powerful meditation, you wonder if you're making it up. After a vivid dream, you question whether it means anything at all. This position is actually quite tender and human. The invitation is to notice when doubt arises and ask: is this doubt protective or limiting? Sometimes doubt protects us from premature conclusions. Other times, it's the fearful ego trying to maintain control. The path forward is learning to discern the difference, and occasionally choosing hope over doubt as an experiment."
  },
  "Spiritual Technician": {
    summary: "You're skilled at inner practices but treat them more as techniques than as doorways to trust.",
    detailed: "You've mastered the mechanics of various inner practices. You might have an impressive meditation practice, keep detailed journals, work with affirmations, or use guided imagery. You understand the how-to of these practices quite well. However, they remain somewhat technical for you—tools you employ rather than relationships you inhabit. It's like being fluent in the grammar of a language but never using it to express something that matters. The growth edge is moving from technique to trust, from doing the practice to being present with what the practice reveals. What if your meditation wasn't about technique but about listening? What if your journaling wasn't about doing it right but about letting something true emerge?"
  },
  "Experimental Learner": {
    summary: "You're fully engaged in exploring diverse practices while maintaining healthy skepticism about outcomes.",
    detailed: "You're actively experimenting with a variety of inner practices—meditation, journaling, dreamwork, embodied practices, perhaps even plant medicine or other non-ordinary states. You approach these experiments with genuine curiosity and commitment while maintaining your capacity for critical thinking. You're not naive, but you're also not closed. This is a rich and dynamic position. You're gathering data, having experiences, and slowly building your own understanding based on direct experience rather than belief. The question that may be emerging for you is: what will it take for me to move from experimentation to embodiment? At what point does gathering evidence give way to trusting what you've learned? This transition doesn't require abandoning your skepticism—just allowing your direct experience to carry equal weight to your doubt."
  },
  
  // Faithful Seeker Positions
  "Inner Believer": {
    summary: "You have strong faith in inner wisdom but haven't yet established regular ways to access it.",
    detailed: "You carry a deep, quiet conviction that there's wisdom within you beyond your conscious thinking mind. You trust your occasional intuitive hits, you pay attention to synchronicities, and you have a felt sense that you're guided or connected to something larger. However, you haven't yet established consistent practices to cultivate and deepen this connection. Your relationship with your inner mind is like a friendship that exists more in spirit than in regular contact. The invitation is to create structures—simple, gentle practices—that allow you to commune more regularly with this inner wisdom you already trust. It doesn't need to be complicated: five minutes of silent sitting, three pages of morning writing, or a weekly date with your journal. The practice isn't meant to create trust—you already have that—but to strengthen and clarify the communication channel."
  },
  "Visionary Dreamer": {
    summary: "You experience rich inner visions and trust their meaning, seeking more consistent connection.",
    detailed: "You have powerful inner experiences—perhaps vivid dreams, spontaneous visions, or moments of profound insight—and you trust these experiences as meaningful. You're naturally intuitive and imaginative, and you're drawn to the symbolic, the metaphorical, the poetic dimensions of inner experience. However, these experiences come sporadically rather than on demand, and you wish you could access this rich inner world more consistently. The opportunity is to develop practices that help you enter the liminal spaces where vision emerges. This might include dreamwork, active imagination, creative expression, or working with symbolic imagery. The key is regularity—showing up to meet your inner visionary self on a schedule, not just when it spontaneously appears."
  },
  "Sacred Observer": {
    summary: "You hold deep reverence for inner wisdom and synchronicity while seeking more active engagement.",
    detailed: "You move through life with a sense of the sacred. You notice signs, synchronicities, and symbolic meanings in your everyday experiences. You trust that there's intelligence and guidance woven into the fabric of your life. However, your relationship with this guidance is more receptive than active—you wait for messages rather than initiating conversation. You're like someone who deeply honors a wise teacher but rarely asks direct questions. The growth edge is learning to be more active in your relationship with your inner wisdom. This doesn't mean forcing or controlling—it means developing practices of inquiry, dialogue, and conscious invitation. What would it mean to not just receive guidance but to actively seek it out through intentional practice?"
  },
  "Intentional Yearner": {
    summary: "You're actively seeking deeper connection with trusted inner wisdom through developing practices.",
    detailed: "You're in a beautiful liminal space: you deeply trust the reality and value of inner wisdom, and you're actively working to establish practices that give you more consistent access to it. You're experimenting with meditation, journaling, contemplation, or other methods, and you can feel yourself on the edge of a breakthrough. There's a yearning in you—a desire to move from occasional connection to reliable communion with your inner wisdom. This yearning itself is sacred; it's the pull of your deeper self calling you home. The invitation now is patience and consistency. The breakthrough you sense isn't far away, but it doesn't come from trying harder—it comes from showing up regularly, with gentleness and trust. Your practice is working; now it needs time to deepen."
  },
  
  // Integrated Alchemist Positions
  "Grounded Mystic": {
    summary: "You've integrated solid practices with deep trust, embodying wisdom in a practical, grounded way.",
    detailed: "You've achieved a remarkable balance: you're mystical and practical, spiritual and grounded, connected to higher wisdom and rooted in everyday reality. You have established practices that keep you in regular communion with your inner wisdom, and you trust what emerges enough to apply it in your actual life—in relationships, work, decisions, and challenges. You're not interested in spirituality as an escape from life but as a way to engage more fully with it. Your inner wisdom isn't theoretical; it's tested and proven in the laboratory of daily living. The invitation at this stage is continued deepening and refinement. How might your practices evolve? What new dimensions of inner wisdom are calling to be explored? You're not at the end of the journey—you're at a resting point on a spiral that continues upward and inward."
  },
  "Creative Conduit": {
    summary: "You channel inner wisdom through highly developed practices, expressing it creatively in the world.",
    detailed: "You've developed rich, consistent practices for accessing your inner mind, and you've learned to channel what emerges into creative expression. Whether through art, writing, music, teaching, healing, or other forms, you're a conduit for inner wisdom to flow into the world. You trust the creative impulses that arise from your depths, and you've developed the skill to give them form. Your practice and your creative expression feed each other in a virtuous cycle. The invitation at this stage is to continue honoring both the receptive and expressive dimensions of your work. Protect your practice time as sacred—it's the wellspring of everything you create. And continue to trust the impulses that arise, even when they don't make immediate logical sense. You're serving something larger than your personal agenda."
  },
  "Symbolic Strategist": {
    summary: "You use established practices to access inner wisdom and apply it strategically in life.",
    detailed: "You've developed a sophisticated relationship with your inner mind. You have practices that work for you, you trust what emerges, and you've learned to translate symbolic or intuitive insights into practical strategy and action. You might work with dreams, synchronicities, or meditative insights, and you've developed skill in decoding their meaning and applying them to real-world situations. You understand that inner wisdom doesn't always speak in literal language—it speaks in symbols, feelings, and images—and you've become fluent in this language. The growth edge is continuing to honor the mystery while using the insights. There's always a temptation to over-systematize inner wisdom, to reduce it to formulas. The invitation is to remain in both worlds: strategic and symbolic, practical and mystical, grounded and open to magic."
  },
  "Embodied Transformer": {
    summary: "You've deeply integrated practice and trust, using inner wisdom as a primary guidance system for ongoing transformation.",
    detailed: "You've reached a stage of integration where accessing your inner wisdom isn't something you do—it's something you are. Your practices are woven seamlessly into your life, and you trust your inner guidance so deeply that following it has become natural rather than effortful. You use your inner wisdom not just for specific decisions or challenges but as a primary navigation system for your life's ongoing transformation. You understand that transformation isn't a destination but a continuous process, and your inner mind is both guide and companion on this journey. At this stage, the work is no longer about building trust or establishing practices—it's about surrendering ever more deeply to what wants to emerge, about allowing your life to become a living expression of inner wisdom. The invitation is to keep saying yes to what's calling you, even when—especially when—it asks you to transform in ways you can't yet imagine."
  }
};

export function getFeedback(quadrant: Quadrant, position: Position) {
  return {
    quadrant: quadrantFeedback[quadrant],
    position: positionFeedback[position],
  };
}
