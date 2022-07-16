// Toggle Switch - https://www.w3schools.com/howto/howto_css_switch.asp

// On change event - https://www.w3schools.com/jsref/event_onchange.asp

// Document.documentElement - https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement

const toggleSwitch = document.querySelector('input[type="checkbox"]');
// Could use elementbyID if had given it an id
// querySelector allow you to select a class or element
// input element with a type equal to checkbox
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

// Dark or Light Images
function imageMode(color) {
    // Uses template strings
    // Pass in color - imageMode('dark'); or imageMode('light');
    image1.src = `img/undraw_proud_coder_${color}.svg`;
    image2.src = `img/undraw_feeling_proud_${color}.svg`;
    image3.src = `img/undraw_collaborators_re_hont_${color}.svg`;
}

// Dark Mode Styles
function darkMode() {
    nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    // The toggle-icon ID is on the parent but want to change 2 separate elements within it - const toggleIcon - console.log(toggleIcon.children); gives 2 objects in an array
    // Use .textContent to change text value of HTML element
    // classList changes/toggles/replaces class
    toggleIcon.children[0].textContent = 'Dark Mode';
    // toggleIcon.children[1].classList.remove('fa-sun');
    // toggleIcon.children[1].classList.add('fa-moon');
    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    // Function (above) to change the color of the undraw images
    // image1.src = `img/undraw_proud_coder_dark.svg`;
    // image2.src = `img/undraw_feeling_proud_dark.svg`;
    // image3.src = `img/undraw_collaborators_re_hont_dark.svg`;
    imageMode('dark');
}

// Light Mode Styles
function lightMode() {
    nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = 'Light Mode';
    toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    imageMode('light');
}

// Switch Theme Dynamically
function switchTheme(event) {
    // console.log(event) - Inside target (input element) Look for checked property to see if true or false checked value
    // Next time - console.log(event.target.checked);
    // When checked we want dark mode - When unchecked want light mode
    // document.documentElement returns the element that's the root element where we set the attribute of the dark theme

    // data-theme is the key and dark is the value

    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        //Keep from defaulting to light mode every time open app
        // Local storage allow user to store data between sessionStorageStore a string value of light/dark theme
        // Like console, Local Storage exists within window object and can be called directly. So, set a value in local storage and eventually get a value from local storage - getItem is in Check Local Storage for Theme below event listener -

        // In dev tools under application toolbar, under Storage, find "Local Storage" - Gives the URL for current page and the Key and value - when flip switch they show
        localStorage.setItem('theme', 'dark');
        // If use ternary function at bottom need toggleDarkLightMode(true);
        // Call the darkMode function
        darkMode();
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        // If use ternary function at bottom need toggleDarkLightMode(false);
        lightMode();
    }
}

// Event Listener
toggleSwitch.addEventListener('change', switchTheme);
// Note: using a change event related to checked state instead of click

// Check Local Storage For Theme
const currentTheme = localStorage.getItem('theme');
// console.log(currentTheme);
// Value is null first time visit a web site
// Only want to run a function related to currentTheme if we have a value for the them - if(currentTheme) exists/true
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    // If flip the toggle dark mode shows in console as current theme, but light mode on page - So if there is a current theme, want to use it to set the theme like in functions above
    // To get the full effect apart from just background change need to add another if statement (not to set the value, but read if it matches 'dark')
    // Then change the toggle switches checked boolean value to be equal to true and then  call darkMode() to change images and nav
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        darkMode();
    }
}

// To clean up code and make one function out of two

// function toggleDarkLightMode(isDark) {
//     // Use ternary operator
//     nav.style.backgroundColor = isDark ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
//     textBox.style.backgroundColor = isDark ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
//     toggleIcon.children[0].textContent = isLight ? 'Dark Mode' : 'Light Mode';
//     isDark ? toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon') : toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
//     isDark ? imageMode('dark') : imageMode('light');
// }

// OTHER DRY AND CLARIFYING CHANGES

// toggleDarkLightMode(true)
// toggleDarkLightMode(false)
// The issue with the above is that the true/false doesn't really tell you what the function will do.
// toggleDarkLightMode('dark')
// toggleDarkLightMode('light')

// Also consider adding two constants at the top of the JavaScript file:

// const DARK_THEME = 'dark'
// const LIGHT_THEME = 'light'

// This way you can replace all the places using 'dark' and light' with these variables and in the future, if you ever need to change the strings, you have only one location to change them in. Or if you want to add another theme, it would be easier to do so!