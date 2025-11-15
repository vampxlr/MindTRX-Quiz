# MINDTRX Quick Start Guide

## 🚀 Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🎯 Quick Tour

### Landing Page (/)
- Beautiful hero section with animated neuron network background
- Theme toggle (Dark Futuristic ↔ Bright High-Contrast)
- "Begin Your Journey" button to start assessment

### Quiz Page (/quiz)
- 27 questions across 2 sections:
  - Section 1: Communication with the Inner Mind (14 items)
  - Section 2: Trust in the Inner Mind (13 items)
- Features:
  - Smooth sliders with 1-5 scale
  - Progress tracking
  - Autosave (refresh-safe)
  - Quick navigation grid
  - Section tips and progress

### Results Page (/results)
- Stunning animated quadrant visualization
- Your scores (Communication & Trust /50)
- Quadrant and Position identification
- Detailed personalized feedback
- **Play Mode**: Interactive sliders to explore "what if" scenarios
- Share options:
  - Copy link
  - Native share
  - Email report
- Unique result code for future access

### Privacy Page (/privacy)
- Transparent privacy policy
- Data handling information

---

## 🎨 Theme Toggle

Click the sun/moon icon in the header to switch between:

- **Dark Futuristic** (default): Purple-black with neon glow, animated background
- **Bright High-Contrast**: White/purple/black, high visibility

---

## 📊 Understanding Your Results

### The 4 Quadrants

```
      Trust in Inner Mind →
      
  ↑   Skeptical        Integrated
  |   Explorer         Alchemist
Comm  ─────────────────────────
  |   Disengaged       Faithful
  ↓   Mind             Seeker
```

- **Disengaged Mind**: Low communication & trust - awakening phase
- **Skeptical Explorer**: High communication, low trust - experimenting but doubting
- **Faithful Seeker**: Low communication, high trust - believing but not practicing
- **Integrated Alchemist**: High communication & trust - fully integrated

### 16 Sub-Positions

Each quadrant contains 4 sub-positions based on score bands:
- lowLow (0-12)
- lowHigh (13-25)
- highLow (26-38)
- highHigh (39-50)

---

## 💡 Tips

1. **Take your time**: There's no time limit. Auto-save keeps your progress.

2. **Be honest**: The most valuable insights come from authentic responses.

3. **Explore Play Mode**: After getting results, use the sliders to see how different practices or trust levels would shift your position.

4. **Save your code**: Your unique result code lets you access results anytime. Share it or keep it private.

5. **Retake periodically**: Track your growth over time as you develop your inner mind practices.

---

## 🔧 Development

### File Structure Highlights

```
app/
├── page.tsx           → Landing page
├── quiz/page.tsx      → Assessment
├── results/page.tsx   → Results & visualization
└── api/
    ├── results/       → Store/retrieve (in-memory)
    └── send-email/    → Email functionality

components/
├── neuron-background.tsx  → Three.js animation
├── quadrant-chart.tsx     → Canvas visualization
└── quiz-slider.tsx        → Interactive slider

lib/
├── scoring.ts        → IMII v2 algorithm
├── questions.ts      → 27 assessment items
├── feedback.ts       → Position descriptions
└── storage.ts        → localStorage utils
```

### Key Technologies

- **Next.js 14**: App Router, Server Components
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **Three.js**: 3D neuron network
- **Framer Motion**: Smooth animations
- **Canvas API**: Quadrant visualization

---

## 🎬 Demo Flow

1. **Start**: Click "Begin Your Journey"
2. **Quiz**: Answer all 27 questions (use quick nav to jump around)
3. **Submit**: Click "View Results" when complete
4. **Explore**: 
   - Read your feedback
   - Toggle Play Mode
   - Share your results
   - Try the other theme
5. **Retake**: Click "Take Quiz Again" to start fresh

---

## 🐛 Troubleshooting

### Three.js background not showing?
- Check browser console for WebGL errors
- Try the Bright theme (disables 3D background)
- Ensure hardware acceleration is enabled

### Results not loading?
- Check your result code is correct
- Clear browser cache and localStorage
- Verify API routes are running

### Email not sending?
- Email is logged to console in development
- For production, configure SMTP in `.env.local`

---

## 📱 Mobile Experience

- Fully responsive design
- Touch-optimized sliders
- Performance-optimized Three.js
- Works great on all screen sizes

---

## 🎉 Enjoy Your Journey!

MINDTRX is designed to help you understand and deepen your relationship with your inner mind. Take your time, be curious, and explore!

**Remember**: This is a tool for self-discovery, not diagnosis. Your results reflect your current practices and trust level, which can grow and evolve over time.

---

*Built with ❤️ for inner mind exploration*

