var resolve = require('resolve');
var path = require('path');

var _internals = exports.internals = {
  baseDir: __dirname,
  mockedModules: {},
  
  resolve: function (moduleName, baseDir) {
    var fullModulePath = baseDir ? path.resolve(baseDir, moduleName) : moduleName;
    
    return require(resolve.sync(fullModulePath, {
      baseDir: baseDir
    }));
  },
  
  addMocks: function (mocks) {
    mocks = mocks || {};
    
    Object.keys(mocks).forEach(function (key) {
      var mock = mocks[key];
      _internals.mockedModules[key] = mock;
    });
  }
};

_internals.require = exports.require = function (moduleName, mocks) {
  _internals.addMocks(mocks);
  
  if (_internals.mockedModules[moduleName]) {
    return _internals.mockedModules[moduleName];
  }
  var Module = require('module');
  var id = Module._resolveFilename(moduleName, Module.parent);
  console.log('\n\n\n==================', id);
  
  var module;
  module = _internals.resolve(moduleName);
  return module;
};

_internals.setBaseDir = exports.setBaseDir = function (dir) {
  _internals.baseDir = dir;
};