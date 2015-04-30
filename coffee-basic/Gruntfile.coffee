module.exports = (grunt) ->

  grunt.initConfig
    clean:
      build: ['app.js', 'app/**/*.js', 'test/**/*.js']

    shell:
      run:
        command: 'coffee app.coffee'

    watch:
      gruntfile:
        files: 'Gruntfile.coffee'
        tasks: 'coffeelint:gruntfile'
      coffee_app:
        files: ['app.coffee', 'app/**/*.coffee']
        tasks: ['coffeelint:app', 'develop'],
        options: { nospawn: true }
      coffee_test:
        files: ['test/**/*.coffee']
        tasks: 'coffeelint:test'
        
    develop:
      server:
        file: 'app.coffee'
        cmd: 'coffee'

    coffeelint:
      app: ['app.coffee', 'app/**/*.coffee']
      test: ['test/**/*.coffee']
      gruntfile: ['Gruntfile.coffee']
      
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.registerTask 'default', ['clean']
  grunt.registerTask 'run', ['develop', 'watch']
    
