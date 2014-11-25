'use strict';

module.exports = function( grunt ){

  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*_test.js'],
    }
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('default', ['nodeunit']);

};
