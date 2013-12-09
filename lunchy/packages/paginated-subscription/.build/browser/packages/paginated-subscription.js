(function () {

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages\paginated-subscription\paginated_subscription.js                     //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
PaginatedSubscriptionHandle = function(perPage) {                                // 1
  this.perPage = perPage;                                                        // 2
  this._limit = perPage;                                                         // 3
  this._limitListeners = new Deps.Dependency();                                  // 4
  this._loaded = 0;                                                              // 5
  this._loadedListeners = new Deps.Dependency();                                 // 6
}                                                                                // 7
                                                                                 // 8
PaginatedSubscriptionHandle.prototype.loaded = function() {                      // 9
  this._loadedListeners.depend();                                                // 10
  return this._loaded;                                                           // 11
}                                                                                // 12
                                                                                 // 13
PaginatedSubscriptionHandle.prototype.limit = function() {                       // 14
  this._limitListeners.depend();                                                 // 15
  return this._limit;                                                            // 16
}                                                                                // 17
                                                                                 // 18
PaginatedSubscriptionHandle.prototype.ready = function() {                       // 19
  return this.loaded() === this.limit();                                         // 20
}                                                                                // 21
                                                                                 // 22
// deprecated                                                                    // 23
PaginatedSubscriptionHandle.prototype.loading = function() {                     // 24
  return ! this.ready();                                                         // 25
}                                                                                // 26
                                                                                 // 27
PaginatedSubscriptionHandle.prototype.loadNextPage = function() {                // 28
  this._limit += this.perPage;                                                   // 29
  this._limitListeners.changed();                                                // 30
}                                                                                // 31
                                                                                 // 32
PaginatedSubscriptionHandle.prototype.done = function() {                        // 33
  // XXX: check if subs that are canceled before they are ready ever fire ready? // 34
  // if they do we need to increase loaded by perPage, not set it to limit       // 35
  this._loaded = this._limit;                                                    // 36
  this._loadedListeners.changed();                                               // 37
}                                                                                // 38
                                                                                 // 39
PaginatedSubscriptionHandle.prototype.reset = function() {                       // 40
  this._limit = this.perPage;                                                    // 41
  this._limitListeners.changed();                                                // 42
}                                                                                // 43
                                                                                 // 44
                                                                                 // 45
// XXX: deal with last argument being a callback                                 // 46
Meteor.subscribeWithPagination = function (/*name, arguments, perPage */) {      // 47
  var args = Array.prototype.slice.call(arguments, 0);                           // 48
  var perPage = args.pop();                                                      // 49
                                                                                 // 50
  var handle = new PaginatedSubscriptionHandle(perPage);                         // 51
                                                                                 // 52
  Meteor.autorun(function() {                                                    // 53
    var ourArgs = _.map(args, function(arg) {                                    // 54
      return _.isFunction(arg) ? arg() : arg;                                    // 55
    });                                                                          // 56
                                                                                 // 57
    var subHandle = Meteor.subscribe.apply(this, ourArgs.concat([                // 58
      handle.limit(), function() { handle.done(); }                              // 59
    ]));                                                                         // 60
    handle.stop = subHandle.stop;                                                // 61
  });                                                                            // 62
                                                                                 // 63
  return handle;                                                                 // 64
}                                                                                // 65
///////////////////////////////////////////////////////////////////////////////////

}).call(this);
