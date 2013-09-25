var test = require('tape');
var fs = require('fs');
var path = require('path');
var requireMock = require('../index');
var internals = requireMock.internals;
var _require = requireMock.require;

test('Resolves modules normally', function (t) {
  t.plan(1);
  
  var mockFs = _require('fs');
  t.deepEqual(mockFs, fs, 'module loaded');
});

test('Resolves directory path', function (t) {
  t.plan(2);
  
  var module = internals.resolve('./fixtures/exports_module', path.resolve(__dirname, '../test'));
  var module2 = internals.resolve('fixtures/exports_module', path.resolve(__dirname, '../test'));
  
  t.ok(module, 'resolves module from current directory');
  t.ok(module, 'resolve module from relative directory');
});

test('Adds modules to mocked list when passed in', function (t) {
  t.plan(1);
  
  _require('path', {
    someModule: 'someModule'
  });
  
  t.ok(internals.mockedModules.someModule, 'added module');
});

// test('Resolves mocked modules when required', function (t) {
//   t.plan(1);
  
//   var exportsModule = _require('fixtures/exports_module', {
//     path: 'path'
//   });
  
//   t.deepEqual(exportsModule.path(), 'path', 'mocked required module');
// });
