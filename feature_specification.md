# 🌿 Ritam — Production Feature Specification

> **Platform:** Ritam — Premium Meditation & Wellness Platform
> **Stack:** React · Vite · Firebase (Auth, Firestore, Hosting) · Vanilla CSS
> **Purpose:** Complete feature checklist to transition from MVP to a production-ready application.

---

## 📌 Feature Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Already exists in codebase |
| 🔨 | Needs to be built |
| ⚡ | High priority — build first |
| 🔁 | Nice to have — build later |

---

## 1. 🔐 Authentication & Identity

> How users securely access their inner wellness journey.

### Core Auth (Firebase)
- ✅ User registration with email + password
- ✅ User login with email + password
- ✅ User logout function
- ✅ Core route protection (`/home` restricted to signed-in users)
- ✅ Complete "Forgot Password" / Password Reset flow
- ✅ Persistent auth state across page reloads (loading state handling)

### Passwordless & Social Login
- ✅ Complete Phone Number (OTP) authentication flow (UI built, ReCaptcha callback needs test)
- ✅ Complete Google OAuth2 login flow (UI built, hook up popup logic safely)
- ✅ Facebook OAuth2 login (`/auth/facebook`)
- ✅ Apple Sign-in (crucial for iOS demographics)

### User Profiling
- ✅ Onboarding goal selection UI
- ✅ Save onboarding goals (Stress, Sleep, Focus) to user's Firestore document upon signup
- ✅ Fetch user's first name to display on the Dashboard ("Good Evening, Ankit" -> Dynamic)
- ✅ Allow users to upload a profile avatar/picture

---

## 2. 🧘‍♀️ Content Delivery & Media (The Core Experience)

> Serving meditations, breathwork, and sacred sounds flawlessly.

### Content Library (Database)
- ✅ Migrate hardcoded data (meditations, chants) to Firestore collections
- ✅ Dynamic fetching of content based on categories (Sleep, Beginners, Advanced)
- ✅ Search functionality to query meditations/sounds by name or metadata
- ✅ Content recommendation engine based on onboarding goals

### Audio/Video Player Experience
- ✅ Persistent Global Audio Player (keeps playing while navigating between Explore, Home, Profile)
- ✅ Background audio support (MediaSession API) so audio controls appear on mobile lock screens
- ✅ Pause/Play, Skip, and Volume UI controls
- 🔁 Offline mode / Download meditations for offline listening

---

## 3. 🌱 Progress & Habit Tracking

> Gamifying mindfulness through the "10 Days, One Tree" system.

### The Streak System
- ✅ Track daily login/meditation event in Firestore (lastActive timestamp)
- ✅ Calculate current streak dynamically based on consecutive days of activity
- ✅ Activate the "Tree Lighting" SVG animation dynamically when Streak >= 10
- ✅ Streak milestone notifications (e.g., "You planted a tree!")

### User Statistics
- 🔨 Log every completed meditation session (Topic, Duration, Timestamp)
- 🔨 Calculate total "Mindful Minutes" and display on Profile Page
- 🔨 Generate habit charts/calendars on the Profile Page

---

## 4. 📅 Community & Live Events

> Connecting meditators worldwide through scheduled drops-ins.

### Event Registration
- ✅ Event Modal UI for "Daily Drop In"
- 🔨⚡ Generate `.ics` or `.cal` files when clicking "Add to Calendar"
- 🔨 Connect "Register Now" button to backend to decrement available spots (if applicable) and send confirmation email
- 🔨 Fetch upcoming dynamic events from Firestore rather than hardcoding

### Community Hub
- 🔨 Display real live counts of active users on the platform ("1069 Meditators" -> Dynamic)
- 🔁 Display user avatars of friends/community members currently meditating
- 🔁 "Invite a Friend" referral system

---

## 5. 🛠️ Personalization & Tools

> Empowering users to tailor their wellness experience.

### Custom Routines & Playlists
- 🔨 "My Playlists" creation (Select multiple tracks and save as a custom sequence)
- 🔨 "Customize Your Routine" mixer (Overlay nature sounds, chimes, and silence)
- 🔨 Save custom routines to user's Firestore Profile
- 🔨 "Add to Shortcut" functionality for quick access from the Dashboard

### Specialized UI States
- 🔨⚡ Real-time greeting update based on user's timezone (Good Morning / Afternoon / Evening)
- 🔁 Dynamic theme shifts (e.g., darker backgrounds automatically turning on past 8 PM for wind-down)

---

## 6. 🛡️ Security, Performance & UX

> Ensuring the sanctuary remains fast and secure.

### Performance
- 🔨⚡ Lazy loading for Explore/Meditation grid images to improve initial paint time
- 🔨⚡ Fix auto-scrolling logic on Home page (replace raw DOM manipulation with CSS Snap or safe refs)
- 🔨 Optimize SVG assets (Loader.jsx) and remove unnecessary React re-renders higher up the tree
- 🔨 Add a Service Worker to cache UI assets (PWA support)

### Security (Firebase)
- 🔨⚡ Setup Firestore Security Rules (Users can only read/write their own profiles)
- 🔨 Setup Storage Rules (If implementing avatar uploads)
- 🔨 Strict environment variable management (`.env.production` for API keys)

---

## 7. 👨‍💻 Admin & Content Management

> Internal tools to easily add new meditations without pushing code.

### Admin Dashboard (Separate Route/App)
- ✅ Simple admin panel to Add/Edit/Delete Meditations, Sounds, and Events.
- ✅ Upload audio files securely to Firebase Storage from the Admin Panel.
- ✅ Track overall platform analytics (Total users, popular meditations).

---

## 📊 Priority Execution Summary

### ⚡ Phase 1 — Core Stability & Data (Build Immediately)
> Without these, the app is just a beautiful mockup.

1. Finalize Firebase Auth (Google OAuth, Phone Auth, Forgot Password).
2. Create Firestore database schema: `users`, `meditations`, `events`.
3. Save onboarding data to the user profile and dynamically render the Home Page greeting.
4. Replace hardcoded arrays in Meditation & Sacred Sounds pages with live Firestore queries.
5. Create a persistent, functional audio player component to actually play the sounds.

### 🔨 Phase 2 — Habit & Tracking (Build Next)
> The features that keep users coming back.

1. Implement the database logic for "Mindful Minutes" and timestamp logging.
2. Build the Streak calculator and wire it to the "10 Days, One Tree" animation.
3. Make the categories/filters (Sleep, Focus, etc.) functional.
4. Implement "Add to Calendar" for live events.

### 🔁 Phase 3 — Personalization & Scale (Build Later)
> Features to elevate it to a premium-tier product.

1. Custom Playlists & Routine Mixer.
2. Admin Dashboard for uploading new content.
3. Offline caching / PWA support.
4. Referral system & community live-counts.

---

*Ritam — Production Feature Specification | March 2026*
