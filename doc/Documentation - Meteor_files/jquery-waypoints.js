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
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                        //
// packages\jquery-waypoints\waypoints.js                                                 //
//                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////
                                                                                          //
/*!                                                                                       // 1
jQuery Waypoints - v1.1.7                                                                 // 2
Copyright (c) 2011-2012 Caleb Troughton                                                   // 3
Dual licensed under the MIT license and GPL license.                                      // 4
https://github.com/imakewebthings/jquery-waypoints/blob/master/MIT-license.txt            // 5
https://github.com/imakewebthings/jquery-waypoints/blob/master/GPL-license.txt            // 6
*/                                                                                        // 7
                                                                                          // 8
/*                                                                                        // 9
Waypoints is a small jQuery plugin that makes it easy to execute a function               // 10
whenever you scroll to an element.                                                        // 11
                                                                                          // 12
GitHub Repository: https://github.com/imakewebthings/jquery-waypoints                     // 13
Documentation and Examples: http://imakewebthings.github.com/jquery-waypoints             // 14
                                                                                          // 15
Changelog:                                                                                // 16
	v1.1.7                                                                                   // 17
		- Actually fix the post-load bug in Issue #28 from v1.1.3.                              // 18
	v1.1.6                                                                                   // 19
		- Fix potential memory leak by unbinding events on empty context elements.              // 20
	v1.1.5                                                                                   // 21
		- Make plugin compatible with Browserify/RequireJS. (Thanks @cjroebuck)                 // 22
	v1.1.4                                                                                   // 23
		- Add handler option to give alternate binding method. (Issue #34)                      // 24
	v1.1.3                                                                                   // 25
		- Fix cases where waypoints are added post-load and should be triggered                 // 26
		  immediately. (Issue #28)                                                              // 27
	v1.1.2                                                                                   // 28
		- Fixed error thrown by waypoints with triggerOnce option that were                     // 29
		  triggered via resize refresh.                                                         // 30
	v1.1.1                                                                                   // 31
		- Fixed bug in initialization where all offsets were being calculated                   // 32
		  as if set to 0 initially, causing unwarranted triggers during the                     // 33
		  subsequent refresh.                                                                   // 34
		- Added onlyOnScroll, an option for individual waypoints that disables                  // 35
		  triggers due to an offset refresh that crosses the current scroll                     // 36
		  point. (All credit to @knuton on this one.)                                           // 37
	v1.1                                                                                     // 38
		- Moved the continuous option out of global settings and into the options               // 39
		  object for individual waypoints.                                                      // 40
		- Added the context option, which allows for using waypoints within any                 // 41
		  scrollable element, not just the window.                                              // 42
	v1.0.2                                                                                   // 43
		- Moved scroll and resize handler bindings out of load.  Should play nicer              // 44
		  with async loaders like Head JS and LABjs.                                            // 45
		- Fixed a 1px off error when using certain % offsets.                                   // 46
		- Added unit tests.                                                                     // 47
	v1.0.1                                                                                   // 48
		- Added $.waypoints('viewportHeight').                                                  // 49
		- Fixed iOS bug (using the new viewportHeight method).                                  // 50
		- Added offset function alias: 'bottom-in-view'.                                        // 51
	v1.0                                                                                     // 52
		- Initial release.                                                                      // 53
	                                                                                         // 54
Support:                                                                                  // 55
	- jQuery versions 1.4.3+                                                                 // 56
	- IE6+, FF3+, Chrome 6+, Safari 4+, Opera 11                                             // 57
	- Other versions and browsers may work, these are just the ones I've looked at.          // 58
*/                                                                                        // 59
                                                                                          // 60
