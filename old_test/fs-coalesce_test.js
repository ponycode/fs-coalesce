'use strict';

var fs = require('fs');
var fs_coalesce = require('../lib/fs-coalesce.js');
var temp = require("temp").track();

( function(){

  var FILES_THAT_EXIST = false;

  exports['fs-coalesce'] = {

    setUp: function( done ){
      _createTempFileWithContent( "{\"test\":\"value1\"}", function( error, path1 ){
        _createTempFileWithContent( "{\"test\":\"value2\"}", function( error, path2 ){
          _createTempFileWithContent( "{\"test\":\"value3\"}", function( error, path3 ){
            FILES_THAT_EXIST = [path1, path2, path3];
			  console.log('ok');
            done();
          });
        });
      });
    },

    tearDown: function( done ){
      temp.cleanup( function(err, stats){
		  console.log('ko');
        done();
      });
    },

    'invalid args on json parsing method': function( test ){
      test.expect(3);
      test.equal(fs_coalesce.readFirstJsonFileToExistSync(null), false, 'should be false.');
      test.equal(fs_coalesce.readFirstJsonFileToExistSync([]), false, 'should be false.');
      test.equal(fs_coalesce.readFirstJsonFileToExistSync("not an array"), false, 'should be false.');
      test.done();
    },

    'first existing element is not first element with json parsing': function( test ){
      test.expect(1);

      var json = fs_coalesce.readFirstJsonFileToExistSync([ 'bogus-path', false, FILES_THAT_EXIST[0] ]);

      test.equal( json.test, "value1", 'should be value1 because it is the first element to exist.');
      test.done();
    },

    'invalid args': function( test ){
      test.expect(3);
      test.equal(fs_coalesce.readFirstFileToExistSync(null), false, 'should be false.');
      test.equal(fs_coalesce.readFirstFileToExistSync([]), false, 'should be false.');
      test.equal(fs_coalesce.readFirstFileToExistSync("not an array"), false, 'should be false.');
      test.done();
    },

    'one existing element': function( test ){
      test.expect(1);

      var contents = fs_coalesce.readFirstFileToExistSync([FILES_THAT_EXIST[0]]);
      var json = JSON.parse( contents );

      test.equal( json.test, "value1", 'should be value1.');
      test.done();
    },

    'multiple existing elements': function( test ){
      test.expect(1);

      var contents = fs_coalesce.readFirstFileToExistSync(FILES_THAT_EXIST);
      var json = JSON.parse( contents );

      test.equal( json.test, "value1", 'should be value1 because it is the first element to exist.');
      test.done();
    },

    'first existing element is not first element': function( test ){
      test.expect(1);

      var contents = fs_coalesce.readFirstFileToExistSync([ 'bogus-path', false, FILES_THAT_EXIST[0] ]);
      var json = JSON.parse( contents );

      test.equal( json.test, "value1", 'should be value1 because it is the first element to exist.');
      test.done();
    },

    'realize path': function( test ){
      test.expect(1);

      var path = '~/file.txt';
      var realizedPath = fs_coalesce.realizePath( path );

      test.notEqual( path, realizedPath, 'should not equal because ~ should be replaced');
      test.done();
    },

    'firstPathToExist invalid cases': function( test ){
      test.expect(3);
      test.equal(fs_coalesce.firstPathToExist(null), false, 'should be false.');
      test.equal(fs_coalesce.firstPathToExist([]), false, 'should be false.');
      test.equal(fs_coalesce.firstPathToExist("not an array"), false, 'should be false.');
      test.done();
    },

    'firstPathToExist valid cases': function( test ){
      test.expect(2);
      test.equal(fs_coalesce.firstPathToExist( [null, false, FILES_THAT_EXIST[0]] ), FILES_THAT_EXIST[0], 'should be the first valid value');
      test.equal(fs_coalesce.firstPathToExist( FILES_THAT_EXIST ), FILES_THAT_EXIST[0], 'should be the first valid value');
      test.done();
    }

  };

  function _createTempFileWithContent( content, callback ){
    temp.open( 'fs-coalesce-tests', function(err, info){
      if( err ) return callback( err, false );

      fs.write( info.fd, content );
      fs.close( info.fd, function(err){
        callback( err, info.path );
      });
    });
  }

})();
