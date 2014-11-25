# fs-coalesce

Simple module which will return or read the first file to exist in an array of paths. This module will also expand paths like `~/somefile.txt` to `/Users/user/somefile.txt`.

## Getting Started
Install the module with: `npm install fs-coalesce --save`

Include the module with a regular require.
```javascript
var fsCoalesce = require('fs-coalesce');
```

## Documentation

#### firstPathToExist
Given an array of paths, `firstPathToExist` will return the first path which passes an fs.exist test. The paths are processed in order.

```javascript
var existingPath = fsCoalesce.firstPathToExist([false, 'bogus', '~/i-exist.text']);
```

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Joshua Kennedy  
Licensed under the MIT license.
