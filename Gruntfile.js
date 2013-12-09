/*global module:false*/
module.exports = function(grunt) {

  var cssPaths = ["assets/css", "bower_components/bootstrap/less", "bower_components/font-awesome/less"];

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      options: {
        copy: false
      },
      install: {}
    },
    concat: {
      options: {
        stripBanners: true
      },
      dist: {
        src: [
          'bower_components/jquery/jquery.js',
          'bower_components/bootstrap/dist/js/bootstrap.js',
          'assets/js/<%= pkg.name %>.js'
        ],
        dest: 'build/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'build/js/<%= pkg.name %>.min.js'
      }
    },
    less: {
      development: {
        options: {
          paths: cssPaths,
          banner: '<%= banner %>'
        },
        files: {
          "build/css/main.css": "assets/css/main.less"
        }
      },
      production: {
        options: {
          paths: cssPaths,
          yuicompress: true
        },
        files: {
          "build/css/main.css": "assets/css/main.less"
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      js: {
        src: ['assets/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      js: {
        files: '<%= jshint.js.src %>',
        tasks: ['jshint:js']
      },
      less: {
        files: 'assets/**/*.less',
        tasks: ['less:development']
      },
      pages: {
        files: 'pages/**/*',
        tasks: ['copy']
      },
      images: {
        files: 'pages/**/*',
        tasks: ['copy']
      }
    },
    copy: {
      font_awesome: {
        expand: true,
        flatten: true,
        src: ['bower_components/font-awesome/fonts/*'],
        dest: 'build/fonts/'
      },
      pages: {
        expand: true,
        flatten: true,
        cwd: 'pages/',
        src: '**',
        dest: 'build/'
      },
      images: {
        expand: true,
        flatten: true,
        cwd: 'assets/imgs',
        src: '**',
        dest: 'build/imgs/'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['bower', 'concat', 'jshint', 'less:development', 'copy']);

  // Production task
  grunt.registerTask('production', ['default', 'uglify', 'less:production']);
};
