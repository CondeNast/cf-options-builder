'use strict';

var cloneDeep = require('lodash.clonedeep');

var Config = module.exports = function(config) {
  this._config = config ? cloneDeep(config) : {};
};

Config.prototype.value = function() {
  return cloneDeep(this._config);
};

// These two methods are pretty trivial but the real value in this
// object is in the xParameter methods
Config.prototype.set = function(key, value) {
  this._config[key] = value;

  return this;
};

Config.prototype.remove = function(key) {
  this._config[key] = undefined;

  return this;
};

Config.prototype.setCapability = function(capability) {
  if (!this._config.Capabilities) {
    this._config.Capabilities = [];
  }

  if (this._config.Capabilities.indexOf(capability) === -1) {
    this._config.Capabilities.push(capability);
  }

  return this;
};

Config.prototype.removeCapability = function(capability) {
  if (this._config.Capabilities) {
    this._config.Capabilities = this._config.Capabilities.filter(function(c) {
      return c !== capability;
    });
  }

  return this;
};

// Set a parameter in the parameters list
Config.prototype.setParameter = function(key, value) {
  var config = this._config;

  if (!config.Parameters) {
    config.Parameters = [];
  }

  var entry = {
    ParameterKey: key,
    ParameterValue: value
  };

  var inserted = false;
  config.Parameters.some(function(p) {
    if (p.ParameterKey === key) {
      p.ParameterValue = value;
      inserted = true;
    }
    return inserted;
  });

  if (!inserted) {
    config.Parameters.push({
      ParameterKey: key,
      ParameterValue: value
    });
  }

  return this;
};

// Remove a parameter from the parameters list
Config.prototype.removeParameter = function(key) {
  if (this._config.Parameters) {
    this._config.Parameters = this._config.Parameters.filter(function(p) {
      return p.ParameterKey !== key;
    });
  }

  return this;
};
