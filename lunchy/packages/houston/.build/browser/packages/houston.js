(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages\houston\client\template.admin_login.js                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.__define__("_houston_login",Package.handlebars.Handlebars.json_ast_to_func(["<div class=\"houston\">\r\n    ",["#",[[0,"if"],[0,"loggingIn"]],["\r\n      ",[">","spinner"],"\r\n    "],["\r\n      ",[">","_houston_navbar"],"\r\n      <div class=\"container content\">\r\n        ",["#",[[0,"if"],[0,"logged_in"]],["\r\n          <h1>Currently logged in</h1>\r\n          <div>\r\n            ",["#",[[0,"unless"],[0,"admin_user_exists"]],["\r\n              <a class=\"become-houston-admin btn\" href=\"#\">Claim Admin</a>\r\n            "]],"\r\n            <a class=\"houston-logout btn\" href=\"#\">Log out</a>\r\n          </div>\r\n          "],["\r\n            ","\r\n            <h1>\r\n              ",["#",[[0,"if"],[0,"admin_user_exists"]],[" Log In "],[" Create an admin account "]],"\r\n            </h1>\r\n            <form id=\"houston-sign-in-form\">\r\n              <div class='control-group'>\r\n                <label class='control-label' for='houston-email'>Email</label>\r\n                <div class='controls'>\r\n                  <input name=\"houston-email\" id='houston-email' type=\"text\">\r\n                </div>\r\n              </div>\r\n              <div class='control-group'>\r\n                <label class='control-label' for='password'>Password</label>\r\n                <div class='controls'>\r\n                  <input name=\"houston-password\" id='houston-password' type=\"password\">\r\n                </div>\r\n              </div>\r\n              <div>\r\n                <input class=\"btn\" type=\"submit\" value=\"Sign ",["#",[[0,"if"],[0,"admin_user_exists"]],["in"],["up"]],"\">\r\n              </div>\r\n            </form>\r\n        "]],"\r\n      </div>\r\n    "]],"\r\n  </div>"]));
                                                                                                                      // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages\houston\client\template.db_view.js                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.__define__("_houston_db_view",Package.handlebars.Handlebars.json_ast_to_func(["<div class=\"houston\">\r\n    ",["#",[[0,"if"],[0,"loggingIn"]],["\r\n      ",[">","spinner"],"\r\n    "],["\r\n      ",[">","_houston_navbar"],"\r\n      <div class=\"container content\">\r\n        <ul class=\"breadcrumb\">\r\n          <li class=\"active\">Home</li>\r\n        </ul>\r\n        ",["#",[[0,"unless"],[0,"collections"]],["\r\n          <p class=\"lead\">If this is your first time using Houston, you may need to <a id=\"refresh\" class=\"btn btn-large btn-warning\">Refresh this page</a></p>\r\n        "]],"\r\n        <table class='table table-bordered table-striped'>\r\n          <thead>\r\n            <tr>\r\n              <th>Collection Name</th>\r\n              <th>Number of Records</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            ",["#",[[0,"each"],[0,"collections"]],["\r\n            <tr>\r\n              <td><a href=\"",["{",[[0,"pathFor"],"houston_collection"]],"\">",["{",[[0,"name"]]],"</a></td>\r\n              <td>",["{",[[0,"num_of_records"]]],"</td>\r\n            </tr>\r\n            "]],"\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    "]],"\r\n  </div>"]));
                                                                                                                      // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages\houston\client\template.collection_view.js                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.__define__("_houston_collection_view",Package.handlebars.Handlebars.json_ast_to_func(["<div class=\"houston\">\r\n    ",["#",[[0,"if"],[0,"loggingIn"]],["\r\n      ",[">","spinner"],"\r\n    "],["\r\n      ",[">","_houston_navbar"],"\r\n      <div class=\"container content\">\r\n        <ul class=\"breadcrumb\">\r\n          <li><a href=\"",["{",[[0,"pathFor"],"houston_home"]],"\" class=\"houston-home\">Home</a> <span class=\"divider\">/</span></li>\r\n          <li class=\"active\">",["{",[[0,"name"]]],"</li>\r\n        </ul>\r\n        ","\r\n        <div class=\"row hidden hide\" id=\"houston-create-document\">\r\n          <div class=\"span12\" style=\"overflow-x: auto\">\r\n            <h3>Add more ",["{",[[0,"name"]]],"</h3>\r\n            <table class=\"table table-bordered table-striped\">\r\n              <thead>\r\n                <tr>\r\n                  ",["#",[[0,"each"],[0,"nonid_headers"]],["\r\n                    <th><a href=\"#\" class=\"sort\">",["{",[[0]]],"</a></th>\r\n                  "]],"\r\n                  <th>Action</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr id=\"houston-create-row\">\r\n                  ",["#",[[0,"each"],[0,"nonid_headers"]],["\r\n                    <th>\r\n                      <input name=\"",["{",[[0]]],"\" class=\"input-small\" type=\"text\" />\r\n                    </th>\r\n                  "]],"\r\n                  <td><div class=\"btn btn-success houston-create-doc\">Create</div></td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"span12\">\r\n                <div class=\"page-header\">\r\n                  <button id=\"houston-create-btn\" class=\"btn btn-success pull-right\">Add ",["{",[[0,"name"]]],"</button>\r\n                  <h1>",["{",[[0,"name"]]]," (",["{",[[0,"num_of_records"]]]," record",["{",[[0,"pluralize"]]],")</h1>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class='row'>\r\n            <div class=\"span10\" style=\"overflow-x: auto\">\r\n                <table class=\"table table-bordered table-striped table-hover\">\r\n                  <thead>\r\n                    <tr>\r\n                      ",["#",[[0,"each"],[0,"headers"]],["\r\n                        <th><a href=\"#\" class=\"houston-sort\">",["{",[[0]]],"</a></th>\r\n                      "]],"\r\n                      <th>Action</th>\r\n                    </tr>\r\n                  </thead>\r\n                  <tbody>\r\n                    ",["#",[[0,"each"],[0,"rows"]],["\r\n                      <tr>\r\n                        <td><a href=\"",["{",[[0,"pathFor"],"houston_document"]],"\">",["{",[[0,"_id"]]],"</a></td>\r\n                        ",["#",[[0,"each"],[0,"values_in_order"]],["\r\n                          <td data-field='",["{",[[0,"field_name"]]],"' class='houston-collection-field'>",["{",[[0,"field_value"]]],"</td>\r\n                        "]],"\r\n                        <td><div data-id=\"",["{",[[0,"_id"]]],"\" class=\"btn houston-delete-doc btn-danger\">Delete</div></td>\r\n                      </tr>\r\n                    "]],"\r\n                  </tbody>\r\n                </table>\r\n          </div>\r\n          <div class=\"span2\">\r\n            <form>\r\n                <legend>Filter</legend>\r\n                ",["#",[[0,"each"],[0,"nonid_headers"]],["\r\n                <label>",["{",[[0]]],"</label>\r\n                <input name=\"",["{",[[0]]],"\" class=\"houston-column-filter input-small\" type=\"text\" value=\"",["{",[[0,"filter_value"]]],"\"/>\r\n                "]],"\r\n            </form>\r\n          </div>\r\n      </div>\r\n    "]],"\r\n  </div>"]));
                                                                                                                      // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages\houston\client\template.document_view.js                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.__define__("_houston_document_view",Package.handlebars.Handlebars.json_ast_to_func(["<div class=\"houston\">\r\n    ",["#",[[0,"if"],[0,"loggingIn"]],["\r\n      ",[">","spinner"],"\r\n    "],["\r\n      ",[">","_houston_navbar"],"\r\n      <div class=\"container content\">\r\n        <ul class=\"breadcrumb\">\r\n          <li>\r\n            <a href=\"",["{",[[0,"pathFor"],"houston_home"]],"\" class=\"houston-home\">Home</a>\r\n            <span class=\"divider\">/</span>\r\n          </li>\r\n          <li>\r\n            <a href=\"",["{",[[0,"pathFor"],"houston_collection"]],"\" class=\"houston-collection\">",["{",[[0,"name"]]],"</a>\r\n            <span class=\"divider\">/</span>\r\n          </li>\r\n          <li class=\"active\">",["{",[[0,"document_id"]]],"</li>\r\n        </ul>\r\n        <h1>",["{",[[0,"document_id"]]],"</h1>\r\n        <div id=\"doc-saved\" class=\"alert alert-success ",["{",[[0,"adminHide"]]],"\">Your document was saved!</div>\r\n        <table class='table'>\r\n          <tbody>\r\n            ",["#",[[0,"each"],[0,"fields"]],["\r\n              ",[">","_houston_document_field"],"\r\n            "]],"\r\n          </tbody>\r\n        </table>\r\n        <span class=\"btn houston-save\">Save</span>\r\n        <span class=\"btn houston-delete\">Delete</span>\r\n      </div>\r\n    "]],"\r\n  </div>"]));
Template.__define__("_houston_document_field",Package.handlebars.Handlebars.json_ast_to_func(["<tr>\r\n    <td>",["{",[[0,"name"]]],":</td>\r\n    ",["#",[[0,"if"],[0,"field_is_id"]],["\r\n    <td>",["{",[[0,"value"]]],"</td>\r\n    "],["\r\n    <td><textarea class=\"houston-field\" name=\"",["{",[[0,"name"]]],"\">",["{",[[0,"value"]]],"</textarea></td>\r\n    "]],"\r\n  </tr>"]));
                                                                                                                      // 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages\houston\client\template.admin_navbar.js                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Template.__define__("_houston_navbar",Package.handlebars.Handlebars.json_ast_to_func(["<div class=\"houston\">\r\n    <div class=\"navbar navbar-fixed-top\">\r\n      <div class=\"navbar-inner\">\r\n        <div class=\"container\">\r\n          <button type=\"button\" class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".nav-collapse\">\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n          </button>\r\n          <a class=\"brand\" href=\"",["{",[[0,"pathFor"],"houston_home"]],"\">Admin</a>\r\n          <div class=\"nav-collapse collapse\">\r\n            <ul class=\"nav\">\r\n            </ul>\r\n          </div>\r\n          <ul class=\"nav pull-right\">\r\n            <li>\r\n              <a id=\"houston-report-bug\" href=\"",["{",[[0,"bugreport_url"]]],"\" target=\"_blank\">Report a Bug</a>\r\n            </li>\r\n            ",["#",[[0,"if"],[0,"currentUser"]],["\r\n              <li>\r\n                <a class=\"houston-logout\" href=\"#\">Log out</a>\r\n              </li>\r\n            "]],"\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>"]));
                                                                                                                      // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages\houston\client\template.main.js                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.startup(function(){document.body.appendChild(Spark.render(Template.__define__(null,Package.handlebars.Handlebars.json_ast_to_func([["#",[[0,"if"],[0,"onHoustonPage"]],["\r\n    ",["{",[[0,"renderPage"]]],"\r\n    <div class='row'>\r\n      <div class='small-12 columns' id='footer'>\r\n        <ul>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  "]]]))));});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages\houston\client\router.coffee.js                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var hide_non_admin_stuff, mustBeAdmin, name, onRouteNotFound, remove_host_css, setup_collection,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  __slice = [].slice;

if (window.Houston == null) {
  window.Houston = {};
}

Houston._houstonize = function(name) {
  return "_houston_" + name;
};

Houston._subscribe = function(name) {
  return Meteor.subscribe(Houston._houstonize(name));
};

Houston._subscribe('collections');

Houston._subscribe('admin_user');

setup_collection = function(collection_name, document_id) {
  var collection, filter, subscription_name;
  Houston._page_length = 20;
  subscription_name = Houston._houstonize(collection_name);
  collection = Houston._get_collection(collection_name);
  filter = document_id ? (typeof document_id === 'string' && document_id.length === 24 ? document_id = new Meteor.Collection.ObjectID(document_id) : void 0, {
    _id: document_id
  }) : {};
  Houston._paginated_subscription = Meteor.subscribeWithPagination(subscription_name, {}, filter, Houston._page_length);
  Houston._session('collection_name', collection_name);
  return [collection, Houston._paginated_subscription];
};

Houston._houstonize_route = function(name) {
  return Houston._houstonize(name).slice(1);
};

Houston._go = function(route_name, options) {
  return Router.go(Houston._houstonize_route(route_name), options);
};

Router.map(function() {
  var houston_route,
    _this = this;
  houston_route = function(route_name, options) {
    options.template = Houston._houstonize(options.template);
    options.layoutTemplate = null;
    return _this.route(Houston._houstonize_route(route_name), options);
  };
  houston_route('home', {
    path: '/admin',
    before: function() {
      return Houston._session('collections', Houston._collections.collections.find().fetch());
    },
    template: 'db_view'
  });
  houston_route('login', {
    path: '/admin/login',
    template: 'login'
  });
  houston_route('collection', {
    path: '/admin/:name',
    data: function() {
      var collection, _ref;
      _ref = setup_collection(this.params.name), collection = _ref[0], this.subscription = _ref[1];
      return {
        collection: collection
      };
    },
    waitOn: function() {
      return this.subscription;
    },
    template: 'collection_view'
  });
  return houston_route('document', {
    path: '/admin/:collection/:_id',
    data: function() {
      var collection, _ref;
      Houston._session('document_id', this.params._id);
      _ref = setup_collection(this.params.collection, this.params._id), collection = _ref[0], this.subscription = _ref[1];
      return {
        collection: collection,
        name: this.params.collection
      };
    },
    template: 'document_view'
  });
});

mustBeAdmin = function() {
  if (!Meteor.loggingIn()) {
    if (!Houston._user_is_admin(Meteor.userId())) {
      this.stop();
      return Houston._go('login');
    }
  }
};

hide_non_admin_stuff = function() {
  var func;
  $('body').hide();
  func = function() {
    $('body').show();
    $('body').children().hide();
    $('body>.houston').show();
    $('body').css('visibility', 'hidden');
    return $('body>.houston').css('visibility', 'visible');
  };
  return setTimeout(func, 0);
};

remove_host_css = function() {
  var $head, $link, file, is_houston_link, link, links, _i, _j, _len, _len1, _ref, _results;
  is_houston_link = function($link) {
    var _ref;
    return _ref = $link.attr('href'), __indexOf.call(Houston._css_files, _ref) >= 0;
  };
  links = $('link[rel="stylesheet"]');
  for (_i = 0, _len = links.length; _i < _len; _i++) {
    link = links[_i];
    $link = $(link);
    if (!is_houston_link($link)) {
      $link.remove();
    }
  }
  links = $('link[rel="stylesheet"]');
  if (links.length < Houston._css_files.length) {
    $head = $('head');
    _ref = Houston._css_files;
    _results = [];
    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
      file = _ref[_j];
      _results.push($head.append("<link rel=\"stylesheet\" href=\"" + file + "\">"));
    }
    return _results;
  }
};

