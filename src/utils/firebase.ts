import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAlQEVERCwEzyO4JEcFdqFpHWw4omhL0Z4',
  appId: '1:935359468706:web:e7652b6a308b3f45d373fb',
  authDomain: 'sari-resto-df8bb.firebaseapp.com',
  measurementId: 'G-5SC8Y4NHC9',
  messagingSenderId: '935359468706',
  projectId: 'sari-resto-df8bb',
  storageBucket: 'sari-resto-df8bb.firebasestorage.app',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const firestore = getFirestore(app)

export { app, auth, firestore }
