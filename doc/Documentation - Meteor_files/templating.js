//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var Spark = Package.spark.Spark;
var Handlebars = Package.handlebars.Handlebars;

/* Package-scope variables */
var Template;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
// packages\templating\deftemplate.js                                                      //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////
                                                                                           //
Template = {};                                                                             // 1
                                                                                           // 2
var registeredPartials = {};                                                               // 3
                                                                                           // 4
// If minimongo is available (it's a weak dependency) use its ID stringifier to            // 5
// label branches (so that, eg, ObjectId and strings don't overlap). Otherwise             // 6
// just use the identity function.                                                         // 7
var idStringify = Package.minimongo                                                        // 8
  ? Package.minimongo.LocalCollection._idStringify                                         // 9
  : function (id) { return id; };                                                          // 10
                                                                                           // 11
// XXX Handlebars hooking is janky and gross                                               // 12
var hookHandlebars = function () {                                                         // 13
  hookHandlebars = function(){}; // install the hook only once                             // 14
                                                                                           // 15
  var orig = Handlebars._default_helpers.each;                                             // 16
  Handlebars._default_helpers.each = function (arg, options) {                             // 17
    // if arg isn't an observable (like LocalCollection.Cursor),                           // 18
    // don't use this reactive implementation of #each.                                    // 19
    if (!(arg && 'observeChanges' in arg))                                                 // 20
      return orig.call(this, arg, options);                                                // 21
                                                                                           // 22
    return Spark.list(                                                                     // 23
      arg,                                                                                 // 24
      function (item) {                                                                    // 25
        return Spark.labelBranch(                                                          // 26
          (item && item._id && idStringify(item._id)) || Spark.UNIQUE_LABEL, function () { // 27
            var html = Spark.isolate(_.bind(options.fn, null, item));                      // 28
            return Spark.setDataContext(item, html);                                       // 29
          });                                                                              // 30
      },                                                                                   // 31
      function () {                                                                        // 32
        return options.inverse ?                                                           // 33
          Spark.isolate(options.inverse) : '';                                             // 34
      }                                                                                    // 35
    );                                                                                     // 36
  };                                                                                       // 37
                                                                                           // 38
  _.extend(Handlebars._default_helpers, {                                                  // 39
    isolate: function (options) {                                                          // 40
      var data = this;                                                                     // 41
      return Spark.isolate(function () {                                                   // 42
        return options.fn(data);                                                           // 43
      });                                                                                  // 44
    },                                                                                     // 45
    constant: function (options) {                                                         // 46
      var data = this;                                                                     // 47
      return Spark.createLandmark({ constant: true }, function () {                        // 48
        return options.fn(data);                                                           // 49
      });                                                                                  // 50
    }                                                                                      // 51
  });                                                                                      // 52
};                                                                                         // 53
                                                                                           // 54
// map from landmark id, to the 'this' object for                                          // 55
// created/rendered/destroyed callbacks on templates                                       // 56
var templateInstanceData = {};                                                             // 57
                                                                                           // 58
var templateObjFromLandmark = function (landmark) {                                        // 59
  var template = templateInstanceData[landmark.id] || (                                    // 60
    templateInstanceData[landmark.id] = {                                                  // 61
      // set these once                                                                    // 62
      find: function (selector) {                                                          // 63
        if (! landmark.hasDom())                                                           // 64
          throw new Error("Template not in DOM");                                          // 65
        return landmark.find(selector);                                                    // 66
      },                                                                                   // 67
      findAll: function (selector) {                                                       // 68
        if (! landmark.hasDom())                                                           // 69
          throw new Error("Template not in DOM");                                          // 70
        return landmark.findAll(selector);                                                 // 71
      }                                                                                    // 72
    });                                                                                    // 73
  // set these each time                                                                   // 74
  template.firstNode = landmark.hasDom() ? landmark.firstNode() : null;                    // 75
  template.lastNode = landmark.hasDom() ? landmark.lastNode() : null;                      // 76
  return template;                                                                         // 77
};                                                                                         // 78
                                                                                           // 79
// XXX forms hooks into this to add "bind"?                                                // 80
var templateBase = {                                                                       // 81
  // methods store data here (event map, etc.).  initialized per template.                 // 82
  _tmpl_data: null,                                                                        // 83
  // these functions must be generic (i.e. use `this`)                                     // 84
  events: function (eventMap) {                                                            // 85
    var events =                                                                           // 86
          (this._tmpl_data.events = (this._tmpl_data.events || {}));                       // 87
    _.each(eventMap, function(callback, spec) {                                            // 88
      events[spec] = (events[spec] || []);                                                 // 89
      events[spec].push(callback);                                                         // 90
    });                                                                                    // 91
  },                                                                                       // 92
  preserve: function (preserveMap) {                                                       // 93
    var preserve =                                                                         // 94
          (this._tmpl_data.preserve = (this._tmpl_data.preserve || {}));                   // 95
                                                                                           // 96
    if (_.isArray(preserveMap))                                                            // 97
      _.each(preserveMap, function (selector) {                                            // 98
        preserve[selector] = true;                                                         // 99
      });                                                                                  // 100
    else                                                                                   // 101
      _.extend(preserve, preserveMap);                                                     // 102
  },                                                                                       // 103
  helpers: function (helperMap) {                                                          // 104
    var helpers =                                                                          // 105
          (this._tmpl_data.helpers = (this._tmpl_data.helpers || {}));                     // 106
    for(var h in helperMap)                                                                // 107
      helpers[h] = helperMap[h];                                                           // 108
  }                                                                                        // 109
};                                                                                         // 110
                                                                                           // 111
