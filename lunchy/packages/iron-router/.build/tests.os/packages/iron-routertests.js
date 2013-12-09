(function () {

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
// packages\iron-router\test\test_helpers.js                                       //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////
                                                                                   //
Router.configure({                                                                 // 1
  autoRender: false,                                                               // 2
  autoStart: false                                                                 // 3
});                                                                                // 4
                                                                                   // 5
/////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
// packages\iron-router\test\route.js                                              //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////
                                                                                   //
/*                                                                                 // 1
 * Tests for Route                                                                 // 2
 */                                                                                // 3
                                                                                   // 4
var paths = {                                                                      // 5
  explicit: '/posts',                                                              // 6
  required: '/posts/:param',                                                       // 7
  multi: '/posts/:paramOne/:paramTwo',                                             // 8
  optional: '/posts/:paramOne/:paramTwo?',                                         // 9
  wildcard: '/posts/*',                                                            // 10
  namedWildcard: '/posts/:file(*)',                                                // 11
  regex: /^\/commits\/(\d+)\.\.(\d+)/                                              // 12
};                                                                                 // 13
                                                                                   // 14
Tinytest.add('Route - matching', function (test) {                                 // 15
  var route = new Route(Router, 'explicit', {                                      // 16
    path: paths.explicit                                                           // 17
  });                                                                              // 18
  test.isTrue(route.test('/posts'));                                               // 19
  test.isTrue(route.exec('/posts'));                                               // 20
  test.isTrue(route.test('/posts/'));                                              // 21
  test.isFalse(route.test('/posts/1'));                                            // 22
  test.isNull(route.exec('/posts/1'));                                             // 23
                                                                                   // 24
  route = new Route(Router, 'required', {                                          // 25
    path: paths.required                                                           // 26
  });                                                                              // 27
  test.isTrue(route.test('/posts/1'));                                             // 28
  test.isTrue(route.exec('/posts/1'));                                             // 29
  test.isFalse(route.test('/posts/1/2'));                                          // 30
  test.isNull(route.exec('/posts/1/2'));                                           // 31
                                                                                   // 32
  route = new Route(Router, 'multi', {                                             // 33
    path: paths.multi                                                              // 34
  });                                                                              // 35
  test.isTrue(route.test('/posts/1/2'));                                           // 36
  test.isTrue(route.exec('/posts/1/2'));                                           // 37
  test.isFalse(route.test('/posts/1/2/3'));                                        // 38
  test.isNull(route.exec('/posts/1/2/3'));                                         // 39
                                                                                   // 40
  route = new Route(Router, 'optional', {                                          // 41
    path: paths.optional                                                           // 42
  });                                                                              // 43
  test.isTrue(route.test('/posts/1'));                                             // 44
  test.isTrue(route.exec('/posts/1'));                                             // 45
  test.isTrue(route.test('/posts/1/2'));                                           // 46
  test.isTrue(route.exec('/posts/1/2'));                                           // 47
                                                                                   // 48
  route = new Route(Router, 'wildcard', {                                          // 49
    path: paths.wildcard                                                           // 50
  });                                                                              // 51
  test.isTrue(route.test('/posts/1/2'));                                           // 52
  test.isTrue(route.exec('/posts/1/2'));                                           // 53
  test.isTrue(route.test('/posts/1/2/3'));                                         // 54
  test.isTrue(route.exec('/posts/1/2/3'));                                         // 55
  test.isTrue(route.test('/posts/1/2/3/4'));                                       // 56
  test.isTrue(route.exec('/posts/1/2/3/4'));                                       // 57
                                                                                   // 58
  route = new Route(Router, 'namedWildcard', {                                     // 59
    path: paths.namedWildcard                                                      // 60
  });                                                                              // 61
  test.isTrue(route.test('/posts/path/to/file'));                                  // 62
  test.isTrue(route.exec('/posts/path/to/file'));                                  // 63
                                                                                   // 64
  route = new Route(Router, 'regex', {                                             // 65
    path: paths.regex                                                              // 66
  });                                                                              // 67
  test.isTrue(route.test('/commits/123..456'));                                    // 68
  test.isTrue(route.exec('/commits/123..456'));                                    // 69
});                                                                                // 70
                                                                                   // 71
Tinytest.add('Route - params', function (test) {                                   // 72
  var route = new Route(Router, 'explicit', {                                      // 73
    path: paths.explicit                                                           // 74
  });                                                                              // 75
                                                                                   // 76
  test.isNull(route.params());                                                     // 77
  test.isTrue(route.params('/posts') instanceof Array);                            // 78
                                                                                   // 79
  route = new Route(Router, 'required', {                                          // 80
    path: paths.required                                                           // 81
  });                                                                              // 82
                                                                                   // 83
  var params = route.params('/posts/1');                                           // 84
  test.equal(params.param, "1");                                                   // 85
                                                                                   // 86
  route = new Route(Router, 'multi', {                                             // 87
    path: paths.multi                                                              // 88
  });                                                                              // 89
  params = route.params('/posts/1/2');                                             // 90
  test.equal(params.paramOne, '1');                                                // 91
  test.equal(params.paramTwo, '2');                                                // 92
                                                                                   // 93
  route = new Route(Router, 'optional', {                                          // 94
    path: paths.optional                                                           // 95
  });                                                                              // 96
  params = route.params('/posts/1');                                               // 97
  test.equal(params.paramOne, '1');                                                // 98
  test.isUndefined(params.paramTwo);                                               // 99
                                                                                   // 100
  params = route.params('/posts/1/2');                                             // 101
  test.equal(params.paramOne, '1');                                                // 102
  test.equal(params.paramTwo, '2');                                                // 103
                                                                                   // 104
  route = new Route(Router, 'wildcard', {                                          // 105
    path: paths.wildcard                                                           // 106
  });                                                                              // 107
  params = route.params('/posts/some/wildcard/path');                              // 108
  test.equal(params[0], 'some/wildcard/path');                                     // 109
                                                                                   // 110
  route = new Route(Router, 'namedWildcard', {                                     // 111
    path: paths.namedWildcard                                                      // 112
  });                                                                              // 113
  params = route.params('/posts/some/file/path');                                  // 114
  test.equal(params.file, 'some/file/path');                                       // 115
                                                                                   // 116
  route = new Route(Router, 'regex', {                                             // 117
    path: paths.regex                                                              // 118
  });                                                                              // 119
  params = route.params('/commits/123..456');                                      // 120
  test.equal(params[0], '123');                                                    // 121
  test.equal(params[1], '456');                                                    // 122
});                                                                                // 123
                                                                                   // 124
Tinytest.add('Route - params with query and hash', function (test) {               // 125
  var route = new Route(Router, 'optional', {                                      // 126
    path: paths.optional                                                           // 127
  });                                                                              // 128
                                                                                   // 129
  var params;                                                                      // 130
                                                                                   // 131
  params = route.params('/posts/1?q=s#anchorTag');                                 // 132
  test.equal(params.paramOne, '1');                                                // 133
  test.isUndefined(params.paramTwo);                                               // 134
  test.equal(params.q, 's');                                                       // 135
  test.equal(params.hash, 'anchorTag');                                            // 136
                                                                                   // 137
  params = route.params('/posts/1/2?q=s#anchorTag');                               // 138
  test.equal(params.paramTwo, '2');                                                // 139
});                                                                                // 140
                                                                                   // 141
Tinytest.add('Route - resolve', function (test) {                                  // 142
  var route = new Route(Router, 'required', {                                      // 143
    path: paths.required                                                           // 144
  });                                                                              // 145
                                                                                   // 146
  var params;                                                                      // 147
  var options;                                                                     // 148
                                                                                   // 149
  params = {                                                                       // 150
    param: '1'                                                                     // 151
  };                                                                               // 152
  test.equal(route.resolve(params), '/posts/1');                                   // 153
                                                                                   // 154
  params = {                                                                       // 155
    param: '1'                                                                     // 156
  };                                                                               // 157
  options = {                                                                      // 158
    query: {                                                                       // 159
      q: 's'                                                                       // 160
    },                                                                             // 161
    hash: 'anchorTag'                                                              // 162
  };                                                                               // 163
  test.equal(route.resolve(params, options), '/posts/1/?q=s#anchorTag');           // 164
                                                                                   // 165
  route = new Route(Router, 'wildcard', {                                          // 166
    path: paths.wildcard                                                           // 167
  });                                                                              // 168
  params = ['some/file/path'];                                                     // 169
  test.equal(route.resolve(params), '/posts/some/file/path');                      // 170
                                                                                   // 171
  route = new Route(Router, 'namedWildcard', {                                     // 172
    path: paths.namedWildcard                                                      // 173
  });                                                                              // 174
});                                                                                // 175
                                                                                   // 176
Tinytest.add('Route - normalizePath', function (test) {                            // 177
  var route = new Route(Router, 'explicit', {                                      // 178
    path: paths.explicit                                                           // 179
  });                                                                              // 180
                                                                                   // 181
  test.equal(route.normalizePath('/posts'), '/posts');                             // 182
  test.equal(route.normalizePath('posts'), '/posts');                              // 183
  test.equal(route.normalizePath(Meteor.absoluteUrl('posts')), '/posts');          // 184
  test.equal(route.normalizePath('/posts?q=s'), '/posts');                         // 185
  test.equal(route.normalizePath('/posts#anchorTag'), '/posts');                   // 186
});                                                                                // 187
                                                                                   // 188
Tinytest.add('Route - getController', function (test) {                            // 189
  var route;                                                                       // 190
  var root = Utils.global();                                                       // 191
                                                                                   // 192
  root.TestController = function (options)  {                                      // 193
    if (arguments.length < 1)                                                      // 194
      throw new Error('Argument length check');                                    // 195
                                                                                   // 196
    this.options = options;                                                        // 197
  };                                                                               // 198
                                                                                   // 199
  var testGetController = function (route) {                                       // 200
    var controller = route.getController('/test', {option: true});                 // 201
    test.isTrue(controller instanceof TestController);                             // 202
    test.equal(controller.options.route, route);                                   // 203
    test.equal(controller.options.template, 'template');                           // 204
    test.isTrue(controller.options.option);                                        // 205
  };                                                                               // 206
                                                                                   // 207
  // case 1: controller option                                                     // 208
  var route = new Route(Router, 'test', {                                          // 209
    controller: root.TestController,                                               // 210
    template: 'template'                                                           // 211
  });                                                                              // 212
  testGetController(route);                                                        // 213
                                                                                   // 214
  // case 1a: controller option as string                                          // 215
  var route = new Route(Router, 'test', {                                          // 216
    controller: 'TestController',                                                  // 217
    template: 'template'                                                           // 218
  });                                                                              // 219
  testGetController(route);                                                        // 220
                                                                                   // 221
  root.App = {};                                                                   // 222
  root.App.TestController = root.TestController;                                   // 223
  // case 1b: controller option as namespaced string                               // 224
  var route = new Route(Router, 'test', {                                          // 225
    controller: 'App.TestController',                                              // 226
    template: 'template'                                                           // 227
  });                                                                              // 228
  testGetController(route);                                                        // 229
                                                                                   // 230
  // case 2: resolve controller intelligently                                      // 231
  var route = new Route(Router, 'test', {                                          // 232
    template: 'template'                                                           // 233
  });                                                                              // 234
  testGetController(route);                                                        // 235
                                                                                   // 236
  // case 3: anonymous controller                                                  // 237
  // case 2: resolve controller intelligently                                      // 238
  var route = new Route(Router, 'anon', {                                          // 239
    template: 'template'                                                           // 240
  });                                                                              // 241
  var controller = route.getController('/anon', {option: true});                   // 242
  test.isTrue(controller instanceof RouteController);                              // 243
  test.equal(controller.options.route, route);                                     // 244
  test.equal(controller.options.template, 'template');                             // 245
  test.isTrue(controller.options.option);                                          // 246
});                                                                                // 247
                                                                                   // 248
/////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
// packages\iron-router\test\route_controller.js                                   //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////
                                                                                   //
Tinytest.add('IronRouteController - inheritance', function (test) {                // 1
  var App = IronRouteController.extend({                                           // 2
    action: function () {                                                          // 3
      return 'app';                                                                // 4
    }                                                                              // 5
  });                                                                              // 6
                                                                                   // 7
  var Child = App.extend({                                                         // 8
    action: function () {                                                          // 9
      var superVal = Child.__super__.action.call(this);                            // 10
      return [superVal, 'child'];                                                  // 11
    }                                                                              // 12
  });                                                                              // 13
                                                                                   // 14
  var inst = new Child;                                                            // 15
  test.equal(inst.action(), ['app', 'child']);                                     // 16
});                                                                                // 17
                                                                                   // 18
Tinytest.add('IronRouteController - runHooks', function (test) {                   // 19
  var calls = [];                                                                  // 20
  var call = function (idx) {                                                      // 21
    return function () {                                                           // 22
      calls.push(idx);                                                             // 23
    }                                                                              // 24
  };                                                                               // 25
                                                                                   // 26
  var opts = {                                                                     // 27
    before: [call(0)]                                                              // 28
  };                                                                               // 29
                                                                                   // 30
  var A = IronRouteController.extend({                                             // 31
    before: [call(1), call(2)]                                                     // 32
  });                                                                              // 33
                                                                                   // 34
  var B = A.extend({                                                               // 35
    before: [call(3), call(4)]                                                     // 36
  });                                                                              // 37
                                                                                   // 38
  /*                                                                               // 39
   * Given:                                                                        // 40
   *  A prototype['before'] => [f1, f2]                                            // 41
   *    B inherits A proto['before'] => [f3, f4]                                   // 42
   *                                                                               // 43
   *  Router options => [f5, f6]                                                   // 44
   *  Route options => [f7, f8]                                                    // 45
   *                                                                               // 46
   *  runHooks('before') => [f1..f8]                                               // 47
   *                                                                               // 48
   */                                                                              // 49
                                                                                   // 50
  test.equal(calls.length, 0, 'call list not empty');                              // 51
  var bInst = new B(opts);                                                         // 52
  bInst.runHooks('before');                                                        // 53
                                                                                   // 54
  for (var i = 0; i < 5; i++) {                                                    // 55
    test.equal(calls[i], i, 'runHooks has the wrong exec order');                  // 56
  }                                                                                // 57
});                                                                                // 58
                                                                                   // 59
/////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
// packages\iron-router\test\router.js                                             //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////
                                                                                   //
/*****************************************************************************/    // 1
/* Mocks and Stubs */                                                              // 2
/*****************************************************************************/    // 3
var controllerMock = {                                                             // 4
  run: function () {},                                                             // 5
  runHooks: function () {}                                                         // 6
};                                                                                 // 7
                                                                                   // 8
var routes = [{                                                                    // 9
  where: 'client',                                                                 // 10
  test: function (path) { return path == 'client'; },                              // 11
  getController: function (path, options) { return EJSON.clone(controllerMock); }, // 12
  path: function (params, options) {                                               // 13
    return [params, options];                                                      // 14
  },                                                                               // 15
  url: function (params, options) {                                                // 16
    return [params, options];                                                      // 17
  }                                                                                // 18
}, {                                                                               // 19
  where: 'server',                                                                 // 20
  test: function (path) { return path == 'server' },                               // 21
  getController: function () { return EJSON.clone(controllerMock); },              // 22
  path: function (params, options) {                                               // 23
    return [params, options];                                                      // 24
  },                                                                               // 25
  url: function (params, options) {                                                // 26
    return [params, options];                                                      // 27
  }                                                                                // 28
}];                                                                                // 29
                                                                                   // 30
// simulate the named routes                                                       // 31
routes.client = routes[0];                                                         // 32
routes.server = routes[1];                                                         // 33
                                                                                   // 34
/*****************************************************************************/    // 35
/* Client and Server */                                                            // 36
/*****************************************************************************/    // 37
Tinytest.add('IronRouter - path', function (test) {                                // 38
  var router = new IronRouter;                                                     // 39
  router.routes = routes;                                                          // 40
                                                                                   // 41
  var params = [];                                                                 // 42
  var opts = {};                                                                   // 43
  var res = router.path('client', params, opts);                                   // 44
                                                                                   // 45
  test.equal(res[0], params);                                                      // 46
  test.equal(res[1], opts);                                                        // 47
});                                                                                // 48
                                                                                   // 49
Tinytest.add('IronRouter - url', function (test) {                                 // 50
  var router = new IronRouter;                                                     // 51
  router.routes = routes;                                                          // 52
                                                                                   // 53
  var params = [];                                                                 // 54
  var opts = {};                                                                   // 55
                                                                                   // 56
  var res = router.url('client', params, opts);                                    // 57
                                                                                   // 58
  test.equal(res[0], params);                                                      // 59
  test.equal(res[1], opts);                                                        // 60
});                                                                                // 61
                                                                                   // 62
/*****************************************************************************/    // 63
/* Client */                                                                       // 64
/*****************************************************************************/    // 65
if (Meteor.isClient) {                                                             // 66
  Tinytest.add('IronRouter - client dispatch', function (test) {                   // 67
    var router = new IronRouter;                                                   // 68
                                                                                   // 69
    router.routes = routes;                                                        // 70
                                                                                   // 71
    var runController = null;                                                      // 72
    var runCallback = null;                                                        // 73
                                                                                   // 74
    router.run = function (controller, cb) {                                       // 75
      runController = controller;                                                  // 76
      runCallback = cb;                                                            // 77
    };                                                                             // 78
                                                                                   // 79
    // 1. onRouteNotFound                                                          // 80
    var onRouteNotFoundCalled = false;                                             // 81
    router.onRouteNotFound = function (path, options) {                            // 82
      onRouteNotFoundCalled = true;                                                // 83
    };                                                                             // 84
                                                                                   // 85
    var onUnhandledCalled = false;                                                 // 86
    router.onUnhandled = function (path, options) {                                // 87
      onUnhandledCalled = true;                                                    // 88
    };                                                                             // 89
                                                                                   // 90
    router.dispatch('bogus');                                                      // 91
    test.isTrue(onRouteNotFoundCalled, 'onRouteNotFound not called');              // 92
                                                                                   // 93
    // 2. where !== where                                                          // 94
    router.dispatch('server');                                                     // 95
    test.isTrue(onUnhandledCalled, 'onUnhandled not called for server route');     // 96
                                                                                   // 97
    // 3. run method called                                                        // 98
    router.dispatch('client', {}, function () {});                                 // 99
    test.isTrue(runController, 'run not called with a controller');                // 100
    test.isTrue(runCallback, 'run not called with a callback');                    // 101
  });                                                                              // 102
}                                                                                  // 103
                                                                                   // 104
/*****************************************************************************/    // 105
/* Server */                                                                       // 106
/*****************************************************************************/    // 107
if (Meteor.isServer) {                                                             // 108
  Tinytest.add('IronRouter - server dispatch', function (test) {                   // 109
    var router = new IronRouter;                                                   // 110
                                                                                   // 111
    router.routes = routes;                                                        // 112
                                                                                   // 113
    var runController = null;                                                      // 114
    var runCallback = null;                                                        // 115
                                                                                   // 116
    router.run = function (controller, cb) {                                       // 117
      runController = controller;                                                  // 118
      runCallback = cb;                                                            // 119
    };                                                                             // 120
                                                                                   // 121
    // 1. onRouteNotFound                                                          // 122
    var onRouteNotFoundCalled = false;                                             // 123
    router.onRouteNotFound = function (path, options) {                            // 124
      onRouteNotFoundCalled = true;                                                // 125
    };                                                                             // 126
                                                                                   // 127
    var onUnhandledCalled = false;                                                 // 128
    router.onUnhandled = function (path, options) {                                // 129
      onUnhandledCalled = true;                                                    // 130
    };                                                                             // 131
                                                                                   // 132
    router.dispatch('bogus');                                                      // 133
    test.isTrue(onRouteNotFoundCalled, 'onRouteNotFound not called');              // 134
                                                                                   // 135
    // 2. where !== where                                                          // 136
    router.dispatch('client');                                                     // 137
    test.isTrue(onUnhandledCalled, 'onUnhandled not called for client route');     // 138
                                                                                   // 139
    // 3. run method called                                                        // 140
    router.dispatch('server', {}, function () {});                                 // 141
    test.isTrue(runController, 'run not called with a controller');                // 142
    test.isTrue(runCallback, 'run not called with a callback');                    // 143
  });                                                                              // 144
}                                                                                  // 145
                                                                                   // 146
/////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
// packages\iron-router\test\server\router.js                                      //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////
                                                                                   //
Tinytest.add('ServerRouter - before hooks', function (test) {                      // 1
  var router = new ServerRouter;                                                   // 2
  var where = 'server';                                                            // 3
                                                                                   // 4
  var firstHookCalled = 0;                                                         // 5
  router.before(function() { firstHookCalled += 1; }, {only: 'one'})               // 6
                                                                                   // 7
  var secondHookCalled = 0;                                                        // 8
  router.before(function() { secondHookCalled += 1; }, {except: 'two'})            // 9
                                                                                   // 10
  var thirdHookCalled = 0;                                                         // 11
  router.configure({before: function() { thirdHookCalled += 1; }})                 // 12
                                                                                   // 13
  var fourthHookCalled = 0;                                                        // 14
  router.before(function(){ fourthHookCalled += 1 })                               // 15
                                                                                   // 16
  router.map(function() {                                                          // 17
    this.route('one', {where: where});                                             // 18
    this.route('two', {where: where});                                             // 19
    this.route('three', {where: where});                                           // 20
  });                                                                              // 21
                                                                                   // 22
  // mock                                                                          // 23
  var serverOptionsMock = {next: _.identity, response: {end: _.identity}};         // 24
                                                                                   // 25
  router.dispatch('one', serverOptionsMock);                                       // 26
  test.equal(firstHookCalled, 1);                                                  // 27
  test.equal(secondHookCalled, 1);                                                 // 28
  test.equal(thirdHookCalled, 1);                                                  // 29
  test.equal(fourthHookCalled, 1);                                                 // 30
                                                                                   // 31
  router.dispatch('two', serverOptionsMock);                                       // 32
  test.equal(firstHookCalled, 1);                                                  // 33
  test.equal(secondHookCalled, 1);                                                 // 34
  test.equal(thirdHookCalled, 2);                                                  // 35
  test.equal(fourthHookCalled, 2);                                                 // 36
                                                                                   // 37
  router.dispatch('three', serverOptionsMock);                                     // 38
  test.equal(firstHookCalled, 1);                                                  // 39
  test.equal(secondHookCalled, 2);                                                 // 40
  test.equal(thirdHookCalled, 3);                                                  // 41
  test.equal(fourthHookCalled, 3);                                                 // 42
});                                                                                // 43
                                                                                   // 44
                                                                                   // 45
/////////////////////////////////////////////////////////////////////////////////////

}).call(this);
