'use strict';

var pkg = require('./package.json'),
_ = require('underscore');

module.exports = function(){
  
  var storage = {};

  var clear = function(callback){
    storage = {};
    return callback();
  };

  var write = function (key, data, callback){
    storage[key] = data;
    return callback();
  };

  var read = function(key, callback){
    if(_.has(storage, key)) return callback(null, storage[key]);
    else return callback(new Error('Key is not in cache')); 
  };

  var has = function(key, callback){
    return callback(_.has(storage, key));
  };

  var remove = function(key, callback){
    delete storage[key];
    return callback(null);
  };

  var keys = function(callback){
    var keys = _.keys(storage);
    return callback(null, keys);
  };

  var size = function(callback){
    return callback(_.size(storage));
  };

  var load = function(obj){
    storage = obj;
  };

  var get = function(){
    return storage;
  };

  return {
    write : write,
    has : has,
    read : read,
    remove : remove,
    clear : clear,
    keys : keys,
    size : size,
    version : pkg.version,

    // support methods for wrapper modules
    load : load, // load a storage object
    get : get // get the current storage object
  };

};
