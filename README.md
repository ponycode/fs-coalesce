# fs-coalesce

Simple module which will return or read the first file to exist in an array of paths. This module will also expand paths like `~/somefile.txt` to `/Users/testuser/somefile.txt`.

## Getting Started
Install the module with: `npm install fs-coalesce --save`

Include the module with a regular require.
```javascript
var fsCoalesce = require('fs-coalesce');
```

## Documentation

#### firstPathToExist
Given an array of paths, `firstPathToExist` will return the first path which passes an `fs.exists()` test. The paths are processed in order.

```javascript
var existingPath = fsCoalesce.firstPathToExist([false, 'bogus', '~/i-exist.text']);
console.log( "Existing path: ", existingPath );
```
This will output `Existing path: /Users/testuser/i-exist.text`.

#### readFirstFileToExistSync
Given an array of paths, `readFirstFileToExistSync` will read and return the contents of the first file to exist. The paths are processed in order.

```javascript
var contents = fsCoalesce.readFirstFileToExistSync([false, 'bogus', '~/i-exist.text']);
console.log( "Contents: ", contents );
```
This will output `Contents: therefore I am`.

#### readFirstJsonFileToExistSync
Given an array of paths, `readFirstJsonFileToExistSync` will read, JSON parse, and return the contents of the first file to exist. The paths are processed in order.

```javascript
var json = fsCoalesce.readFirstJsonFileToExistSync([false, 'bogus', '~/i-exist.json']);
console.log( "JSON: ", JSON.stringify(json) );
```
This will output `JSON: {"message":"therefore I am"}`.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2014 PonyCode Corporation
Licensed under the MIT license.
