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
const userProfilePictureEl = document.getElementById('user-profile-picture');
/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById('logged-out-view');
const viewLoggedIn = document.getElementById('logged-in-view');
const forgotPasswordButtonEl = document.getElementById('forgot-password');
forgotPasswordButtonEl.addEventListener('click', passwordReset);

const signInWithGoogleButtonEl = document.getElementById(
  'sign-in-with-google-btn'
);

const emailInputEl = document.getElementById('email-input');
const passwordInputEl = document.getElementById('password-input');

const signInButtonEl = document.getElementById('sign-in-btn');
const signOutButtonEl = document.getElementById('sign-out-btn');
const displayNameInputEl = document.getElementById('display-name-input');
const photoURLInputEl = document.getElementById('photo-url-input');
const updateProfileButtonEl = document.getElementById('update-profile-btn');
const userGreeting = document.getElementById('user-greeting');
const signUpEl = document.getElementById('create-account-btn');
/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener('click', authSignInWithGoogle);
signOutButtonEl.addEventListener('click', authSignOut);

signInButtonEl.addEventListener('click', authSignInWithEmail);
signUpEl.addEventListener('click', redirectToSignUp);

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

      if (user) {
        if (!user.emailVerified) {
          sendEmailVerification(auth.currentUser).then(() => {
            console.log(user);
            console.log('Verification email sent!');
            // Email Sent...
          });
        } else {
          console.log(user);
          console.log('User is already verified.');
        }

        console.log('Signed In with Google');

        // Redirect to index.html after 3 seconds
        setTimeout(() => {
          window.location.replace('index.html');
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

function authSignInWithEmail() {
  const email = emailInputEl.value;
  const password = passwordInputEl.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      clearAuthFields();
      console.log('Signed In Successfully');
      const user = userCredential.user;

      // Show greeting for 3 seconds
      showUserGreeting(userGreeting, user);
      setTimeout(() => {
        // Redirect to index.html after 3 seconds
        window.location.href = 'index.html';
      }, 3000);
    })
    .catch((error) => {
      clearAuthFields();
      console.error(error.message);

      // Check if the error is due to wrong email or password
      if (
        error.code === 'firebase/auth/user-not-found' ||
        error.code === 'firebase/auth/wrong-password'
      ) {
        alert('Please create your account and sign in');
      } else {
        alert(
          'Incorrect email or password. Please check your email and password and try again.'
        );
      }
    });
}

function passwordReset() {
  window.location.href = 'forgot_password.html';
}

function authSignOut() {
  signOut(auth)
    .then(() => {
      clearAuthFields();
      console.log('Signed Out Successfully');
    })
    .catch((error) => {
      console.error(error.message);
    });
}

document.addEventListener('DOMContentLoaded', function () {
  const signUpButton = document.getElementById('sign-in-btn');

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
  clearInputField(emailInputEl);
  clearInputField(passwordInputEl);
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

  if (displayName) {
    const userFirstName = displayName.split(' ')[0];
    // Use <br> for line break in HTML
    element.innerHTML = `<div style="text-align: center;">Hey !!! ${userFirstName}<br>Welcome to Anam Cara</div>`;
  } else {
    element.innerHTML = `<div style="text-align: center;">Hey !!!<br>Welcome to Anam Cara</div>`;
  }
}
function redirectToSignUp() {
  window.location.href = 'signup.html';
}
