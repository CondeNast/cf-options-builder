# cf-options-builder

This is a builder for CloudFormation options objects, which get passed to
calls to the `createStack` method of the official AWS CloudFormation api
client. This handles all the complexity surrounding Parameter lists, as well
as adding and removing Capabilities and setting standard properties.

For example:

```js

var Builder = require('cf-options-builder');

var options = new Builder({
  Parameters: [
    { ParameterKey: 'InstancesDesiredCapacity', ParameterValue: 2 }
  ],
  TemplateUrl: 'https://c3.amazonaws.com/some-cloudformation-templates/my-template.json'
});

options
  .set('StackName', 'my-stack-name')
  .setParameter('Environment', 'staging')
  .setParameter('InstanceType', 't3.medium')
  .setParameter('InstancesDesiredCapacity', 3)
  .setCapability('CAPABILITY_IAM')
;

console.log(options.value());
/*
{
  Parameters: [
    {
      ParameterKey: 'Environment',
      ParameterValue: 'staging'
    },
    {
      ParameterKey: 'InstanceType',
      ParameterValue: 't3.medium'
    },
    {
      ParameterKey: 'InstancesDesiredCapacity',
      ParameterValue: 3
    }
  ],
  TemplateUrl: 'https://c3.amazonaws.com/some-cloudformation-templates/my-template.json',
  StackName: 'my-stack-name',
  Capabilities: [
    'CAPABILITY_IAM'
  ]
}
*/
```

## API

### var options = new OptionsBuilder(baseOptions);

Creates a new OptionsBuilder. Can optionally take in a base options object
as a starting place for modification. Defaults to an empty object. Stores
internally as a deep clone so that calls on the OptionsBuilder don't munge
the original object.

### options.value()

Returns a usable CloudFormation options object. Clones the internal state of
the OptionsBuilder so that further calls to the OptionsBuilder don't munge the
object.

### options.set(key, value)

Sets a key on the object.

### options.remove(key)

Sets a key on the object to `undefined`.

### options.setCapability(value)

Adds the specified capability if not already set.

### options.removeCapability(value)

Removes the specified capability if set.

### options.setParameter(key, value)

Sets the parameter with 'key' to have 'value'. Takes care to modify any
parameter with the existing key instead of blindly appending to the end.

### options.removeParameter(key)

Removes the parameter with 'key', if it exists.

## Tests

Tests use mocha. You can run them with:

```
$ npm test
```

## License

All rights reserved.