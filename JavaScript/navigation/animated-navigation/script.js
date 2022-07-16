const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const nav6 = document.getElementById('nav-6');
const nav7 = document.getElementById('nav-7');
const nav8 = document.getElementById('nav-8');
const navItems = [nav1, nav2, nav3, nav4, nav5, nav6, nav7, nav8];

// Control Navigation Animation runs function on each item in array
function navAnimation(direction1, direction2) {
    navItems.forEach((nav, i) => {
        // passing in a local variable and the index so we can add the number back to CSS class
        // console.log(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`);
        // Have to make it i+1 or starts at zero
        nav.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`);
    });
}

function toggleNav() {
    // Toggle: Menu Bars Open/Closed

    menuBars.classList.toggle('change');

    // change class animates the hamburger menu

    // By default, don't have change class in HTML, so first time run the function it adds the change class, causing the "X" to show up

    // Toggle: Menu Active/Show Nav - Targeting overlay and its class list - Adding and removing classes from overlay which is a child of Navigation - Have to move the nav off the screen (translateX) before can move it on again

    // Overlay-active is a class that doesn't exist - no properties - Using it as a boolean true/show - false/hide- If the overly class list contains overlay-active - want to show the menu and animate in the overlay and activate overlay-slide-right - Else, hide it - overlay-slide-left

    // Problem - If click hambuger twice end up with both classes applied to the nav -  In CSS whatever class is written last is the one that's going to be applied to the element, so the third time hit hamburger the nav stops "working" because overlay-left is overriding overlay right

    // Need to remove opposite class when calling new one

    overlay.classList.toggle('overlay-active');
    if (overlay.classList.contains('overlay-active')) {
        // Animate In - Overlay
        // overlay.classList.remove('overlay-slide-left');
        // overlay.classList.add('overlay-slide-right');

        // For shorthand - https://developer.mozilla.org/en-US/docs/Web/CSS/animation

        overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');

        // Can't replace a class with another class unless the first class is there - Therefore need to add the slide-left class to overlay (in HTML) by default - It's off the page, so shouldn't have an impact on UX

        // Animate In - Nav Items
        // nav1.classList.remove('slide-out-1');
        // nav1.classList.add('slide-in-1');
        // nav2.classList.remove('slide-out-2');
        // nav2.classList.add('slide-in-2');
        // nav3.classList.remove('slide-out-3');
        // nav3.classList.add('slide-in-3');
        // nav4.classList.remove('slide-out-4');
        // nav4.classList.add('slide-in-4');
        // nav5.classList.remove('slide-out-5');
        // nav5.classList.add('slide-in-5');
        // nav6.classList.remove('slide-out-6');
        // nav6.classList.add('slide-in-6');
        // nav7.classList.remove('slide-out-7');
        // nav7.classList.add('slide-in-7');
        // nav8.classList.remove('slide-out-8');
        // nav8.classList.add('slide-in-8');

        // Use a one line replace statement instead of both remove and add statements and reduce from 16 to 8 lines

        // Call navAnimation function and pass in the direction that we want to remove (direction1) and the direction want to add (direction2)

        navAnimation('out', 'in');
    } else {
        // Animate Out - Overlay
        // overlay.classList.remove('overlay-slide-right');
        // overlay.classList.add('overlay-slide-left');

        overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
        // Animate Out - Nav Items
        // nav1.classList.remove('slide-in-1');
        // nav1.classList.add('slide-out-1');
        // nav2.classList.remove('slide-in-2');
        // nav2.classList.add('slide-out-2');
        // nav3.classList.remove('slide-in-3');
        // nav3.classList.add('slide-out-3');
        // nav4.classList.remove('slide-in-4');
        // nav4.classList.add('slide-out-4');
        // nav5.classList.remove('slide-in-5');
        // nav5.classList.add('slide-out-5');
        // nav6.classList.remove('slide-in-6');
        // nav6.classList.add('slide-out-6');
        // nav7.classList.remove('slide-in-7');
        // nav7.classList.add('slide-out-7');
        // nav8.classList.remove('slide-in-8');
        // nav8.classList.add('slide-out-8');

        // Want to use a one line replace statement - So need to add whichever one is the off value to the classList of the Nav item (Nav-1 thru nav-8)
        // But instead of just replacing 16 lines with 8, can create an array of nav items (defined at top) and pass in each of the nav constants

        navAnimation('in', 'out');
    }
}

// Event Listeners - Usually at bottom because want to declare the function before call it
menuBars.addEventListener('click', toggleNav);

// nav1.addEventListener('click', toggleNav);
// nav2.addEventListener('click', toggleNav);
// nav3.addEventListener('click', toggleNav);
// nav4.addEventListener('click', toggleNav);
// nav5.addEventListener('click', toggleNav);
// nav6.addEventListener('click', toggleNav);
// nav7.addEventListener('click', toggleNav);
// nav8.addEventListener('click', toggleNav);

// Use array

navItems.forEach((nav) => {
    nav.addEventListener('click', toggleNav);
});