Router.before(mustBeAdmin, {
  only: (function() {
    var _i, _len, _ref, _results;
    _ref = ['home', 'collection', 'document'];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      name = _ref[_i];
      _results.push(Houston._houstonize_route(name));
    }
    return _results;
  })()
});

Router.after(hide_non_admin_stuff, {
  only: (function() {
    var _i, _len, _ref, _results;
    _ref = ['home', 'collection', 'document', 'login'];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      name = _ref[_i];
      _results.push(Houston._houstonize_route(name));
    }
    return _results;
  })()
});

Router.before(remove_host_css, {
  only: (function() {
    var _i, _len, _ref, _results;
    _ref = ['home', 'collection', 'document', 'login'];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      name = _ref[_i];
      _results.push(Houston._houstonize_route(name));
    }
    return _results;
  })()
});

onRouteNotFound = Router.onRouteNotFound;

Router.onRouteNotFound = function() {
  var args, non_houston_routes;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  non_houston_routes = _.filter(Router.routes, function(route) {
    return route.name.indexOf('houston_') !== 0;
  });
  if (non_houston_routes.length > 0) {
    return onRouteNotFound.apply(null, args);
  } else {
    return console.log("Note: Houston is suppressing Iron-Router errors because we don't think you are using it.");
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages\houston\client\admin_login.coffee.js                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var admin_user_exists;

admin_user_exists = function() {
  return Houston._admins.find().count() > 0;
};

Template._houston_login.helpers({
  logged_in: function() {
    return Meteor.user();
  },
  admin_user_exists: function() {
    return admin_user_exists();
  }
});

Template._houston_login.events({
  'submit #houston-sign-in-form': function(e) {
    var afterLogin, email, password;
    e.preventDefault();
    email = $('input[name="houston-email"]').val();
    password = $('input[name="houston-password"]').val();
    afterLogin = function(error) {
      if (error) {
        return alert(error);
      } else {
        return Houston._go('home');
      }
    };
    if (admin_user_exists()) {
      return Meteor.loginWithPassword(email, password, afterLogin);
    } else {
      return Accounts.createUser({
        email: email,
        password: password
      }, function(error) {
        if (error) {
          return afterLogin(error);
        }
        return Houston._call('make_admin', Meteor.userId(), afterLogin);
      });
    }
  },
  'click .houston-logout': function(e) {
    e.preventDefault();
    return Meteor.logout();
  },
  'click .become-houston-admin': function(e) {
    e.preventDefault();
    Houston._call('make_admin', Meteor.userId());
    return Houston._go('home');
  }
});

Template._houston_login.rendered = function() {
  return $(window).unbind('scroll');
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages\houston\client\collection_view.coffee.js                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var collection_count, collection_info, get_collection_view_fields, get_current_collection, get_filter_query, get_sort_by, resubscribe;

get_sort_by = function() {
  var sort_by;
  sort_by = {};
  sort_by[Houston._session('sort_key')] = Houston._session('sort_order');
  return sort_by;
};

get_filter_query = function() {
  var fill_query_with_regex, query;
  query = {};
  fill_query_with_regex = function(session_key) {
    var key, val, _ref, _results;
    if (Houston._session(session_key) == null) {
      return;
    }
    _ref = Houston._session(session_key);
    _results = [];
    for (key in _ref) {
      val = _ref[key];
      _results.push(query[key] = {
        $regex: val.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
      });
    }
    return _results;
  };
  fill_query_with_regex('field_selectors');
  return query;
};

resubscribe = function() {
  var subscription_name;
  subscription_name = "_houston_" + (Houston._session('collection_name'));
  Houston._paginated_subscription.stop();
  return Houston._paginated_subscription = Meteor.subscribeWithPagination(subscription_name, get_sort_by(), get_filter_query(), Houston._page_length);
};

collection_info = function() {
  return Houston._collections.collections.findOne({
    name: Houston._session('collection_name')
  });
};

collection_count = function() {
  var _ref;
  return (_ref = collection_info()) != null ? _ref.count : void 0;
};

Template._houston_collection_view.helpers({
  headers: function() {
    return get_collection_view_fields();
  },
  nonid_headers: function() {
    return get_collection_view_fields().slice(1);
  },
  name: function() {
    return Houston._session('collection_name');
  },
  document_id: function() {
    return this._id + "";
  },
  num_of_records: function() {
    return collection_count() || "no";
  },
  pluralize: function() {
    if (collection_count() !== 1) {
      return 's';
    }
  },
  rows: function() {
    var collection, documents, _ref;
    collection = Houston._session('collection_name');
    documents = (_ref = get_current_collection()) != null ? _ref.find(get_filter_query(), {
      sort: get_sort_by()
    }).fetch() : void 0;
    return _.map(documents, function(d) {
      d.collection = collection;
      d._id = d._id._str || d._id;
      return d;
    });
  },
  values_in_order: function() {
    var field_name, field_value, fields_in_order, names_in_order, values, _i, _len, _ref, _ref1, _results;
    fields_in_order = get_collection_view_fields();
    names_in_order = _.clone(fields_in_order);
    values = (function() {
      var _i, _len, _ref, _results;
      _ref = fields_in_order.slice(1);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        field_name = _ref[_i];
        _results.push(Houston._nested_field_lookup(this, field_name));
      }
      return _results;
    }).call(this);
    _ref = _.zip(values, names_in_order.slice(1));
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      _ref1 = _ref[_i], field_value = _ref1[0], field_name = _ref1[1];
      _results.push({
        field_value: field_value,
        field_name: field_name
      });
    }
    return _results;
  },
  filter_value: function() {
    if (Houston._session('field_selectors') && Houston._session('field_selectors')[this]) {
      return Houston._session('field_selectors')[this];
    } else {
      return '';
    }
  }
});

Template._houston_collection_view.rendered = function() {
  var $win;
  $win = $(window);
  return $win.scroll(function() {
    if ($win.scrollTop() + 300 > $(document).height() - $win.height() && Houston._paginated_subscription.limit() < collection_count()) {
      return Houston._paginated_subscription.loadNextPage();
    }
  });
};

get_current_collection = function() {
  return Houston._get_collection(Houston._session('collection_name'));
};

get_collection_view_fields = function() {
  var _ref;
  return ((_ref = collection_info()) != null ? _ref.fields : void 0) || [];
};

Template._houston_collection_view.events({
  "click a.houston-sort": function(e) {
    e.preventDefault();
    if (Houston._session('sort_key') === this.toString()) {
      Houston._session('sort_order', Houston._session('sort_order') * -1);
    } else {
      Houston._session('sort_key', this.toString());
      Houston._session('sort_order', 1);
    }
    return resubscribe();
  },
  'dblclick .houston-collection-field': function(e) {
    var $this;
    $this = $(e.currentTarget);
    $this.removeClass('houston-collection-field');
    $this.html("<input type='text' value='" + ($this.text()) + "'>");
    $this.find('input').select();
    return $this.find('input').on('blur', function() {
      var field_name, id, update_dict, updated_val;
      updated_val = $this.find('input').val();
      $this.html(updated_val);
      $this.addClass('houston-collection-field');
      id = $('td:first-child a', $this.parents('tr')).html();
      field_name = $this.data('field');
      update_dict = {};
      update_dict[field_name] = updated_val;
      return Houston._call("" + (Houston._session('collection_name')) + "_update", id, {
        $set: update_dict
      });
    });
  },
  'keyup .houston-column-filter': function(e) {
    var field_selectors;
    field_selectors = {};
    $('.houston-column-filter').each(function(idx, item) {
      if (item.value) {
        return field_selectors[item.name] = item.value;
      }
    });
    Houston._session('field_selectors', field_selectors);
    return resubscribe();
  },
  'click #houston-create-btn': function() {
    $('#houston-create-document').removeClass('hide hidden');
    return $('#houston-create-btn').hide();
  },
  'click .houston-delete-doc': function(e) {
    var id;
    e.preventDefault();
    id = $(e.currentTarget).data('id');
    return Houston._call("" + (Houston._session('collection_name')) + "_delete", id);
  },
  'click .houston-create-doc': function(e) {
    var $create_row, doc_iter, field, final_key, key, keys, new_doc, _i, _j, _len, _len1, _ref;
    e.preventDefault();
    $create_row = $('#houston-create-row');
    new_doc = {};
    _ref = $create_row.find('input[type="text"]');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      field = _ref[_i];
      keys = field.name.split('.');
      final_key = keys.pop();
      doc_iter = new_doc;
      for (_j = 0, _len1 = keys.length; _j < _len1; _j++) {
        key = keys[_j];
        if (!doc_iter[key]) {
          doc_iter[key] = {};
        }
        doc_iter = doc_iter[key];
      }
      doc_iter[final_key] = field.value;
      field.value = '';
    }
    return Houston._call("" + (Houston._session('collection_name')) + "_insert", new_doc);
  },
  'submit form.houston-filter-form': function(e) {
    return e.preventDefault();
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages\houston\client\document_view.coffee.js                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var get_collection;

Template._houston_document_view.helpers({
  collection_name: function() {
    return Houston._session('collection_name');
  },
  adminHide: function() {
    if (Houston._session('should_show')) {
      return '';
    } else {
      return 'hide';
    }
  },
  fields: function() {
    var document, error, field, fields;
    document = get_collection().findOne({
      _id: Houston._session('document_id')
    });
    if (!document) {
      try {
        document = get_collection().findOne({
          _id: new Meteor.Collection.ObjectID(Houston._session('document_id'))
        });
      } catch (_error) {
        error = _error;
        console.log(error);
      }
    }
    fields = Houston._get_fields([document]);
    return (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = fields.length; _i < _len; _i++) {
        field = fields[_i];
        _results.push({
          name: field.name,
          value: Houston._nested_field_lookup(document, field.name)
        });
      }
      return _results;
    })();
  },
  document_id: function() {
    return Houston._session('document_id');
  }
});

Template._houston_document_field.helpers({
  field_is_id: function() {
    return this.name === '_id';
  },
  document_id: function() {
    return Houston._session('document_id');
  }
});

get_collection = function() {
  return Houston._get_collection(Houston._session('collection_name'));
};

Template._houston_document_view.events({
  'click .houston-save': function(e) {
    var error, field, old_object, update_dict, _i, _len, _ref;
    e.preventDefault();
    old_object = get_collection().findOne({
      _id: Houston._session('document_id')
    });
    if (!old_object) {
      try {
        old_object = get_collection().findOne({
          _id: new Meteor.Collection.ObjectID(Houston._session('document_id'))
        });
      } catch (_error) {
        error = _error;
        console.log(error);
      }
    }
    update_dict = {};
    _ref = $('.houston-field');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      field = _ref[_i];
      if (field.name !== '_id') {
        update_dict[field.name] = typeof old_object[field.name] === 'number' ? parseFloat(field.value) : field.value;
      }
    }
    Houston._call("" + (Houston._session('collection_name')) + "_update", Houston._session('document_id'), {
      $set: update_dict
    });
    Houston._session('should_show', true);
    return setTimeout((function() {
      return Houston._session('should_show', false);
    }), 1500);
  },
  'click .houston-delete': function(e) {
    e.preventDefault();
    Houston._call("" + (Houston._session('collection_name')) + "_delete", Houston._session('document_id'));
    return Houston._go('collection', {
      name: Houston._session('collection_name')
    });
  }
});

