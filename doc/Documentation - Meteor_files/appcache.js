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
var Reload = Package.reload.Reload;

(function () {

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// packages\appcache\appcache-client.js                                             //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
if (window.applicationCache) {                                                      // 1
                                                                                    // 2
var appCacheStatuses = [                                                            // 3
  'uncached',                                                                       // 4
  'idle',                                                                           // 5
  'checking',                                                                       // 6
  'downloading',                                                                    // 7
  'updateready',                                                                    // 8
  'obsolete'                                                                        // 9
];                                                                                  // 10
                                                                                    // 11
var updatingAppcache = false;                                                       // 12
var reloadRetry = null;                                                             // 13
var appcacheUpdated = false;                                                        // 14
                                                                                    // 15
Reload._onMigrate('appcache', function(retry) {                                     // 16
  if (appcacheUpdated)                                                              // 17
    return [true];                                                                  // 18
                                                                                    // 19
  // An uncached application (one that does not have a manifest) cannot             // 20
  // be updated.                                                                    // 21
  if (window.applicationCache.status === window.applicationCache.UNCACHED)          // 22
    return [true];                                                                  // 23
                                                                                    // 24
  if (!updatingAppcache) {                                                          // 25
    try {                                                                           // 26
      window.applicationCache.update();                                             // 27
    } catch (e) {                                                                   // 28
      Meteor._debug('applicationCache update error', e);                            // 29
      // There's no point in delaying the reload if we can't update the cache.      // 30
      return [true];                                                                // 31
    }                                                                               // 32
    updatingAppcache = true;                                                        // 33
  }                                                                                 // 34
                                                                                    // 35
  // Delay migration until the app cache has been updated.                          // 36
  reloadRetry = retry;                                                              // 37
  return false;                                                                     // 38
});                                                                                 // 39
                                                                                    // 40
// If we're migrating and the app cache is now up to date, signal that              // 41
// we're now ready to migrate.                                                      // 42
var cacheIsNowUpToDate = function() {                                               // 43
  if (!updatingAppcache)                                                            // 44
    return;                                                                         // 45
  appcacheUpdated = true;                                                           // 46
  reloadRetry();                                                                    // 47
};                                                                                  // 48
                                                                                    // 49
window.applicationCache.addEventListener('updateready', cacheIsNowUpToDate, false); // 50
window.applicationCache.addEventListener('noupdate', cacheIsNowUpToDate, false);    // 51
                                                                                    // 52
// We'll get the obsolete event on a 404 fetching the app.manifest:                 // 53
// we had previously been running with an app cache, but the app                    // 54
// cache has now been disabled or the appcache package removed.                     // 55
// Reload to get the new non-cached code.                                           // 56
                                                                                    // 57
window.applicationCache.addEventListener('obsolete', (function() {                  // 58
  if (reloadRetry) {                                                                // 59
    cacheIsNowUpToDate();                                                           // 60
  }                                                                                 // 61
  else {                                                                            // 62
    appcacheUpdated = true;                                                         // 63
    Reload._reload();                                                               // 64
  }                                                                                 // 65
}), false);                                                                         // 66
                                                                                    // 67
} // if window.applicationCache                                                     // 68
//////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.appcache = {};

})();

//# sourceMappingURL=da564b96a85bdab10693fa0a480f858581641c0d.map
