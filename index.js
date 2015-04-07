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
        blueprints: true
      });

    return propsOptions;
  },

  blueprintsPath: function() {
    if (this.getConfig().blueprints) {
      return path.join(__dirname, 'blueprints');
    }
  },

  setupPreprocessorRegistry: function(type, registry) {
    var plugin = new PropertiesPreprocessor(this.getConfig());

    registry.add('js', plugin);
  },

  included: function(app) {
    this.app = app;

    if (this.shouldSetupRegistryInIncluded()) {
      this.setupPreprocessorRegistry('parent', app.registry);
    }
  }
};
/*
var PropertiesFilter = require('broccoli-java-properties-to-object');
var path         = require('path');
var merge        = require('lodash-node/modern/objects/merge');
var mergeTrees   = require('broccoli-merge-trees');
var checker   = require('ember-cli-version-checker');

module.exports = {
  name: 'Ember CLI Java Properties to I18n Locale',
  
  shouldSetupRegistryInIncluded: function() {
    return !checker.isAbove(this, '0.2.0');
  },
  
  project: this.project,

  propertiesOptions: function() {
    var env = process.env.EMBER_ENV;
    var options = this.project.config(env).propertiesOptions
        || (this.app && this.app.options.propertiesOptions) || {};
    return options;
  },

  setupPreprocessorRegistry: function(type, registry) {
	  var self = this;
	  
    registry.add('js', {
	  name: 'ember-cli-java-properties-to-object',
	  ext: 'properties',
	  options: this.propertiesOptions(),
	  toTree: function(tree, inputPath, outputPath, options) {
		  options = merge({}, this.options, options);
		  var ext = this.ext;
		  var paths = options.outputPaths || { app: options.registry.app.options.outputPaths.app.properties };

		  var trees = Object.keys(paths).map(function(file) {
		    var input = path.join(inputPath, file + '.' + ext);
		    var output = paths[file];
		    return PropertiesFilter([tree], input, output, options);
		  });

		  return mergeTrees(trees);
		}
	});
    
    if (type === 'parent') {
        this.parentRegistry = registry;
      }
  },
  
  isDevelopingAddon: function() {
    return true;
  },
  
  included: function(app) {
	  console.log('included');
	  this.app = app; // used to provide back-compat for ember-cli < 0.2.0 in propertiesOptions()
	  this._super.included.apply(this, arguments);

    if (this.shouldSetupRegistryInIncluded()) {
      this.setupPreprocessorRegistry('parent', app.registry);
    }
  }
}
*/