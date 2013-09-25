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
      staging: {
        cmd: 'jekyll serve -w'
      },
      write: {
        cmd: 'jekyll serve -w --drafts'
      },
      deploy: {
        // @tbd
      },
      fontcustom: {
        cmd: 'fontcustom compile assets/images/icons/ -c ./_config/'
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
  
  grunt.registerTask('write', ['concurrent:write']);
  grunt.registerTask('staging', ['concurrent:staging']);
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['write']);

};
