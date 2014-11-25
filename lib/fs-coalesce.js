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
  var _ = require('underscore');

  var USER_HOME_PATH = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE || false;

  exports.firstPathToExist = function( pathArray ){
    if( !pathArray ) return false;

    var numberOfElements = pathArray.length;
    for( var n = 0; n < numberOfElements; n++ ){
      if( fs.existsSync( pathArray[n] ) ) return pathArray[n];
    }

    return false;
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
    if( !_.isArray( pathArray ) ) return false;

    var numberOfElements = pathArray.length;
    for( var n = 0; n < numberOfElements; n++ ){
      var contents = _readFileAtPathSync( pathArray[n] );
      if( contents !== false ) return contents;
    }

    return false;
  };

  function _readFileAtPathSync( path ){

    if( !path ) return false;

    path = _realizePath( path );

    try{
      return fs.readFileSync( path, {encoding: 'utf8'} );
    }catch( e ){
      return false;
    }
  };

  function _realizePath( path ){
    if( path.indexOf('~') === 0 ){
      return path.replace( '~', USER_HOME_PATH );
    }else{
      return path;
    }
  }

  exports.realizePath = function( path ){
    return _realizePath( path );
  };

})();