Template.__define__ = function (name, raw_func) {                                          // 112
  hookHandlebars();                                                                        // 113
                                                                                           // 114
  if (name === '__define__')                                                               // 115
    throw new Error("Sorry, '__define__' is a special name and " +                         // 116
                    "cannot be used as the name of a template");                           // 117
                                                                                           // 118
  // Define the function assigned to Template.<name>.                                      // 119
                                                                                           // 120
  var partial = function (data) {                                                          // 121
    var tmpl = name && Template[name] || {};                                               // 122
    var tmplData = tmpl._tmpl_data || {};                                                  // 123
                                                                                           // 124
    var html = Spark.labelBranch("Template."+name, function () {                           // 125
      var html = Spark.createLandmark({                                                    // 126
        preserve: tmplData.preserve || {},                                                 // 127
        created: function () {                                                             // 128
          var template = templateObjFromLandmark(this);                                    // 129
          template.data = data;                                                            // 130
          tmpl.created && tmpl.created.call(template);                                     // 131
        },                                                                                 // 132
        rendered: function () {                                                            // 133
          var template = templateObjFromLandmark(this);                                    // 134
          template.data = data;                                                            // 135
          tmpl.rendered && tmpl.rendered.call(template);                                   // 136
        },                                                                                 // 137
        destroyed: function () {                                                           // 138
          // template.data is already set from previous callbacks                          // 139
          tmpl.destroyed &&                                                                // 140
            tmpl.destroyed.call(templateObjFromLandmark(this));                            // 141
          delete templateInstanceData[this.id];                                            // 142
        }                                                                                  // 143
      }, function (landmark) {                                                             // 144
        var html = Spark.isolate(function () {                                             // 145
          // XXX Forms needs to run a hook before and after raw_func                       // 146
          // (and receive 'landmark')                                                      // 147
          return raw_func(data, {                                                          // 148
            helpers: _.extend({}, partial, tmplData.helpers || {}),                        // 149
            partials: registeredPartials,                                                  // 150
            name: name                                                                     // 151
          });                                                                              // 152
        });                                                                                // 153
                                                                                           // 154
        // take an event map with `function (event, template)` handlers                    // 155
        // and produce one with `function (event, landmark)` handlers                      // 156
        // for Spark, by inserting logic to create the template object.                    // 157
        var wrapEventMap = function (oldEventMap) {                                        // 158
          var newEventMap = {};                                                            // 159
          _.each(oldEventMap, function (handlers, key) {                                   // 160
            if ('function' === typeof handlers) {                                          // 161
              //Template.foo.events = ... way will give a fn, not an array                 // 162
              handlers = [ handlers ];                                                     // 163
            }                                                                              // 164
            newEventMap[key] = _.map(handlers, function (handler) {                        // 165
              return function (event, landmark) {                                          // 166
                return handler.call(this, event,                                           // 167
                                    templateObjFromLandmark(landmark));                    // 168
              };                                                                           // 169
            });                                                                            // 170
          });                                                                              // 171
          return newEventMap;                                                              // 172
        };                                                                                 // 173
                                                                                           // 174
        // support old Template.foo.events = {...} format                                  // 175
        var events =                                                                       // 176
              (tmpl.events !== templateBase.events ?                                       // 177
               tmpl.events : tmplData.events);                                             // 178
        // events need to be inside the landmark, not outside, so                          // 179
        // that when an event fires, you can retrieve the enclosing                        // 180
        // landmark to get the template data                                               // 181
        if (tmpl.events)                                                                   // 182
          html = Spark.attachEvents(wrapEventMap(events), html);                           // 183
        return html;                                                                       // 184
      });                                                                                  // 185
      html = Spark.setDataContext(data, html);                                             // 186
      return html;                                                                         // 187
    });                                                                                    // 188
                                                                                           // 189
    return html;                                                                           // 190
  };                                                                                       // 191
                                                                                           // 192
  // XXX hack.. copy all of Handlebars' built in helpers over to                           // 193
  // the partial. it would be better to hook helperMissing (or                             // 194
  // something like that?) so that Template.foo is searched only                           // 195
  // if it's not a built-in helper.                                                        // 196
  _.extend(partial, Handlebars.helpers);                                                   // 197
                                                                                           // 198
                                                                                           // 199
  if (name) {                                                                              // 200
    if (Template[name])                                                                    // 201
      throw new Error("There are multiple templates named '" + name +                      // 202
                      "'. Each template needs a unique name.");                            // 203
                                                                                           // 204
    Template[name] = partial;                                                              // 205
    _.extend(partial, templateBase);                                                       // 206
    partial._tmpl_data = {};                                                               // 207
                                                                                           // 208
    registeredPartials[name] = partial;                                                    // 209
  }                                                                                        // 210
                                                                                           // 211
  // useful for unnamed templates, like body                                               // 212
  return partial;                                                                          // 213
};                                                                                         // 214
                                                                                           // 215
/////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.templating = {
  Template: Template
};

})();

//# sourceMappingURL=bd0ad5dbf91f54a89e5341cdfd9606076b46ecc6.map
