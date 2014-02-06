'use strict';

var pkg = require('./package.json'),
_ = require('underscore');

module.exports = (function(){
  
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
    return callback();
  };

  var keys = function(callback){
    return callback(null, _.keys(storage));
  };

  var size = function(callback){
    return callback(_.size(storage));
  };

  return {
    write : write,
    has : has,
    read : read,
    remove : remove,
    clear : clear,
    keys : keys,
    size : size,
    version : pkg.version
  };

})();
