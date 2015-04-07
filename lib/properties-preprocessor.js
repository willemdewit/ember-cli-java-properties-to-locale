var props = require('broccoli-java-properties-to-object');
var fs = require('fs');

function PropertiesPreprocessor(options) {
  this.name = 'ember-cli-coffeescript';
  this.options = options || {};
}

PropertiesPreprocessor.prototype.ext = props.prototype.extensions;

PropertiesPreprocessor.prototype.toTree = function(tree, inputPath, outputPath) {
  var options = {
    srcDir: inputPath,
    destDir: outputPath
  };
  return props(tree, options);
};

module.exports = PropertiesPreprocessor;