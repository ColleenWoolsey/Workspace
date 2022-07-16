// Date Input - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date

// Date reference/Object - https://www.w3schools.com/jsref/jsref_obj_date.asp

// Returning String - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString

// String Split - https://www.w3schools.com/jsref/jsref_split.asp

// Prevent default when submitting form - https://www.w3schools.com/jsref/event_preventdefault.asp

// TO MAKE THE CLOCK COUNT DOWN  -   JavaScript timing events - https://www.w3schools.com/js/js_timing.asp - Info to call a function once per second so that it updates the smallest unit of time as often as is necessary.

// JSON stringify - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

// JSON parse - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse



// Set Constants for the things need to change - countdown form, input container, and date picker
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
// Selects anything on page that's a span

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

// Global variables for title and date to use in more than one function
let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let coundownActive;
// unassigned - for set interval
let savedCountdown;
// Create an object tosave title and date

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Want to make sure only select a future date
// Date Input - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
// Date attributes are value loads page with, min and max date
// Use min attribute to select a date after today's date

// Set Date Input with Today's Date "new Date()" = running a function that instantiates a new Date object - an actual date. If say "Date" in console get a date function that comes with JavaScript
const today = new Date().toISOString().split('T')[0];
// console.log(today[0], today[1]);
// Want what's before the T (date) so split it and return an array of 2 substrings (date and time). Can use this with a space to return an array of words in a sentence
dateEl.setAttribute('min', today);
// Now can only select future dates

// Populate Countdown and complete UI
function updateDOM() {
    // TO MAKE THE CLOCK COUNT DOWN  -   JavaScript timing events - https://www.w3schools.com/js/js_timing.asp - Info to call a function once per second so that it updates the smallest unit of time as often as is necessary.
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        // Getting the current moment in time and how far from January 1st 1970 it is. Returned as a millisecond value
        const distance = countdownValue - now;
        // Math.floor returns largest whole number
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        // distance divided by day remainder divided by hour
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // Hide input
        inputContainer.hidden = true;

        // If the countdown has ended, show final state
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // else, show the countdown in progress
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;

            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, second);
}

// Function to take input values from form
function updateCountdown(e) {
    e.preventDefault();
    // Set title and date, save to localStorage
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    console.log(countdownTitle, countdownDate);

    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };

    // save to local storage - key and saved countdown object - Check ==> applications tab and local storage - Local storage is acting like a server - Can only save strings to a server so need to stringify. - To retreive it and turn it back into an object use JSON.parse
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    // Check for valid Date, otherwise function runs with NaN
    if (countdownDate === '') {
        alert('Please select a date for countdown');
    } else {
        // Get number version of current Date, updateDOM
        countdownValue = new Date(countdownDate).getTime();
        // Set countdownValue Variable equal to a new date, by passing in the countdown date and then running the getTime method
        console.log('countdown value: ', countdownValue);
        updateDOM();
    }
}

// Can see don't have a console log. This is because normally when submitting a form, that data is going to end up in a database somewhere. So it's going to make a network request to send that data. But because it's not going anywhere here, it ends up just refreshing the page. Need to stop this behavior because want to get that data from form and not refresh. to accomplish this, going to use prevent default event method which can be useful when clicking on a submit button when want to prevent it from trying to submit the form with a network request.

//  In console.log, go inside event and scroll down to srcElement. You can see that the zero index is the title input and the one index is the date input and the two is the button

function reset() {
    // Hide countdowns, show input form
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;

    // Stop the countdown
    // countdownActive is the variable name given to the set interval function that contains the arrow function that shows/does the countdown. If it was shorter would see the millisecond interval after the comma instead of way down at the end of the function
    clearInterval(countdownActive);

    // Reset values, remove localStorage item
    countdownTitle = '';
    countdownDate = '';
    //  when click new countdown - reset value in local storage remove values in countdown key (title/date)
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
    // Get countdown from localStorage if available
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));

        // Need it to be an object so can target each of these individually
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        // distance number
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On Load, check localStorage
restorePreviousCountdown();