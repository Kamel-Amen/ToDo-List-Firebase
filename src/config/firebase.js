import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB_WTeR2s5EQ8Hd38GPxkNT1eHsrE7KL00',
  authDomain: 'todo-list-b7265.firebaseapp.com',
  projectId: 'todo-list-b7265',
  storageBucket: 'todo-list-b7265.appspot.com',
  messagingSenderId: '666962627045',
  appId: '1:666962627045:web:ed975026b8f917b54ac70c',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
