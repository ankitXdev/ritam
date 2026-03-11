# Ritam Project Architecture & Audit

## 1. Overview
Ritam is a holistic meditation and wellness platform. It is a React-based single-page application (SPA) focused on delivering an aesthetic, premium user experience with curated meditations, sacred sounds, and progressive user tracking.

**Architecture Pattern:** Component-based UI architecture with a centralized routing system (react-router). It follows a standard React SPA pattern combined with simple state management (React Hooks) and direct Firebase integration for authentication.

## 2. Frameworks & Technology Stack
- **Core:** React (v19.2), React DOM, Javascript
- **Build Tool:** Vite (v7.2)
- **Routing:** React Router DOM (v7.12)
- **Styling:** Vanilla CSS (App.css, index.css, mobile.css) with CSS variables, Flexbox, and Grid. (Styled-components is installed but minimally used, primarily in one loader component).
- **Icons:** Lucide React
- **Backend/Auth:** Firebase (Authentication and Hosting configured)
- **Linting:** ESLint

## 3. Directory Structure
```
d:\sem 4 minor project\Ritam\
├── src/
│   ├── assets/                # Static assets (images, icons)
│   ├── components/            # Reusable UI components
│   │   ├── BottomNavigation.jsx   # Mobile bottom nav
│   │   ├── Sidebar.jsx            # Desktop/Drawer side nav
│   │   ├── TiltCardGrid.jsx       # 3D tilt card effect component
│   │   ├── EventRegistrationModal.jsx # Reusable modal
│   │   ├── Loader.jsx             # Loading animation
│   │   └── NotificationModal.jsx  # Notification UI
│   ├── pages/                 # Full route views
│   │   ├── LandingPage.jsx        # Pre-auth landing
│   │   ├── Onboarding.jsx         # Initial survey/flow
│   │   ├── Signup.jsx             # Auth registration
│   │   ├── Login.jsx              # Auth login
│   │   ├── HomePage.jsx           # Main dashboard
│   │   ├── ExplorePage.jsx        # Content discovery
│   │   ├── MeditationPage.jsx     # Meditation library
│   │   ├── SacredSoundsPage.jsx   # Audio library
│   │   └── ProfilePage.jsx        # User stats & settings
│   ├── App.jsx                # Main application component & routing
│   ├── main.jsx               # React entry point
│   ├── firebase.js            # Firebase initialization and config
│   ├── App.css                # Scoped component styles
│   ├── index.css              # Global styles and CSS variables
│   └── mobile.css             # Mobile responsive overrides
├── public/                # Public static files
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── firebase.json          # Firebase hosting/deployment config
```

## 4. System Architecture
- **Routing Layer (`App.jsx`):** Employs standard wrapper components holding `Routes` and `Route`. It implements basic route protection checking a centralized `user` state (populated via Firebase `onAuthStateChanged`). Unauthenticated users are redirected to `/`, while authenticated ones go to `/home`.
- **Component Layer:** Uses standard layout wrappers. Pages are built by composing foundational components like `BottomNavigation` and `Sidebar`.
- **State Management:** Localized state using React's `useState` and `useEffect`. Authentication state is managed globally at the `App.jsx` level.
- **Styling Strategy:** Global CSS variable tokens defined in `index.css` mapped to class names in `App.css`, with responsive logic managed through manual media queries in `mobile.css`.

## 5. Incomplete Components & Audit Findings
Based on the current state of the codebase, several components and features are in varying states of incompletion:

1. **Authentication:**
   - Facebook authentication buttons have "opacity: 0.5, cursor: 'not-allowed'" and no handler logic.
   - The password reset/forgot password functionality is stubbed but not implemented.
   - ReCaptcha implementations are present but their callback handlers are empty.

2. **Routing & Navigation:**
   - The Sidebar contains links to non-existent routes (`/wisdom-library`, `/events`, `/tour`, `/settings`, `/downloads`).
   - The Bottom Navigation works but does not handle safe-area insets effectively if deployed natively.
   - Landing page "Skip" logic goes to onboarding rather than gracefully degrading based on auth state.

3. **Content Pages:**
   - **`SacredSoundsPage.jsx`:** Contains hardcoded "placeholder-card" elements in the Recommended, Collections, and Music sections.
   - **`HomePage.jsx`:** Auto-scrolling logic uses generic horizontal scrolls with hard-coded values (`300px` scroll amounts) which may break on different screen sizes. No "Pause on hover" logic.
   - **`ExplorePage.jsx`:** Uses a custom `PeaceIcon` SVG inline because the appropriate icon wasn't available; could be moved to an icon file. Placeholder classes like `img-peacock`, `img-sun` are defined but no actual images are backed.
   

4. **Styling & Assets:**
   - Many background images refer to CSS classes that are either empty gradients or missing actual assets.
   - Styled-Components is installed (`package.json`) but only used in `Loader.jsx`, indicating an inconsistent styling pattern choice.

5. **Responsiveness:**
   - Mobile optimizations (`mobile.css`) exist but rely heavily on standard media queries and negative margins pulling things around rather than fluid layout structures.