Template._houston_document_view.rendered = function() {
  return $(window).unbind('scroll');
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages\houston\client\zma_helpers.coffee.js                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var __slice = [].slice;

if (typeof Handlebars !== "undefined" && Handlebars !== null) {
  Handlebars.registerHelper('onHoustonPage', function() {
    return window.location.pathname.indexOf('/admin') === 0;
  });
}

if (Houston._collections == null) {
  Houston._collections = {};
}

Houston._get_collection = function(collection_name) {
  var e;
  if (!Houston._collections[collection_name]) {
    try {
      Houston._collections[collection_name] = new Meteor.Collection(collection_name);
    } catch (_error) {
      e = _error;
      try {
        Houston._collections[collection_name] = Meteor.connection._mongo_livedata_collections[collection_name];
      } catch (_error) {
        e = _error;
        Houston._collections[collection_name] = Meteor._LocalCollectionDriver.collections[collection_name];
      }
    }
  }
  return Houston._collections[collection_name];
};

Houston._session = function() {
  var key;
  key = Houston._houstonize(arguments[0]);
  if (arguments.length === 1) {
    return Session.get(key);
  } else if (arguments.length === 2) {
    return Session.set(key, arguments[1]);
  }
};

Houston._call = function() {
  var args, name;
  name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  return Meteor.call.apply(Meteor, [Houston._houstonize(name)].concat(__slice.call(args)));
};

Houston._nested_field_lookup = function(object, path) {
  var part, result, _i, _len, _ref;
  if (object == null) {
    return '';
  }
  if (path === '_id' && typeof object._id === 'object') {
    return object._id._str;
  }
  result = object;
  _ref = path.split(".");
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    part = _ref[_i];
    result = result[part];
    if (result == null) {
      return '';
    }
  }
  if (typeof result !== 'object') {
    return result;
  } else {
    return '';
  }
};

