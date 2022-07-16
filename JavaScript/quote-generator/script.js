const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('newQuote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
    // When loader is running won't see quote container
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Get quote data from API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        // console.log(apiQuotes[34]); THis shows the 35th quote in API
    } catch (error) {
        console.log('Whoops, no quotes today', error);
    }
}

// If cors error, call a proxy API first - Lesson 23

// newQuote() pulls a single random quote when press the "new quote" button
function newQuote() {
    showLoadingSpinner();
    // Need the loading function in more than just initial - although likely won't show up for new single quotes as processes too fast when stored locally in apiQuotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank and replace it with "Unknown" (If NOT author)
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }

    // Check Quote length to determine styling
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Set Quote and Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Tweet Quote
// Using a template string with back ticks because it allows us to pass a variable to search parameter
// '_blank' allows it to open in a new tab
// For context and how to - https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
// Add event listener to elements defined at top and on click run the function

// On Load
getQuotes();

// Get Quotes From API using an asynchronous fetch request within a try catch statement
// An asynchronous function can run anytime and won't stop the browser from completing the page load
// Try catch allows an ATTEMPT to complete a request, but if it doesn't work, can catch the error info and do something with it
// await means the constant will not be populated until some data is fetched, or will be undefined
// Get the JSON from the API as a response and then turn that into a JSON object
// Pass that into a global variable called apiQuotes
// CReate apiQuotes outside of this function so it's avalable globally
// Want to run the getQuotes function as soon as the page loads