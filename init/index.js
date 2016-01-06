var generators = require("yeoman-generator");
var _ = require("lodash");

function generatorPatternPack() {
  "use strict";

  var generator;

  function constructor() {
    generators.NamedBase.apply(this, arguments);
    generator = generator || this;
    generator.options.name = generator.name;
  }

  function promptForDescription() {
    var done = generator.async();
    var promptOptions = {
      type: "input",
      name: "description",
      message: "Provide a description of the pattern library"
    };

    generator.prompt(promptOptions, function (response) {
      generator.options.description = response.description;
      done();
    });
  }

  function create() {
    var options = {
      name: _.kebabCase(generator.options.name),
      title: _.startCase(generator.options.name),
      description: _.capitalize(generator.options.description)
    };

    generator.fs.copyTpl(generator.templatePath("**/*"), generator.destinationPath(), options);
    generator.fs.move(generator.destinationPath("_eslintrc"), generator.destinationPath(".eslintrc"));
    generator.fs.move(generator.destinationPath("_gitignore"), generator.destinationPath(".gitignore"));
    generator.fs.move(generator.destinationPath("_npmignore"), generator.destinationPath(".npmignore"));
    generator.fs.move(generator.destinationPath("dist/_gitkeep"), generator.destinationPath("dist/.gitkeep"));
    generator.fs.move(generator.destinationPath("src/assets/css/_gitkeep"), generator.destinationPath("src/assets/css/.gitkeep"));
    generator.fs.move(generator.destinationPath("src/assets/images/_gitkeep"), generator.destinationPath("src/assets/images/.gitkeep"));
    generator.fs.move(generator.destinationPath("src/assets/js/_gitkeep"), generator.destinationPath("src/assets/js/.gitkeep"));
    generator.fs.move(generator.destinationPath("src/assets/less/_gitkeep"), generator.destinationPath("src/assets/less/.gitkeep"));
  }

  function install() {
    generator.npmInstall();
  }

  return {
    constructor: constructor,
    promptForDescription: promptForDescription,
    create: create,
    install: install
  };
}

module.exports = generators.NamedBase.extend(generatorPatternPack());
