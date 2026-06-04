import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, remove } from 'firebase/database';

// Firebase configuration
// NOTE: Replace these with your Firebase project credentials
// Get these from Firebase Console: https://console.firebase.google.com/
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDemoKeyForLocalDevelopment",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "loan-tracker-demo.firebaseapp.com",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || "https://loan-tracker-demo-default-rtdb.firebaseio.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "loan-tracker-demo",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "loan-tracker-demo.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const database = getDatabase(app);

// Helper functions for database operations
export const getPeopleRef = () => ref(database, 'people');
export const getPersonRef = (personId) => ref(database, `people/${personId}`);
export const getLoansRef = (personId) => ref(database, `people/${personId}/loans`);
export const getLoanRef = (personId, loanId) => ref(database, `people/${personId}/loans/${loanId}`);

export const onPeopleChange = (callback) => {
  onValue(getPeopleRef(), callback);
};

export const addPerson = (personId, personData) => {
  return set(getPersonRef(personId), personData);
};

export const updateLoan = (personId, loanId, loanData) => {
  return set(getLoanRef(personId, loanId), loanData);
};

export const deleteLoan = (personId, loanId) => {
  return remove(getLoanRef(personId, loanId));
};
