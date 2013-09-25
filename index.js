var resolve = require('resolve');
var path = require('path');

var _internals = exports.internals = {
  mockedModules: {},
  
  resolve: function (moduleName, baseDir) {
    return resolve.sync(path.resolve(baseDir, moduleName), {
      baseDir: baseDir
    });
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
  var module;
  
  _internals.addMocks(mocks);
  
  if (!_internals.mockedModules[moduleName]) {
    module = require(moduleName);
  }
  
  
  return module;
};