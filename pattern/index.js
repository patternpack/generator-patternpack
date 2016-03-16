var generators = require("yeoman-generator");
var _ = require("lodash");

function generatorPattern() {
  "use strict";

  var generator;

  function constructor() {
    generators.NamedBase.apply(this, arguments);
    generator = generator || this;
    setNameAndHeirarchy();
  }

  function setNameAndHeirarchy() {
    var location = _.lastIndexOf(generator.name, "/");
    generator.options.name = generator.name.substring(location + 1);
    if (location >= 0) {
      generator.options.hierarchy = generator.name.substring(0, location);
    }
  }

  function promptForHierarchy() {
    if (generator.options.hierarchy) {
      return;
    }

    var done = generator.async();
    var promptOptions = {
      type: "input",
      name: "hierarchy",
      message: "Where should the pattern be created",
      default: "atoms"
    };

    generator.prompt(promptOptions, function (response) {
      generator.options.hierarchy = response.hierarchy;
      done();
    });
  }

  function create() {
    var options = {
      name: _.kebabCase(generator.options.name),
      title: _.startCase(generator.options.name)
    };
    var destinationPath = "src/" + generator.options.hierarchy + "/" + options.name;

    generator.fs.copyTpl(generator.templatePath("**/*"), generator.destinationPath(destinationPath), options);
  }

  return {
    constructor: constructor,
    promptForHierarchy: promptForHierarchy,
    create: create
  };
}

module.exports = generators.NamedBase.extend(generatorPattern());
