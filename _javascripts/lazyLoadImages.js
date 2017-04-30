const LOADING_CLASS = 'lazy-image--loading';
const LOADED_CLASS = 'lazy-image--loaded';
const images = [];

function isElementInViewport(el) {
  const bounds = el.getBoundingClientRect();

  return (
    bounds.top >= 0 &&
    bounds.left >= 0 &&
    bounds.top <= window.innerHeight
  );
}

function loadImage(el) {
  const imageSrc = el.getAttribute('data-src');
  const backgroundEl = el.querySelector('.js-lazy-image-background');
  const image = new Image();
  let shimmerTimeout;

  image.onload = () => {
    // The onload event only needs to run once, so
    // we deference this function.
    image.onload = null;

    // Set the background image source
    backgroundEl.style.backgroundImage = `url(${imageSrc})`;

    // Swap the loading class for the loaded class on the root element
    el.classList.remove(LOADING_CLASS);
    el.classList.add(LOADED_CLASS);

    // Clear the shimmer timeout
    if (shimmerTimeout) {
      clearTimeout(shimmerTimeout);
    }
  };

  // If an image takes longer than 200 milliseconds to load, we
  // add a shimmer effect to the container. The delay also prevents
  // the shimmer from displaying for images that are already cached
  // which can look noisy.
  shimmerTimeout = setTimeout(() => {
    el.classList.add(LOADING_CLASS);
  }, 200);

  // Setting the source of the Image object kicks off the loading process
  image.src = imageSrc;
}

function loadImagesInViewport() {
  images.forEach((image, i) => {
    if (isElementInViewport(image)) {
      loadImage(image);
      images.splice(i, 1);
    }
  });
}

export default function lazyLoadImages() {
  const query = document.querySelectorAll('.js-lazy-image');

  for (let i = 0; i < query.length; i += 1) {
    images.push(query[i]);
  }

  loadImagesInViewport();
  document.addEventListener('scroll', loadImagesInViewport);
}