(function($, wp, wps, window, undefined){                                                 // 61
	'$:nomunge';                                                                             // 62
	                                                                                         // 63
	var $w = $(window),                                                                      // 64
	                                                                                         // 65
	// Keeping common strings as variables = better minification                             // 66
	eventName = 'waypoint.reached',                                                          // 67
	                                                                                         // 68
	/*                                                                                       // 69
	For the waypoint and direction passed in, trigger the waypoint.reached                   // 70
	event and deal with the triggerOnce option.                                              // 71
	*/                                                                                       // 72
	triggerWaypoint = function(way, dir) {                                                   // 73
		way.element.trigger(eventName, dir);                                                    // 74
		if (way.options.triggerOnce) {                                                          // 75
			way.element[wp]('destroy');                                                            // 76
		}                                                                                       // 77
	},                                                                                       // 78
	                                                                                         // 79
	/*                                                                                       // 80
	Given a jQuery element and Context, returns the index of that element in the waypoints   // 81
	array.  Returns the index, or -1 if the element is not a waypoint.                       // 82
	*/                                                                                       // 83
	waypointIndex = function(el, context) {                                                  // 84
		if (!context) return -1;                                                                // 85
		var i = context.waypoints.length - 1;                                                   // 86
		while (i >= 0 && context.waypoints[i].element[0] !== el[0]) {                           // 87
			i -= 1;                                                                                // 88
		}                                                                                       // 89
		return i;                                                                               // 90
	},                                                                                       // 91
	                                                                                         // 92
	// Private list of all elements used as scrolling contexts for waypoints.                // 93
	contexts = [],                                                                           // 94
	                                                                                         // 95
	/*                                                                                       // 96
	Context Class - represents a scrolling context.  Properties include:                     // 97
		element: jQuery object containing a single HTML element.                                // 98
		waypoints: Array of waypoints operating under this scroll context.                      // 99
		oldScroll: Keeps the previous scroll position to determine scroll direction.            // 100
		didScroll: Flag used in scrolling the context's scroll event.                           // 101
		didResize: Flag used in scrolling the context's resize event.                           // 102
		doScroll: Function that checks for crossed waypoints. Called from throttler.            // 103
	*/                                                                                       // 104
	Context = function(context) {                                                            // 105
		$.extend(this, {                                                                        // 106
			element: $(context),                                                                   // 107
			oldScroll: 0,                                                                          // 108
			                                                                                       // 109
			/*                                                                                     // 110
			List of all elements that have been registered as waypoints.                           // 111
			Each object in the array contains:                                                     // 112
				element: jQuery object containing a single HTML element.                              // 113
				offset: The window scroll offset, in px, that triggers the waypoint event.            // 114
				options: Options object that was passed to the waypoint fn function.                  // 115
			*/                                                                                     // 116
			'waypoints': [],                                                                       // 117
			                                                                                       // 118
			didScroll: false,                                                                      // 119
			didResize: false,                                                                      // 120
	                                                                                         // 121
			doScroll: $.proxy(function() {                                                         // 122
				var newScroll = this.element.scrollTop(),                                             // 123
				                                                                                      // 124
				// Are we scrolling up or down? Used for direction argument in callback.              // 125
				isDown = newScroll > this.oldScroll,                                                  // 126
				that = this,                                                                          // 127
                                                                                          // 128
				// Get a list of all waypoints that were crossed since last scroll move.              // 129
				pointsHit = $.grep(this.waypoints, function(el, i) {                                  // 130
					return isDown ?                                                                      // 131
						(el.offset > that.oldScroll && el.offset <= newScroll) :                            // 132
						(el.offset <= that.oldScroll && el.offset > newScroll);                             // 133
				}),                                                                                   // 134
				len = pointsHit.length;                                                               // 135
				                                                                                      // 136
				// iOS adjustment                                                                     // 137
				if (!this.oldScroll || !newScroll) {                                                  // 138
					$[wps]('refresh');                                                                   // 139
				}                                                                                     // 140
                                                                                          // 141
				// Done with scroll comparisons, store new scroll before ejection                     // 142
				this.oldScroll = newScroll;                                                           // 143
                                                                                          // 144
				// No waypoints crossed? Eject.                                                       // 145
				if (!len) return;                                                                     // 146
                                                                                          // 147
				// If several waypoints triggered, need to do so in reverse order going up            // 148
				if (!isDown) pointsHit.reverse();                                                     // 149
                                                                                          // 150
				/*                                                                                    // 151
				One scroll move may cross several waypoints.  If the waypoint's continuous            // 152
				option is true it should fire even if it isn't the last waypoint.  If false,          // 153
				it will only fire if it's the last one.                                               // 154
				*/                                                                                    // 155
				$.each(pointsHit, function(i, point) {                                                // 156
					if (point.options.continuous || i === len - 1) {                                     // 157
						triggerWaypoint(point, [isDown ? 'down' : 'up']);                                   // 158
					}                                                                                    // 159
				});                                                                                   // 160
			}, this)                                                                               // 161
		});                                                                                     // 162
		                                                                                        // 163
		// Setup scroll and resize handlers.  Throttled at the settings-defined rate limits.    // 164
		$(context).bind('scroll.waypoints', $.proxy(function() {                                // 165
			if (!this.didScroll) {                                                                 // 166
				this.didScroll = true;                                                                // 167
				window.setTimeout($.proxy(function() {                                                // 168
					this.doScroll();                                                                     // 169
					this.didScroll = false;                                                              // 170
				}, this), $[wps].settings.scrollThrottle);                                            // 171
			}                                                                                      // 172
		}, this)).bind('resize.waypoints', $.proxy(function() {                                 // 173
			if (!this.didResize) {                                                                 // 174
				this.didResize = true;                                                                // 175
				window.setTimeout($.proxy(function() {                                                // 176
					$[wps]('refresh');                                                                   // 177
					this.didResize = false;                                                              // 178
				}, this), $[wps].settings.resizeThrottle);                                            // 179
			}                                                                                      // 180
		}, this));                                                                              // 181
		                                                                                        // 182
		$w.load($.proxy(function() {                                                            // 183
			/*                                                                                     // 184
			Fire a scroll check, should the page be loaded at a non-zero scroll value,             // 185
			as with a fragment id link or a page refresh.                                          // 186
			*/                                                                                     // 187
			this.doScroll();                                                                       // 188
		}, this));                                                                              // 189
	},                                                                                       // 190
	                                                                                         // 191
	/* Returns a Context object from the contexts array, given the raw HTML element          // 192
	for that context. */                                                                     // 193
	getContextByElement = function(element) {                                                // 194
		var found = null;                                                                       // 195
		                                                                                        // 196
		$.each(contexts, function(i, c) {                                                       // 197
			if (c.element[0] === element) {                                                        // 198
				found = c;                                                                            // 199
				return false;                                                                         // 200
			}                                                                                      // 201
		});                                                                                     // 202
		                                                                                        // 203
		return found;                                                                           // 204
	},                                                                                       // 205
	                                                                                         // 206
	// Methods exposed to the effin' object                                                  // 207
	methods = {                                                                              // 208
		/*                                                                                      // 209
		jQuery.fn.waypoint([handler], [options])                                                // 210
		                                                                                        // 211
		handler                                                                                 // 212
			function, optional                                                                     // 213
			A callback function called when the user scrolls past the element.                     // 214
			The function signature is function(event, direction) where event is                    // 215
			a standard jQuery Event Object and direction is a string, either 'down'                // 216
			or 'up' indicating which direction the user is scrolling.                              // 217
			                                                                                       // 218
		options                                                                                 // 219
			object, optional                                                                       // 220
			A map of options to apply to this set of waypoints, including where on                 // 221
			the browser window the waypoint is triggered. For a full list of                       // 222
			options and their defaults, see $.fn.waypoint.defaults.                                // 223
			                                                                                       // 224
		This is how you register an element as a waypoint. When the user scrolls past           // 225
		that element it triggers waypoint.reached, a custom event. Since the                    // 226
		parameters for creating a waypoint are optional, we have a few different                // 227
		possible signatures. Let’s look at each of them.                                        // 228
                                                                                          // 229
		someElements.waypoint();                                                                // 230
			                                                                                       // 231
		Calling .waypoint with no parameters will register the elements as waypoints            // 232
		using the default options. The elements will fire the waypoint.reached event,           // 233
		but calling it in this way does not bind any handler to the event. You can              // 234
		bind to the event yourself, as with any other event, like so:                           // 235
                                                                                          // 236
		someElements.bind('waypoint.reached', function(event, direction) {                      // 237
		   // make it rain                                                                      // 238
		});                                                                                     // 239
			                                                                                       // 240
		You will usually want to create a waypoint and immediately bind a function to           // 241
		waypoint.reached, and can do so by passing a handler as the first argument to           // 242
		.waypoint:                                                                              // 243
                                                                                          // 244
		someElements.waypoint(function(event, direction) {                                      // 245
		   if (direction === 'down') {                                                          // 246
		      // do this on the way down                                                        // 247
		   }                                                                                    // 248
		   else {                                                                               // 249
		      // do this on the way back up through the waypoint                                // 250
		   }                                                                                    // 251
		});                                                                                     // 252
			                                                                                       // 253
		This will still use the default options, which will trigger the waypoint when           // 254
		the top of the element hits the top of the window. We can pass .waypoint an             // 255
		options object to customize things:                                                     // 256
                                                                                          // 257
		someElements.waypoint(function(event, direction) {                                      // 258
		   // do something amazing                                                              // 259
		}, {                                                                                    // 260
		   offset: '50%'  // middle of the page                                                 // 261
		});                                                                                     // 262
			                                                                                       // 263
		You can also pass just an options object.                                               // 264
                                                                                          // 265
		someElements.waypoint({                                                                 // 266
		   offset: 100  // 100px from the top                                                   // 267
		});                                                                                     // 268
			                                                                                       // 269
		This behaves like .waypoint(), in that it registers the elements as waypoints           // 270
		but binds no event handlers.                                                            // 271
                                                                                          // 272
		Calling .waypoint on an existing waypoint will extend the previous options.             // 273
		If the call includes a handler, it will be bound to waypoint.reached without            // 274
		unbinding any other handlers.                                                           // 275
		*/                                                                                      // 276
		init: function(f, options) {                                                            // 277
			// Register each element as a waypoint, add to array.                                  // 278
			this.each(function() {                                                                 // 279
				var cElement = $.fn[wp].defaults.context,                                             // 280
				context,                                                                              // 281
				$this = $(this);                                                                      // 282
                                                                                          // 283
				// Default window context or a specific element?                                      // 284
				if (options && options.context) {                                                     // 285
					cElement = options.context;                                                          // 286
				}                                                                                     // 287
                                                                                          // 288
				// Find the closest element that matches the context                                  // 289
				if (!$.isWindow(cElement)) {                                                          // 290
					cElement = $this.closest(cElement)[0];                                               // 291
				}                                                                                     // 292
				context = getContextByElement(cElement);                                              // 293
                                                                                          // 294
				// Not a context yet? Create and push.                                                // 295
				if (!context) {                                                                       // 296
					context = new Context(cElement);                                                     // 297
					contexts.push(context);                                                              // 298
				}                                                                                     // 299
				                                                                                      // 300
				// Extend default and preexisting options                                             // 301
				var ndx = waypointIndex($this, context),                                              // 302
				base = ndx < 0 ? $.fn[wp].defaults : context.waypoints[ndx].options,                  // 303
				opts = $.extend({}, base, options);                                                   // 304
				                                                                                      // 305
				// Offset aliases                                                                     // 306
				opts.offset = opts.offset === "bottom-in-view" ?                                      // 307
					function() {                                                                         // 308
						var cHeight = $.isWindow(cElement) ? $[wps]('viewportHeight')                       // 309
							: $(cElement).height();                                                            // 310
						return cHeight - $(this).outerHeight();                                             // 311
					} : opts.offset;                                                                     // 312
                                                                                          // 313
				// Update, or create new waypoint                                                     // 314
				if (ndx < 0) {                                                                        // 315
					context.waypoints.push({                                                             // 316
						'element': $this,                                                                   // 317
						'offset': null,                                                                     // 318
						'options': opts                                                                     // 319
					});                                                                                  // 320
				}                                                                                     // 321
				else {                                                                                // 322
					context.waypoints[ndx].options = opts;                                               // 323
				}                                                                                     // 324
				                                                                                      // 325
				// Bind the function if it was passed in.                                             // 326
				if (f) {                                                                              // 327
					$this.bind(eventName, f);                                                            // 328
				}                                                                                     // 329
				// Bind the function in the handler option if it exists.                              // 330
				if (options && options.handler) {                                                     // 331
					$this.bind(eventName, options.handler);                                              // 332
				}                                                                                     // 333
			});                                                                                    // 334
			                                                                                       // 335
			// Need to re-sort+refresh the waypoints array after new elements are added.           // 336
			$[wps]('refresh');                                                                     // 337
			                                                                                       // 338
			return this;                                                                           // 339
		},                                                                                      // 340
		                                                                                        // 341
		                                                                                        // 342
		/*                                                                                      // 343
		jQuery.fn.waypoint('remove')                                                            // 344
		                                                                                        // 345
		Passing the string 'remove' to .waypoint unregisters the elements as waypoints          // 346
		and wipes any custom options, but leaves the waypoint.reached events bound.             // 347
		Calling .waypoint again in the future would reregister the waypoint and the old         // 348
		handlers would continue to work.                                                        // 349
		*/                                                                                      // 350
		remove: function() {                                                                    // 351
			return this.each(function(i, el) {                                                     // 352
				var $el = $(el);                                                                      // 353
				                                                                                      // 354
				$.each(contexts, function(i, c) {                                                     // 355
					var ndx = waypointIndex($el, c);                                                     // 356
                                                                                          // 357
					if (ndx >= 0) {                                                                      // 358
						c.waypoints.splice(ndx, 1);                                                         // 359
                                                                                          // 360
						if (!c.waypoints.length) {                                                          // 361
							c.element.unbind('scroll.waypoints resize.waypoints');                             // 362
							contexts.splice(i, 1);                                                             // 363
						}                                                                                   // 364
					}                                                                                    // 365
				});                                                                                   // 366
			});                                                                                    // 367
		},                                                                                      // 368
		                                                                                        // 369
		/*                                                                                      // 370
		jQuery.fn.waypoint('destroy')                                                           // 371
		                                                                                        // 372
		Passing the string 'destroy' to .waypoint will unbind all waypoint.reached              // 373
		event handlers on those elements and unregisters them as waypoints.                     // 374
		*/                                                                                      // 375
		destroy: function() {                                                                   // 376
			return this.unbind(eventName)[wp]('remove');                                           // 377
		}                                                                                       // 378
	},                                                                                       // 379
	                                                                                         // 380
	/*                                                                                       // 381
	Methods used by the jQuery object extension.                                             // 382
	*/                                                                                       // 383
	jQMethods = {                                                                            // 384
		                                                                                        // 385
		/*                                                                                      // 386
		jQuery.waypoints('refresh')                                                             // 387
		                                                                                        // 388
		This will force a recalculation of each waypoint’s trigger point based on               // 389
		its offset option and context. This is called automatically whenever the window         // 390
		(or other defined context) is resized, new waypoints are added, or a waypoint’s         // 391
		options are modified. If your project is changing the DOM or page layout without        // 392
		doing one of these things, you may want to manually call this refresh.                  // 393
		*/                                                                                      // 394
		refresh: function() {                                                                   // 395
			$.each(contexts, function(i, c) {                                                      // 396
				var isWin = $.isWindow(c.element[0]),                                                 // 397
				contextOffset = isWin ? 0 : c.element.offset().top,                                   // 398
				contextHeight = isWin ? $[wps]('viewportHeight') : c.element.height(),                // 399
				contextScroll = isWin ? 0 : c.element.scrollTop();                                    // 400
				                                                                                      // 401
				$.each(c.waypoints, function(j, o) {                                                  // 402
					/* $.each isn't safe from element removal due to triggerOnce.                        // 403
					Should rewrite the loop but this is way easier. */                                   // 404
					if (!o) return;                                                                      // 405
                                                                                          // 406
					// Adjustment is just the offset if it's a px value                                  // 407
					var adjustment = o.options.offset,                                                   // 408
					oldOffset = o.offset;                                                                // 409
					                                                                                     // 410
					// Set adjustment to the return value if offset is a function.                       // 411
					if (typeof o.options.offset === "function") {                                        // 412
						adjustment = o.options.offset.apply(o.element);                                     // 413
					}                                                                                    // 414
					// Calculate the adjustment if offset is a percentage.                               // 415
					else if (typeof o.options.offset === "string") {                                     // 416
						var amount = parseFloat(o.options.offset);                                          // 417
						adjustment = o.options.offset.indexOf("%") ?                                        // 418
							Math.ceil(contextHeight * (amount / 100)) : amount;                                // 419
					}                                                                                    // 420
                                                                                          // 421
					/*                                                                                   // 422
					Set the element offset to the window scroll offset, less                             // 423
					all our adjustments.                                                                 // 424
					*/                                                                                   // 425
					o.offset = o.element.offset().top - contextOffset                                    // 426
						+ contextScroll - adjustment;                                                       // 427
                                                                                          // 428
					/*                                                                                   // 429
					An element offset change across the current scroll point triggers                    // 430
					the event, just as if we scrolled past it unless prevented by an                     // 431
					optional flag.                                                                       // 432
					*/                                                                                   // 433
					if (o.options.onlyOnScroll) return;                                                  // 434
                                                                                          // 435
					if (oldOffset !== null && c.oldScroll > oldOffset && c.oldScroll <= o.offset) {      // 436
						triggerWaypoint(o, ['up']);                                                         // 437
					}                                                                                    // 438
					else if (oldOffset !== null && c.oldScroll < oldOffset && c.oldScroll >= o.offset) { // 439
						triggerWaypoint(o, ['down']);                                                       // 440
					}                                                                                    // 441
					/* For new waypoints added after load, check that down should have                   // 442
					already been triggered */                                                            // 443
					else if (!oldOffset && c.element.scrollTop() > o.offset) {                           // 444
						triggerWaypoint(o, ['down']);                                                       // 445
					}                                                                                    // 446
				});                                                                                   // 447
				                                                                                      // 448
				// Keep waypoints sorted by offset value.                                             // 449
				c.waypoints.sort(function(a, b) {                                                     // 450
					return a.offset - b.offset;                                                          // 451
				});                                                                                   // 452
			});                                                                                    // 453
		},                                                                                      // 454
		                                                                                        // 455
		                                                                                        // 456
		/*                                                                                      // 457
		jQuery.waypoints('viewportHeight')                                                      // 458
		                                                                                        // 459
		This will return the height of the viewport, adjusting for inconsistencies              // 460
		that come with calling $(window).height() in iOS. Recommended for use                   // 461
		within any offset functions.                                                            // 462
		*/                                                                                      // 463
		viewportHeight: function() {                                                            // 464
			return (window.innerHeight ? window.innerHeight : $w.height());                        // 465
		},                                                                                      // 466
		                                                                                        // 467
		                                                                                        // 468
		/*                                                                                      // 469
		jQuery.waypoints()                                                                      // 470
		                                                                                        // 471
		This will return a jQuery object with a collection of all registered waypoint           // 472
		elements.                                                                               // 473
                                                                                          // 474
		$('.post').waypoint();                                                                  // 475
		$('.ad-unit').waypoint(function(event, direction) {                                     // 476
		   // Passed an ad unit                                                                 // 477
		});                                                                                     // 478
		console.log($.waypoints());                                                             // 479
		                                                                                        // 480
		The example above would log a jQuery object containing all .post and .ad-unit           // 481
		elements.                                                                               // 482
		*/                                                                                      // 483
		aggregate: function() {                                                                 // 484
			var points = $();                                                                      // 485
			$.each(contexts, function(i, c) {                                                      // 486
				$.each(c.waypoints, function(i, e) {                                                  // 487
					points = points.add(e.element);                                                      // 488
				});                                                                                   // 489
			});                                                                                    // 490
			return points;                                                                         // 491
		}                                                                                       // 492
	};                                                                                       // 493
                                                                                          // 494
	                                                                                         // 495
	/*                                                                                       // 496
	fn extension.  Delegates to appropriate method.                                          // 497
	*/                                                                                       // 498
	$.fn[wp] = function(method) {                                                            // 499
		                                                                                        // 500
		if (methods[method]) {                                                                  // 501
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));          // 502
		}                                                                                       // 503
		else if (typeof method === "function" || !method) {                                     // 504
			return methods.init.apply(this, arguments);                                            // 505
		}                                                                                       // 506
		else if (typeof method === "object") {                                                  // 507
			return methods.init.apply(this, [null, method]);                                       // 508
		}                                                                                       // 509
		else {                                                                                  // 510
			$.error( 'Method ' + method + ' does not exist on jQuery ' + wp );                     // 511
		}                                                                                       // 512
	};                                                                                       // 513
	                                                                                         // 514
	                                                                                         // 515
	/*                                                                                       // 516
	The default options object that is extended when calling .waypoint. It has the           // 517
	following properties:                                                                    // 518
	                                                                                         // 519
	context                                                                                  // 520
		string | element | jQuery*                                                              // 521
		default: window                                                                         // 522
		The context defines which scrollable element the waypoint belongs to and acts           // 523
		within. The default, window, means the waypoint offset is calculated with relation      // 524
		to the whole viewport.  You can set this to another element to use the waypoints        // 525
		within that element.  Accepts a selector string, *but if you use jQuery 1.6+ it         // 526
		also accepts a raw HTML element or jQuery object.                                       // 527
	                                                                                         // 528
	continuous                                                                               // 529
		boolean                                                                                 // 530
		default: true                                                                           // 531
		If true, and multiple waypoints are triggered in one scroll, this waypoint will         // 532
		trigger even if it is not the last waypoint reached.  If false, it will only            // 533
		trigger if it is the last waypoint.                                                     // 534
		                                                                                        // 535
	handler                                                                                  // 536
		function                                                                                // 537
		default: undefined                                                                      // 538
		An alternative way to bind functions to the waypoint, without using the function        // 539
		as the first argument to the waypoint function.                                         // 540
                                                                                          // 541
	offset                                                                                   // 542
		number | string | function                                                              // 543
		default: 0                                                                              // 544
		Determines how far the top of the element must be from the top of the browser           // 545
		window to trigger a waypoint. It can be a number, which is taken as a number            // 546
		of pixels, a string representing a percentage of the viewport height, or a              // 547
		function that will return a number of pixels.                                           // 548
		                                                                                        // 549
	onlyOnScroll                                                                             // 550
		boolean                                                                                 // 551
		default: false                                                                          // 552
		If true, this waypoint will not trigger if an offset change during a refresh            // 553
		causes it to pass the current scroll point.                                             // 554
		                                                                                        // 555
	triggerOnce                                                                              // 556
		boolean                                                                                 // 557
		default: false                                                                          // 558
		If true, the waypoint will be destroyed when triggered.                                 // 559
	                                                                                         // 560
	An offset of 250 would trigger the waypoint when the top of the element is 250px         // 561
	from the top of the viewport. Negative values for any offset work as you might           // 562
	expect. A value of -100 would trigger the waypoint when the element is 100px above       // 563
	the top of the window.                                                                   // 564
                                                                                          // 565
	offset: '100%'                                                                           // 566
	                                                                                         // 567
	A string percentage will determine the pixel offset based on the height of the           // 568
	window. When resizing the window, this offset will automatically be recalculated         // 569
	without needing to call $.waypoints('refresh').                                          // 570
                                                                                          // 571
	// The bottom of the element is in view                                                  // 572
	offset: function() {                                                                     // 573
	   return $.waypoints('viewportHeight') - $(this).outerHeight();                         // 574
	}                                                                                        // 575
	                                                                                         // 576
	Offset can take a function, which must return a number of pixels from the top of         // 577
	the window. The this value will always refer to the raw HTML element of the              // 578
	waypoint. As with % values, functions are recalculated automatically when the            // 579
	window resizes. For more on recalculating offsets, see $.waypoints('refresh').           // 580
	                                                                                         // 581
	An offset value of 'bottom-in-view' will act as an alias for the function in the         // 582
	example above, as this is a common usage.                                                // 583
	                                                                                         // 584
	offset: 'bottom-in-view'                                                                 // 585
	                                                                                         // 586
	You can see this alias in use on the Scroll Analytics example page.                      // 587
                                                                                          // 588
	The triggerOnce flag, if true, will destroy the waypoint after the first trigger.        // 589
	This is just a shortcut for calling .waypoint('destroy') within the waypoint             // 590
	handler. This is useful in situations such as scroll analytics, where you only           // 591
	want to record an event once for each page visit.                                        // 592
	                                                                                         // 593
	The context option lets you use Waypoints within an element other than the window.       // 594
	You can define the context with a selector string and the waypoint will act within       // 595
	the nearest ancestor that matches this selector.                                         // 596
	                                                                                         // 597
	$('.something-scrollable .waypoint').waypoint({                                          // 598
	   context: '.something-scrollable'                                                      // 599
	});                                                                                      // 600
	                                                                                         // 601
	You can see this in action on the Dial Controls example.                                 // 602
	                                                                                         // 603
	The handler option gives authors an alternative way to bind functions when               // 604
	creating a waypoint.  In place of:                                                       // 605
	                                                                                         // 606
	$('.item').waypoint(function(event, direction) {                                         // 607
	   // make things happen                                                                 // 608
	});                                                                                      // 609
	                                                                                         // 610
	You may instead write:                                                                   // 611
	                                                                                         // 612
	$('.item').waypoint({                                                                    // 613
	   handler: function(event, direction) {                                                 // 614
	      // make things happen                                                              // 615
	   }                                                                                     // 616
	});                                                                                      // 617
	                                                                                         // 618
	*/                                                                                       // 619
	$.fn[wp].defaults = {                                                                    // 620
		continuous: true,                                                                       // 621
		offset: 0,                                                                              // 622
		triggerOnce: false,                                                                     // 623
		context: window                                                                         // 624
	};                                                                                       // 625
	                                                                                         // 626
	                                                                                         // 627
	                                                                                         // 628
	                                                                                         // 629
	                                                                                         // 630
	/*                                                                                       // 631
	jQuery object extension. Delegates to appropriate methods above.                         // 632
	*/                                                                                       // 633
	$[wps] = function(method) {                                                              // 634
		if (jQMethods[method]) {                                                                // 635
			return jQMethods[method].apply(this);                                                  // 636
		}                                                                                       // 637
		else {                                                                                  // 638
			return jQMethods['aggregate']();                                                       // 639
		}                                                                                       // 640
	};                                                                                       // 641
	                                                                                         // 642
	                                                                                         // 643
	/*                                                                                       // 644
	$.waypoints.settings                                                                     // 645
	                                                                                         // 646
	Settings object that determines some of the plugin’s behavior.                           // 647
		                                                                                        // 648
	resizeThrottle                                                                           // 649
		number                                                                                  // 650
		default: 200                                                                            // 651
		For performance reasons, the refresh performed during resizes is                        // 652
		throttled. This value is the rate-limit in milliseconds between resize                  // 653
		refreshes. For more information on throttling, check out Ben Alman’s                    // 654
		throttle / debounce plugin.                                                             // 655
		http://benalman.com/projects/jquery-throttle-debounce-plugin/                           // 656
		                                                                                        // 657
	scrollThrottle                                                                           // 658
		number                                                                                  // 659
		default: 100                                                                            // 660
		For performance reasons, checking for any crossed waypoints during a                    // 661
		scroll event is throttled. This value is the rate-limit in milliseconds                 // 662
		between scroll checks. For more information on throttling, check out Ben                // 663
		Alman’s throttle / debounce plugin.                                                     // 664
		http://benalman.com/projects/jquery-throttle-debounce-plugin/                           // 665
	*/                                                                                       // 666
	$[wps].settings = {                                                                      // 667
		resizeThrottle: 200,                                                                    // 668
		scrollThrottle: 100                                                                     // 669
	};                                                                                       // 670
	                                                                                         // 671
	$w.load(function() {                                                                     // 672
		// Calculate everything once on load.                                                   // 673
		$[wps]('refresh');                                                                      // 674
	});                                                                                      // 675
})(jQuery, 'waypoint', 'waypoints', window);                                              // 676
                                                                                          // 677
////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['jquery-waypoints'] = {};

})();

//# sourceMappingURL=ff17b079af2317d216fed13e9a4043b8b1d40d5f.map
