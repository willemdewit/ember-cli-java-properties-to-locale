var path      = require('path');
var checker   = require('ember-cli-version-checker');
var defaults  = require('lodash').defaults;

var PropertiesPreprocessor = require('./lib/properties-preprocessor');

module.exports = {
  name: 'Ember CLI Properties Addon',

  shouldSetupRegistryInIncluded: function() {
    return !checker.isAbove(this, '0.2.0');
  },

  getConfig: function() {
    var brocfileConfig = {};
    var propsOptions = defaults(this.project.config(process.env.EMBER_ENV).propsOptions || {},
      brocfileConfig, {
      });

    return propsOptions;
  },

  setupPreprocessorRegistry: function(type, registry) {
    var plugin = new PropertiesPreprocessor(this.getConfig());

    registry.add('js', plugin);
  },

  included: function(app) {
    this.app = app;
    this._super.included.apply(this, arguments);

    if (this.shouldSetupRegistryInIncluded()) {
      this.setupPreprocessorRegistry('parent', app.registry);
    }
  }
};