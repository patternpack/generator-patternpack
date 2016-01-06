module.exports = function (grunt) {
  grunt.initConfig({
    patternpack: {
      run: {},
      build: {},
      release: {},
      "release-major": {},
      "release-minor": {},
      "release-patch": {}
    }
  });

  grunt.loadNpmTasks("patternpack");

  grunt.registerTask("run", ["patternpack:run"]);
  grunt.registerTask("build", ["patternpack:build"]);
  grunt.registerTask("release", ["patternpack:release"]);
  grunt.registerTask("release-major", ["patternpack:release-major"]);
  grunt.registerTask("release-minor", ["patternpack:release-minor"]);
  grunt.registerTask("release-patch", ["patternpack:release-patch"]);
  grunt.registerTask("default", ["run"]);
};
