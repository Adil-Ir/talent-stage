# TalentSage Frontend - Technical Documentation

## 1. Architecture Overview

### Application Structure

TalentSage is built as a single-page application (SPA) using React with a modular, component-based architecture. The application is divided into distinct domains:

**Domain Separation:**
- **Marketing**: Landing page components (Hero, Capabilities, Metrics, Contact)
- **Workspace**: Recruiter dashboard and job/candidate management
- **AI Assistant**: Chat interface with voice capabilities
- **Video Screening**: Candidate video review and AI analysis
- **Shared UI**: Reusable components (Button, Modal, Badge, Input, Select)

**Key Architectural Decisions:**

1. **Component Co-location**: Related components are grouped by feature domain rather than by type (components/ vs containers/), making the codebase easier to navigate and maintain.

2. **Page-Level Routing**: React Router v6 handles navigation with a clear separation between marketing and workspace routes, with a shared layout component for consistent navigation.

3. **Centralized State Management**: Zustand stores manage recruitment data and AI assistant state separately, avoiding prop drilling while maintaining simplicity.

4. **Mock Data Layer**: All data is defined in `src/data/mockData.js`, making it easy to understand the data structure and swap with real API calls in the future.

---

## 2. State Management Approach

### Zustand Store Architecture

We chose **Zustand** over Redux or Context API for several reasons:
- **Simple API**: No boilerplate, no actions/reducers complexity
- **Performance**: Fine-grained subscriptions prevent unnecessary re-renders
- **TypeScript-friendly**: Easy to type without complex configurations
- **Lightweight**: ~1KB minified
- **Middleware Support**: Built-in persistence middleware

### Store Structure

**recruitmentStore.js** - Main application state
```javascript
{
  jobs: [],           // All job postings
  candidates: [],     // All candidates across jobs
  rubrics: {},        // Job-specific evaluation criteria
  auditEvents: []     // Timeline of all actions
}
```

**Key Features:**
- **Persistence**: Rubrics automatically save to localStorage
- **Derived Selectors**: Functions like `getCandidatesByJob()` prevent data duplication
- **Automatic Audit Logging**: All state mutations create audit events
- **Consistency**: Stage changes update both candidate state and create audit trail

**assistantStore.js** - AI Assistant state
```javascript
{
  isOpen: boolean,
  messages: [],
  avatarState: 'idle' | 'listening' | 'thinking' | 'speaking',
  isListening: boolean,
  isSpeaking: boolean,
  currentJobId: string
}
```

### State Flow Example: Moving a Candidate

1. User selects new stage from dropdown
2. `updateCandidateStage(candidateId, newStage)` called
3. Store updates candidate's stage
4. Store creates audit event with timestamp, user, and metadata
5. All UI components subscribed to that candidate automatically re-render
6. Audit timeline shows new event
7. Candidate appears in new stage column

This single source of truth ensures **UI consistency** across all views.

---

## 3. Animation Approach

### Performance Philosophy

Animations must be smooth (60fps) without janking on average hardware. Our strategy:

**1. Use GPU-Accelerated Properties**
- Transform (translate, scale, rotate) - YES ✓
- Opacity - YES ✓
- Width/Height - AVOID (causes reflow)
- Top/Left - AVOID (use transform instead)

**2. Framer Motion for Declarative Animations**
- Handles animation lifecycle automatically
- Built-in spring physics
- Gesture support
- Exit animations with AnimatePresence

**3. Scroll-Based Reveals with IntersectionObserver**
```javascript
const ref = useRef(null);
const isInView = useInView(ref, { once: true, amount: 0.3 });
```
This triggers animations only when elements enter viewport, reducing initial load.

**4. Staggered Animations**
```javascript
const container = {
  staggerChildren: 0.1,  // 100ms delay visual interest
};
```

### Animation Inventory

| Feature | Type | Performance Notes |
|---------|------|-------------------|
| Hero entrance | Staged stagger | Sequential reveals create narrative |
| Capabilities carousel | 3D transform | `perspective` + `rotateY` for depth |
| Impact metrics | Count-up | RequestAnimationFrame for smooth counting |
| Scroll reveals | Opacity + translateY | Triggered by IntersectionObserver |
| Avatar states | Scale + rotate | Looping animations with different durations |
| Modal transitions | Scale + opacity | Fast 200ms for responsiveness |

### Fixed Header Performance