Houston._css_files = ["//terrono.com/houston/style.css", "//terrono.com/houston/bootstrap.css"];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages\houston\client\admin_navbar.coffee.js                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Template._houston_navbar.events({
  'click .houston-logout': function(e) {
    e.preventDefault();
    return Meteor.logout();
  }
});

Template._houston_navbar.helpers({
  'bugreport_url': function() {
    var message;
    message = encodeURIComponent("To make sure we can help you quickly, please include the version of Houston\nyou are using, steps to replicate the issue, a description of what you were\nexpecting and a screenshot if relevant.\n\nThanks!");
    return "https://github.com/gterrono/houston/issues/new?body=" + message;
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages\houston\client\db_view.coffee.js                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Template._houston_db_view.helpers({
  collections: function() {
    return Houston._session('collections');
  },
  num_of_records: function() {
    return Houston._collections.collections.findOne({
      name: this.name
    }).count;
  }
});

Template._houston_db_view.events({
  "click #refresh": function() {
    return window.location.reload();
  }
});

Template._houston_db_view.rendered = function() {
  Houston._session('field_selectors', {});
  return $(window).unbind('scroll');
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages\houston\lib\collections.coffee.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var root;

root = typeof exports !== "undefined" && exports !== null ? exports : this;

if (root.Houston == null) {
  root.Houston = {};
}

if (Houston._collections == null) {
  Houston._collections = {};
}

Houston._collections.collections = new Meteor.Collection('houston_collections');

Houston._admins = new Meteor.Collection('houston_admins');

Houston._user_is_admin = function(id) {
  return (id != null) && Houston._admins.findOne({
    user_id: id
  });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages\houston\lib\shared.coffee.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var root;

root = typeof exports !== "undefined" && exports !== null ? exports : this;

if (root.Houston == null) {
  root.Houston = {};
}

Houston._houstonize = function(name) {
  return "_houston_" + name;
};

Houston._get_fields = function(documents) {
  var document, find_fields, key, key_to_type, value, _i, _len, _results;
  key_to_type = {
    _id: 'ObjectId'
  };
  find_fields = function(document, prefix) {
    var full_path_key, key, value, _ref, _results;
    if (prefix == null) {
      prefix = '';
    }
    _ref = _.omit(document, '_id');
    _results = [];
    for (key in _ref) {
      value = _ref[key];
      if (typeof value === 'object') {
        _results.push(find_fields(value, "" + prefix + key + "."));
      } else if (typeof value !== 'function') {
        full_path_key = "" + prefix + key;
        _results.push(key_to_type[full_path_key] = typeof value);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };
  for (_i = 0, _len = documents.length; _i < _len; _i++) {
    document = documents[_i];
    find_fields(document);
  }
  _results = [];
  for (key in key_to_type) {
    value = key_to_type[key];
    _results.push({
      name: key,
      type: value
    });
  }
  return _results;
};

Houston._get_field_names = function(documents) {
  return _.pluck(Houston._get_fields(documents), 'name');
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
