/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= pkg.license %> */\n',
    // Task configuration.
    shell: {
      gitCloneCookies: {
        command: [
          '! test -e lib/cookies',
          'cd lib',
          'git clone https://github.com/ScottHamper/Cookies.git'
        ].join('&&'),
        options: {
          failOnError: false
        }
      },
      gitPullCookies: {
        command: [
          'test -e lib/cookies',
          'cd lib/cookies',
          'git pull'
        ].join('&&')
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    concat: {
      dist: {
        src: ['lib/Cookies/dist/cookies.min.js', '<%= uglify.dist.dest %>'],
        dest: 'dist/<%= pkg.name %>-cookies.min.js'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['shell:gitCloneCookies', 'shell:gitPullCookies', 'uglify', 'concat']);
};
