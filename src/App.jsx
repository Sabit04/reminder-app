import { useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from 'firebase/auth'
import { auth, googleProvider } from './firebase'
import Dashboard from './components/Dashboard'
import './App.css'

async function startSignIn() {
  // Try popup first (smoother desktop UX). If the browser blocks it or
  // Cross-Origin-Opener-Policy rejects it, fall back to a full-page redirect,
  // which works universally including on mobile and strict browsers.
  try {
    await signInWithPopup(auth, googleProvider)
  } catch (err) {
    const popupFailed =
      err?.code === 'auth/popup-blocked' ||
      err?.code === 'auth/popup-closed-by-user' ||
      err?.code === 'auth/cancelled-popup-request' ||
      err?.code === 'auth/internal-error' ||
      err?.code === 'auth/web-storage-unsupported'
    if (popupFailed) {
      await signInWithRedirect(auth, googleProvider)
    } else {
      console.error(err)
    }
  }
}

export default function App() {
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    // Handle the response when the user lands back after a redirect sign-in.
    getRedirectResult(auth).catch((err) => console.error('redirect result', err))

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setAuthReady(true)
    })
    return unsub
  }, [])

  if (!authReady) {
    return <div className="center-screen">Loading…</div>
  }

  if (!user) {
    return (
      <div className="center-screen">
        <div className="login-card">
          <h1>Reminders</h1>
          <p>Your reminders, synced across every device.</p>
          <button className="primary" onClick={startSignIn}>
            Sign in with Google
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Reminders</h1>
        <div className="user">
          <span>{user.displayName || user.email}</span>
          <button className="ghost" onClick={() => signOut(auth)}>
            Sign out
          </button>
        </div>
      </header>
      <Dashboard userId={user.uid} />
    </div>
  )
}
