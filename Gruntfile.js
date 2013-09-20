/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    
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
          importPath: 'assets/fonts'
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
        tasks: ['exec:fontcustom']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '<%= site.build %>/assets/css/**/*.css',
          // '<%= site.build %>/assets/js/**/*.js',
          // '<%= site.build %>/assets/images/*.{jpg,png,svg,webp}',
          // '<%= site.build %>/**/*.html'
        ]
      }
    },

    exec: {
      build: {
        cmd: 'jekyll build'
      },
      serve: {
        cmd: 'jekyll serve -w'
      },
      deploy: {
        // @tbd
      },
      fontcustom: {
        cmd: 'fontcustom compile images/icons/ -c ./_config/'
      }
    },

    concurrent: {
      develop: {
        tasks: ['exec:serve', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }

  });

  // Dependencies

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-concurrent');

  // Tasks

  grunt.registerTask('default', ['concurrent:develop']);
  grunt.registerTask('test', ['jshint']);

};
