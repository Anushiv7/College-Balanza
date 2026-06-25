# College Balanza - Project TODO

## Core Features

### Phase 1: Database & Authentication
- [x] Set up database schema for user profiles and comparison history
- [ ] Implement Manus OAuth for user authentication
- [ ] Create user profile management endpoints
- [x] Implement comparison history storage and retrieval

### Phase 2: UI/UX Foundation
- [x] Implement dark/light mode toggle with persistence across pages
- [x] Create global theme provider and CSS variables for design system
- [x] Set up responsive layout framework with asymmetric design principles
- [x] Establish typography and spacing system

### Phase 3: Landing Page
- [x] Develop animated hero landing page inspired by steep.app
- [x] Implement floating product card motion graphics
- [x] Create clear call-to-action button to start comparing colleges
- [x] Add smooth scroll animations and micro-interactions

### Phase 4: College Comparison Page
- [x] Create college search and selection interface
- [x] Implement side-by-side comparison table with 8 required fields:
  - [x] Placements
  - [x] Location
  - [x] Faculty Review
  - [x] Fees
  - [x] ROI
  - [x] Industry Value
  - [x] Brand Value
  - [x] College Life
- [x] Build accordion rows for expandable details
- [x] Implement collapsible card sections
- [ ] Create tile/button slider navigation bar (inspired by whereby.com/resend.com)
- [x] Add comparison UI polish and micro-interactions

### Phase 5: LLM Integration & Data Aggregation
- [x] Implement LLM-powered college data aggregation with web search
- [x] Create data normalization pipeline for college information
- [x] Set up real-time data fetching from:
  - [x] College official websites
  - [x] Quora
  - [x] Reddit
  - [x] Google reviews and other review portals
- [x] Implement LLM-powered comparison summary generation
- [x] Create insightful written overview synthesis of college differences
- [ ] Add guardrails for minimal hallucination and factual accuracy

### Phase 6: Privacy & Legal
- [x] Create privacy policy page
- [x] Style privacy policy to match site aesthetics (not generic legal page)
- [x] Ensure privacy policy is accessible from footer/navigation

### Phase 7: Responsiveness & Polish
- [ ] Ensure full responsive design across all device sizes
- [ ] Implement smooth micro-interactions throughout
- [ ] Add snappy transitions and animations
- [ ] Test on mobile, tablet, and desktop viewports
- [ ] Optimize performance for all screen sizes

### Phase 8: Testing & Validation
- [ ] Write vitest tests for database operations
- [ ] Write vitest tests for LLM integration and data aggregation
- [ ] Write vitest tests for authentication flows
- [ ] Write vitest tests for comparison logic
- [ ] Test dark/light mode persistence
- [ ] Manual testing on multiple browsers and devices

## Technical Debt & Guardrails
- [ ] Implement spec-driven development practices
- [ ] Apply BDD with Gherkin syntax for AI agent interactions
- [ ] Ensure zero-trust security model
- [ ] Minimize LLM hallucination with proper prompting
- [ ] Avoid confused deputy problem in system design
- [ ] Ensure no security shortcomings in authentication and data handling
- [ ] Document all architectural decisions in YAML format

## Deployment & Documentation
- [ ] Prepare Kaggle Writeup (max 2,500 words)
- [ ] Create media gallery with screenshots/videos
- [ ] Record 5-minute demo video for YouTube
- [ ] Prepare GitHub repository with comprehensive README
- [ ] Document setup instructions and deployment steps
- [ ] Ensure code is free of API keys and sensitive data
