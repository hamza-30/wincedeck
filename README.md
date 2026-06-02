# WinceDeck

**Know when your app breaks. Before your users tell you.**

WinceDeck is a real-time error monitoring dashboard for web developers. Add a single script tag to any website and every JavaScript error that occurs — on any user's browser, anywhere in the world — gets captured and sent to your dashboard instantly.

---

## Live Demo

[wincedeck.vercel.app](https://wincedeck.vercel.app)

---

## How It Works

1. Sign up and create a project
2. Copy the generated script tag into your website's `<head>`
3. Every unhandled JavaScript error on your site is captured and sent to WinceDeck in real time
4. View, filter, analyze and mark errors resolved or unresolved on your project page

---

## Features

### Dashboard

- Overview of all monitored projects
- Each project card shows errors today and last error time
- Real-time updates — new projects and stats appear instantly
- Project status indicator — active or idle based on recent error activity

### Project Page

- **Stats cards** — total errors, errors today, affected pages, last error time
- **Error frequency chart** — bar chart showing errors per hour for the last 24 hours
- **Error table** — grouped by message and source so duplicate errors are consolidated into one row with a count
- **Error resolution** — mark grouped errors as resolved to clear them from your active view, and unresolve them if the bug resurfaces
- **Stack trace** — click any error row to expand the full stack trace with captured time and page URL
- **Filters** — filter by date range (Today, Last 7 days, Last 30 days, All time), search by error message, filter by page URL
- **Real-time streaming** — new errors appear at the top without refreshing
- **Integration script** — always visible with a one-click copy button

### Settings

- Rename project
- Delete project with confirmation — also cleans up all associated error logs and resolution states from Firestore

### Tracker

- Captures `window.onerror` — all synchronous JavaScript errors
- Captures `unhandledrejection` — failed promises and unhandled async errors
- Sends error data via fetch to Firestore REST API — no SDK dependency on the tracked site
- Works on any website with a single script tag

---

## Tech Stack

| Technology             | Purpose                                                 |
| ---------------------- | ------------------------------------------------------- |
| React 19 + Vite        | Frontend framework and build tool                       |
| Tailwind CSS v4        | Styling and responsive layout                           |
| React Router v7        | Client-side routing and protected routes                |
| Firebase Auth          | Authentication — signup, login, logout, password reset  |
| Firebase Firestore     | Project and error data storage with real-time listeners |
| Recharts               | Error frequency bar chart                               |
| React Hook Form        | Form handling for auth and settings                     |
| Sonner                 | Toast notifications                                     |
| Motion                 | Animations                                              |
| Inter + JetBrains Mono | Typography                                              |

---

## Architecture

WinceDeck follows a layered architecture where each layer has a single responsibility:

```
Firestore / Firebase Auth
        ↓
Services (authService.js, firestoreService.js)
        ↓
Custom Hooks (useAuth, useErrors, useProject, useProjects, useProjectStats, useResolvedErrors)
        ↓
Context (AuthContext — shares auth state app-wide)
        ↓
Components (receive ready-to-render data, no data logic)
```

**Services** — raw Firebase calls with no React dependency

**Hooks** — wrap services in React state, handle loading and error states, return processed data ready for components

**Context** — AuthContext runs useAuth once at the app root and shares the result everywhere via useAuthContext(), preventing multiple Firebase listeners

**Components** — receive processed data as props, only responsible for rendering

---

## Key Implementation Details

**Error Grouping**
Errors with the same message and source are grouped into a single row with a running count. This prevents the dashboard from flooding with duplicate entries when the same bug occurs repeatedly. Each grouped error tracks count, lastSeen, and all individual occurrences remain in Firestore for full history.

**Error Resolution Status**
Resolution states are decoupled from the raw error logs. The `useResolvedErrors` hook stores resolution metadata in a separate collection. It generates a unique composite key by Base64 encoding the error message and source (`btoa(message + "__" + source)`). This ensures the core error tracker can remain append-only, while still giving users the ability to toggle an error group's status between "active" and "resolved."

**Tracker Script**
tracker.js is a self-contained vanilla JavaScript file hosted at the root of the deployment. It reads the project ID from its own src URL parameter and sends errors directly to the Firestore REST API — no Firebase SDK, no npm install, no build step required on the tracked site.

```html
<script src="https://wincedeck.vercel.app/tracker.js?id=YOUR_PROJECT_ID"></script>
```

**Real-Time Listeners**
All Firestore reads use onSnapshot listeners rather than one-time fetches. Error tables, stats cards, and project lists update instantly when new data arrives without any manual refresh.

**Lightweight Dashboard Stats**
The dashboard uses a separate useProjectStats hook per project card instead of the full useErrors hook. This fetches only errorsToday and lastErrorTime per card, keeping the dashboard lightweight while the full error processing stays scoped to the project page.

**Delete Cascade**
Firestore does not cascade delete subcollections. When a project is deleted, deleteProject in useProject manually deletes all documents in the errors/{projectId}/logs and resolvedErrors/{projectId}/groups subcollections before deleting the project document itself.

---

## Firestore Structure

```
projects/
  {projectId}/
    name: "GitAtlas"
    userId: "firebase-user-uid"
    createdAt: "2026-05-01T10:00:00Z"

errors/
  {projectId}/
    logs/
      {errorId}/
        message: "TypeError: Cannot read properties of null"
        source: "http://localhost:5174/src/Analyzer.jsx"
        line: 142
        stack: "TypeError: ..."
        url: "https://gitatlas-web.vercel.app/analyzer/torvalds"
        type: "javascript"
        timestamp: "2026-05-01T14:32:07.611Z"
        projectId: "px_lf2k8s4"

resolvedErrors/
  {projectId}/
    groups/
      {base64Key}/
        resolvedAt: "2026-06-02T22:15:00.000Z"
        resolvedBy: "firebase-user-uid"
```

---

## Firestore Security Rules

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }

    match /errors/{projectId}/logs/{logId} {
      allow write: if true;
      allow read: if request.auth != null;
    }

    match /resolvedErrors/{projectId}/groups/{groupId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Write access to the errors collection is open so the tracker script can send errors from any external website without authentication. Read access requires a logged-in user.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Firestore and Authentication enabled

### Installation

```bash
git clone https://github.com/hamza-30/wincedeck.git
cd wincedeck
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Run Locally

```bash
npm run dev
```

---

## Known Limitations

- Tracker captures public events only — errors in browser extensions or cross-origin iframes may not be captured
- Error timestamps are stored in UTC and displayed in the user's local browser timezone

---

## License

MIT
