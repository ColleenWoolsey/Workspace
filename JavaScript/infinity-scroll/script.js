// https://unsplash.com/documentation
// Look under schema for URL/server of API - https://unsplash.com/documentation
// Requires an API key that pass via the HTTP Authorization header
// Authorization: Client-ID YOUR_ACESS_KEY
// Can pass Client ID as a query string parameter
// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
// To get a random photo - Select under "Photos" on left side nav
// GET /photos/random
// can filter random photos by params like collections, orientation etc
// in this app we're using the count param to get 30

//At unsplash.com click on menu top right ==> developers/API ==> Your apps ==> New application ==> Agree to terms and conditions
// App Name: Cdub Infinite Scroll - In demo mode get 50 requests per hour
// Access Key: E5tCu2qSyXa-LvDdPP1E1TBPMKYWwb9DW_baAB77jhk
// Secret Key: yzK4F9xWF2CgY5ySpr5qEhlSYSZJHwF-AfdE74D7WIk

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Use let because the values will change everytime make a request

// Unsplash API
const count = 30;
const apiKey = 'E5tCu2qSyXa-LvDdPP1E1TBPMKYWwb9DW_baAB77jhk';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        console.log(imagesLoaded);
        // totalImages = photoArray.length in the displayPhotos function
        ready = true;
        console.log(ready);
        loader.hidden = true;
        // Only want to see loader the first time load images
    }
}

// Helper Function to Set Attributes on DOM Elements - A for loop to loop through for each of the attributes want to set
// Start with assignng the key constant (target, src, alt, title) which is going to be an object containing both the key and the value want to set
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
        // Passing in key and attribute with the index of that specific key
    }
}


// Create Elements For Links & Photos, Add to DOM
// Run function for each object in photosArray 
// 1. create an anchor item  
// 2. Create an image  
// 3. Put image into anchor item   
// 4. Put item into image container
function displayPhotos() {
    imagesLoaded = 0;
    // If don't reset this every time will load first 30 images, but then it keeps counting and 60 images loaded will not equal 30 total images and it will stop infinite scroll/reload after 60 photos
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        // Create <a> to link to an unsplash photo
        const item = document.createElement('a');
        // create blank anchor element and set href attribute and to open in new window attribute        
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        // Create <img> for photo
        const img = document.createElement('img');
        // different way (DRY) than above of formatting for multiple attributes
        // Call setAttributes function
        // Pass in the item (elemet) first
        // Then curly brackets to create the object with key/value pairs
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a> (anchor item is parent), then put both inside imageContainer Element - (imageContainer is parent)
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error) {
        // Catch Error Here 
    }
}
// In Network tab click on fetch request to see response and preview tab to open up one item
// Can use alt_description in alt tag
// links.html for any other functionality of unsplash website
// urls.regular for src attribute for image element
// Create an element for each image object want to use and pass in the relevant data

// Check to see if scrolling near bottom of page, Load More Photos
// Before reach bottom of page need an event to trigger the getPhotos method so that the pictures load before we scroll past them
// Otherwise just go to bottom of the page

// Refer to https://www.w3schools.com/jsref/dom_obj_event.asp to apply scroll event to any item
// Adding event listener to the window and targeting the scroll event
// There are multiple ways to implement infinite scroll
// Window is the parent of the document and the grandparent of the body - It represents the entire browser window
// window.innerheight represents the total height of browser window - constant unless window is resized
// window.scrollY is the distance from the top of the page that the user has scrolled - This number will increase as user scrolls down the page
// Both measured in pixels
// Add these 2 numbers up on the left side of the IF statement and compare to height of everything in the body including what is not within the view (combined height of all our images + title) ==> document.body.offsetHeight
// Most window inner heights are less than 1000, so subtract 1000px from offsetHeight to trigger loading phot event before bottom is reached
window.addEventListener('scroll', () => {
    // console.log('scrolled'); shows how many scrolls to bottom

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        // 2 conditions have to be met
        // These console.logs show what happens before add getPhotos() to code. They will only be triggered when the left side of if statement becomes bigger than right side and if ready is true
        // console.log('window.innerHeight: ', window.innerHeight);
        // console.log('window.scrollY: ', window.scrollY);
        // console.lof('window.innerHeight + scrollY: ', window.scrollY + window.innerHeight);
        // console.log('document.body.offsetHeight: ', document.body.offsetHeight - 1000);

        ready = false;
        // set it to false because it will only be ready again if images loaded equals total images

        getPhotos();
        // console.log('load more');
        // Without the ready can see that it triggers multiple times at once and we loaded more times than would like instead of just when hit the bottom
        // Create a ready boolean that will be true only when the images finish loading
        // look at LOad DOM event in W-3 schools - https://www.w3schools.com/jsref/dom_obj_event.asp for code example on an image
    }
});

// On Load
getPhotos();