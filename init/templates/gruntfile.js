module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
    patternpack: {
      options: {
        assets: "./src/assets"
      },
      run: {},
      build: {},
      release: {}
    }
  });

  grunt.loadNpmTasks("patternpack");

  grunt.registerTask("run", ["patternpack:run"]);
  grunt.registerTask("build", ["patternpack:build"]);
  grunt.registerTask("release", ["patternpack:release"]);
  grunt.registerTask("default", ["run"]);
};
