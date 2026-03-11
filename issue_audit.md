# Phase 2 — Issue Audit

## Audit Categories

### 1. Critical Errors
| Priority | Issue | File | Fix Strategy |
| :--- | :--- | :--- | :--- |
| **High** | Runtime Error: `auth` is not defined in `handleSignOut`. | `src/components/Sidebar.jsx` | Import `auth` from `firebase.js` or manage auth via context to prevent a crash when a user attempts to sign out. |
| **Medium** | Missing Fallback Component Error Catching | `src/App.jsx` | Implement an Error Boundary to catch UI rendering crashes globally. |

### 2. Architecture Issues
| Priority | Issue | File | Fix Strategy |
| :--- | :--- | :--- | :--- |
| **High** | Tightly Coupled Modules & Huge File Size | `src/pages/HomePage.jsx` | Extract sections (Streak Card, Recommendation Scroll, Event Card) into separate, reusable components to improve maintainability and separation of concerns. |
| **Medium** | Imperative DOM manipulation for scrolling | `src/pages/HomePage.jsx` | The hardcoded `300px` scroll value is fragile across breakpoints. Calculate card width dynamically or use CSS scroll-snapping combined with state. |
| **Medium** | Hardcoded Mock Data | `src/pages/SacredSoundsPage.jsx`, `ExplorePage.jsx` | Move hardcoded array data (e.g., chants, filters) outside the component or into a centralized data/state management store to simulate an API request. |

### 3. Security Issues
| Priority | Issue | File | Fix Strategy |
| :--- | :--- | :--- | :--- |
| **Medium** | No rate limiting on OTP requests | `src/pages/Login.jsx`, `src/pages/Signup.jsx` | Implement request debouncing and UI cooldowns for the "Send OTP" button to deter abuse of the Firebase Auth API. |
| **Low** | Missing route guards for specific onboarding steps | `src/App.jsx` | Unauthenticated users can access `/onboarding` endlessly. Ensure state tracking confirms if a user has completed onboarding before allowing access to `/home`. |

### 4. Performance Issues
| Priority | Issue | File | Fix Strategy |
| :--- | :--- | :--- | :--- |
| **Medium** | Unnecessary Re-renders | `src/pages/HomePage.jsx` | Modal and Sidebar toggle states sit at the top of the component tree, causing the entire dashboard (including animations) to re-render when toggled. Extract toggles or use `React.memo`. |
| **Medium** | Unoptimized SVGs and DOM nodes | `src/components/Loader.jsx`, `ExplorePage.jsx` | Inline SVGs and complex CSS animations (especially infinite loaders) can cause CPU spikes. Move static SVGs to external assets or optimize vector paths. |
| **Low** | Missing Image/Asset Caching | `App` wide | Implement caching headers or a service worker to prevent large assets (`meditating_guru.jpg`, `ritam_logo.jpg`) from being re-fetched continuously. |

### 5. Incomplete Features
| Priority | Issue | File | Fix Strategy |
| :--- | :--- | :--- | :--- |
| **High** | Missing Auth Providers & Routes | `src/pages/Login.jsx`, `App.jsx` | Facebook log in is grayed out. "Forgot Password" is just a button. The Sidebar references missing routes (`/wisdom-library`, `/events`, `/tour`). |
| **High** | Missing Backend/Database Integration | `App` wide | Streaks, tracking, event registrations, and user playlists are purely UI mockups. Connect to Firestore to track and persist this user data. |
| **Medium** | Placeholder Content | `src/pages/SacredSoundsPage.jsx` | Remove empty `.placeholder-card` divs and replace them with mapping logic when the actual content is available. |


## Project Completion Roadmap (Features Needed)

To cross the finish line and consider this project "complete," the following features and logical connections must be finalized:

- **Database / Backend Integration:**
  - Setup Firestore (or similar database) to fetch dynamic meditations, sounds, and categorized content.
  - Implement a user schema in the database to map a Firebase Auth UID to their stats, streaks, and saved preferences.
- **Finished Authentication Flow:**
  - Build and connect the "Forgot Password" logic.
  - Formally handle the onboarding survey responses (e.g., save their chosen goals to the DB).
  - Connect or remove the Facebook OAuth provider button.
- **Audio & Video Player:**
  - Implement a persistent, global audio player so users can listen to a meditation or sacred sound without audio cutting out when they navigate across pages.
- **User Dashboard & Tracking:**
  - Make the "Streak" system functional (calculate daily logins based on database timestamps).
  - Finish the Profile Page stats (dynamically count the user's listened minutes and sessions).
- **Missing Pages Implementation:**
  - Build the `/wisdom-library`, `/events`, `/tour`, `/settings`, and `/downloads` views that are currently referenced by the Sidebar.
- **Interactive UI Logic:**
  - Connect the "Register Now / Add to Calendar" modal in the Home and Event pages to actually generate `.ics` files or save to the user's profile.
  - Make the `Filters` (All, Popular, Beginners, etc.) in the Meditation and Sacred Sounds pages actually filter the rendered content arrays.
