// Client side form validation = all required form controls are filled out, in the correct format by using validation attributes on form elements -  https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation

// Constraint validation = Use of types - https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Constraint_validation

// Data validation with Regular Expressions - RegEx - https://html.com/attributes/input-pattern/

const form = document.getElementById('form');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
// Calling it password1El not password1 to show it's the element not the password value itself
const messageContainer = document.querySelector('.message-container');
// For selecting an element or by class - Note, need the . if a class
const message = document.getElementById('message');
// Text that's going to change within message container

let isValid = false;
// by default don't have a valid form
let passwordsMatch = false;

function validateForm() {
    // Use HTML constraint API to check form validity
    isValid = form.checkValidity();
    console.log(isValid);
    // If the form isn't valid
    // If want to disable HTML validation and do all the validation in JavaScript -  add <form id='form' novalidate> in HTML - Lets user submit empty form, but will not be valid
    if (!isValid) {
        // Style main message for an error - NOT valid
        message.textContent = 'Please fill out all fields.';
        message.style.color = 'red';
        messageContainer.style.borderColor = 'red';
        // if already failing, don't want to go through the rest of code so break out with a return statement
        // In dev tools ==> sources ==> script.js put a breakpoint beside isValid and if (!isValid) and at return and one below (that won't hit if return works) and add novalidate to HTML - If hover over code shows values true/false for isValid
        return;
    }
    // Check to see if both password fields match - The problem with HTML validation is if both fields meet the criteria will validate even if the passwords are different
    if (password1El.value === password2El.value) {
        // If they match, set value to true and borders to green
        passwordsMatch = true;
        password1El.style.borderColor = 'green';
        password2El.style.borderColor = 'green';
    } else {
        // If they don't match, border color of input to red, change message
        passwordsMatch = false;
        message.textContent = 'Make sure passwords match.';
        message.style.color = 'red';
        messageContainer.style.borderColor = 'red';
        password1El.style.borderColor = 'red';
        password2El.style.borderColor = 'red';
        return;
    }
    // If form is valid and passwords match
    if (isValid && passwordsMatch) {
        // Style main message for success
        message.textContent = 'Successfully Registered!';
        message.style.color = 'green';
        messageContainer.style.borderColor = 'green';
    }
}

function storeFormData() {
    // create a user Object
    const user = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        website: form.website.value,
        password: form.password.value,
    };
    // Do something with user data
    console.log(user);
}

function processFormData(e) {
    // pass in the event (e) as a parameter
    console.log(e);
    // When click register the console flashes for a second and page is refreshed - This is the default behavior of the form. It's trying to send this data to a server somewhere, but because not doing anything with that request, just refreshing the entire page. So to get around this - use the prevent default event method. Going to prevent it from trying to submit the form because again, there is no back end to accept it.
    e.preventDefault();
    // Validate Form -  validating, using constraint API. There's a method called check.validity() that can be run on form element. It returns a boolean indicating whether the element's value passes its constraints. Determines which of the pseudo classes :valid :invalid applies. - Useing it in the validateForm() function
    validateForm();
    // Submit Form if Valid
    if (isValid && passwordsMatch) {
        storeFormData();
    }
}

// Event Listener
form.addEventListener('submit', processFormData);

// https://rangle.io/blog/how-to-store-user-passwords-and-overcome-security-threats-in-2017/