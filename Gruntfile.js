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

    clean: {
      all: ['dist/'],
      js: ['dist/js/main.js']
    },

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
        sourceMap: true
      },
      js: {
        src: ['js/*.js'],
        dest: 'dist/js/main.js',
      },

    mocha: {
      all: {
        options: {
          urls: [
            'http:///localhost:8888/test/login.html',
            'http:///localhost:8888/test/repos.html'
        ]
      }
      }
    },

    connect: {
      server: {
        options: {

          port: 8888,
          base: '.'
        }
      }
    }

    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-mocha');


  grunt.registerTask('js-build', ['clean:js', 'jshint', 'concat:js']);
  grunt.registerTask('css-build', ['sass']);
  grunt.registerTask('test', ['connect', 'mocha']);
  grunt.registerTask('default', ['clean:all', 'copy', 'js-build', 'css-build']);

};
