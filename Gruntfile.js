/*global module:false*/
module.exports = function(grunt) {

  // show elapsed time at the end
  require('time-grunt')(grunt);

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    app: {
      dev: 'http://mikefowler.dev',
      prod: 'http://mikefowler.me'
    },

    site: {
      build: '_site'
    },

    uglify: {
      dist: {
        src: 'assets/js/app.js',
        dest: 'assets/js/app.min.js'
      }
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
      scripts: {
        files: '<%= jshint.all %>',
        tasks: ['jshint'/*, 'uglify'*/]
      },
      compass: {
        files: 'assets/sass/**/*',
        tasks: ['compass']
      },
      icons: {
        files: ['assets/images/icons/{,*/}*.svg'],
        tasks: ['webfont']
      },
      livereload: {
        options: {
          livereload: 35730
        },
        files: [
          '<%= site.build %>/assets/css/**/*.css',
          '<%= site.build %>/assets/js/**/*.js',
          '<%= site.build %>/assets/images/*.{jpg,png,svg,webp}',
          '<%= site.build %>/**/*.html'
        ]
      }
    },

    exec: {
      build: {
        cmd: 'jekyll build'
      },
      staging: {
        cmd: 'jekyll serve -w'
      },
      write: {
        cmd: 'jekyll serve -w --drafts'
      },
      deploy: {
        cmd: 'git add . && git commit && git push'
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
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      write: {
        tasks: ['exec:write', 'watch'],
      },
      staging: {
        tasks: ['exec:staging', 'watch'],
      }
    },

    pagespeed: {
      prod: {
        options: {
          paths: ['/'],
          locale: 'en_US',
          strategy: 'desktop',
          threshold: 80
        }
      },
      options: {
        key: '<%= process.env.GOOGLE_API_KEY %>',
        url: 'http://mikefowler.me'
      }
    }

  });

  // Tasks
  
  grunt.registerTask('write', ['concurrent:write']);
  grunt.registerTask('staging', ['concurrent:staging']);
  grunt.registerTask('deploy', ['exec:deploy']);
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['write']);

};
