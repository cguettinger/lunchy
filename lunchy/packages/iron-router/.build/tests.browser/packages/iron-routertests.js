(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages\iron-router\test\test_helpers.js                                                      //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
Router.configure({                                                                                // 1
  autoRender: false,                                                                              // 2
  autoStart: false                                                                                // 3
});                                                                                               // 4
                                                                                                  // 5
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages\iron-router\test\route.js                                                             //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
/*                                                                                                // 1
 * Tests for Route                                                                                // 2
 */                                                                                               // 3
                                                                                                  // 4
var paths = {                                                                                     // 5
  explicit: '/posts',                                                                             // 6
  required: '/posts/:param',                                                                      // 7
  multi: '/posts/:paramOne/:paramTwo',                                                            // 8
  optional: '/posts/:paramOne/:paramTwo?',                                                        // 9
  wildcard: '/posts/*',                                                                           // 10
  namedWildcard: '/posts/:file(*)',                                                               // 11
  regex: /^\/commits\/(\d+)\.\.(\d+)/                                                             // 12
};                                                                                                // 13
                                                                                                  // 14
Tinytest.add('Route - matching', function (test) {                                                // 15
  var route = new Route(Router, 'explicit', {                                                     // 16
    path: paths.explicit                                                                          // 17
  });                                                                                             // 18
  test.isTrue(route.test('/posts'));                                                              // 19
  test.isTrue(route.exec('/posts'));                                                              // 20
  test.isTrue(route.test('/posts/'));                                                             // 21
  test.isFalse(route.test('/posts/1'));                                                           // 22
  test.isNull(route.exec('/posts/1'));                                                            // 23
                                                                                                  // 24
  route = new Route(Router, 'required', {                                                         // 25
    path: paths.required                                                                          // 26
  });                                                                                             // 27
  test.isTrue(route.test('/posts/1'));                                                            // 28
  test.isTrue(route.exec('/posts/1'));                                                            // 29
  test.isFalse(route.test('/posts/1/2'));                                                         // 30
  test.isNull(route.exec('/posts/1/2'));                                                          // 31
                                                                                                  // 32
  route = new Route(Router, 'multi', {                                                            // 33
    path: paths.multi                                                                             // 34
  });                                                                                             // 35
  test.isTrue(route.test('/posts/1/2'));                                                          // 36
  test.isTrue(route.exec('/posts/1/2'));                                                          // 37
  test.isFalse(route.test('/posts/1/2/3'));                                                       // 38
  test.isNull(route.exec('/posts/1/2/3'));                                                        // 39
                                                                                                  // 40
  route = new Route(Router, 'optional', {                                                         // 41
    path: paths.optional                                                                          // 42
  });                                                                                             // 43
  test.isTrue(route.test('/posts/1'));                                                            // 44
  test.isTrue(route.exec('/posts/1'));                                                            // 45
  test.isTrue(route.test('/posts/1/2'));                                                          // 46
  test.isTrue(route.exec('/posts/1/2'));                                                          // 47
                                                                                                  // 48
  route = new Route(Router, 'wildcard', {                                                         // 49
    path: paths.wildcard                                                                          // 50
  });                                                                                             // 51
  test.isTrue(route.test('/posts/1/2'));                                                          // 52
  test.isTrue(route.exec('/posts/1/2'));                                                          // 53
  test.isTrue(route.test('/posts/1/2/3'));                                                        // 54
  test.isTrue(route.exec('/posts/1/2/3'));                                                        // 55
  test.isTrue(route.test('/posts/1/2/3/4'));                                                      // 56
  test.isTrue(route.exec('/posts/1/2/3/4'));                                                      // 57
                                                                                                  // 58
  route = new Route(Router, 'namedWildcard', {                                                    // 59
    path: paths.namedWildcard                                                                     // 60
  });                                                                                             // 61
  test.isTrue(route.test('/posts/path/to/file'));                                                 // 62
  test.isTrue(route.exec('/posts/path/to/file'));                                                 // 63
                                                                                                  // 64
  route = new Route(Router, 'regex', {                                                            // 65
    path: paths.regex                                                                             // 66
  });                                                                                             // 67
  test.isTrue(route.test('/commits/123..456'));                                                   // 68
  test.isTrue(route.exec('/commits/123..456'));                                                   // 69
});                                                                                               // 70
                                                                                                  // 71
Tinytest.add('Route - params', function (test) {                                                  // 72
  var route = new Route(Router, 'explicit', {                                                     // 73
    path: paths.explicit                                                                          // 74
  });                                                                                             // 75
                                                                                                  // 76
  test.isNull(route.params());                                                                    // 77
  test.isTrue(route.params('/posts') instanceof Array);                                           // 78
                                                                                                  // 79
  route = new Route(Router, 'required', {                                                         // 80
    path: paths.required                                                                          // 81
  });                                                                                             // 82
                                                                                                  // 83
  var params = route.params('/posts/1');                                                          // 84
  test.equal(params.param, "1");                                                                  // 85
                                                                                                  // 86
  route = new Route(Router, 'multi', {                                                            // 87
    path: paths.multi                                                                             // 88
  });                                                                                             // 89
  params = route.params('/posts/1/2');                                                            // 90
  test.equal(params.paramOne, '1');                                                               // 91
  test.equal(params.paramTwo, '2');                                                               // 92
                                                                                                  // 93
  route = new Route(Router, 'optional', {                                                         // 94
    path: paths.optional                                                                          // 95
  });                                                                                             // 96
  params = route.params('/posts/1');                                                              // 97
  test.equal(params.paramOne, '1');                                                               // 98
  test.isUndefined(params.paramTwo);                                                              // 99
                                                                                                  // 100
  params = route.params('/posts/1/2');                                                            // 101
  test.equal(params.paramOne, '1');                                                               // 102
  test.equal(params.paramTwo, '2');                                                               // 103
                                                                                                  // 104
  route = new Route(Router, 'wildcard', {                                                         // 105
    path: paths.wildcard                                                                          // 106
  });                                                                                             // 107
  params = route.params('/posts/some/wildcard/path');                                             // 108
  test.equal(params[0], 'some/wildcard/path');                                                    // 109
                                                                                                  // 110
  route = new Route(Router, 'namedWildcard', {                                                    // 111
    path: paths.namedWildcard                                                                     // 112
  });                                                                                             // 113
  params = route.params('/posts/some/file/path');                                                 // 114
  test.equal(params.file, 'some/file/path');                                                      // 115
                                                                                                  // 116
  route = new Route(Router, 'regex', {                                                            // 117
    path: paths.regex                                                                             // 118
  });                                                                                             // 119
  params = route.params('/commits/123..456');                                                     // 120
  test.equal(params[0], '123');                                                                   // 121
  test.equal(params[1], '456');                                                                   // 122
});                                                                                               // 123
                                                                                                  // 124
Tinytest.add('Route - params with query and hash', function (test) {                              // 125
  var route = new Route(Router, 'optional', {                                                     // 126
    path: paths.optional                                                                          // 127
  });                                                                                             // 128
                                                                                                  // 129
  var params;                                                                                     // 130
                                                                                                  // 131
  params = route.params('/posts/1?q=s#anchorTag');                                                // 132
  test.equal(params.paramOne, '1');                                                               // 133
  test.isUndefined(params.paramTwo);                                                              // 134
  test.equal(params.q, 's');                                                                      // 135
  test.equal(params.hash, 'anchorTag');                                                           // 136
                                                                                                  // 137
  params = route.params('/posts/1/2?q=s#anchorTag');                                              // 138
  test.equal(params.paramTwo, '2');                                                               // 139
});                                                                                               // 140
                                                                                                  // 141
Tinytest.add('Route - resolve', function (test) {                                                 // 142
  var route = new Route(Router, 'required', {                                                     // 143
    path: paths.required                                                                          // 144
  });                                                                                             // 145
                                                                                                  // 146
  var params;                                                                                     // 147
  var options;                                                                                    // 148
                                                                                                  // 149
  params = {                                                                                      // 150
    param: '1'                                                                                    // 151
  };                                                                                              // 152
  test.equal(route.resolve(params), '/posts/1');                                                  // 153
                                                                                                  // 154
  params = {                                                                                      // 155
    param: '1'                                                                                    // 156
  };                                                                                              // 157
  options = {                                                                                     // 158
    query: {                                                                                      // 159
      q: 's'                                                                                      // 160
    },                                                                                            // 161
    hash: 'anchorTag'                                                                             // 162
  };                                                                                              // 163
  test.equal(route.resolve(params, options), '/posts/1/?q=s#anchorTag');                          // 164
                                                                                                  // 165
  route = new Route(Router, 'wildcard', {                                                         // 166
    path: paths.wildcard                                                                          // 167
  });                                                                                             // 168
  params = ['some/file/path'];                                                                    // 169
  test.equal(route.resolve(params), '/posts/some/file/path');                                     // 170
                                                                                                  // 171
  route = new Route(Router, 'namedWildcard', {                                                    // 172
    path: paths.namedWildcard                                                                     // 173
  });                                                                                             // 174
});                                                                                               // 175
                                                                                                  // 176
Tinytest.add('Route - normalizePath', function (test) {                                           // 177
  var route = new Route(Router, 'explicit', {                                                     // 178
    path: paths.explicit                                                                          // 179
  });                                                                                             // 180
                                                                                                  // 181
  test.equal(route.normalizePath('/posts'), '/posts');                                            // 182
  test.equal(route.normalizePath('posts'), '/posts');                                             // 183
  test.equal(route.normalizePath(Meteor.absoluteUrl('posts')), '/posts');                         // 184
  test.equal(route.normalizePath('/posts?q=s'), '/posts');                                        // 185
  test.equal(route.normalizePath('/posts#anchorTag'), '/posts');                                  // 186
});                                                                                               // 187
                                                                                                  // 188
Tinytest.add('Route - getController', function (test) {                                           // 189
  var route;                                                                                      // 190
  var root = Utils.global();                                                                      // 191
                                                                                                  // 192
  root.TestController = function (options)  {                                                     // 193
    if (arguments.length < 1)                                                                     // 194
      throw new Error('Argument length check');                                                   // 195
                                                                                                  // 196
    this.options = options;                                                                       // 197
  };                                                                                              // 198
                                                                                                  // 199
  var testGetController = function (route) {                                                      // 200
    var controller = route.getController('/test', {option: true});                                // 201
    test.isTrue(controller instanceof TestController);                                            // 202
    test.equal(controller.options.route, route);                                                  // 203
    test.equal(controller.options.template, 'template');                                          // 204
    test.isTrue(controller.options.option);                                                       // 205
  };                                                                                              // 206
                                                                                                  // 207
  // case 1: controller option                                                                    // 208
  var route = new Route(Router, 'test', {                                                         // 209
    controller: root.TestController,                                                              // 210
    template: 'template'                                                                          // 211
  });                                                                                             // 212
  testGetController(route);                                                                       // 213
                                                                                                  // 214
  // case 1a: controller option as string                                                         // 215
  var route = new Route(Router, 'test', {                                                         // 216
    controller: 'TestController',                                                                 // 217
    template: 'template'                                                                          // 218
  });                                                                                             // 219
  testGetController(route);                                                                       // 220
                                                                                                  // 221
  root.App = {};                                                                                  // 222
  root.App.TestController = root.TestController;                                                  // 223
  // case 1b: controller option as namespaced string                                              // 224
  var route = new Route(Router, 'test', {                                                         // 225
    controller: 'App.TestController',                                                             // 226
    template: 'template'                                                                          // 227
  });                                                                                             // 228
  testGetController(route);                                                                       // 229
                                                                                                  // 230
  // case 2: resolve controller intelligently                                                     // 231
  var route = new Route(Router, 'test', {                                                         // 232
    template: 'template'                                                                          // 233
  });                                                                                             // 234
  testGetController(route);                                                                       // 235
                                                                                                  // 236
  // case 3: anonymous controller                                                                 // 237
  // case 2: resolve controller intelligently                                                     // 238
  var route = new Route(Router, 'anon', {                                                         // 239
    template: 'template'                                                                          // 240
  });                                                                                             // 241
  var controller = route.getController('/anon', {option: true});                                  // 242
  test.isTrue(controller instanceof RouteController);                                             // 243
  test.equal(controller.options.route, route);                                                    // 244
  test.equal(controller.options.template, 'template');                                            // 245
  test.isTrue(controller.options.option);                                                         // 246
});                                                                                               // 247
                                                                                                  // 248
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages\iron-router\test\route_controller.js                                                  //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
Tinytest.add('IronRouteController - inheritance', function (test) {                               // 1
  var App = IronRouteController.extend({                                                          // 2
    action: function () {                                                                         // 3
      return 'app';                                                                               // 4
    }                                                                                             // 5
  });                                                                                             // 6
                                                                                                  // 7
  var Child = App.extend({                                                                        // 8
    action: function () {                                                                         // 9
      var superVal = Child.__super__.action.call(this);                                           // 10
      return [superVal, 'child'];                                                                 // 11
    }                                                                                             // 12
  });                                                                                             // 13
                                                                                                  // 14
  var inst = new Child;                                                                           // 15
  test.equal(inst.action(), ['app', 'child']);                                                    // 16
});                                                                                               // 17
                                                                                                  // 18
Tinytest.add('IronRouteController - runHooks', function (test) {                                  // 19
  var calls = [];                                                                                 // 20
  var call = function (idx) {                                                                     // 21
    return function () {                                                                          // 22
      calls.push(idx);                                                                            // 23
    }                                                                                             // 24
  };                                                                                              // 25
                                                                                                  // 26
  var opts = {                                                                                    // 27
    before: [call(0)]                                                                             // 28
  };                                                                                              // 29
                                                                                                  // 30
  var A = IronRouteController.extend({                                                            // 31
    before: [call(1), call(2)]                                                                    // 32
  });                                                                                             // 33
                                                                                                  // 34
  var B = A.extend({                                                                              // 35
    before: [call(3), call(4)]                                                                    // 36
  });                                                                                             // 37
                                                                                                  // 38
  /*                                                                                              // 39
   * Given:                                                                                       // 40
   *  A prototype['before'] => [f1, f2]                                                           // 41
   *    B inherits A proto['before'] => [f3, f4]                                                  // 42
   *                                                                                              // 43
   *  Router options => [f5, f6]                                                                  // 44
   *  Route options => [f7, f8]                                                                   // 45
   *                                                                                              // 46
   *  runHooks('before') => [f1..f8]                                                              // 47
   *                                                                                              // 48
   */                                                                                             // 49
                                                                                                  // 50
  test.equal(calls.length, 0, 'call list not empty');                                             // 51
  var bInst = new B(opts);                                                                        // 52
  bInst.runHooks('before');                                                                       // 53
                                                                                                  // 54
  for (var i = 0; i < 5; i++) {                                                                   // 55
    test.equal(calls[i], i, 'runHooks has the wrong exec order');                                 // 56
  }                                                                                               // 57
});                                                                                               // 58
                                                                                                  // 59
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages\iron-router\test\router.js                                                            //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
/*****************************************************************************/                   // 1
/* Mocks and Stubs */                                                                             // 2
/*****************************************************************************/                   // 3
var controllerMock = {                                                                            // 4
  run: function () {},                                                                            // 5
  runHooks: function () {}                                                                        // 6
};                                                                                                // 7
                                                                                                  // 8
var routes = [{                                                                                   // 9
  where: 'client',                                                                                // 10
  test: function (path) { return path == 'client'; },                                             // 11
  getController: function (path, options) { return EJSON.clone(controllerMock); },                // 12
  path: function (params, options) {                                                              // 13
    return [params, options];                                                                     // 14
  },                                                                                              // 15
  url: function (params, options) {                                                               // 16
    return [params, options];                                                                     // 17
  }                                                                                               // 18
}, {                                                                                              // 19
  where: 'server',                                                                                // 20
  test: function (path) { return path == 'server' },                                              // 21
  getController: function () { return EJSON.clone(controllerMock); },                             // 22
  path: function (params, options) {                                                              // 23
    return [params, options];                                                                     // 24
  },                                                                                              // 25
  url: function (params, options) {                                                               // 26
    return [params, options];                                                                     // 27
  }                                                                                               // 28
}];                                                                                               // 29
                                                                                                  // 30
// simulate the named routes                                                                      // 31
routes.client = routes[0];                                                                        // 32
routes.server = routes[1];                                                                        // 33
                                                                                                  // 34
/*****************************************************************************/                   // 35
/* Client and Server */                                                                           // 36
/*****************************************************************************/                   // 37
Tinytest.add('IronRouter - path', function (test) {                                               // 38
  var router = new IronRouter;                                                                    // 39
  router.routes = routes;                                                                         // 40
                                                                                                  // 41
  var params = [];                                                                                // 42
  var opts = {};                                                                                  // 43
  var res = router.path('client', params, opts);                                                  // 44
                                                                                                  // 45
  test.equal(res[0], params);                                                                     // 46
  test.equal(res[1], opts);                                                                       // 47
});                                                                                               // 48
                                                                                                  // 49
Tinytest.add('IronRouter - url', function (test) {                                                // 50
  var router = new IronRouter;                                                                    // 51
  router.routes = routes;                                                                         // 52
                                                                                                  // 53
  var params = [];                                                                                // 54
  var opts = {};                                                                                  // 55
                                                                                                  // 56
  var res = router.url('client', params, opts);                                                   // 57
                                                                                                  // 58
  test.equal(res[0], params);                                                                     // 59
  test.equal(res[1], opts);                                                                       // 60
});                                                                                               // 61
                                                                                                  // 62
/*****************************************************************************/                   // 63
/* Client */                                                                                      // 64
/*****************************************************************************/                   // 65
if (Meteor.isClient) {                                                                            // 66
  Tinytest.add('IronRouter - client dispatch', function (test) {                                  // 67
    var router = new IronRouter;                                                                  // 68
                                                                                                  // 69
    router.routes = routes;                                                                       // 70
                                                                                                  // 71
    var runController = null;                                                                     // 72
    var runCallback = null;                                                                       // 73
                                                                                                  // 74
    router.run = function (controller, cb) {                                                      // 75
      runController = controller;                                                                 // 76
      runCallback = cb;                                                                           // 77
    };                                                                                            // 78
                                                                                                  // 79
    // 1. onRouteNotFound                                                                         // 80
    var onRouteNotFoundCalled = false;                                                            // 81
    router.onRouteNotFound = function (path, options) {                                           // 82
      onRouteNotFoundCalled = true;                                                               // 83
    };                                                                                            // 84
                                                                                                  // 85
    var onUnhandledCalled = false;                                                                // 86
    router.onUnhandled = function (path, options) {                                               // 87
      onUnhandledCalled = true;                                                                   // 88
    };                                                                                            // 89
                                                                                                  // 90
    router.dispatch('bogus');                                                                     // 91
    test.isTrue(onRouteNotFoundCalled, 'onRouteNotFound not called');                             // 92
                                                                                                  // 93
    // 2. where !== where                                                                         // 94
    router.dispatch('server');                                                                    // 95
    test.isTrue(onUnhandledCalled, 'onUnhandled not called for server route');                    // 96
                                                                                                  // 97
    // 3. run method called                                                                       // 98
    router.dispatch('client', {}, function () {});                                                // 99
    test.isTrue(runController, 'run not called with a controller');                               // 100
    test.isTrue(runCallback, 'run not called with a callback');                                   // 101
  });                                                                                             // 102
}                                                                                                 // 103
                                                                                                  // 104
/*****************************************************************************/                   // 105
/* Server */                                                                                      // 106
/*****************************************************************************/                   // 107
if (Meteor.isServer) {                                                                            // 108
  Tinytest.add('IronRouter - server dispatch', function (test) {                                  // 109
    var router = new IronRouter;                                                                  // 110
                                                                                                  // 111
    router.routes = routes;                                                                       // 112
                                                                                                  // 113
    var runController = null;                                                                     // 114
    var runCallback = null;                                                                       // 115
                                                                                                  // 116
    router.run = function (controller, cb) {                                                      // 117
      runController = controller;                                                                 // 118
      runCallback = cb;                                                                           // 119
    };                                                                                            // 120
                                                                                                  // 121
    // 1. onRouteNotFound                                                                         // 122
    var onRouteNotFoundCalled = false;                                                            // 123
    router.onRouteNotFound = function (path, options) {                                           // 124
      onRouteNotFoundCalled = true;                                                               // 125
    };                                                                                            // 126
                                                                                                  // 127
    var onUnhandledCalled = false;                                                                // 128
    router.onUnhandled = function (path, options) {                                               // 129
      onUnhandledCalled = true;                                                                   // 130
    };                                                                                            // 131
                                                                                                  // 132
    router.dispatch('bogus');                                                                     // 133
    test.isTrue(onRouteNotFoundCalled, 'onRouteNotFound not called');                             // 134
                                                                                                  // 135
    // 2. where !== where                                                                         // 136
    router.dispatch('client');                                                                    // 137
    test.isTrue(onUnhandledCalled, 'onUnhandled not called for client route');                    // 138
                                                                                                  // 139
    // 3. run method called                                                                       // 140
    router.dispatch('server', {}, function () {});                                                // 141
    test.isTrue(runController, 'run not called with a controller');                               // 142
    test.isTrue(runCallback, 'run not called with a callback');                                   // 143
  });                                                                                             // 144
}                                                                                                 // 145
                                                                                                  // 146
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages\iron-router\test\client\template.templates.js                                         //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
Template.__define__("layout",Package.handlebars.Handlebars.json_ast_to_func(["layout\r\n\r\n  <aside>\r\n    ",["{",[[0,"yield"],"aside"]],"\r\n  </aside>\r\n\r\n  <article>\r\n    ",["{",[[0,"yield"]]],"\r\n  </article>\r\n\r\n  <footer>\r\n    ",["{",[[0,"yield"],"footer"]],"\r\n  </footer>"]));
Template.__define__("one",Package.handlebars.Handlebars.json_ast_to_func(["one"]));               // 2
Template.__define__("two",Package.handlebars.Handlebars.json_ast_to_func(["two"]));               // 3
Template.__define__("aside",Package.handlebars.Handlebars.json_ast_to_func(["aside"]));           // 4
Template.__define__("asideTwo",Package.handlebars.Handlebars.json_ast_to_func(["asideTwo"]));     // 5
Template.__define__("footer",Package.handlebars.Handlebars.json_ast_to_func(["footer"]));         // 6
Template.__define__("footerTwo",Package.handlebars.Handlebars.json_ast_to_func(["footerTwo"]));   // 7
Template.__define__("data",Package.handlebars.Handlebars.json_ast_to_func([["{",[[0,"text"]]]])); // 8
                                                                                                  // 9
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages\iron-router\test\client\router.js                                                     //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
Tinytest.add('ClientRouter - run computations', function (test) {                                 // 1
  var router = new ClientRouter({                                                                 // 2
    autoRender: false,                                                                            // 3
    autoStart: false                                                                              // 4
  });                                                                                             // 5
                                                                                                  // 6
  var c1 = new RouteController;                                                                   // 7
  var c2 = new RouteController;                                                                   // 8
  var routerRuns = [];                                                                            // 9
                                                                                                  // 10
  Deps.autorun(function (c) {                                                                     // 11
    routerRuns.push(router.current());                                                            // 12
  });                                                                                             // 13
                                                                                                  // 14
  test.equal(routerRuns[0], null, 'router.current() starts off as null');                         // 15
                                                                                                  // 16
  var c1Runs = [];                                                                                // 17
  c1.run = function () {                                                                          // 18
    c1Runs.push(Deps.currentComputation);                                                         // 19
  };                                                                                              // 20
                                                                                                  // 21
  router.run(c1);                                                                                 // 22
  Deps.flush();                                                                                   // 23
  test.equal(routerRuns[1], c1, 'router comp not invalidated');                                   // 24
  test.equal(c1Runs.length, 1, 'c1 controller not run');                                          // 25
                                                                                                  // 26
  // simulate a dependency invalidating the run's computation like if you relied                  // 27
  // on a reactive data source in a before hook or action function.                               // 28
  c1Runs[0].invalidate();                                                                         // 29
  Deps.flush();                                                                                   // 30
                                                                                                  // 31
  test.equal(routerRuns.length, 2, 'run comp should not invalidate route comp');                  // 32
  test.equal(c1Runs.length, 2, 'run comp was not rerun');                                         // 33
                                                                                                  // 34
  var c2Runs = [];                                                                                // 35
  c2.run = function () {                                                                          // 36
    c2Runs.push(Deps.currentComputation);                                                         // 37
  };                                                                                              // 38
                                                                                                  // 39
  var oldComp = c1Runs[1];                                                                        // 40
  router.run(c2);                                                                                 // 41
  Deps.flush();                                                                                   // 42
                                                                                                  // 43
  var newComp = c2Runs[0];                                                                        // 44
  test.equal(routerRuns.length, 3, 'router comp not invalidated');                                // 45
  test.equal(c2Runs.length, 1, 'c3 controller not run');                                          // 46
  test.isTrue(oldComp.stopped, 'old run comp not stopped');                                       // 47
  test.isFalse(newComp.stopped, 'new run comp is stopped');                                       // 48
});                                                                                               // 49
                                                                                                  // 50
Tinytest.add('ClientRouter - rendering', function (test) {                                        // 51
  var router = new ClientRouter({                                                                 // 52
    autoRender: false,                                                                            // 53
    autoStart: false,                                                                             // 54
    layoutTemplate: 'layout'                                                                      // 55
  });                                                                                             // 56
                                                                                                  // 57
  var frag = Spark.render(function () {                                                           // 58
    return router.render();                                                                       // 59
  });                                                                                             // 60
                                                                                                  // 61
  var div = new OnscreenDiv(frag);                                                                // 62
                                                                                                  // 63
  try {                                                                                           // 64
    router.setLayout('layout');                                                                   // 65
    Deps.flush();                                                                                 // 66
    test.equal(div.text().trim(), 'layout', 'layout not rendered');                               // 67
                                                                                                  // 68
    router.setLayout(null);                                                                       // 69
    Deps.flush();                                                                                 // 70
    test.equal(div.text().trim(), '', 'layout did not change');                                   // 71
                                                                                                  // 72
    router.setLayout('layout');                                                                   // 73
    Deps.flush();                                                                                 // 74
    test.equal(div.text().trim(), 'layout', 'layout did not change back');                        // 75
                                                                                                  // 76
    var counts = {};                                                                              // 77
                                                                                                  // 78
    var _one = Template.one;                                                                      // 79
    Template.one = function () {                                                                  // 80
      counts.one = counts.one || 0;                                                               // 81
      counts.one++;                                                                               // 82
      return _one.apply(this, arguments);                                                         // 83
    };                                                                                            // 84
                                                                                                  // 85
    var _two = Template.two;                                                                      // 86
    Template.two = function () {                                                                  // 87
      counts.two = counts.two || 0;                                                               // 88
      counts.two++;                                                                               // 89
      return _two.apply(this, arguments);                                                         // 90
    };                                                                                            // 91
                                                                                                  // 92
    var _aside = Template.aside;                                                                  // 93
    Template.aside = function () {                                                                // 94
      counts.aside = counts.aside || 0;                                                           // 95
      counts.aside++;                                                                             // 96
      return _aside.apply(this, arguments);                                                       // 97
    };                                                                                            // 98
                                                                                                  // 99
    var _footer = Template.footer;                                                                // 100
    Template.footer = function () {                                                               // 101
      counts.footer = counts.footer || 0;                                                         // 102
      counts.footer++;                                                                            // 103
      return _footer.apply(this, arguments);                                                      // 104
    };                                                                                            // 105
                                                                                                  // 106
    router.setTemplate('aside', /* to */ 'aside');                                                // 107
    router.setTemplate('one', /* to main */ undefined);                                           // 108
    router.setTemplate('footer', /* to */ 'footer');                                              // 109
    Deps.flush();                                                                                 // 110
                                                                                                  // 111
    test.equal(counts.aside, 1);                                                                  // 112
    test.equal(counts.one, 1);                                                                    // 113
    test.equal(counts.footer, 1);                                                                 // 114
                                                                                                  // 115
    router.setTemplate('aside', /* to */ 'aside');                                                // 116
    router.setTemplate('two', /* to main */ undefined);                                           // 117
    router.setTemplate('footer', /* to */ 'footer');                                              // 118
    Deps.flush();                                                                                 // 119
                                                                                                  // 120
    test.equal(counts.aside, 1, 'tmpl should have alrady been rendered');                         // 121
    test.equal(counts.two, 1);                                                                    // 122
    test.equal(counts.footer, 1, 'tmpl should have already been rendered');                       // 123
                                                                                                  // 124
  } finally {                                                                                     // 125
    div.kill();                                                                                   // 126
  }                                                                                               // 127
});                                                                                               // 128
                                                                                                  // 129
Tinytest.add('ClientRouter - before hooks', function (test) {                                     // 130
  var router = new ClientRouter({                                                                 // 131
    autoStart: false,                                                                             // 132
    autoRender: false                                                                             // 133
  });                                                                                             // 134
                                                                                                  // 135
  var where = 'client';                                                                           // 136
                                                                                                  // 137
  var firstHookCalled = 0;                                                                        // 138
  router.before(function() { firstHookCalled += 1; }, {only: 'one'})                              // 139
                                                                                                  // 140
  var secondHookCalled = 0;                                                                       // 141
  router.before(function() { secondHookCalled += 1; }, {except: 'two'})                           // 142
                                                                                                  // 143
  var thirdHookCalled = 0;                                                                        // 144
  router.configure({before: function() { thirdHookCalled += 1; }})                                // 145
                                                                                                  // 146
  var fourthHookCalled = 0;                                                                       // 147
  router.before(function(){ fourthHookCalled += 1 })                                              // 148
                                                                                                  // 149
  router.map(function() {                                                                         // 150
    this.route('one', {where: where});                                                            // 151
    this.route('two', {where: where});                                                            // 152
    this.route('three', {where: where});                                                          // 153
  });                                                                                             // 154
                                                                                                  // 155
  router.setLayout = _.identity;                                                                  // 156
  router.setTemplate = _.identity;                                                                // 157
                                                                                                  // 158
  router.dispatch('one');                                                                         // 159
  test.equal(firstHookCalled, 1);                                                                 // 160
  test.equal(secondHookCalled, 1);                                                                // 161
  test.equal(thirdHookCalled, 1);                                                                 // 162
  test.equal(fourthHookCalled, 1);                                                                // 163
                                                                                                  // 164
  router.dispatch('two');                                                                         // 165
  test.equal(firstHookCalled, 1);                                                                 // 166
  test.equal(secondHookCalled, 1);                                                                // 167
  test.equal(thirdHookCalled, 2);                                                                 // 168
  test.equal(fourthHookCalled, 2);                                                                // 169
                                                                                                  // 170
  router.dispatch('three');                                                                       // 171
  test.equal(firstHookCalled, 1);                                                                 // 172
  test.equal(secondHookCalled, 2);                                                                // 173
  test.equal(thirdHookCalled, 3);                                                                 // 174
  test.equal(fourthHookCalled, 3);                                                                // 175
});                                                                                               // 176
                                                                                                  // 177
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages\iron-router\test\client\route_controller.js                                           //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
Subscription = function () {                                                                      // 1
  this._ready = false;                                                                            // 2
  this._deps = new Deps.Dependency;                                                               // 3
};                                                                                                // 4
                                                                                                  // 5
Subscription.prototype.ready = function () {                                                      // 6
  this._deps.depend();                                                                            // 7
  return this._ready;                                                                             // 8
};                                                                                                // 9
                                                                                                  // 10
Subscription.prototype.mark = function () {                                                       // 11
  this._ready = true;                                                                             // 12
  this._deps.changed();                                                                           // 13
};                                                                                                // 14
                                                                                                  // 15
MockRouter = function() {                                                                         // 16
  this.rendered = {};                                                                             // 17
  this.layout = null;                                                                             // 18
  this.data = null;                                                                               // 19
};                                                                                                // 20
                                                                                                  // 21
MockRouter.prototype.setTemplate = function(name, to) {                                           // 22
  to = to || '__main__';                                                                          // 23
  this.rendered[to] = name;                                                                       // 24
};                                                                                                // 25
                                                                                                  // 26
MockRouter.prototype.setLayout = function(name) {                                                 // 27
  this.layout = name;                                                                             // 28
};                                                                                                // 29
                                                                                                  // 30
MockRouter.prototype.setData = function(data) {                                                   // 31
  this.data = data;                                                                               // 32
};                                                                                                // 33
                                                                                                  // 34
MockRouter.prototype.getData = function() {                                                       // 35
  return this.data;                                                                               // 36
};                                                                                                // 37
                                                                                                  // 38
MockRouter.prototype.clearUnusedYields = function (used) {                                        // 39
  this.usedYields = used;                                                                         // 40
};                                                                                                // 41
                                                                                                  // 42
Tinytest.add('RouteController - wait and ready', function (test) {                                // 43
  var controller = new RouteController;                                                           // 44
                                                                                                  // 45
  var sub1 = new Subscription;                                                                    // 46
  var sub2 = new Subscription;                                                                    // 47
                                                                                                  // 48
  controller.wait(sub1);                                                                          // 49
  controller.wait(sub2);                                                                          // 50
                                                                                                  // 51
  var ready = false;                                                                              // 52
  Deps.autorun(function () {                                                                      // 53
    ready = controller.ready();                                                                   // 54
  });                                                                                             // 55
                                                                                                  // 56
  test.isFalse(ready, 'controller should be waiting on two subs');                                // 57
                                                                                                  // 58
  sub1.mark();                                                                                    // 59
  Deps.flush();                                                                                   // 60
  test.isFalse(ready, 'controller should be waiting on one more sub');                            // 61
                                                                                                  // 62
  sub2.mark();                                                                                    // 63
  Deps.flush();                                                                                   // 64
  test.isTrue(ready, 'controller should be ready now');                                           // 65
});                                                                                               // 66
                                                                                                  // 67
Tinytest.add('RouteController - run', function (test) {                                           // 68
  var calls = {};                                                                                 // 69
  var logCall = function (key) {                                                                  // 70
    calls[key] = calls[key] || 0;                                                                 // 71
    calls[key]++;                                                                                 // 72
  };                                                                                              // 73
                                                                                                  // 74
  var sub1 = new Subscription;                                                                    // 75
                                                                                                  // 76
  var C = RouteController.extend({                                                                // 77
    waitOn: function () {                                                                         // 78
      return sub1;                                                                                // 79
    },                                                                                            // 80
                                                                                                  // 81
    before: [function () {                                                                        // 82
      logCall('upstreamBefore');                                                                  // 83
      if (!this.ready())                                                                          // 84
        this.stop();                                                                              // 85
                                                                                                  // 86
    }, function () {                                                                              // 87
      logCall('downstreamBefore');                                                                // 88
    }],                                                                                           // 89
                                                                                                  // 90
    action: function () {                                                                         // 91
      logCall('action');                                                                          // 92
    },                                                                                            // 93
                                                                                                  // 94
    after: function () {                                                                          // 95
      logCall('after');                                                                           // 96
    }                                                                                             // 97
  });                                                                                             // 98
                                                                                                  // 99
  var inst = new C;                                                                               // 100
                                                                                                  // 101
  Deps.autorun(function () {                                                                      // 102
    inst.run();                                                                                   // 103
  });                                                                                             // 104
                                                                                                  // 105
  test.equal(calls['upstreamBefore'], 1);                                                         // 106
  test.isFalse(calls['downstreamBefore']);                                                        // 107
  test.isFalse(calls['action']);                                                                  // 108
  test.isFalse(calls['after']);                                                                   // 109
                                                                                                  // 110
  sub1.mark();                                                                                    // 111
  Deps.flush();                                                                                   // 112
                                                                                                  // 113
  test.equal(calls['upstreamBefore'], 2);                                                         // 114
  test.equal(calls['downstreamBefore'], 1);                                                       // 115
  test.equal(calls['action'], 1);                                                                 // 116
  test.equal(calls['after'], 1);                                                                  // 117
});                                                                                               // 118
                                                                                                  // 119
// really not a lot to test here, but here goes                                                   // 120
Tinytest.add('RouteController - render', function (test) {                                        // 121
  var router = new MockRouter;                                                                    // 122
  var controller = new RouteController({router: router});                                         // 123
                                                                                                  // 124
  controller.render('template');                                                                  // 125
  test.equal(router.rendered.__main__, 'template', 'main tmpl not rendered');                     // 126
                                                                                                  // 127
  controller.render('template', {to: 'aside'});                                                   // 128
  test.equal(router.rendered.aside, 'template', 'yield tmpl not rendered');                       // 129
});                                                                                               // 130
                                                                                                  // 131
Tinytest.add('RouteController - autoRenderLoadingHook', function (test) {                         // 132
  var router = new MockRouter;                                                                    // 133
  var handle = new Subscription;                                                                  // 134
  var controller = new RouteController({                                                          // 135
    router: router,                                                                               // 136
    waitOn: handle,                                                                               // 137
    loadingTemplate: 'loading',                                                                   // 138
    template: 'template'                                                                          // 139
  });                                                                                             // 140
                                                                                                  // 141
  Deps.autorun(function() {                                                                       // 142
    controller.run();                                                                             // 143
  });                                                                                             // 144
                                                                                                  // 145
  test.equal(router.rendered.__main__, 'loading');                                                // 146
                                                                                                  // 147
  handle.mark();                                                                                  // 148
  Deps.flush();                                                                                   // 149
  test.equal(router.rendered.__main__, 'template');                                               // 150
});                                                                                               // 151
                                                                                                  // 152
Tinytest.add('RouteController - autoRenderNotFoundHook', function (test) {                        // 153
  var router = new MockRouter;                                                                    // 154
  var dataDep = new Deps.Dependency;                                                              // 155
  var found = null;                                                                               // 156
  var controller = new RouteController({                                                          // 157
    router: router,                                                                               // 158
    template: 'template',                                                                         // 159
    notFoundTemplate: 'notFound',                                                                 // 160
    yieldTemplates: {                                                                             // 161
      one: {to: 'one'}                                                                            // 162
    },                                                                                            // 163
    data: function() {                                                                            // 164
      dataDep.depend();                                                                           // 165
      return found;                                                                               // 166
    }                                                                                             // 167
  });                                                                                             // 168
                                                                                                  // 169
  Deps.autorun(function() {                                                                       // 170
    controller.run();                                                                             // 171
  });                                                                                             // 172
                                                                                                  // 173
  test.equal(router.rendered.__main__, 'notFound');                                               // 174
  test.equal(router.rendered.one, 'one');                                                         // 175
                                                                                                  // 176
  found = true;                                                                                   // 177
  dataDep.changed();                                                                              // 178
  Deps.flush();                                                                                   // 179
  test.equal(router.rendered.__main__, 'template');                                               // 180
  test.equal(router.rendered.one, 'one');                                                         // 181
  test.equal(router.data, true);                                                                  // 182
});                                                                                               // 183
                                                                                                  // 184
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
