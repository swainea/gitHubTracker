module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

    jshint:{
      options: {
        jshintrc: true
      },
      all: ['JS/*.js'] //might need to add folders here as I build- be sure not to include "vendor"
    },

    sass: {
      project: {
        files: {
          "dist/css/main.css" : "scss/main.scss"
        }
      }
    },

    watch: {
      js: {
        files: ['JS/*.js'],
        tasks: ['js-build'],
      },
      sass: {
        files: ['scss/**/*.scss'],
        tasks: ['css-build']
      },
      html: {
        files: ['index.html'],
        tasks: ['copy:html']
      }
    },

    clean: ['dist/'],

    copy: {
      html: {
        expand: true,
        src: ['index.html'],
        dest:'dist/'
      },
      CSS: {
        expand: true,
        cwd: 'CSS/',
        src: ['normalize.css'],
        dest:'dist/css/'
      },
      vendorjs: {
        expand: true,
        cwd: 'JS/vendor/jquery/dist',
        src: ['jquery.js'],
        dest: 'dist/JS/vendor'
      }
    },

    concat: {
      options: {
        seperator: ';',
      },
      js: {
        src: ['js/*.js'],
        dest: 'dist/js/main.js',
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('js-build', ['jshint', 'concat:js']);
  grunt.registerTask('css-build', ['sass']);
  grunt.registerTask('default', ['clean', 'copy', 'js-build', 'css-build']);

};
