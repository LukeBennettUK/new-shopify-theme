// Navigation variables
const HEADER = document.getElementById("main-header");
let previousPageYOffset = window.pageYOffset;
let sideMenuActive = false;

// featured-products-slider variables
let previousProductIteration = 1;
let previousProductSlidingContainerTranslate = 0;
let containerWidthInterval = 0;
let previousWindowWidth = 0;

// testimonials-slider variables
let previousTestimonialIteration = 1;
let previousTestimonalSlidingContainerTranslate = 0;

// Navigation functions
function toggleFixedHeader() {
  if (window.pageYOffset > 900) {
    HEADER.classList.add('fixed');

    if (window.pageYOffset > 1000) {
  
      HEADER.classList.add('prepare-fixed-header');
  
      if (window.pageYOffset < previousPageYOffset) HEADER.classList.add('show-fixed-header');
      else if (!sideMenuActive) HEADER.classList.remove('show-fixed-header');
    } else {
      HEADER.classList.remove('prepare-fixed-header');
      HEADER.classList.remove('show-fixed-header');
    }
  } else {
    HEADER.classList.remove('fixed');
    HEADER.classList.remove('prepare-fixed-header');
    HEADER.classList.remove('show-fixed-header');
  }

  previousPageYOffset = window.pageYOffset;
}

function toggleSideMenu() {
  const MENU_BUTTON = document.getElementById('side-menu-button');
  const BODY = document.getElementsByTagName('body')[0];

  if (!MENU_BUTTON.classList.contains('active')) {
    sideMenuActive = true;
    MENU_BUTTON.classList.add('active');
    HEADER.classList.add('active');
    BODY.style.overflow = 'hidden';

  } else {
    sideMenuActive = false;
    MENU_BUTTON.classList.remove('active');
    HEADER.classList.remove('active');
    BODY.style.overflow = 'auto';
  }
}

// featured-products-slider function
function showPrevNextProduct(event, totalProducts, slideDirection) {
  const CURRENT_BUTTON = event.target;
  const SIBLING_BUTTON = CURRENT_BUTTON.previousElementSibling || CURRENT_BUTTON.nextElementSibling;
  const SLIDING_CONTAINER = CURRENT_BUTTON.parentElement.nextElementSibling.children[0];
  const PRODUCT_CONTAINER = SLIDING_CONTAINER.firstElementChild;

  const TRANSLATE_DISTANCE = PRODUCT_CONTAINER.offsetWidth + parseInt(getComputedStyle(PRODUCT_CONTAINER).marginRight);

  switch (slideDirection) {
    case 'prev':
      if (previousProductIteration > 1) {
        if (previousProductIteration === totalProducts) SIBLING_BUTTON.removeAttribute('disabled', '');

        previousProductIteration--;

        // + translate
        previousProductSlidingContainerTranslate += TRANSLATE_DISTANCE;

        SLIDING_CONTAINER.style.transform = `translateX(${previousProductSlidingContainerTranslate}px)`;

        if (previousProductIteration === 1) CURRENT_BUTTON.setAttribute('disabled', '');
      }

      break;
    case 'next':
      if (previousProductIteration < totalProducts) {
        if (previousProductIteration === 1) SIBLING_BUTTON.removeAttribute('disabled', '');

        previousProductIteration++;

        // - translate
        previousProductSlidingContainerTranslate -= TRANSLATE_DISTANCE;

        SLIDING_CONTAINER.style.transform = `translateX(${previousProductSlidingContainerTranslate}px)`;

        if (previousProductIteration === totalProducts) CURRENT_BUTTON.setAttribute('disabled', '');
      }

      break;
  }

  // if the window size changes then reset the slider
  if (!containerWidthInterval) {
    previousWindowWidth = window.innerWidth;

    containerWidthInterval = setInterval(() => {
      if (previousWindowWidth !== window.innerWidth) {
        SLIDING_CONTAINER.style.transform = 'translateX(0px)';
        SLIDING_CONTAINER.parentElement.parentElement.children[1].children[0].setAttribute('disabled', '');
        SLIDING_CONTAINER.parentElement.parentElement.children[1].children[1].removeAttribute('disabled', '');

        previousProductIteration = 1;
        previousProductSlidingContainerTranslate = 0;

        clearInterval(containerWidthInterval);
        containerWidthInterval = 0;
      }
    });
  }
}

function showPrevNextTestimonial(event, totalTestimonials, direction) {
  const CURRENT_BUTTON = event.target;
  const SIBLING_BUTTON = CURRENT_BUTTON.previousElementSibling || CURRENT_BUTTON.nextElementSibling;

  switch (direction) {
    case 'prev':
        if (previousTestimonialIteration === totalTestimonials) SIBLING_BUTTON.removeAttribute('disabled', '');

        previousTestimonialIteration--;

        // + translate
        previousTestimonalSlidingContainerTranslate += 100;

        if (previousTestimonialIteration === 1) CURRENT_BUTTON.setAttribute('disabled', '');

      break;
    case 'next':
        if (previousTestimonialIteration === 1) SIBLING_BUTTON.removeAttribute('disabled', '');

        previousTestimonialIteration++;

        // - translate
        previousTestimonalSlidingContainerTranslate -= 100;

        if (previousTestimonialIteration === totalTestimonials) CURRENT_BUTTON.setAttribute('disabled', '');

      break;
  }

  CURRENT_BUTTON.parentElement.previousElementSibling.firstElementChild.children[1].style.transform = `translateX(${previousTestimonalSlidingContainerTranslate}%)`;
}
