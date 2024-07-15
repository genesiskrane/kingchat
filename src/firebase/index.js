import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyDEL2cwK0FlUDNGtbiKmjO9a8nwkZPuH0s',
  authDomain: 'kingchatone.firebaseapp.com',
  projectId: 'kingchatone',
  storageBucket: 'kingchatone.appspot.com',
  messagingSenderId: '823871308697',
  appId: '1:823871308697:web:0f3d9948c7bf15df000908',
  measurementId: 'G-1JNZ7W1DS6'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const analytics = getAnalytics(app)

export { auth, analytics, signInWithEmailAndPassword, onAuthStateChanged, signOut }
