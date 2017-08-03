import detectFeatures from './utils/detectFeatures';
import lazyLoadImages from './utils/lazyLoadImages';

function init() {
  detectFeatures();
  lazyLoadImages();
}

window.addEventListener('DOMContentLoaded', init);
