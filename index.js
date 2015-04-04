var propertiesToObject = require('java.properties.js').default;
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
    registry.add('properties', {
	  name: 'ember-cli-java-properties-to-object',
	  ext: 'properties',
	  options: this.propertiesOptions(),
	  toTree: function(tree, inputPath, outputPath, options) {
		  console.log('toTree');
		  options = merge({}, this.options, options);
		  var ext = this.ext;
		  var paths = options.outputPaths || { app: options.registry.app.options.outputPaths.app.properties };
		  console.log(paths);
		  Object.keys(paths).forEach(function (key) {
			  console.log('..',key,paths[key]);
		  }, this);

		  var trees = Object.keys(paths).map(function(file) {
		    var input = path.join(inputPath, file + '.' + ext);
		    var output = paths[file];

		    return propertiesToObject([tree], input, output, options);
		  });

		  return mergeTrees(trees);
		}
	});
  },
  
  postprocessTree: function (type, tree) {
    //console.log(tree);
    return tree;
  },

  isDevelopingAddon: function() {
    return true;
  },
  
  included: function(app) {
    this.app = app;

    if (this.shouldSetupRegistryInIncluded()) {
      this.setupPreprocessorRegistry('parent', app.registry);
    }
  }
}