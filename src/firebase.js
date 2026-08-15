import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCAKPwkzamIwaGe1YyUBbIMR6h2YgjPoW0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "srikar-fire.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "srikar-fire",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "srikar-fire.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "113863246124",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:113863246124:web:8a2cf9702fc8bcf77aec89",
}

// STEP 3: Config Validation Check
const requiredKeys = ['VITE_FIREBASE_API_KEY', 'VITE_FIREBASE_AUTH_DOMAIN', 'VITE_FIREBASE_PROJECT_ID', 'VITE_FIREBASE_APP_ID']
const missingKeys = requiredKeys.filter(key => !import.meta.env[key])

if (missingKeys.length > 0) {
  console.error(`FIREBASE CONFIG ERROR: Missing ${missingKeys.join(', ')}`)
} else {
  console.log('Firebase initialized successfully')
}

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const db = getFirestore(app)
export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export { 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  doc,
  setDoc,
  getDoc
}
export default app
