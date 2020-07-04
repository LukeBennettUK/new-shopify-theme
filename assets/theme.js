// Navigation variables
const HEADER = document.getElementById("main-header");
let previousPageYOffset = window.pageYOffset;
let sideMenuActive = false;

// Slider variables
const SLIDER_DICTIONARY = [];

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

// Slider function
function showPrevNextSlide(currentButton, totalSlideItems, slideDirection) {
  const SIBLING_BUTTON = currentButton.previousElementSibling || currentButton.nextElementSibling;
  const SLIDING_CONTAINER = currentButton.parentElement.parentElement.getElementsByClassName('slider')[0];
  let currentSliderInfo = SLIDER_DICTIONARY.find(slider => slider.sliderContainer === SLIDING_CONTAINER);

  if (!currentSliderInfo) {
    currentSliderInfo = {
      sliderContainer: SLIDING_CONTAINER,
      previousTranslateDistance: 0,
      previousSlideItemIteration: 1
    };
  }

  switch (slideDirection) {
    case 'prev':
      if (currentSliderInfo.previousSlideItemIteration > 1) {
        if (currentSliderInfo.previousSlideItemIteration === totalSlideItems) SIBLING_BUTTON.removeAttribute('disabled', '');

        currentSliderInfo.previousSlideItemIteration--;
        currentSliderInfo.previousTranslateDistance += 100;

        if (currentSliderInfo.previousSlideItemIteration === 1) currentButton.setAttribute('disabled', '');
      }

      break;
    case 'next':
      if (currentSliderInfo.previousSlideItemIteration < totalSlideItems) {
        if (currentSliderInfo.previousSlideItemIteration === 1) SIBLING_BUTTON.removeAttribute('disabled', '');

        currentSliderInfo.previousSlideItemIteration++;
        currentSliderInfo.previousTranslateDistance -= 100;

        if (currentSliderInfo.previousSlideItemIteration === totalSlideItems) currentButton.setAttribute('disabled', '');
      }

      break;
  }

  currentButton.parentElement.parentElement.getElementsByClassName('slider')[0].style.transform = `translateX(${currentSliderInfo.previousTranslateDistance}%)`;
  SLIDER_DICTIONARY.push(currentSliderInfo);
}
