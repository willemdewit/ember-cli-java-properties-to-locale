var props = require('broccoli-java-properties-to-object');

function PropertiesPreprocessor(options) {
  this.name = 'ember-cli-java-properties-to-object';
  this.ext = 'js';
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