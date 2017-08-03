import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const baseConfig = {
  sourceMap: true,
  format: 'iife',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
    }),
    commonjs(),
    buble(),
    uglify(),
  ],
};

const mainBundle = Object.assign({}, baseConfig, {
  entry: '_javascripts/main.js',
  dest: 'assets/js/main.bundle.js',
});

const podcastBundle = Object.assign({}, baseConfig, {
  entry: '_javascripts/podcast.js',
  dest: 'assets/js/podcast.bundle.js',
});

export default [
  mainBundle,
  podcastBundle,
];
