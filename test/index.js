'use strict';

var chai = require('chai');
var should = chai.should();


var CfBuilder = require('../');

describe('cf-options-builder', function() {
  var options;

  beforeEach(function() {
    options = new CfBuilder({
      name: 'my-awesome-stack',
      Parameters: [
        { ParameterKey: 'cool', ParameterValue: 'yes' }
      ],
      Capabilities: [
        'bowstaff'
      ]
    });
  });

  it('should be able to set a property', function() {
    options.set('location', 'New York');

    options.value().location.should.equal('New York');
  });

  it('should be able to remove a property', function() {
    options.remove('name');

    options.value().should.not.have.property('name');
  });

  it('should be able to set a capability', function() {
    options.setCapability('lazers');
    options.value().Capabilities[1].should.equal('lazers');
  });

  it('should be able to remove capabilities', function() {
    options.removeCapability('bowstaff');
    options.value().Capabilities.should.have.length(0);
  });

  it('should be able to add a parameter', function() {
    options.setParameter('fish', 'spoon');

    var value = options.value();

    value.Parameters.should.have.length(2);
    value.Parameters.some(function(p) {
      return p.ParameterKey === 'fish' && p.ParameterValue === 'spoon';
    }).should.equal(true);
  });

  it('should be able to modify an existing parameter', function() {
    options.setParameter('cool', 'maybe');

    var value = options.value();

    value.Parameters.should.have.length(1);
    value.Parameters[0].ParameterValue.should.equal('maybe');
  });

  it('should be able to remove a parameter', function() {
    options.removeParameter('cool');

    options.value().should.not.have.property('cool');
  });
});