```javascript
style={{ height: '72px' }} // Fixed height prevents layout shift
```

**Why this matters:**
- No Cumulative Layout Shift (CLS) when header becomes sticky
- Text doesn't jump during scroll
- Improves Core Web Vitals score

---

## 4. UX Decisions & Rationale

### Design Language

**Color System:**
- **Primary (Blue)**: Trust, professionalism, technology
- **Accent (Purple)**: Innovation, creativity, premium feel
- **Semantic colors**: Green (success), Red (danger), Yellow (warning)

**Typography:**
- **Inter font family**: Modern, highly legible, great for data-heavy interfaces
- **Graduated font weights**: 300-800 for visual hierarchy

### Key UX Patterns

**1. Consistent State Indicators**
- Badge components show status at a glance
- Color-coded stages (Applied = Blue, Shortlisted = Purple, etc.)
- Loading states prevent user uncertainty

**2. Progressive Disclosure**
- Tabs organize complex information (Profile / Video / Audit)
- Expandable sections prevent cognitive overload
- Suggested actions guide user workflow

**3. Immediate Feedback**
- Hover states on all interactive elements
- Optimistic UI updates (stage changes reflect immediately)
- Success/error messages for all actions

**4. Accessibility Considerations**
- Semantic HTML (header, nav, main, section)
- ARIA labels on icon buttons
- Keyboard navigation support
- Focus visible states
- Sufficient color contrast ratios

### Rubric Editor UX

**Problem**: Users might create invalid rubrics (weights not totaling 100%)

**Solution**:
- Real-time weight calculation display
- Visual feedback (badge changes color when invalid)
- Disabled save button when invalid
- Clear error message explaining the issue

This prevents bad data while educating users about the requirement.

### AI Assistant Interaction Model

**Design Goal**: Make AI feel intelligent and responsive, not robotic

**Implementation**:
1. **Avatar States**: Visual feedback for what AI is doing
   - Idle: Gentle breathing animation
   - Listening: Pulsing waves (user knows mic is active)
   - Thinking: Rotating animation (processing)
   - Speaking: Sound wave visual (TTS active)

2. **Suggested Actions**: Reduce typing friction
   - Context-aware button suggestions
   - One-click command execution
   - Learn by example pattern

3. **Voice Fallback**: Graceful degradation
   - Text input always available
   - Clear UI when voice unsupported
   - No broken functionality

---

## 5. Voice AI Implementation

### Web Speech API Integration

**Speech Recognition (Input):**
```javascript
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;  // Single utterance
recognition.interimResults = false;  // Final results only
```

**Speech Synthesis (Output):**
```javascript
const utterance = new SpeechSynthesisUtterance(text);
utterance.onstart = () => updateAvatarState('speaking');
utterance.onend = () => updateAvatarState('idle');
```

**Browser Compatibility:**
- Chrome/Edge: Full support ✓
- Firefox: Recognition limited, synthesis works
- Safari: Partial support
- Fallback: Type-only mode

**UX Considerations:**
- Microphone button changes color when listening
- Transcript appears in input field (user can edit before sending)
- Voice playback optional (speaker icon on messages)

---

## 6. Video Screening Design

**Requirement**: Support video recording OR upload

**Implementation**: UI placeholder (real recording would require MediaRecorder API)

**Components:**
- **VideoReview**: Main interface with playback controls
- **AIScreeningSummary**: Structured display of analysis
  - Transcript section
  - Scoring breakdown with animated progress bars
  - Recommendation card

**Decision Flow:**
1. Recruiter plays video
2. Reviews AI analysis (scores, transcript, recommendation)
3. Makes decision (Pass / Hold / Reject)
4. Adds notes
5. Decision recorded in audit timeline

**Data Flow:**
```
candidate.videoScreening.decision = 'pass'
↓
updateVideoScreening(candidateId, newData)
↓
Zustand store updates
↓
Audit event created
↓
UI reflects new state
```

---

## 7. Testing Strategy

### Test Coverage

**Three Required Tests:**

1. **Candidate Stage Test** (`candidateStage.test.js`)
   - Verifies stage transitions update UI consistently
   - Checks audit events are created
   - Tests shortlist automation logic

2. **Rubric Validation Test** (`rubricValidation.test.js`)
   - Validates weight calculation
   - Tests rubric persistence
   - Detects invalid configurations

