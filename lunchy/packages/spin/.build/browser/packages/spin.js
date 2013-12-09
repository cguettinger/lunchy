(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages\spin\lib\spin.js                                                                                    //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
//fgnass.github.com/spin.js#v1.3                                                                                // 1
                                                                                                                // 2
/**                                                                                                             // 3
 * Copyright (c) 2011-2013 Felix Gnass                                                                          // 4
 * Licensed under the MIT license                                                                               // 5
 */                                                                                                             // 6
(function(root, factory) {                                                                                      // 7
                                                                                                                // 8
  /* CommonJS */                                                                                                // 9
  if (typeof exports == 'object')  module.exports = factory()                                                   // 10
                                                                                                                // 11
  /* AMD module */                                                                                              // 12
  else if (typeof define == 'function' && define.amd) define(factory)                                           // 13
                                                                                                                // 14
  /* Browser global */                                                                                          // 15
  else root.Spinner = factory()                                                                                 // 16
}                                                                                                               // 17
(this, function() {                                                                                             // 18
  "use strict";                                                                                                 // 19
                                                                                                                // 20
  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */                                             // 21
    , animations = {} /* Animation rules keyed by their name */                                                 // 22
    , useCssAnimations /* Whether to use CSS animations or setTimeout */                                        // 23
                                                                                                                // 24
  /**                                                                                                           // 25
   * Utility function to create elements. If no tag name is given,                                              // 26
   * a DIV is created. Optionally properties can be passed.                                                     // 27
   */                                                                                                           // 28
  function createEl(tag, prop) {                                                                                // 29
    var el = document.createElement(tag || 'div')                                                               // 30
      , n                                                                                                       // 31
                                                                                                                // 32
    for(n in prop) el[n] = prop[n]                                                                              // 33
    return el                                                                                                   // 34
  }                                                                                                             // 35
                                                                                                                // 36
  /**                                                                                                           // 37
   * Appends children and returns the parent.                                                                   // 38
   */                                                                                                           // 39
  function ins(parent /* child1, child2, ...*/) {                                                               // 40
    for (var i=1, n=arguments.length; i<n; i++)                                                                 // 41
      parent.appendChild(arguments[i])                                                                          // 42
                                                                                                                // 43
    return parent                                                                                               // 44
  }                                                                                                             // 45
                                                                                                                // 46
  /**                                                                                                           // 47
   * Insert a new stylesheet to hold the @keyframe or VML rules.                                                // 48
   */                                                                                                           // 49
  var sheet = (function() {                                                                                     // 50
    var el = createEl('style', {type : 'text/css'})                                                             // 51
    ins(document.getElementsByTagName('head')[0], el)                                                           // 52
    return el.sheet || el.styleSheet                                                                            // 53
  }())                                                                                                          // 54
                                                                                                                // 55
  /**                                                                                                           // 56
   * Creates an opacity keyframe animation rule and returns its name.                                           // 57
   * Since most mobile Webkits have timing issues with animation-delay,                                         // 58
   * we create separate rules for each line/segment.                                                            // 59
   */                                                                                                           // 60
  function addAnimation(alpha, trail, i, lines) {                                                               // 61
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-')                                            // 62
      , start = 0.01 + i/lines * 100                                                                            // 63
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)                                                // 64
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()             // 65
      , pre = prefix && '-' + prefix + '-' || ''                                                                // 66
                                                                                                                // 67
    if (!animations[name]) {                                                                                    // 68
      sheet.insertRule(                                                                                         // 69
        '@' + pre + 'keyframes ' + name + '{' +                                                                 // 70
        '0%{opacity:' + z + '}' +                                                                               // 71
        start + '%{opacity:' + alpha + '}' +                                                                    // 72
        (start+0.01) + '%{opacity:1}' +                                                                         // 73
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +                                                      // 74
        '100%{opacity:' + z + '}' +                                                                             // 75
        '}', sheet.cssRules.length)                                                                             // 76
                                                                                                                // 77
      animations[name] = 1                                                                                      // 78
    }                                                                                                           // 79
                                                                                                                // 80
    return name                                                                                                 // 81
  }                                                                                                             // 82
                                                                                                                // 83
  /**                                                                                                           // 84
   * Tries various vendor prefixes and returns the first supported property.                                    // 85
   */                                                                                                           // 86
  function vendor(el, prop) {                                                                                   // 87
    var s = el.style                                                                                            // 88
      , pp                                                                                                      // 89
      , i                                                                                                       // 90
                                                                                                                // 91
    if(s[prop] !== undefined) return prop                                                                       // 92
    prop = prop.charAt(0).toUpperCase() + prop.slice(1)                                                         // 93
    for(i=0; i<prefixes.length; i++) {                                                                          // 94
      pp = prefixes[i]+prop                                                                                     // 95
      if(s[pp] !== undefined) return pp                                                                         // 96
    }                                                                                                           // 97
  }                                                                                                             // 98
                                                                                                                // 99
  /**                                                                                                           // 100
   * Sets multiple style properties at once.                                                                    // 101
   */                                                                                                           // 102
  function css(el, prop) {                                                                                      // 103
    for (var n in prop)                                                                                         // 104
      el.style[vendor(el, n)||n] = prop[n]                                                                      // 105
                                                                                                                // 106
    return el                                                                                                   // 107
  }                                                                                                             // 108
                                                                                                                // 109
  /**                                                                                                           // 110
   * Fills in default values.                                                                                   // 111
   */                                                                                                           // 112
  function merge(obj) {                                                                                         // 113
    for (var i=1; i < arguments.length; i++) {                                                                  // 114
      var def = arguments[i]                                                                                    // 115
      for (var n in def)                                                                                        // 116
        if (obj[n] === undefined) obj[n] = def[n]                                                               // 117
    }                                                                                                           // 118
    return obj                                                                                                  // 119
  }                                                                                                             // 120
                                                                                                                // 121
  /**                                                                                                           // 122
   * Returns the absolute page-offset of the given element.                                                     // 123
   */                                                                                                           // 124
  function pos(el) {                                                                                            // 125
    var o = { x:el.offsetLeft, y:el.offsetTop }                                                                 // 126
    while((el = el.offsetParent))                                                                               // 127
      o.x+=el.offsetLeft, o.y+=el.offsetTop                                                                     // 128
                                                                                                                // 129
    return o                                                                                                    // 130
  }                                                                                                             // 131
                                                                                                                // 132
  // Built-in defaults                                                                                          // 133
                                                                                                                // 134
  var defaults = {                                                                                              // 135
    lines: 12,            // The number of lines to draw                                                        // 136
    length: 7,            // The length of each line                                                            // 137
    width: 5,             // The line thickness                                                                 // 138
    radius: 10,           // The radius of the inner circle                                                     // 139
    rotate: 0,            // Rotation offset                                                                    // 140
    corners: 1,           // Roundness (0..1)                                                                   // 141
    color: '#000',        // #rgb or #rrggbb                                                                    // 142
    direction: 1,         // 1: clockwise, -1: counterclockwise                                                 // 143
    speed: 1,             // Rounds per second                                                                  // 144
    trail: 100,           // Afterglow percentage                                                               // 145
    opacity: 1/4,         // Opacity of the lines                                                               // 146
    fps: 20,              // Frames per second when using setTimeout()                                          // 147
    zIndex: 2e9,          // Use a high z-index by default                                                      // 148
    className: 'spinner', // CSS class to assign to the element                                                 // 149
    top: 'auto',          // center vertically                                                                  // 150
    left: 'auto',         // center horizontally                                                                // 151
    position: 'relative'  // element position                                                                   // 152
  }                                                                                                             // 153
                                                                                                                // 154
  /** The constructor */                                                                                        // 155
  function Spinner(o) {                                                                                         // 156
    if (typeof this == 'undefined') return new Spinner(o)                                                       // 157
    this.opts = merge(o || {}, Spinner.defaults, defaults)                                                      // 158
  }                                                                                                             // 159
                                                                                                                // 160
  // Global defaults that override the built-ins:                                                               // 161
  Spinner.defaults = {}                                                                                         // 162
                                                                                                                // 163
  merge(Spinner.prototype, {                                                                                    // 164
                                                                                                                // 165
    /**                                                                                                         // 166
     * Adds the spinner to the given target element. If this instance is already                                // 167
     * spinning, it is automatically removed from its previous target b calling                                 // 168
     * stop() internally.                                                                                       // 169
     */                                                                                                         // 170
    spin: function(target) {                                                                                    // 171
      this.stop()                                                                                               // 172
                                                                                                                // 173
      var self = this                                                                                           // 174
        , o = self.opts                                                                                         // 175
        , el = self.el = css(createEl(0, {className: o.className}), {position: o.position, width: 0, zIndex: o.zIndex})
        , mid = o.radius+o.length+o.width                                                                       // 177
        , ep // element position                                                                                // 178
        , tp // target position                                                                                 // 179
                                                                                                                // 180
      if (target) {                                                                                             // 181
        target.insertBefore(el, target.firstChild||null)                                                        // 182
        tp = pos(target)                                                                                        // 183
        ep = pos(el)                                                                                            // 184
        css(el, {                                                                                               // 185
          left: (o.left == 'auto' ? tp.x-ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + 'px', // 186
          top: (o.top == 'auto' ? tp.y-ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid)  + 'px'   // 187
        })                                                                                                      // 188
      }                                                                                                         // 189
                                                                                                                // 190
      el.setAttribute('role', 'progressbar')                                                                    // 191
      self.lines(el, self.opts)                                                                                 // 192
                                                                                                                // 193
      if (!useCssAnimations) {                                                                                  // 194
        // No CSS animation support, use setTimeout() instead                                                   // 195
        var i = 0                                                                                               // 196
          , start = (o.lines - 1) * (1 - o.direction) / 2                                                       // 197
          , alpha                                                                                               // 198
          , fps = o.fps                                                                                         // 199
          , f = fps/o.speed                                                                                     // 200
          , ostep = (1-o.opacity) / (f*o.trail / 100)                                                           // 201
          , astep = f/o.lines                                                                                   // 202
                                                                                                                // 203
        ;(function anim() {                                                                                     // 204
          i++;                                                                                                  // 205
          for (var j = 0; j < o.lines; j++) {                                                                   // 206
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)                            // 207
                                                                                                                // 208
            self.opacity(el, j * o.direction + start, alpha, o)                                                 // 209
          }                                                                                                     // 210
          self.timeout = self.el && setTimeout(anim, ~~(1000/fps))                                              // 211
        })()                                                                                                    // 212
      }                                                                                                         // 213
      return self                                                                                               // 214
    },                                                                                                          // 215
                                                                                                                // 216
    /**                                                                                                         // 217
     * Stops and removes the Spinner.                                                                           // 218
     */                                                                                                         // 219
    stop: function() {                                                                                          // 220
      var el = this.el                                                                                          // 221
      if (el) {                                                                                                 // 222
        clearTimeout(this.timeout)                                                                              // 223
        if (el.parentNode) el.parentNode.removeChild(el)                                                        // 224
        this.el = undefined                                                                                     // 225
      }                                                                                                         // 226
      return this                                                                                               // 227
    },                                                                                                          // 228
                                                                                                                // 229
    /**                                                                                                         // 230
     * Internal method that draws the individual lines. Will be overwritten                                     // 231
     * in VML fallback mode below.                                                                              // 232
     */                                                                                                         // 233
    lines: function(el, o) {                                                                                    // 234
      var i = 0                                                                                                 // 235
        , start = (o.lines - 1) * (1 - o.direction) / 2                                                         // 236
        , seg                                                                                                   // 237
                                                                                                                // 238
      function fill(color, shadow) {                                                                            // 239
        return css(createEl(), {                                                                                // 240
          position: 'absolute',                                                                                 // 241
          width: (o.length+o.width) + 'px',                                                                     // 242
          height: o.width + 'px',                                                                               // 243
          background: color,                                                                                    // 244
          boxShadow: shadow,                                                                                    // 245
          transformOrigin: 'left',                                                                              // 246
          transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',         // 247
          borderRadius: (o.corners * o.width>>1) + 'px'                                                         // 248
        })                                                                                                      // 249
      }                                                                                                         // 250
                                                                                                                // 251
      for (; i < o.lines; i++) {                                                                                // 252
        seg = css(createEl(), {                                                                                 // 253
          position: 'absolute',                                                                                 // 254
          top: 1+~(o.width/2) + 'px',                                                                           // 255
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',                                                     // 256
          opacity: o.opacity,                                                                                   // 257
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        })                                                                                                      // 259
                                                                                                                // 260
        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}))                           // 261
                                                                                                                // 262
        ins(el, ins(seg, fill(o.color, '0 0 1px rgba(0,0,0,.1)')))                                              // 263
      }                                                                                                         // 264
      return el                                                                                                 // 265
    },                                                                                                          // 266
                                                                                                                // 267
    /**                                                                                                         // 268
     * Internal method that adjusts the opacity of a single line.                                               // 269
     * Will be overwritten in VML fallback mode below.                                                          // 270
     */                                                                                                         // 271
    opacity: function(el, i, val) {                                                                             // 272
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val                                        // 273
    }                                                                                                           // 274
                                                                                                                // 275
  })                                                                                                            // 276
                                                                                                                // 277
                                                                                                                // 278
  function initVML() {                                                                                          // 279
                                                                                                                // 280
    /* Utility function to create a VML tag */                                                                  // 281
    function vml(tag, attr) {                                                                                   // 282
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)             // 283
    }                                                                                                           // 284
                                                                                                                // 285
    // No CSS transforms but VML support, add a CSS rule for VML elements:                                      // 286
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')                                                    // 287
                                                                                                                // 288
    Spinner.prototype.lines = function(el, o) {                                                                 // 289
      var r = o.length+o.width                                                                                  // 290
        , s = 2*r                                                                                               // 291
                                                                                                                // 292
      function grp() {                                                                                          // 293
        return css(                                                                                             // 294
          vml('group', {                                                                                        // 295
            coordsize: s + ' ' + s,                                                                             // 296
            coordorigin: -r + ' ' + -r                                                                          // 297
          }),                                                                                                   // 298
          { width: s, height: s }                                                                               // 299
        )                                                                                                       // 300
      }                                                                                                         // 301
                                                                                                                // 302
      var margin = -(o.width+o.length)*2 + 'px'                                                                 // 303
        , g = css(grp(), {position: 'absolute', top: margin, left: margin})                                     // 304
        , i                                                                                                     // 305
                                                                                                                // 306
      function seg(i, dx, filter) {                                                                             // 307
        ins(g,                                                                                                  // 308
          ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),                                    // 309
            ins(css(vml('roundrect', {arcsize: o.corners}), {                                                   // 310
                width: r,                                                                                       // 311
                height: o.width,                                                                                // 312
                left: o.radius,                                                                                 // 313
                top: -o.width>>1,                                                                               // 314
                filter: filter                                                                                  // 315
              }),                                                                                               // 316
              vml('fill', {color: o.color, opacity: o.opacity}),                                                // 317
              vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change       // 318
            )                                                                                                   // 319
          )                                                                                                     // 320
        )                                                                                                       // 321
      }                                                                                                         // 322
                                                                                                                // 323
      if (o.shadow)                                                                                             // 324
        for (i = 1; i <= o.lines; i++)                                                                          // 325
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')     // 326
                                                                                                                // 327
      for (i = 1; i <= o.lines; i++) seg(i)                                                                     // 328
      return ins(el, g)                                                                                         // 329
    }                                                                                                           // 330
                                                                                                                // 331
    Spinner.prototype.opacity = function(el, i, val, o) {                                                       // 332
      var c = el.firstChild                                                                                     // 333
      o = o.shadow && o.lines || 0                                                                              // 334
      if (c && i+o < c.childNodes.length) {                                                                     // 335
        c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild                                     // 336
        if (c) c.opacity = val                                                                                  // 337
      }                                                                                                         // 338
    }                                                                                                           // 339
  }                                                                                                             // 340
                                                                                                                // 341
  var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})                                           // 342
                                                                                                                // 343
  if (!vendor(probe, 'transform') && probe.adj) initVML()                                                       // 344
  else useCssAnimations = vendor(probe, 'animation')                                                            // 345
                                                                                                                // 346
  return Spinner                                                                                                // 347
                                                                                                                // 348
}));                                                                                                            // 349
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages\spin\lib\template.spinner.js                                                                        //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
Template.__define__("spinner",Package.handlebars.Handlebars.json_ast_to_func(["<div id=\"spinner\"></div>"]));  // 1
                                                                                                                // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages\spin\lib\spinner.js                                                                                 //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
