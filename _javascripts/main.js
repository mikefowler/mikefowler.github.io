import detectFeatures from './detectFeatures';
import lazyLoadImages from './lazyLoadImages';

function init() {
  detectFeatures();
  lazyLoadImages();
}

window.addEventListener('DOMContentLoaded', init);