3. **Assistant Commands Test** (`assistantCommands.test.js`)
   - Verifies commands trigger real actions
   - Checks state updates flow through system
   - Tests message flow

**Testing Philosophy:**
- Focus on **behavior**, not implementation details
- Test **user workflows**, not individual functions
- Ensure**state consistency** across components

**Running Tests:**
```bash
npm test
```

### Manual Testing Checklist

- [ ] Marketing page loads with animations
- [ ] Header navigation works
- [ ] Jobs page search filters correctly
- [ ] Rubric editor validates weights
- [ ] Candidate stage changes update everywhere
- [ ] AI assistant commands execute
- [ ] Voice input/output works (Chrome)
- [ ] Video screening decisions save
- [ ] Audit timeline shows all events
- [ ] Mobile responsive (375px, 768px, 1440px)

---

## 8. Performance Optimizations

### Bundle Size
- Framer Motion tree-shaking: Import only used features
- Lucide React: Individual icon imports
- Code splitting: React.lazy for future routes (if needed)

### Rendering Optimizations
-Zustand selectors: Subscribe only to needed state slices
- React.memo: For expensive list renders (if needed)
- Debounced search: 300ms delay prevents excessive filtering

### Animation Performance
- Will-change CSS property for animations
- Transform/opacity only (GPU accelerated)
- RequestAnimationFrame for counter animations

### Loading Strategy
- Fonts loaded asynchronously
- Images lazy-loaded with native loading="lazy"
- Intersection Observer for scroll animations (not scroll listeners)

---

## 9. Future Enhancements

**Backend Integration:**
- Replace mock data with REST/GraphQL API
- Add authentication (JWT tokens)
- Real-time updates with WebSockets

**Video Screening:**
- Implement MediaRecorder API for actual recording
- Upload to cloud storage (S3/Cloudinary)
- Real AI analysis integration

**Advanced Features:**
- Drag-and-drop candidate stage management
- Bulk actions on candidates
- Email notifications
- Calendar integration for interviews
- Advanced filtering and search

**Accessibility:**
- WCAG 2.1 AAA compliance
- Screen reader optimization
- Keyboard-only navigation
- Reduced motion preferences

---

## 10. Deployment

### Build Process
```bash
npm run build  # Creates optimized production bundle
```

**Output:** `dist/` directory with:
- Minified JavaScript
- Optimized CSS
- Compressed assets
- Source maps

### Recommended Platform: Vercel

**Why Vercel:**
- Zero-config Vite deployments
- Automatic HTTPS
- Global CDN
- Preview deployments for PRs
- Great DX with CLI

**Deploy Steps:**
```bash
vercel  # First time setup
vercel --prod  # Production deployment
```

### Environment Variables
Currently none needed (all client-side), but for future:
- `VITE_API_URL`: Backend API endpoint
- `VITE_ANALYTICS_ID`: Analytics tracking

---

## 11. Code Organization Principles

**1. Component Structure:**
```
ComponentName.jsx
├── Imports
├── Component function
│   ├── Hooks
│   ├── State
│   ├── Handlers
│   └── Return JSX
└── Export
```

**2. File Naming:**
- React components: PascalCase (Button.jsx)
- Utilities: camelCase (helpers.js)
- Stores: camelCase (recruitmentStore.js)

**3. Import Order:**
1. React core
2. Third-party libraries
3. Components
4. Stores/hooks
5. Utils/helpers
6. Styles (if any)

**4. Documentation:**
- Complex functions have JSDoc comments
- Component props explained inline
- Non-obvious logic has explanation comments

---

## 12. Key Learnings & Trade-offs

**What Went Well:**
- Zustand simplified state management significantly
- Framer Motion made animations straightforward
- Tailwind CSS v4 speeds up styling iteration
- Component co-location improved code discoverability

**Trade-offs Made:**
- Mock data instead of real backend (faster prototyping)
- Placeholder video UI instead of real recording (scope management)
- Simple tests instead of exhaustive coverage (time constraint)
- Client-side only (no SSR) for simplicity

**If Building Production Version:**
- Add comprehensive error boundaries
- Implement retry logic for failed operations
- Add optimistic UI with rollback
- Include comprehensive logging
- Add E2E tests with Playwright
- Implement proper authentication flows
- Add data validation schemas (Zod)

---

**Document Version:** 1.0  
**Last Updated:** February 10, 2026  
**Author:** TalentSage Development Team