Template.spinner.rendered = function(){                                                                         // 1
  var opts = {                                                                                                  // 2
    lines: 13, // The number of lines to draw                                                                   // 3
    length: 8, // The length of each line                                                                       // 4
    width: 3, // The line thickness                                                                             // 5
    radius: 12, // The radius of the inner circle                                                               // 6
    corners: 1, // Corner roundness (0..1)                                                                      // 7
    rotate: 0, // The rotation offset                                                                           // 8
    direction: 1, // 1: clockwise, -1: counterclockwise                                                         // 9
    color: '#000', // #rgb or #rrggbb                                                                           // 10
    speed: 1.2, // Rounds per second                                                                            // 11
    trail: 60, // Afterglow percentage                                                                          // 12
    shadow: false, // Whether to render a shadow                                                                // 13
    hwaccel: false, // Whether to use hardware acceleration                                                     // 14
    className: 'spinner', // The CSS class to assign to the spinner                                             // 15
    zIndex: 2e9, // The z-index (defaults to 2000000000)                                                        // 16
    top: 'auto', // Top position relative to parent in px                                                       // 17
    left: 'auto' // Left position relative to parent in px                                                      // 18
  };                                                                                                            // 19
  var target = document.getElementById('spinner');                                                              // 20
  var spinner = new Spinner(opts).spin(target);                                                                 // 21
}                                                                                                               // 22
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
