var generators = require("yeoman-generator");
var _ = require("lodash");

function generatorPattern() {
  "use strict";

  var generator;

  function constructor() {
    generators.Base.apply(this, arguments);
    generator = generator || this;
    generator.argument('name', { required: false });
  }

  function setNameAndHeirarchy() {
    if (!generator.name) {
      return;
    }

    var location = _.lastIndexOf(generator.name, "/");
    generator.options.name = generator.name.substring(location + 1);
    if (location >= 0) {
      generator.options.hierarchy = generator.name.substring(0, location);
    }
  }

  function promptForName() {
    if (generator.name) {
      setNameAndHeirarchy();
      return;
    }

    var done = generator.async();
    var promptOptions = {
      type: "input",
      name: "name",
      message: "What is the name of the pattern"
    };

    generator.prompt(promptOptions, function (response) {
      generator.options.name = response.name;
      done();
    });
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

    generator.fs.copyTpl(generator.templatePath("pattern.md"), generator.destinationPath(destinationPath + ".md"), options);
    generator.fs.copyTpl(generator.templatePath("pattern.scss"), generator.destinationPath(destinationPath + ".scss"), options);
  }

  return {
    constructor: constructor,
    promptForName: promptForName,
    promptForHierarchy: promptForHierarchy,
    create: create
  };
}

module.exports = generators.Base.extend(generatorPattern());
