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
  }

  return {
    constructor: constructor,
    promptForDescription: promptForDescription,
    create: create
  };
}

module.exports = generators.NamedBase.extend(generatorPatternPack());
