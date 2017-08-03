export default function detectFeatures() {
  const hasTouchSupport = 'ontouchstart' in window;

  if (!hasTouchSupport) {
    document.documentElement.classList.add('no-touch');
  }
}
