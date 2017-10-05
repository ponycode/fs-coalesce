/*
 * fs-coalesce
 * https://github.com/josh/fs-coalesce
 *
 * Copyright (c) 2014 PonyCode Corporation
 * Licensed under the MIT license.
 */

'use strict';

( function(){

  var fs = require('fs');
  var _ = require('lodash');
  var os = require('os');

  exports.firstPathToExist = function( pathArray ){
    if( !_.isArray( pathArray ) ) return false;
    var firstPath = false;
    _.each( pathArray, function(path){
      if( !path ) return;
      var realPath = _realizePath( path );
      if( fs.existsSync( realPath )){
		  firstPath = realPath;
		  return false;
      }
    });
    return firstPath;
  };

  exports.readFirstJsonFileToExistSync = function( pathArray ){
    var contents = exports.readFirstFileToExistSync( pathArray );
    if( _.isString( contents ) && contents.length > 0 ){
      return JSON.parse( contents );
    }else{
      return false;
    }
  };

  exports.readFirstFileToExistSync = function( pathArray ){
    var firstPathToExist = exports.firstPathToExist( pathArray );
    return _readFileAtPathSync( firstPathToExist );
  };

  function _readFileAtPathSync( path ){
    if( !path ) return false;

    path = _realizePath( path );

    try{
      return fs.readFileSync( path, {encoding: 'utf8'} );
    }catch( e ){
      return false;
    }
  }

  function _realizePath( path ){
    if( path.indexOf('~') === 0 ){
      return path.replace( '~', os.homedir() );
    }else{
      return path;
    }
  }

  exports.realizePath = function( path ){
    return _realizePath( path );
  };

})();

