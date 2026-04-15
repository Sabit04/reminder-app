# Reminder App

A full-stack personal reminder dashboard with real-time sync across devices.

**Stack:** React (Vite) · Firebase Auth (Google) · Firestore · Firebase Hosting

## Features
- Google sign-in
- Add / complete / delete reminders, with optional due date & note
- Real-time sync across every signed-in device via Firestore `onSnapshot`
- Filter by All / Active / Done
- Overdue indicator

## Performance notes
- `React.memo` on `ReminderList` and `ReminderItem` so toggling one row
  doesn't re-render the other 49.
- `useCallback` on handlers in `Dashboard` to keep row props referentially stable.
- `useMemo` on derived filtered list and counts.
- Single `setState` per Firestore snapshot — batches all document changes
  into one render pass.

## Local development

```bash
npm install
npm run dev
```

Paste your Firebase web config into `src/firebase.js` before running.
The Firebase web API key is not a secret — it's safe to commit.

## Deployment
See `SETUP.md` for Firebase project creation and hosting steps.
