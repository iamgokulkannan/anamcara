// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js';
/* === Firebase Setup === */
/* IMPORTANT: Replace this with your own firebaseConfig when doing challenges */
const firebaseConfig = {
  apiKey: 'AIzaSyCbpxUBAcuHx0YsJeQyQiu1VCUPtAKsmf4',
  authDomain: 'anam-cara-f3607.firebaseapp.com',
  projectId: 'anam-cara-f3607',
  storageBucket: 'anam-cara-f3607.appspot.com',
  messagingSenderId: '576876080986',
  appId: '1:576876080986:web:4e2ae5d419e57670f4cd63',
  measurementId: 'G-JGW0RGGM5L',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
/* === UI === */

/* == UI - Elements == */
const name = document.getElementById('display-name-input');
const viewLoggedOut = document.getElementById('logged-out-view');
const viewLoggedIn = document.getElementById('logged-in-view');
const signInWithGoogleButtonEl = document.getElementById(
  'sign-in-with-google-btn'
);
const userProfilePictureEl = document.getElementById('user-profile-picture');
const userNameInputButtonEl = document.getElementById('text-input');
const signOutButtonEl = document.getElementById('sign-out-btn');
const emailInputEl = document.getElementById('email-input');
const passwordInputEl = document.getElementById('password-input');
const signUpButtonEl = document.getElementById('sign-up-btn');
const signInButtonEl = document.getElementById('sign-in-btn');
/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener('click', authSignInWithGoogle);
signUpButtonEl.addEventListener('click', authCreateAccountWithEmail);
signOutButtonEl.addEventListener('click', authSignOut);
signInButtonEl.addEventListener('click', redirectToSignIn);
const userGreeting = document.getElementById('user-greeting');

/* === Main Code === */
onAuthStateChanged(auth, (user) => {
  if (user) {
    showLoggedInView();
    showUserGreeting(userGreeting, user);
    showProfilePicture(userProfilePictureEl, user);
    // ...
  } else {
    showLoggedOutView();
  }
});

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const userCredential = result;
      const user = userCredential.user;
      console.log(userCredential);
      console.log(user);

      if (user) {
        if (user.emailVerified) {
          sendEmailVerification(auth.currentUser).then(() => {
            console.log(user);
            console.log('Verification email sent!');
            // Email Sent...
          });
        } else {
          console.log(user);
        }
        console.log('Signed Up with Google');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 3000);
      } else {
        console.error('Google authentication failed');
      }

      return null;
    })
    .catch((error) => {
      console.error(error.message);
    });
}
document.addEventListener('DOMContentLoaded', function () {
  const signUpButton = document.getElementById('sign-up-btn');

  signUpButton.addEventListener('click', function () {
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');

    // Check if email and password are not empty
    if (emailInput.value.trim() === '' || passwordInput.value.trim() === '') {
      alert('Email and password cannot be empty!');
      return;
    }
  });
});

function authCreateAccountWithEmail() {
  const email = emailInputEl.value;
  const password = passwordInputEl.value;
  const userName = userNameInputButtonEl.value;

  // Password requirements
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z]{8,}$/;
  const isPasswordValid = passwordRegex.test(password);

  if (isPasswordValid == false) {
    alert(
      'Enter a password with atleast 8 characters, at least 1 uppercase letter, 1 lowercase letter'
    );
    return;
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Update the user's display name
        updateProfile(user, {
          displayName: userName,
        })
          .then(() => {
            // Display name updated successfully
            console.log('Display name updated successfully:', userName);
          })
          .catch((updateError) => {
            console.error('Error updating display name:', updateError.message);
          });

        // Send email verification
        sendEmailVerification(user)
          .then(() => {
            alert('Please check your email for verification!');
            setTimeout(() => {
              window.location.replace('index.html');
            }, 3000);
          })
          .catch((verificationError) => {
            console.error(
              'Error sending email verification:',
              verificationError.message
            );
          });
      })
      .catch((error) => {
        // Handle account creation error
        if (error.code === 'auth/email-already-in-use') {
          alert(
            'Email is already in use, try logging in using the sign-in option'
          );
          console.error('Error: Email is already in use');
        } else {
          console.error('Error creating account:', error.message);
        }
      });
  }
}

function authSignOut() {
  signOut(auth)
    .then(() => {
      clearAuthFields();
      console.log('Signed Out Successfully');
      window.location.href = 'signup.html';
    })
    .catch((error) => {
      console.error(error.message);
    });
}
/* == Functions - UI Functions == */
function showLoggedOutView() {
  hideView(viewLoggedIn);
  showView(viewLoggedOut);
}

function showLoggedInView() {
  hideView(viewLoggedOut);
  showView(viewLoggedIn);
}

function showView(view) {
  view.style.display = 'flex';
}

function hideView(view) {
  view.style.display = 'none';
}

function clearInputField(field) {
  field.value = '';
}

function clearAuthFields() {
  clearInputField(userNameInputButtonEl);
  clearInputField(emailInputEl);
  clearInputField(passwordInputEl);
}

function redirectToSignIn() {
  window.location.href = 'login.html';
}
function showProfilePicture(imgElement, user) {
  const photoURL = user.photoURL;

  if (photoURL) {
    imgElement.src = 'assets/images/default-profile-picture.png';
  } else {
    imgElement.src = 'assets/images/default-profile-picture.png';
  }
}

function showUserGreeting(element, user) {
  const displayName = user.displayName;
  console.log(user.displayName);
  if (displayName) {
    const userFirstName = displayName.split(' ')[0];
    element.innerHTML = `<div style="text-align: center;">Heya !!! ${userFirstName}<br>Welcome to Anam Cara</div>`;
  } else {
    // Handle the case where the user is not logged in
    element.innerHTML = `<div style='text-align: center;'>Heya !!!<br>Welcome to Anam Cara</div>`;
  }
}
