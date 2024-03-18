// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCbpxUBAcuHx0YsJeQyQiu1VCUPtAKsmf4',
  authDomain: 'anam-cara-f3607.firebaseapp.com',
  projectId: 'anam-cara-f3607',
  storageBucket: 'anam-cara-f3607.appspot.com',
  messagingSenderId: '576876080986',
  appId: '1:576876080986:web:4e2ae5d419e57670f4cd63',
  measurementId: 'G-JGW0RGGM5L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
