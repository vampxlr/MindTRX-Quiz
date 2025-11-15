# MINDTRX - Inner Mind Integration Inventory v2

A beautiful, responsive web application for assessing your relationship with your inner mind through a comprehensive 27-item assessment.

![MINDTRX](https://via.placeholder.com/1200x400/667eea/ffffff?text=MINDTRX+-+Inner+Mind+Integration+Inventory)

## 🌟 Features

- **27-Item Assessment**: Comprehensive evaluation across Communication and Trust dimensions
- **16 Position Framework**: Precise mapping across 4 quadrants with detailed sub-positions
- **Stunning Visuals**: 
  - Three.js animated neuron network background
  - Glassmorphism and neon design elements
  - Smooth animations with Framer Motion
- **Dual Themes**: 
  - Dark Futuristic (default) - Deep purple/black with neon accents
  - Bright High-Contrast - White/purple/black for accessibility
- **Interactive Quadrant Visualization**: 
  - Real-time animated chart with pulsing position indicator
  - Play Mode to explore different score scenarios
- **Result Sharing**:
  - Unique shareable result codes
  - Email report functionality
  - Copy link and native share support
- **Progressive UX**:
  - Autosave quiz progress
  - Quick navigation between questions
  - Section progress tracking
- **Privacy-Focused**: Data stored locally by default, with optional API storage

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui patterns
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Animation**: Framer Motion
- **State Management**: React hooks + localStorage
- **Email**: Nodemailer (optional)

## 📦 Installation

1. **Clone the repository**:
```bash
git clone <your-repo-url>
cd MindTRX-Quiz
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration (optional for development).

4. **Run the development server**:
```bash
npm run dev
```

5. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
├── app/
│   ├── page.tsx              # Landing page
│   ├── quiz/
│   │   └── page.tsx          # Quiz assessment
│   ├── results/
│   │   └── page.tsx          # Results display
│   ├── privacy/
│   │   └── page.tsx          # Privacy policy
│   ├── api/
│   │   ├── results/
│   │   │   └── route.ts      # Store/retrieve results
│   │   └── send-email/
│   │       └── route.ts      # Email sending
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── header.tsx            # App header
│   ├── footer.tsx            # App footer
│   ├── theme-provider.tsx    # Theme management
│   ├── neuron-background.tsx # Three.js background
│   ├── quiz-slider.tsx       # Interactive slider
│   └── quadrant-chart.tsx    # Animated visualization
├── lib/
│   ├── types.ts              # TypeScript definitions
│   ├── scoring.ts            # IMII v2 scoring logic
│   ├── questions.ts          # Quiz questions data
│   ├── feedback.ts           # Position descriptions
│   ├── storage.ts            # localStorage utilities
│   ├── hash.ts               # Code generation
│   ├── email-template.ts     # Email HTML/text
│   └── utils.ts              # Utilities
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎨 Design System

### Themes

**Dark Futuristic** (Default):
- Deep purple/black palette (#0a0015)
- Neon accents (purple #8a2be2, cyan #00ffff)
- Animated neuron network background
- Glassmorphism effects

**Bright High-Contrast**:
- White background
- Bright purple (#7c3aed)
- High contrast for accessibility
- Minimal blur effects

### Typography

- **UI Font**: Inter
- **Heading Font**: Orbitron

### Key Components

- **Glass Cards**: Frosted glass effect with backdrop blur
- **Electric Buttons**: Ripple animation on hover
- **Glow Text**: Neon text shadows
- **Neon Borders**: Purple glow effects

## 📊 IMII v2 Scoring

### Dimensions

1. **Communication with the Inner Mind** (14 items, max 70)
   - Practices like meditation, journaling, visualization
   - Normalized to 50-point scale

2. **Trust in the Inner Mind** (13 items, max 65)
   - Belief in intuition, acting on insights
   - Normalized to 50-point scale

### Quadrants

- **Disengaged Mind**: Low communication, low trust
- **Skeptical Explorer**: High communication, low trust
- **Faithful Seeker**: Low communication, high trust
- **Integrated Alchemist**: High communication, high trust

### Sub-Positions

16 detailed positions based on band scores (lowLow, lowHigh, highLow, highHigh)

## 🔧 Configuration

### Email Setup (Production)

To enable email functionality:

1. Install nodemailer (already in package.json)
2. Configure SMTP settings in `.env.local`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@mindtrx.app
```

3. Uncomment email sending code in `app/api/send-email/route.ts`

### Database Setup (Production)

The app uses in-memory storage by default. For production:

**Option 1: Vercel KV**
```env
KV_REST_API_URL=your-kv-url
KV_REST_API_TOKEN=your-kv-token
```

**Option 2: Supabase**
```env
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

Update `app/api/results/route.ts` to use your chosen storage.

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

### Docker

```bash
docker build -t mindtrx .
docker run -p 3000:3000 mindtrx
```

### Environment Variables

Make sure to set all required environment variables in your deployment platform.

## 🎯 Usage

1. **Take Assessment**: Navigate to `/` and click "Begin Your Journey"
2. **Answer Questions**: Rate 27 items on a 1-5 scale
3. **View Results**: See your quadrant, position, and personalized feedback
4. **Explore**: Use Play Mode to see how different scores affect position
5. **Share**: Copy link, share via native share, or email results

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized Three.js performance on mobile

## ♿ Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast theme option
- `prefers-reduced-motion` support
- Screen reader friendly

## 🔒 Privacy

- Data stored locally by default
- Optional API storage for sharing
- No tracking or analytics cookies
- GDPR compliant
- See `/privacy` for full policy

## 🐛 Known Issues

- Three.js background may be performance-intensive on older devices (disabled in bright theme)
- Email functionality requires SMTP configuration for production

## 🛠️ Development

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Style

- TypeScript strict mode
- ESLint with Next.js config
- Prettier (recommended)

## 📄 License

This project is private and proprietary.

## 🙏 Credits

- **Design**: Brain-tech futuristic aesthetic
- **Fonts**: Inter (Google Fonts), Orbitron (Google Fonts)
- **3D Graphics**: Three.js community
- **Inspiration**: Neuroscience, consciousness research, inner work practices

## 📞 Support

For questions or support, please open an issue or contact the development team.

---

**Built with ❤️ using Next.js, TypeScript, and Three.js**

**MINDTRX** - Inner Mind Integration Inventory v2

