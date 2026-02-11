# TalentSage - AI-Native Recruitment Platform

A comprehensive recruitment platform demo showcasing AI-powered candidate matching, automated screening, and intelligent workflow management.

## 🚀 Features

### Marketing Website
- **Premium Hero Section** with staged entrance animations and gradient backgrounds
- **Interactive 3D Capabilities Carousel** showcasing 6 core features with smooth transitions
- **Animated Impact Metrics** with count-up animations on scroll
- **Fast, Performance-Optimized Header** with no layout shifts
- **Fully Responsive Design** across mobile, tablet, and desktop

### Recruiter Workspace
- **Job Management** - Browse, search, and manage job postings
- **Candidate Pipeline** - View candidates organized by stage (Applied → Shortlisted → Interview → Offer)
- **Dynamic Rubric Editor** - Create and edit evaluation criteria with weight validation
- **Candidate Profiles** - Detailed views with skills, experience, AI evaluation scores
- **Audit Timeline** - Complete activity history for every candidate
- **Stage Management** - Drag-and-drop or dropdown stage transitions with automatic audit logging

### AI Assistant
- **Floating Chat Widget** with open/close/minimize states
- **Animated Avatar** with 4 distinct states (Idle, Listening, Thinking, Speaking)
- **Voice Input/Output** using Web Speech API with graceful degradation
- **Smart Commands**:
  - "Shortlist top candidates" - Automatically moves high-scoring candidates
  - "Generate evaluation rubric" - Creates job-specific criteria
  - "Schedule interview" - Opens scheduling interface
- **Suggested Actions** - Context-aware quick action buttons

### Video Screening
- **Video Playback UI** with mock player controls
- **AI Analysis Summary** - Transcript, scoring breakdown, and recommendations
- **Recruiter Decision Controls** - Pass/Hold/Reject with notes
- **Audit Integration** - All decisions logged to timeline

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm

### Installation Steps

1. **Clone or navigate to the project**
   ```bash
   cd d:/talent-stage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🧪 Testing

Run all tests:
```bash
npm test
```

Tests cover:
- Candidate stage transitions and UI consistency
- Rubric weight validation
- AI assistant command execution

## 🏗️ Project Structure

```
talent-stage/
├── src/
│   ├── components/
│   │   ├── marketing/      # Marketing website components
│   │   ├── workspace/      # Recruiter workspace components
│   │   ├── assistant/      # AI assistant components
│   │   ├── video/          # Video screening components
│   │   └── ui/             # Reusable UI components
│   ├── pages/              # Page components and routing
│   ├── stores/             # Zustand state management
│   ├── data/               # Mock data
│   ├── utils/              # Helper functions and animations
│   ├── tests/              # Test files
│   └── assets/             # Static assets
├── public/                 # Public static files
└── package.json
```

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **State Management**: Zustand with localStorage persistence
- **Icons**: Lucide React
- **Voice**: Web Speech API
- **Testing**: Vitest + React Testing Library

## 🎨 Key Features Highlights

### Performance Optimizations
- Fixed header height to prevent layout shifts
- Lazy-loaded animations with IntersectionObserver
- Debounced search inputs
- Optimized re-renders with Zustand selectors

### Animation Highlights
- Staged hero entrance with staggered elements
- 3D carousel with perspective transforms
- Scroll-triggered reveal animations
- Smooth state transitions throughout

### State Management
- Centralized Zustand stores for recruitment data and AI assistant
- Persistent rubric storage via localStorage
- Consistent state updates across all UI components
- Automatic audit event creation

### Accessibility & UX
- Semantic HTML throughout
- Keyboard navigation support
- Screen reader friendly
- Loading and empty states
- Error boundary handling
- Graceful degradation for browsers without voice API support

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌐 Deployment

### Recommended Platforms
- **Vercel** (Recommended)
- Netlify
- AWS Amplify
- GitHub Pages

### Vercel Deployment Steps

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts and your app will be live!

## 📄 Contact Information

- **Phone**: +(1) 281-786-0706
- **Email**: info@visiontact.com
- **Houston Office**: 8990 Kirby Dr, Ste 220, Houston, TX 77054, USA
- **Dubai Office**: Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, UAE

## 📝 Notes

- All data is mocked - no backend required
- Voice features require browser support (Chrome/Edge recommended)
- Rubrics persist in localStorage
- Video screening uses placeholder UI (no actual video recording)

## 🎯 Demo Usage

1. **Start on Homepage** - Experience the marketing website with animations
2. **Click "Try Demo"** - Navigate to the recruiter workspace
3. **Browse Jobs** - View all active job postings
4. **Select a Job** - See candidate pipeline and edit rubric
5. **View Candidates** - Check profiles, AI scores, and video screenings
6. **Use AI Assistant** - Click the floating AI button to interact
   - Try: "Shortlist top candidates for this job"
   - Try: "Generate an evaluation rubric for this role"
   - Try voice input by clicking the microphone icon

## 📜 License

This is a demo project created for evaluation purposes.

---

**Built with ❤️ using React, Tailwind CSS, and Framer Motion**
