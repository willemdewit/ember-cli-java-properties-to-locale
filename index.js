/* eslint-env node */
'use strict';

var checker   = require('ember-cli-version-checker');

var PropertiesPreprocessor = require('broccoli-java-properties-to-object');

module.exports = {
  name: 'ember-cli-java-properties-to-object',

  shouldSetupRegistryInIncluded: function() {
    return !checker.isAbove(this, '0.2.0');
  },

  getConfig: function(options) {
    return Object.assign(options, this.project.config(process.env.EMBER_ENV).propsOptions);
  },

  setupPreprocessorRegistry: function(type, registry) {
    var _this = this;
    registry.add('js', {
      name: 'ember-cli-java-properties-to-object',
      ext: PropertiesPreprocessor.prototype.extensions,
      toTree(tree, inputPath, outputPath) {
        var options = {
          srcDir: inputPath,
          destDir: outputPath
        };
        return new PropertiesPreprocessor(tree, _this.getConfig(options));
      }
    });
  },

  included: function(app) {
    this.app = app;
    this._super.included.apply(this, arguments);

    if (this.shouldSetupRegistryInIncluded()) {
      this.setupPreprocessorRegistry('parent', app.registry);
    }
  }
};
