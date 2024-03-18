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

/**
 *
 *
 *
 *
 *
 */
('use strict');

/**
 * Mobile navbar toggle
 */

const navbar = document.querySelector('[data-navbar]');
const navToggler = document.querySelector('[data-nav-toggler]');

navToggler.addEventListener('click', function () {
  navbar.classList.toggle('active');
});

/**
 * Header active
 */

const header = document.querySelector('[data-header]');

const feature = document.getElementById('featuredd');
feature.addEventListener('click', scrollToFeatured);

const contact = document.getElementById('contactt');
contact.addEventListener('click', scrollToContact);

window.addEventListener('scroll', function () {
  header.classList[this.scrollY > 50 ? 'add' : 'remove']('active');
});

function scrollToFeatured() {
  const featuredDiv = document.getElementById('featured');
  featuredDiv.scrollIntoView({ behavior: 'smooth' });
}

function scrollToContact() {
  const contactDiv = document.getElementById('contact');
  contactDiv.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function () {
  // Get all elements with the class 'product-btn'
  var addToCartButtons = document.querySelectorAll('.product-btn');

  // Add a click event listener to each 'Add to Cart' button
  addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // You can customize this part to add the selected item to the cart
      // For now, let's just log a message to the console
      var productName = button
        .closest('.product-card')
        .querySelector('.card-title').innerText;
      var productPrice = button
        .closest('.product-card')
        .querySelector('.price').innerText;

      console.log('Added to cart:', productName, 'Price:', productPrice);
    });
  });
});

function updateQuantity(change) {
  var quantityElement = document.querySelector('.quantity');
  var currentQuantity = parseInt(quantityElement.innerText);
  var newQuantity = currentQuantity + change;

  // Ensure quantity doesn't go below 0
  if (newQuantity < 0) {
    newQuantity = 0;
  }

  // Update quantity display
  quantityElement.innerText = newQuantity;
}

/**
 * 
 CART
 */

// ... (Existing code)

// Add a click event listener to the cart button
// Example: Assuming your cart button has an ID of 'cartButton'

// Function to show the cart contents
// Function to handle cart display
// Define an array to store cart items
let cartItems = [];

// Function to open the cart display
function openCartDisplay() {
  document.getElementById('cartDisplay').style.display = 'block';
}

// Function to close the cart display
function closeCartDisplay() {
  document.getElementById('cartDisplay').style.display = 'none';
}

// Function to display items in the cart and update cart count
function displayCartItems() {
  const cartItemList = document.getElementById('cartItemList');
  cartItemList.innerHTML = ''; // Clear previous items

  // Iterate through each item in the cartItems array and create list items to display them
  cartItems.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - ${item.price} - Quantity: ${item.quantity}
      <button class="increment" data-name="${item.name}">+</button>
      <button class="decrement" data-name="${item.name}">-</button>
    `;
    cartItemList.appendChild(li);
  });

  // Update the cart count near the cart button
  const cartCountElement = document.querySelector('.cart-btn .span');
  cartCountElement.textContent = `Cart (${calculateTotalItems()})`;

  // Update the total amount
  const totalAmountElement = document.getElementById('totalAmount');
  totalAmountElement.textContent = calculateTotalAmount().toFixed(2);
}

// Function to calculate total number of items in the cart
function calculateTotalItems() {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}

// Function to calculate total amount in the cart
function calculateTotalAmount() {
  return cartItems.reduce(
    (total, item) => total + parseFloat(item.price.slice(1)) * item.quantity,
    0
  );
}

// Function to handle adding item to cart
function addToCart(event) {
  // Prevent the default behavior of the anchor tag
  event.preventDefault();

  // Get the parent element of the button, which is the product card
  const productCard = event.target.closest('.product-card');

  // Get product details such as name, price, etc.
  const productName = productCard.querySelector('.card-title').textContent;
  const productPrice = productCard.querySelector('.price').textContent;

  // Check if the product already exists in the cart
  const existingItem = cartItems.find((item) => item.name === productName);

  if (existingItem) {
    // If the item already exists, increase its count
    existingItem.quantity++;
  } else {
    // If the item does not exist, add it to the cart
    cartItems.push({ name: productName, price: productPrice, quantity: 1 });
  }

  // Update the cart display
  displayCartItems();
}

// Function to handle incrementing item quantity
function incrementQuantity(event) {
  const productName = event.target.getAttribute('data-name');
  const item = cartItems.find((item) => item.name === productName);
  if (item) {
    item.quantity++;
    displayCartItems();
  }
}

// Function to handle decrementing item quantity
function decrementQuantity(event) {
  const productName = event.target.getAttribute('data-name');
  const item = cartItems.find((item) => item.name === productName);
  if (item && item.quantity > 1) {
    item.quantity--;
    displayCartItems();
  }
}

// Function to initialize event listeners
function initializeCart() {
  // Attach click event listener to the cart button
  document
    .querySelector('.cart-btn')
    .addEventListener('click', openCartDisplay);

  // Attach click event listener to the close button in the cart display
  document
    .querySelector('.close-cart')
    .addEventListener('click', closeCartDisplay);

  // Attach click event listener to add to cart buttons
  const addToCartButtons = document.querySelectorAll(
    '.product-card .product-btn'
  );
  addToCartButtons.forEach((button) =>
    button.addEventListener('click', addToCart)
  );

  // Attach click event listener to increment buttons
  document
    .querySelectorAll('.increment')
    .forEach((button) => button.addEventListener('click', incrementQuantity));

  // Attach click event listener to decrement buttons
  document
    .querySelectorAll('.decrement')
    .forEach((button) => button.addEventListener('click', decrementQuantity));
}
// Add a click event listener to the cart button
// Example: Assuming your cart button has an ID of 'cartButton'
// Function to open the cart display
// Add a click event listener to the cart button
document.addEventListener('DOMContentLoaded', function () {
  const cartButton = document.getElementById('cart-btn'); // Use the same ID 'cart-btn'
  cartButton.addEventListener('click', function (event) {
    event.preventDefault();
    // Toggle the visibility of the cart display
    const cartDisplay = document.getElementById('cartDisplay');
    if (cartDisplay.style.display === 'block') {
      closeCartDisplay();
      console.log('cart closed');
    } else {
      openCartDisplay();
      console.log('cart opened');
    }
  });
});

// Function to open the cart display
function openCartDisplay() {
  const cartDisplay = document.getElementById('cartDisplay');
  cartDisplay.style.display = 'block';
}

// Function to close the cart display
function closeCartDisplay() {
  const cartDisplay = document.getElementById('cartDisplay');
  cartDisplay.style.display = 'none';
}

// JavaScript for opening and closing cart panel
document.addEventListener('DOMContentLoaded', function () {
  const cartBtn = document.getElementById('cart-btn');
  const cartPanel = document.getElementById('cartPanel');
  const closeCartBtn = document.querySelector('.close-cart');

  // Open cart panel
  cartBtn.addEventListener('click', function () {
    cartPanel.style.right = '0'; // Slide in from right
  });

  // Close cart panel
  closeCartBtn.addEventListener('click', function () {
    cartPanel.style.right = '-30%'; // Slide out to right
  });
});

// Call the initialize function when the page loads
window.addEventListener('DOMContentLoaded', initializeCart);
