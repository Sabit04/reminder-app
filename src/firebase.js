// Firebase configuration.
// These values are SAFE to commit publicly — they only identify the project.
// Security is enforced by Firestore security rules (see firestore.rules).

import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCp9AV7hy3OYJ-PTl8Np6oq6hoALIfjdZc',
  authDomain: 'personal-reminder-891c2.firebaseapp.com',
  projectId: 'personal-reminder-891c2',
  storageBucket: 'personal-reminder-891c2.firebasestorage.app',
  messagingSenderId: '1017274597647',
  appId: '1:1017274597647:web:bd3bac9a7c40bca013be7a',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
