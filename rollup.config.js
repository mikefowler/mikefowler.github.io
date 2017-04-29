import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: '_javascripts/main.js',
  sourceMap: true,
  format: 'iife',
  dest: 'assets/bundle.js',
  plugins: [
    buble(),
    uglify(),
  ],
};
