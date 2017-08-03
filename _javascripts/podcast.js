import Amplitude from 'amplitudejs';

function init() {
  const episodes = window.MRF.episodes || [];

  Amplitude.init({
    songs: episodes,
  });
}

window.addEventListener('DOMContentLoaded', init);
