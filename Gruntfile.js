/*global module:false*/
module.exports = function(grunt) {

  // show elapsed time at the end
  require('time-grunt')(grunt);

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    site: {
      src: '.',
      build: '_site'
    },
    
    jshint: {
      all: ['Gruntfile.js', 'assets/js/*.js', '!assets/js/*.min.js']
    },

    compass: {
      dist: {
        options: {
          config: 'config.rb',
          importPath: ['assets/fonts', 'assets/icons']
        }
      }
    },

    watch: {
      compass: {
        files: [
          '<%= site.src %>/assets/sass/*.scss',
          '<%= site.src %>/assets/icons/*.scss'
        ],
        tasks: ['compass', 'copy:styles']
      },
      scripts: {
        files: '<%= site.src %>/assets/scripts/*.js',
        tasks: ['jshint', 'copy:scripts']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '<%= site.build %>/assets/**/*.{css,js}',
          '<%= site.build %>/**/*.html'
        ]
      },
      icons: {
        files: ['<%= site.src %>/assets/images/icons/*.svg'],
        tasks: ['webfont', 'copy:fonts']
      },
      jekyll: {
        files: [
          '<%= site.src %>/_drafts/*.md',
          '<%= site.src %>/_includes/*.html',
          '<%= site.src %>/_layouts/*.html',
          '<%= site.src %>/_posts/*.md',
          '<%= site.src %>/info/*.html',
          '<%= site.src %>/thoughts/*.html',
          '<%= site.src %>/labs/**/*',
          '<%= site.src %>/index.html',
          '<%= site.src %>/404.html',
          '<%= site.src %>/_config.yml'
        ],
        tasks: ['jekyll:build']
      }
    },

    copy: {
      styles: {
        files: [{
          expand: true,
          cwd: '<%= site.src %>/assets/css',
          src: '*.css',
          dest: '<%= site.build %>/assets/css'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: '<%= site.src %>/assets/fonts',
          src: '*',
          dest: '<%= site.build %>/assets/fonts'
        }]
      },
      scripts: {
        files: [{
          expand: true,
          cwd: '<%= site.src %>/assets/scripts',
          src: '*.js',
          dest: '<%= site.build %>/assets/scripts'
        }]
      }
    },

    jekyll: {
      options: {
        bundleExec: true,
        src: '<%= site.src %>',
        dest: '<%= site.build %>',
        config: '_config.yml',
        safe: true
      },
      server: {
        options: {
          port: 2362,
          drafts: true,
          serve: true
        }
      },
      build: {
        options: {
          drafts: true
        }
      },
      staging: {
        options: {
          drafts: false
        }
      }
    },

    concurrent: {
      server: {
        options: {
          logConcurrentOutput: true
        },
        tasks: ['jekyll:build', 'jekyll:server', 'watch']
      },
      staging: {
        options: {
          logConcurrentOutput: true
        },
        tasks: ['jekyll:staging', 'jekyll:server', 'watch']
      }
    },

    webfont: {
      icons: {
        src: 'assets/images/icons/*.svg',
        dest: 'assets/fonts',
        destCss: 'assets/icons',
        options: {
          stylesheet: 'scss',
          relativeFontPath: '/fonts',
          template: 'assets/icons/template.css',
          syntax: 'bootstrap',
          htmlDemo: false,
          htmlDemoTemplate: 'assets/icons/template.html',
          hashes: false
        }
      }
    }

  });

  // Tasks
  
  grunt.registerTask('server', ['concurrent:server']);
  grunt.registerTask('staging', ['concurrent:staging']);
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['server']);

};
