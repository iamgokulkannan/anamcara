// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import {
  getAuth,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js';
/* === Firebase Setup === */
/* IMPORTANT: Replace this with your own firebaseConfig when doing challenges */

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
/* === UI === */

/* == UI - Elements == */

const forgotPasswordButtonEl = document.getElementById('forgot-password');
forgotPasswordButtonEl.addEventListener('click', passwordReset);

const emailInputEl = document.getElementById('email-input');
const redirectSignIn = document.getElementById('sign-in-btn');
redirectSignIn.addEventListener('click', redirectToSignIn);

/* == UI - Event Listeners == */

/* === Main Code === */

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function passwordReset() {
  const email = emailInputEl.value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      alert('Check your mail !!! Password Reset link is sent to your mail ID');
      console.log('Password reset email sent!');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 3000);
      // You might want to provide feedback to the user, e.g., display a message
    })
    .catch((error) => {
      console.error(error.message);
      // Handle errors, e.g., display an error message to the user
    });
}

/* == Functions - UI Functions == */

function clearInputField(field) {
  field.value = '';
}

function clearAuthFields() {
  clearInputField(emailInputEl);
  clearInputField(passwordInputEl);
}

function redirectToSignIn() {
  window.location.href = 'login.html';
}
