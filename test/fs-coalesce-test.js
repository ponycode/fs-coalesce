'use strict';

var assert = require("assert");
var expect = require('expect');

var fs = require('fs');
var fs_coalesce = require('../lib/fs-coalesce.js');
var temp = require("temp").track();

var FILES_THAT_EXIST = false;

beforeEach( function( done ){
	_createTempFileWithContent( "{\"test\":\"value1\"}", function( error, path1 ){
		_createTempFileWithContent( "{\"test\":\"value2\"}", function( error, path2 ){
			_createTempFileWithContent( "{\"test\":\"value3\"}", function( error, path3 ){
				FILES_THAT_EXIST = [path1, path2, path3];
				done();
			});
		});
	});
});

afterEach( function( done ){
	temp.cleanup( done );
});

describe('fs-coalesce', function(){

	it('invalid args on json parsing method', function(){
		assert.equal(fs_coalesce.readFirstJsonFileToExistSync(null), false, 'should be false.');
		assert.equal(fs_coalesce.readFirstJsonFileToExistSync([]), false, 'should be false.');
		assert.equal(fs_coalesce.readFirstJsonFileToExistSync("not an array"), false, 'should be false.');
	});

	it('first existing element is not first element with json parsing', function(){
		var json = fs_coalesce.readFirstJsonFileToExistSync([ 'bogus-path', false, FILES_THAT_EXIST[0] ]);

		assert.equal( json.test, "value1", 'should be value1 because it is the first element to exist.');
	});

	it('invalid args',  function(){
		assert.equal(fs_coalesce.readFirstFileToExistSync(null), false, 'should be false.');
		assert.equal(fs_coalesce.readFirstFileToExistSync([]), false, 'should be false.');
		assert.equal(fs_coalesce.readFirstFileToExistSync("not an array"), false, 'should be false.');
	});

	it('one existing element', function(){
		var contents = fs_coalesce.readFirstFileToExistSync([FILES_THAT_EXIST[0]]);
		var json = JSON.parse( contents );

		assert.equal( json.test, "value1", 'should be value1.');
	});

	it('multiple existing elements', function(){
		var contents = fs_coalesce.readFirstFileToExistSync(FILES_THAT_EXIST);
		var json = JSON.parse( contents );

		assert.equal( json.test, "value1", 'should be value1 because it is the first element to exist.');
	});

	it('first existing element is not first element', function(){
		var contents = fs_coalesce.readFirstFileToExistSync([ 'bogus-path', false, FILES_THAT_EXIST[0] ]);
		var json = JSON.parse( contents );

		assert.equal( json.test, "value1", 'should be value1 because it is the first element to exist.');
	});

	it('realize path', function(){
		var path = '~/file.txt';
		var realizedPath = fs_coalesce.realizePath( path );

		assert.notEqual( path, realizedPath, 'should not equal because ~ should be replaced');
	});

	it('firstPathToExist invalid cases', function(){
		assert.equal(fs_coalesce.firstPathToExist(null), false, 'should be false.');
		assert.equal(fs_coalesce.firstPathToExist([]), false, 'should be false.');
		assert.equal(fs_coalesce.firstPathToExist("not an array"), false, 'should be false.');
	});

	it('firstPathToExist valid cases', function(){
		assert.equal(fs_coalesce.firstPathToExist( [null, false, FILES_THAT_EXIST[0]] ), FILES_THAT_EXIST[0], 'should be the first valid value');
		assert.equal(fs_coalesce.firstPathToExist( FILES_THAT_EXIST ), FILES_THAT_EXIST[0], 'should be the first valid value');
	});
});

function _createTempFileWithContent( content, callback ){
	temp.open( 'fs-coalesce-tests', function(err, info){
		if( err ) return callback( err, false );

		fs.write( info.fd, content, function(){
			fs.close( info.fd, function( err ){
				callback( err, info.path );
			});
		});
	});
}
