module.exports = function(grunt) {
  grunt.initConfig({
    env: {
      test: {
        NODE_ENV: 'test'
      }
    },
    mochaTest: {
      test: {
	options: {
	  reporter: 'spec'
	},
	src: 'test/**/*.js'
      }
    }
  });

  // load grunt-modules
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // custom tasks
  grunt.registerTask('test', ['env:test', 'mochaTest']);
};
