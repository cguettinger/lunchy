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

/* Package-scope variables */
var Showdown;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages\showdown\showdown.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
//                                                                                                                     // 1
// showdown.js -- A javascript port of Markdown.                                                                       // 2
//                                                                                                                     // 3
// Copyright (c) 2007 John Fraser.                                                                                     // 4
//                                                                                                                     // 5
// Original Markdown Copyright (c) 2004-2005 John Gruber                                                               // 6
//   <http://daringfireball.net/projects/markdown/>                                                                    // 7
//                                                                                                                     // 8
// Redistributable under a BSD-style open source license.                                                              // 9
// See license.txt for more information.                                                                               // 10
//                                                                                                                     // 11
// The full source distribution is at:                                                                                 // 12
//                                                                                                                     // 13
//				A A L                                                                                                            // 14
//				T C A                                                                                                            // 15
//				T K B                                                                                                            // 16
//                                                                                                                     // 17
//   <http://www.attacklab.net/>                                                                                       // 18
//                                                                                                                     // 19
                                                                                                                       // 20
//                                                                                                                     // 21
// Wherever possible, Showdown is a straight, line-by-line port                                                        // 22
// of the Perl version of Markdown.                                                                                    // 23
//                                                                                                                     // 24
// This is not a normal parser design; it's basically just a                                                           // 25
// series of string substitutions.  It's hard to read and                                                              // 26
// maintain this way,  but keeping Showdown close to the original                                                      // 27
// design makes it easier to port new features.                                                                        // 28
//                                                                                                                     // 29
// More importantly, Showdown behaves like markdown.pl in most                                                         // 30
// edge cases.  So web applications can do client-side preview                                                         // 31
// in Javascript, and then build identical HTML on the server.                                                         // 32
//                                                                                                                     // 33
// This port needs the new RegExp functionality of ECMA 262,                                                           // 34
// 3rd Edition (i.e. Javascript 1.5).  Most modern web browsers                                                        // 35
// should do fine.  Even with the new regular expression features,                                                     // 36
// We do a lot of work to emulate Perl's regex functionality.                                                          // 37
// The tricky changes in this file mostly have the "attacklab:"                                                        // 38
// label.  Major or self-explanatory changes don't.                                                                    // 39
//                                                                                                                     // 40
// Smart diff tools like Araxis Merge will be able to match up                                                         // 41
// this file with markdown.pl in a useful way.  A little tweaking                                                      // 42
// helps: in a copy of markdown.pl, replace "#" with "//" and                                                          // 43
// replace "$text" with "text".  Be sure to ignore whitespace                                                          // 44
// and line endings.                                                                                                   // 45
//                                                                                                                     // 46
                                                                                                                       // 47
                                                                                                                       // 48
//                                                                                                                     // 49
// Showdown usage:                                                                                                     // 50
//                                                                                                                     // 51
//   var text = "Markdown *rocks*.";                                                                                   // 52
//                                                                                                                     // 53
//   var converter = new Showdown.converter();                                                                         // 54
//   var html = converter.makeHtml(text);                                                                              // 55
//                                                                                                                     // 56
//   alert(html);                                                                                                      // 57
//                                                                                                                     // 58
// Note: move the sample code to the bottom of this                                                                    // 59
// file before uncommenting it.                                                                                        // 60
//                                                                                                                     // 61
                                                                                                                       // 62
                                                                                                                       // 63
//                                                                                                                     // 64
// Showdown namespace                                                                                                  // 65
//                                                                                                                     // 66
// METEOR CHANGE: remove "var" so that this isn't file-local.                                                          // 67
Showdown = {};                                                                                                         // 68
                                                                                                                       // 69
//                                                                                                                     // 70
// converter                                                                                                           // 71
//                                                                                                                     // 72
// Wraps all "globals" so that the only thing                                                                          // 73
// exposed is makeHtml().                                                                                              // 74
//                                                                                                                     // 75
Showdown.converter = function() {                                                                                      // 76
                                                                                                                       // 77
//                                                                                                                     // 78
// Globals:                                                                                                            // 79
//                                                                                                                     // 80
                                                                                                                       // 81
// Global hashes, used by various utility routines                                                                     // 82
var g_urls;                                                                                                            // 83
var g_titles;                                                                                                          // 84
var g_html_blocks;                                                                                                     // 85
                                                                                                                       // 86
// Used to track when we're inside an ordered or unordered list                                                        // 87
// (see _ProcessListItems() for details):                                                                              // 88
var g_list_level = 0;                                                                                                  // 89
                                                                                                                       // 90
                                                                                                                       // 91
this.makeHtml = function(text) {                                                                                       // 92
//                                                                                                                     // 93
// Main function. The order in which other subs are called here is                                                     // 94
// essential. Link and image substitutions need to happen before                                                       // 95
// _EscapeSpecialCharsWithinTagAttributes(), so that any *'s or _'s in the <a>                                         // 96
// and <img> tags get encoded.                                                                                         // 97
//                                                                                                                     // 98
                                                                                                                       // 99
	// Clear the global hashes. If we don't clear these, you get conflicts                                                // 100
	// from other articles when generating a page which contains more than                                                // 101
	// one article (e.g. an index page that shows the N most recent                                                       // 102
	// articles):                                                                                                         // 103
	g_urls = new Array();                                                                                                 // 104
	g_titles = new Array();                                                                                               // 105
	g_html_blocks = new Array();                                                                                          // 106
                                                                                                                       // 107
	// attacklab: Replace ~ with ~T                                                                                       // 108
	// This lets us use tilde as an escape char to avoid md5 hashes                                                       // 109
	// The choice of character is arbitray; anything that isn't                                                           // 110
    // magic in Markdown will work.                                                                                    // 111
	text = text.replace(/~/g,"~T");                                                                                       // 112
                                                                                                                       // 113
	// attacklab: Replace $ with ~D                                                                                       // 114
	// RegExp interprets $ as a special character                                                                         // 115
	// when it's in a replacement string                                                                                  // 116
	text = text.replace(/\$/g,"~D");                                                                                      // 117
                                                                                                                       // 118
	// Standardize line endings                                                                                           // 119
	text = text.replace(/\r\n/g,"\n"); // DOS to Unix                                                                     // 120
	text = text.replace(/\r/g,"\n"); // Mac to Unix                                                                       // 121
                                                                                                                       // 122
	// Make sure text begins and ends with a couple of newlines:                                                          // 123
	text = "\n\n" + text + "\n\n";                                                                                        // 124
                                                                                                                       // 125
	// Convert all tabs to spaces.                                                                                        // 126
	text = _Detab(text);                                                                                                  // 127
                                                                                                                       // 128
	// Strip any lines consisting only of spaces and tabs.                                                                // 129
	// This makes subsequent regexen easier to write, because we can                                                      // 130
	// match consecutive blank lines with /\n+/ instead of something                                                      // 131
	// contorted like /[ \t]*\n+/ .                                                                                       // 132
	text = text.replace(/^[ \t]+$/mg,"");                                                                                 // 133
                                                                                                                       // 134
	// Turn block-level HTML blocks into hash entries                                                                     // 135
	text = _HashHTMLBlocks(text);                                                                                         // 136
                                                                                                                       // 137
	// Strip link definitions, store in hashes.                                                                           // 138
	text = _StripLinkDefinitions(text);                                                                                   // 139
                                                                                                                       // 140
	text = _RunBlockGamut(text);                                                                                          // 141
                                                                                                                       // 142
	text = _UnescapeSpecialChars(text);                                                                                   // 143
                                                                                                                       // 144
	// attacklab: Restore dollar signs                                                                                    // 145
	text = text.replace(/~D/g,"$$");                                                                                      // 146
                                                                                                                       // 147
	// attacklab: Restore tildes                                                                                          // 148
	text = text.replace(/~T/g,"~");                                                                                       // 149
                                                                                                                       // 150
	return text;                                                                                                          // 151
}                                                                                                                      // 152
                                                                                                                       // 153
                                                                                                                       // 154
var _StripLinkDefinitions = function(text) {                                                                           // 155
//                                                                                                                     // 156
// Strips link definitions from text, stores the URLs and titles in                                                    // 157
// hash references.                                                                                                    // 158
//                                                                                                                     // 159
                                                                                                                       // 160
	// Link defs are in the form: ^[id]: url "optional title"                                                             // 161
                                                                                                                       // 162
	/*                                                                                                                    // 163
		var text = text.replace(/                                                                                            // 164
				^[ ]{0,3}\[(.+)\]:  // id = $1  attacklab: g_tab_width - 1                                                         // 165
				  [ \t]*                                                                                                           // 166
				  \n?				// maybe *one* newline                                                                                    // 167
				  [ \t]*                                                                                                           // 168
				<?(\S+?)>?			// url = $2                                                                                           // 169
				  [ \t]*                                                                                                           // 170
				  \n?				// maybe one newline                                                                                      // 171
				  [ \t]*                                                                                                           // 172
				(?:                                                                                                                // 173
				  (\n*)				// any lines skipped = $3 attacklab: lookbehind removed                                                 // 174
				  ["(]                                                                                                             // 175
				  (.+?)				// title = $4                                                                                           // 176
				  [")]                                                                                                             // 177
				  [ \t]*                                                                                                           // 178
				)?					// title is optional                                                                                        // 179
				(?:\n+|$)                                                                                                          // 180
			  /gm,                                                                                                              // 181
			  function(){...});                                                                                                 // 182
	*/                                                                                                                    // 183
	var text = text.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|\Z)/gm,
		function (wholeMatch,m1,m2,m3,m4) {                                                                                  // 185
			m1 = m1.toLowerCase();                                                                                              // 186
			g_urls[m1] = _EncodeAmpsAndAngles(m2);  // Link IDs are case-insensitive                                            // 187
			if (m3) {                                                                                                           // 188
				// Oops, found blank lines, so it's not a title.                                                                   // 189
				// Put back the parenthetical statement we stole.                                                                  // 190
				return m3+m4;                                                                                                      // 191
			} else if (m4) {                                                                                                    // 192
				g_titles[m1] = m4.replace(/"/g,"&quot;");                                                                          // 193
			}                                                                                                                   // 194
			                                                                                                                    // 195
			// Completely remove the definition from the text                                                                   // 196
			return "";                                                                                                          // 197
		}                                                                                                                    // 198
	);                                                                                                                    // 199
                                                                                                                       // 200
	return text;                                                                                                          // 201
}                                                                                                                      // 202
                                                                                                                       // 203
                                                                                                                       // 204
var _HashHTMLBlocks = function(text) {                                                                                 // 205
	// attacklab: Double up blank lines to reduce lookaround                                                              // 206
	text = text.replace(/\n/g,"\n\n");                                                                                    // 207
                                                                                                                       // 208
	// Hashify HTML blocks:                                                                                               // 209
	// We only want to do this for block-level HTML tags, such as headers,                                                // 210
	// lists, and tables. That's because we still want to wrap <p>s around                                                // 211
	// "paragraphs" that are wrapped in non-block-level tags, such as anchors,                                            // 212
	// phrase emphasis, and spans. The list of tags we're looking for is                                                  // 213
	// hard-coded:                                                                                                        // 214
	var block_tags_a = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del"     // 215
	var block_tags_b = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math"             // 216
                                                                                                                       // 217
	// First, look for nested blocks, e.g.:                                                                               // 218
	//   <div>                                                                                                            // 219
	//     <div>                                                                                                          // 220
	//     tags for inner block must be indented.                                                                         // 221
	//     </div>                                                                                                         // 222
	//   </div>                                                                                                           // 223
	//                                                                                                                    // 224
	// The outermost tags must start at the left margin for this to match, and                                            // 225
	// the inner nested divs must be indented.                                                                            // 226
	// We need to do this before the next, more liberal match, because the next                                           // 227
	// match will start at the first `<div>` and stop at the first `</div>`.                                              // 228
                                                                                                                       // 229
	// attacklab: This regex can be expensive when it fails.                                                              // 230
	/*                                                                                                                    // 231
		var text = text.replace(/                                                                                            // 232
		(						// save in $1                                                                                                 // 233
			^					// start of line  (with /m)                                                                                   // 234
			<($block_tags_a)	// start tag = $2                                                                                  // 235
			\b					// word break                                                                                                // 236
								// attacklab: hack around khtml/pcre bug...                                                                    // 237
			[^\r]*?\n			// any number of lines, minimally matching                                                              // 238
			</\2>				// the matching end tag                                                                                    // 239
			[ \t]*				// trailing spaces/tabs                                                                                   // 240
			(?=\n+)				// followed by a newline                                                                                 // 241
		)						// attacklab: there are sentinel newlines at end of document                                                  // 242
		/gm,function(){...}};                                                                                                // 243
	*/                                                                                                                    // 244
	text = text.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,hashElement);
                                                                                                                       // 246
	//                                                                                                                    // 247
	// Now match more liberally, simply from `\n<tag>` to `</tag>\n`                                                      // 248
	//                                                                                                                    // 249
                                                                                                                       // 250
	/*                                                                                                                    // 251
		var text = text.replace(/                                                                                            // 252
		(						// save in $1                                                                                                 // 253
			^					// start of line  (with /m)                                                                                   // 254
			<($block_tags_b)	// start tag = $2                                                                                  // 255
			\b					// word break                                                                                                // 256
								// attacklab: hack around khtml/pcre bug...                                                                    // 257
			[^\r]*?				// any number of lines, minimally matching                                                               // 258
			.*</\2>				// the matching end tag                                                                                  // 259
			[ \t]*				// trailing spaces/tabs                                                                                   // 260
			(?=\n+)				// followed by a newline                                                                                 // 261
		)						// attacklab: there are sentinel newlines at end of document                                                  // 262
		/gm,function(){...}};                                                                                                // 263
	*/                                                                                                                    // 264
	text = text.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm,hashElement);
                                                                                                                       // 266
	// Special case just for <hr />. It was easier to make a special case than                                            // 267
	// to make the other regex more complicated.                                                                          // 268
                                                                                                                       // 269
	/*                                                                                                                    // 270
		text = text.replace(/                                                                                                // 271
		(						// save in $1                                                                                                 // 272
			\n\n				// Starting after a blank line                                                                              // 273
			[ ]{0,3}                                                                                                            // 274
			(<(hr)				// start tag = $2                                                                                         // 275
			\b					// word break                                                                                                // 276
			([^<>])*?			//                                                                                                      // 277
			\/?>)				// the matching end tag                                                                                    // 278
			[ \t]*                                                                                                              // 279
			(?=\n{2,})			// followed by a blank line                                                                            // 280
		)                                                                                                                    // 281
		/g,hashElement);                                                                                                     // 282
	*/                                                                                                                    // 283
	text = text.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,hashElement);                               // 284
                                                                                                                       // 285
	// Special case for standalone HTML comments:                                                                         // 286
                                                                                                                       // 287
	/*                                                                                                                    // 288
		text = text.replace(/                                                                                                // 289
		(						// save in $1                                                                                                 // 290
			\n\n				// Starting after a blank line                                                                              // 291
			[ ]{0,3}			// attacklab: g_tab_width - 1                                                                            // 292
			<!                                                                                                                  // 293
			(--[^\r]*?--\s*)+                                                                                                   // 294
			>                                                                                                                   // 295
			[ \t]*                                                                                                              // 296
			(?=\n{2,})			// followed by a blank line                                                                            // 297
		)                                                                                                                    // 298
		/g,hashElement);                                                                                                     // 299
	*/                                                                                                                    // 300
	text = text.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g,hashElement);                               // 301
                                                                                                                       // 302
	// PHP and ASP-style processor instructions (<?...?> and <%...%>)                                                     // 303
                                                                                                                       // 304
	/*                                                                                                                    // 305
		text = text.replace(/                                                                                                // 306
		(?:                                                                                                                  // 307
			\n\n				// Starting after a blank line                                                                              // 308
		)                                                                                                                    // 309
		(						// save in $1                                                                                                 // 310
			[ ]{0,3}			// attacklab: g_tab_width - 1                                                                            // 311
			(?:                                                                                                                 // 312
				<([?%])			// $2                                                                                                    // 313
				[^\r]*?                                                                                                            // 314
				\2>                                                                                                                // 315
			)                                                                                                                   // 316
			[ \t]*                                                                                                              // 317
			(?=\n{2,})			// followed by a blank line                                                                            // 318
		)                                                                                                                    // 319
		/g,hashElement);                                                                                                     // 320
	*/                                                                                                                    // 321
	text = text.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,hashElement);                          // 322
                                                                                                                       // 323
	// attacklab: Undo double lines (see comment at top of this function)                                                 // 324
	text = text.replace(/\n\n/g,"\n");                                                                                    // 325
	return text;                                                                                                          // 326
}                                                                                                                      // 327
                                                                                                                       // 328
var hashElement = function(wholeMatch,m1) {                                                                            // 329
	var blockText = m1;                                                                                                   // 330
                                                                                                                       // 331
	// Undo double lines                                                                                                  // 332
	blockText = blockText.replace(/\n\n/g,"\n");                                                                          // 333
	blockText = blockText.replace(/^\n/,"");                                                                              // 334
	                                                                                                                      // 335
	// strip trailing blank lines                                                                                         // 336
	blockText = blockText.replace(/\n+$/g,"");                                                                            // 337
	                                                                                                                      // 338
	// Replace the element text with a marker ("~KxK" where x is its key)                                                 // 339
	blockText = "\n\n~K" + (g_html_blocks.push(blockText)-1) + "K\n\n";                                                   // 340
	                                                                                                                      // 341
	return blockText;                                                                                                     // 342
};                                                                                                                     // 343
                                                                                                                       // 344
var _RunBlockGamut = function(text) {                                                                                  // 345
//                                                                                                                     // 346
// These are all the transformations that form block-level                                                             // 347
// tags like paragraphs, headers, and list items.                                                                      // 348
//                                                                                                                     // 349
	text = _DoHeaders(text);                                                                                              // 350
                                                                                                                       // 351
	// Do Horizontal Rules:                                                                                               // 352
	var key = hashBlock("<hr />");                                                                                        // 353
	text = text.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,key);                                                        // 354
	text = text.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm,key);                                                        // 355
	text = text.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm,key);                                                        // 356
                                                                                                                       // 357
	text = _DoLists(text);                                                                                                // 358
	text = _DoCodeBlocks(text);                                                                                           // 359
	text = _DoBlockQuotes(text);                                                                                          // 360
                                                                                                                       // 361
	// We already ran _HashHTMLBlocks() before, in Markdown(), but that                                                   // 362
	// was to escape raw HTML in the original Markdown source. This time,                                                 // 363
	// we're escaping the markup we've just created, so that we don't wrap                                                // 364
	// <p> tags around block-level tags.                                                                                  // 365
	text = _HashHTMLBlocks(text);                                                                                         // 366
	text = _FormParagraphs(text);                                                                                         // 367
                                                                                                                       // 368
	return text;                                                                                                          // 369
}                                                                                                                      // 370
                                                                                                                       // 371
                                                                                                                       // 372
var _RunSpanGamut = function(text) {                                                                                   // 373
//                                                                                                                     // 374
// These are all the transformations that occur *within* block-level                                                   // 375
// tags like paragraphs, headers, and list items.                                                                      // 376
//                                                                                                                     // 377
                                                                                                                       // 378
	text = _DoCodeSpans(text);                                                                                            // 379
	text = _EscapeSpecialCharsWithinTagAttributes(text);                                                                  // 380
	text = _EncodeBackslashEscapes(text);                                                                                 // 381
                                                                                                                       // 382
	// Process anchor and image tags. Images must come first,                                                             // 383
	// because ![foo][f] looks like an anchor.                                                                            // 384
	text = _DoImages(text);                                                                                               // 385
	text = _DoAnchors(text);                                                                                              // 386
                                                                                                                       // 387
	// Make links out of things like `<http://example.com/>`                                                              // 388
	// Must come after _DoAnchors(), because you can use < and >                                                          // 389
	// delimiters in inline links like [this](<url>).                                                                     // 390
	text = _DoAutoLinks(text);                                                                                            // 391
	text = _EncodeAmpsAndAngles(text);                                                                                    // 392
	text = _DoItalicsAndBold(text);                                                                                       // 393
                                                                                                                       // 394
	// Do hard breaks:                                                                                                    // 395
	text = text.replace(/  +\n/g," <br />\n");                                                                            // 396
                                                                                                                       // 397
	return text;                                                                                                          // 398
}                                                                                                                      // 399
                                                                                                                       // 400
var _EscapeSpecialCharsWithinTagAttributes = function(text) {                                                          // 401
//                                                                                                                     // 402
// Within tags -- meaning between < and > -- encode [\ ` * _] so they                                                  // 403
// don't conflict with their use in Markdown for code, italics and strong.                                             // 404
//                                                                                                                     // 405
                                                                                                                       // 406
	// Build a regex to find HTML tags and comments.  See Friedl's                                                        // 407
	// "Mastering Regular Expressions", 2nd Ed., pp. 200-201.                                                             // 408
	var regex = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;                                              // 409
                                                                                                                       // 410
	text = text.replace(regex, function(wholeMatch) {                                                                     // 411
		var tag = wholeMatch.replace(/(.)<\/?code>(?=.)/g,"$1`");                                                            // 412
		tag = escapeCharacters(tag,"\\`*_");                                                                                 // 413
		return tag;                                                                                                          // 414
	});                                                                                                                   // 415
                                                                                                                       // 416
	return text;                                                                                                          // 417
}                                                                                                                      // 418
                                                                                                                       // 419
var _DoAnchors = function(text) {                                                                                      // 420
//                                                                                                                     // 421
// Turn Markdown link shortcuts into XHTML <a> tags.                                                                   // 422
//                                                                                                                     // 423
	//                                                                                                                    // 424
	// First, handle reference-style links: [link text] [id]                                                              // 425
	//                                                                                                                    // 426
                                                                                                                       // 427
	/*                                                                                                                    // 428
		text = text.replace(/                                                                                                // 429
		(							// wrap whole match in $1                                                                                    // 430
			\[                                                                                                                  // 431
			(                                                                                                                   // 432
				(?:                                                                                                                // 433
					\[[^\]]*\]		// allow brackets nested one level                                                                    // 434
					|                                                                                                                 // 435
					[^\[]			// or anything else                                                                                       // 436
				)*                                                                                                                 // 437
			)                                                                                                                   // 438
			\]                                                                                                                  // 439
                                                                                                                       // 440
			[ ]?					// one optional space                                                                                      // 441
			(?:\n[ ]*)?				// one optional newline followed by spaces                                                           // 442
                                                                                                                       // 443
			\[                                                                                                                  // 444
			(.*?)					// id = $3                                                                                                // 445
			\]                                                                                                                  // 446
		)()()()()					// pad remaining backreferences                                                                        // 447
		/g,_DoAnchors_callback);                                                                                             // 448
	*/                                                                                                                    // 449
	text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,writeAnchorTag);               // 450
                                                                                                                       // 451
	//                                                                                                                    // 452
	// Next, inline-style links: [link text](url "optional title")                                                        // 453
	//                                                                                                                    // 454
                                                                                                                       // 455
	/*                                                                                                                    // 456
		text = text.replace(/                                                                                                // 457
			(						// wrap whole match in $1                                                                                    // 458
				\[                                                                                                                 // 459
				(                                                                                                                  // 460
					(?:                                                                                                               // 461
						\[[^\]]*\]	// allow brackets nested one level                                                                    // 462
					|                                                                                                                 // 463
					[^\[\]]			// or anything else                                                                                     // 464
				)                                                                                                                  // 465
			)                                                                                                                   // 466
			\]                                                                                                                  // 467
			\(						// literal paren                                                                                            // 468
			[ \t]*                                                                                                              // 469
			()						// no id, so leave $3 empty                                                                                 // 470
			<?(.*?)>?				// href = $4                                                                                           // 471
			[ \t]*                                                                                                              // 472
			(						// $5                                                                                                        // 473
				(['"])				// quote char = $6                                                                                       // 474
				(.*?)				// Title = $7                                                                                             // 475
				\6					// matching quote                                                                                           // 476
				[ \t]*				// ignore any spaces/tabs between closing quote and )                                                    // 477
			)?						// title is optional                                                                                        // 478
			\)                                                                                                                  // 479
		)                                                                                                                    // 480
		/g,writeAnchorTag);                                                                                                  // 481
	*/                                                                                                                    // 482
	text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,writeAnchorTag);
                                                                                                                       // 484
	//                                                                                                                    // 485
	// Last, handle reference-style shortcuts: [link text]                                                                // 486
	// These must come last in case you've also got [link test][1]                                                        // 487
	// or [link test](/foo)                                                                                               // 488
	//                                                                                                                    // 489
                                                                                                                       // 490
	/*                                                                                                                    // 491
		text = text.replace(/                                                                                                // 492
		(		 					// wrap whole match in $1                                                                                   // 493
			\[                                                                                                                  // 494
			([^\[\]]+)				// link text = $2; can't contain '[' or ']'                                                           // 495
			\]                                                                                                                  // 496
		)()()()()()					// pad rest of backreferences                                                                        // 497
		/g, writeAnchorTag);                                                                                                 // 498
	*/                                                                                                                    // 499
	text = text.replace(/(\[([^\[\]]+)\])()()()()()/g, writeAnchorTag);                                                   // 500
                                                                                                                       // 501
	return text;                                                                                                          // 502
}                                                                                                                      // 503
                                                                                                                       // 504
var writeAnchorTag = function(wholeMatch,m1,m2,m3,m4,m5,m6,m7) {                                                       // 505
	if (m7 == undefined) m7 = "";                                                                                         // 506
	var whole_match = m1;                                                                                                 // 507
	var link_text   = m2;                                                                                                 // 508
	var link_id	 = m3.toLowerCase();                                                                                      // 509
	var url		= m4;                                                                                                        // 510
	var title	= m7;                                                                                                       // 511
	                                                                                                                      // 512
	if (url == "") {                                                                                                      // 513
		if (link_id == "") {                                                                                                 // 514
			// lower-case and turn embedded newlines into spaces                                                                // 515
			link_id = link_text.toLowerCase().replace(/ ?\n/g," ");                                                             // 516
		}                                                                                                                    // 517
		url = "#"+link_id;                                                                                                   // 518
		                                                                                                                     // 519
		if (g_urls[link_id] != undefined) {                                                                                  // 520
			url = g_urls[link_id];                                                                                              // 521
			if (g_titles[link_id] != undefined) {                                                                               // 522
				title = g_titles[link_id];                                                                                         // 523
			}                                                                                                                   // 524
		}                                                                                                                    // 525
		else {                                                                                                               // 526
			if (whole_match.search(/\(\s*\)$/m)>-1) {                                                                           // 527
				// Special case for explicit empty url                                                                             // 528
				url = "";                                                                                                          // 529
			} else {                                                                                                            // 530
				return whole_match;                                                                                                // 531
			}                                                                                                                   // 532
		}                                                                                                                    // 533
	}	                                                                                                                    // 534
	                                                                                                                      // 535
	url = escapeCharacters(url,"*_");                                                                                     // 536
	var result = "<a href=\"" + url + "\"";                                                                               // 537
	                                                                                                                      // 538
	if (title != "") {                                                                                                    // 539
		title = title.replace(/"/g,"&quot;");                                                                                // 540
		title = escapeCharacters(title,"*_");                                                                                // 541
		result +=  " title=\"" + title + "\"";                                                                               // 542
	}                                                                                                                     // 543
	                                                                                                                      // 544
	result += ">" + link_text + "</a>";                                                                                   // 545
	                                                                                                                      // 546
	return result;                                                                                                        // 547
}                                                                                                                      // 548
                                                                                                                       // 549
                                                                                                                       // 550
var _DoImages = function(text) {                                                                                       // 551
//                                                                                                                     // 552
// Turn Markdown image shortcuts into <img> tags.                                                                      // 553
//                                                                                                                     // 554
                                                                                                                       // 555
	//                                                                                                                    // 556
	// First, handle reference-style labeled images: ![alt text][id]                                                      // 557
	//                                                                                                                    // 558
                                                                                                                       // 559
	/*                                                                                                                    // 560
		text = text.replace(/                                                                                                // 561
		(						// wrap whole match in $1                                                                                     // 562
			!\[                                                                                                                 // 563
			(.*?)				// alt text = $2                                                                                           // 564
			\]                                                                                                                  // 565
                                                                                                                       // 566
			[ ]?				// one optional space                                                                                       // 567
			(?:\n[ ]*)?			// one optional newline followed by spaces                                                            // 568
                                                                                                                       // 569
			\[                                                                                                                  // 570
			(.*?)				// id = $3                                                                                                 // 571
			\]                                                                                                                  // 572
		)()()()()				// pad rest of backreferences                                                                           // 573
		/g,writeImageTag);                                                                                                   // 574
	*/                                                                                                                    // 575
	text = text.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,writeImageTag);                                   // 576
                                                                                                                       // 577
	//                                                                                                                    // 578
	// Next, handle inline images:  ![alt text](url "optional title")                                                     // 579
	// Don't forget: encode * and _                                                                                       // 580
                                                                                                                       // 581
	/*                                                                                                                    // 582
		text = text.replace(/                                                                                                // 583
		(						// wrap whole match in $1                                                                                     // 584
			!\[                                                                                                                 // 585
			(.*?)				// alt text = $2                                                                                           // 586
			\]                                                                                                                  // 587
			\s?					// One optional whitespace character                                                                        // 588
			\(					// literal paren                                                                                             // 589
			[ \t]*                                                                                                              // 590
			()					// no id, so leave $3 empty                                                                                  // 591
			<?(\S+?)>?			// src url = $4                                                                                        // 592
			[ \t]*                                                                                                              // 593
			(					// $5                                                                                                         // 594
				(['"])			// quote char = $6                                                                                        // 595
				(.*?)			// title = $7                                                                                              // 596
				\6				// matching quote                                                                                            // 597
				[ \t]*                                                                                                             // 598
			)?					// title is optional                                                                                         // 599
		\)                                                                                                                   // 600
		)                                                                                                                    // 601
		/g,writeImageTag);                                                                                                   // 602
	*/                                                                                                                    // 603
	text = text.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,writeImageTag);              // 604
                                                                                                                       // 605
	return text;                                                                                                          // 606
}                                                                                                                      // 607
                                                                                                                       // 608
var writeImageTag = function(wholeMatch,m1,m2,m3,m4,m5,m6,m7) {                                                        // 609
	var whole_match = m1;                                                                                                 // 610
	var alt_text   = m2;                                                                                                  // 611
	var link_id	 = m3.toLowerCase();                                                                                      // 612
	var url		= m4;                                                                                                        // 613
	var title	= m7;                                                                                                       // 614
                                                                                                                       // 615
	if (!title) title = "";                                                                                               // 616
	                                                                                                                      // 617
	if (url == "") {                                                                                                      // 618
		if (link_id == "") {                                                                                                 // 619
			// lower-case and turn embedded newlines into spaces                                                                // 620
			link_id = alt_text.toLowerCase().replace(/ ?\n/g," ");                                                              // 621
		}                                                                                                                    // 622
		url = "#"+link_id;                                                                                                   // 623
		                                                                                                                     // 624
		if (g_urls[link_id] != undefined) {                                                                                  // 625
			url = g_urls[link_id];                                                                                              // 626
			if (g_titles[link_id] != undefined) {                                                                               // 627
				title = g_titles[link_id];                                                                                         // 628
			}                                                                                                                   // 629
		}                                                                                                                    // 630
		else {                                                                                                               // 631
			return whole_match;                                                                                                 // 632
		}                                                                                                                    // 633
	}	                                                                                                                    // 634
	                                                                                                                      // 635
	alt_text = alt_text.replace(/"/g,"&quot;");                                                                           // 636
	url = escapeCharacters(url,"*_");                                                                                     // 637
	var result = "<img src=\"" + url + "\" alt=\"" + alt_text + "\"";                                                     // 638
                                                                                                                       // 639
	// attacklab: Markdown.pl adds empty title attributes to images.                                                      // 640
	// Replicate this bug.                                                                                                // 641
                                                                                                                       // 642
	//if (title != "") {                                                                                                  // 643
		title = title.replace(/"/g,"&quot;");                                                                                // 644
		title = escapeCharacters(title,"*_");                                                                                // 645
		result +=  " title=\"" + title + "\"";                                                                               // 646
	//}                                                                                                                   // 647
	                                                                                                                      // 648
	result += " />";                                                                                                      // 649
	                                                                                                                      // 650
	return result;                                                                                                        // 651
}                                                                                                                      // 652
                                                                                                                       // 653
                                                                                                                       // 654
var _DoHeaders = function(text) {                                                                                      // 655
                                                                                                                       // 656
	// Setext-style headers:                                                                                              // 657
	//	Header 1                                                                                                           // 658
	//	========                                                                                                           // 659
	//                                                                                                                    // 660
	//	Header 2                                                                                                           // 661
	//	--------                                                                                                           // 662
	//                                                                                                                    // 663
	text = text.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,                                                                     // 664
		function(wholeMatch,m1){return hashBlock('<h1 id="' + headerId(m1) + '">' + _RunSpanGamut(m1) + "</h1>");});         // 665
                                                                                                                       // 666
	text = text.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,                                                                     // 667
		function(matchFound,m1){return hashBlock('<h2 id="' + headerId(m1) + '">' + _RunSpanGamut(m1) + "</h2>");});         // 668
                                                                                                                       // 669
	// atx-style headers:                                                                                                 // 670
	//  # Header 1                                                                                                        // 671
	//  ## Header 2                                                                                                       // 672
	//  ## Header 2 with closing hashes ##                                                                                // 673
	//  ...                                                                                                               // 674
	//  ###### Header 6                                                                                                   // 675
	//                                                                                                                    // 676
                                                                                                                       // 677
	/*                                                                                                                    // 678
		text = text.replace(/                                                                                                // 679
			^(\#{1,6})				// $1 = string of #'s                                                                                 // 680
			[ \t]*                                                                                                              // 681
			(.+?)					// $2 = Header text                                                                                       // 682
			[ \t]*                                                                                                              // 683
			\#*						// optional closing #'s (not counted)                                                                      // 684
			\n+                                                                                                                 // 685
		/gm, function() {...});                                                                                              // 686
	*/                                                                                                                    // 687
                                                                                                                       // 688
	text = text.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,                                                            // 689
		function(wholeMatch,m1,m2) {                                                                                         // 690
			var h_level = m1.length;                                                                                            // 691
			return hashBlock("<h" + h_level + ' id="' + headerId(m2) + '">' + _RunSpanGamut(m2) + "</h" + h_level + ">");       // 692
		});                                                                                                                  // 693
                                                                                                                       // 694
	function headerId(m) {                                                                                                // 695
		return m.replace(/[^\w]/g, '').toLowerCase();                                                                        // 696
	}                                                                                                                     // 697
	return text;                                                                                                          // 698
}                                                                                                                      // 699
                                                                                                                       // 700
// This declaration keeps Dojo compressor from outputting garbage:                                                     // 701
var _ProcessListItems;                                                                                                 // 702
                                                                                                                       // 703
var _DoLists = function(text) {                                                                                        // 704
//                                                                                                                     // 705
// Form HTML ordered (numbered) and unordered (bulleted) lists.                                                        // 706
//                                                                                                                     // 707
                                                                                                                       // 708
	// attacklab: add sentinel to hack around khtml/safari bug:                                                           // 709
	// http://bugs.webkit.org/show_bug.cgi?id=11231                                                                       // 710
	text += "~0";                                                                                                         // 711
                                                                                                                       // 712
	// Re-usable pattern to match any entirel ul or ol list:                                                              // 713
                                                                                                                       // 714
	/*                                                                                                                    // 715
		var whole_list = /                                                                                                   // 716
		(									// $1 = whole list                                                                                         // 717
			(								// $2                                                                                                      // 718
				[ ]{0,3}					// attacklab: g_tab_width - 1                                                                         // 719
				([*+-]|\d+[.])				// $3 = first list item marker                                                                   // 720
				[ \t]+                                                                                                             // 721
			)                                                                                                                   // 722
			[^\r]+?                                                                                                             // 723
			(								// $4                                                                                                      // 724
				~0							// sentinel for workaround; should be $                                                                   // 725
			|                                                                                                                   // 726
				\n{2,}                                                                                                             // 727
				(?=\S)                                                                                                             // 728
				(?!							// Negative lookahead for another list item marker                                                       // 729
					[ \t]*                                                                                                            // 730
					(?:[*+-]|\d+[.])[ \t]+                                                                                            // 731
				)                                                                                                                  // 732
			)                                                                                                                   // 733
		)/g                                                                                                                  // 734
	*/                                                                                                                    // 735
	var whole_list = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;       // 736
                                                                                                                       // 737
	if (g_list_level) {                                                                                                   // 738
		text = text.replace(whole_list,function(wholeMatch,m1,m2) {                                                          // 739
			var list = m1;                                                                                                      // 740
			var list_type = (m2.search(/[*+-]/g)>-1) ? "ul" : "ol";                                                             // 741
                                                                                                                       // 742
			// Turn double returns into triple returns, so that we can make a                                                   // 743
			// paragraph for the last item in a list, if necessary:                                                             // 744
			list = list.replace(/\n{2,}/g,"\n\n\n");;                                                                           // 745
			var result = _ProcessListItems(list);                                                                               // 746
	                                                                                                                      // 747
			// Trim any trailing whitespace, to put the closing `</$list_type>`                                                 // 748
			// up on the preceding line, to get it past the current stupid                                                      // 749
			// HTML block parser. This is a hack to work around the terrible                                                    // 750
			// hack that is the HTML block parser.                                                                              // 751
			result = result.replace(/\s+$/,"");                                                                                 // 752
			result = "<"+list_type+">" + result + "</"+list_type+">\n";                                                         // 753
			return result;                                                                                                      // 754
		});                                                                                                                  // 755
	} else {                                                                                                              // 756
		whole_list = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g; // 757
		text = text.replace(whole_list,function(wholeMatch,m1,m2,m3) {                                                       // 758
			var runup = m1;                                                                                                     // 759
			var list = m2;                                                                                                      // 760
                                                                                                                       // 761
			var list_type = (m3.search(/[*+-]/g)>-1) ? "ul" : "ol";                                                             // 762
			// Turn double returns into triple returns, so that we can make a                                                   // 763
			// paragraph for the last item in a list, if necessary:                                                             // 764
			var list = list.replace(/\n{2,}/g,"\n\n\n");;                                                                       // 765
			var result = _ProcessListItems(list);                                                                               // 766
			result = runup + "<"+list_type+">\n" + result + "</"+list_type+">\n";	                                              // 767
			return result;                                                                                                      // 768
		});                                                                                                                  // 769
	}                                                                                                                     // 770
                                                                                                                       // 771
	// attacklab: strip sentinel                                                                                          // 772
	text = text.replace(/~0/,"");                                                                                         // 773
                                                                                                                       // 774
	return text;                                                                                                          // 775
}                                                                                                                      // 776
                                                                                                                       // 777
_ProcessListItems = function(list_str) {                                                                               // 778
//                                                                                                                     // 779
//  Process the contents of a single ordered or unordered list, splitting it                                           // 780
//  into individual list items.                                                                                        // 781
//                                                                                                                     // 782
	// The $g_list_level global keeps track of when we're inside a list.                                                  // 783
	// Each time we enter a list, we increment it; when we leave a list,                                                  // 784
	// we decrement. If it's zero, we're not in a list anymore.                                                           // 785
	//                                                                                                                    // 786
	// We do this because when we're not inside a list, we want to treat                                                  // 787
	// something like this:                                                                                               // 788
	//                                                                                                                    // 789
	//    I recommend upgrading to version                                                                                // 790
	//    8. Oops, now this line is treated                                                                               // 791
	//    as a sub-list.                                                                                                  // 792
	//                                                                                                                    // 793
	// As a single paragraph, despite the fact that the second line starts                                                // 794
	// with a digit-period-space sequence.                                                                                // 795
	//                                                                                                                    // 796
	// Whereas when we're inside a list (or sub-list), that line will be                                                  // 797
	// treated as the start of a sub-list. What a kludge, huh? This is                                                    // 798
	// an aspect of Markdown's syntax that's hard to parse perfectly                                                      // 799
	// without resorting to mind-reading. Perhaps the solution is to                                                      // 800
	// change the syntax rules such that sub-lists must start with a                                                      // 801
	// starting cardinal number; e.g. "1." or "a.".                                                                       // 802
                                                                                                                       // 803
	g_list_level++;                                                                                                       // 804
                                                                                                                       // 805
	// trim trailing blank lines:                                                                                         // 806
	list_str = list_str.replace(/\n{2,}$/,"\n");                                                                          // 807
                                                                                                                       // 808
	// attacklab: add sentinel to emulate \z                                                                              // 809
	list_str += "~0";                                                                                                     // 810
                                                                                                                       // 811
	/*                                                                                                                    // 812
		list_str = list_str.replace(/                                                                                        // 813
			(\n)?							// leading line = $1                                                                                    // 814
			(^[ \t]*)						// leading whitespace = $2                                                                           // 815
			([*+-]|\d+[.]) [ \t]+			// list marker = $3                                                                         // 816
			([^\r]+?						// list item text   = $4                                                                              // 817
			(\n{1,2}))                                                                                                          // 818
			(?= \n* (~0 | \2 ([*+-]|\d+[.]) [ \t]+))                                                                            // 819
		/gm, function(){...});                                                                                               // 820
	*/                                                                                                                    // 821
	list_str = list_str.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,
		function(wholeMatch,m1,m2,m3,m4){                                                                                    // 823
			var item = m4;                                                                                                      // 824
			var leading_line = m1;                                                                                              // 825
			var leading_space = m2;                                                                                             // 826
                                                                                                                       // 827
			if (leading_line || (item.search(/\n{2,}/)>-1)) {                                                                   // 828
				item = _RunBlockGamut(_Outdent(item));                                                                             // 829
			}                                                                                                                   // 830
			else {                                                                                                              // 831
				// Recursion for sub-lists:                                                                                        // 832
				item = _DoLists(_Outdent(item));                                                                                   // 833
				item = item.replace(/\n$/,""); // chomp(item)                                                                      // 834
				item = _RunSpanGamut(item);                                                                                        // 835
			}                                                                                                                   // 836
                                                                                                                       // 837
			return  "<li>" + item + "</li>\n";                                                                                  // 838
		}                                                                                                                    // 839
	);                                                                                                                    // 840
                                                                                                                       // 841
	// attacklab: strip sentinel                                                                                          // 842
	list_str = list_str.replace(/~0/g,"");                                                                                // 843
                                                                                                                       // 844
	g_list_level--;                                                                                                       // 845
	return list_str;                                                                                                      // 846
}                                                                                                                      // 847
                                                                                                                       // 848
                                                                                                                       // 849
var _DoCodeBlocks = function(text) {                                                                                   // 850
//                                                                                                                     // 851
//  Process Markdown `<pre><code>` blocks.                                                                             // 852
//                                                                                                                     // 853
                                                                                                                       // 854
	/*                                                                                                                    // 855
		text = text.replace(text,                                                                                            // 856
			/(?:\n\n|^)                                                                                                         // 857
			(								// $1 = the code block -- one or more lines, starting with a space/tab                                     // 858
				(?:                                                                                                                // 859
					(?:[ ]{4}|\t)			// Lines must start with a tab or a tab-width of spaces - attacklab: g_tab_width                  // 860
					.*\n+                                                                                                             // 861
				)+                                                                                                                 // 862
			)                                                                                                                   // 863
			(\n*[ ]{0,3}[^ \t\n]|(?=~0))	// attacklab: g_tab_width                                                              // 864
		/g,function(){...});                                                                                                 // 865
	*/                                                                                                                    // 866
                                                                                                                       // 867
	// attacklab: sentinel workarounds for lack of \A and \Z, safari\khtml bug                                            // 868
	text += "~0";                                                                                                         // 869
	                                                                                                                      // 870
	text = text.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,                               // 871
		function(wholeMatch,m1,m2) {                                                                                         // 872
			var codeblock = m1;                                                                                                 // 873
			var nextChar = m2;                                                                                                  // 874
		                                                                                                                     // 875
			codeblock = _EncodeCode( _Outdent(codeblock));                                                                      // 876
			codeblock = _Detab(codeblock);                                                                                      // 877
			codeblock = codeblock.replace(/^\n+/g,""); // trim leading newlines                                                 // 878
			codeblock = codeblock.replace(/\n+$/g,""); // trim trailing whitespace                                              // 879
                                                                                                                       // 880
			codeblock = "<pre><code>" + codeblock + "\n</code></pre>";                                                          // 881
                                                                                                                       // 882
			return hashBlock(codeblock) + nextChar;                                                                             // 883
		}                                                                                                                    // 884
	);                                                                                                                    // 885
                                                                                                                       // 886
	// attacklab: strip sentinel                                                                                          // 887
	text = text.replace(/~0/,"");                                                                                         // 888
                                                                                                                       // 889
	return text;                                                                                                          // 890
}                                                                                                                      // 891
                                                                                                                       // 892
var hashBlock = function(text) {                                                                                       // 893
	text = text.replace(/(^\n+|\n+$)/g,"");                                                                               // 894
	return "\n\n~K" + (g_html_blocks.push(text)-1) + "K\n\n";                                                             // 895
}                                                                                                                      // 896
                                                                                                                       // 897
                                                                                                                       // 898
var _DoCodeSpans = function(text) {                                                                                    // 899
//                                                                                                                     // 900
//   *  Backtick quotes are used for <code></code> spans.                                                              // 901
//                                                                                                                     // 902
//   *  You can use multiple backticks as the delimiters if you want to                                                // 903
//	 include literal backticks in the code span. So, this input:                                                        // 904
//	                                                                                                                    // 905
//		 Just type ``foo `bar` baz`` at the prompt.                                                                        // 906
//	                                                                                                                    // 907
//	   Will translate to:                                                                                               // 908
//	                                                                                                                    // 909
//		 <p>Just type <code>foo `bar` baz</code> at the prompt.</p>                                                        // 910
//	                                                                                                                    // 911
//	There's no arbitrary limit to the number of backticks you                                                           // 912
//	can use as delimters. If you need three consecutive backticks                                                       // 913
//	in your code, use four for delimiters, etc.                                                                         // 914
//                                                                                                                     // 915
//  *  You can use spaces to get literal backticks at the edges:                                                       // 916
//	                                                                                                                    // 917
//		 ... type `` `bar` `` ...                                                                                          // 918
//	                                                                                                                    // 919
//	   Turns to:                                                                                                        // 920
//	                                                                                                                    // 921
//		 ... type <code>`bar`</code> ...                                                                                   // 922
//                                                                                                                     // 923
                                                                                                                       // 924
	/*                                                                                                                    // 925
		text = text.replace(/                                                                                                // 926
			(^|[^\\])					// Character before opening ` can't be a backslash                                                    // 927
			(`+)						// $2 = Opening run of `                                                                                  // 928
			(							// $3 = The code block                                                                                      // 929
				[^\r]*?                                                                                                            // 930
				[^`]					// attacklab: work around lack of lookbehind                                                              // 931
			)                                                                                                                   // 932
			\2							// Matching closer                                                                                         // 933
			(?!`)                                                                                                               // 934
		/gm, function(){...});                                                                                               // 935
	*/                                                                                                                    // 936
                                                                                                                       // 937
	text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,                                                            // 938
		function(wholeMatch,m1,m2,m3,m4) {                                                                                   // 939
			var c = m3;                                                                                                         // 940
			c = c.replace(/^([ \t]*)/g,"");	// leading whitespace                                                               // 941
			c = c.replace(/[ \t]*$/g,"");	// trailing whitespace                                                                // 942
			c = _EncodeCode(c);                                                                                                 // 943
			return m1+"<code>"+c+"</code>";                                                                                     // 944
		});                                                                                                                  // 945
                                                                                                                       // 946
	return text;                                                                                                          // 947
}                                                                                                                      // 948
                                                                                                                       // 949
                                                                                                                       // 950
var _EncodeCode = function(text) {                                                                                     // 951
//                                                                                                                     // 952
// Encode/escape certain characters inside Markdown code runs.                                                         // 953
// The point is that in code, these characters are literals,                                                           // 954
// and lose their special Markdown meanings.                                                                           // 955
//                                                                                                                     // 956
	// Encode all ampersands; HTML entities are not                                                                       // 957
	// entities within a Markdown code span.                                                                              // 958
	text = text.replace(/&/g,"&amp;");                                                                                    // 959
                                                                                                                       // 960
	// Do the angle bracket song and dance:                                                                               // 961
	text = text.replace(/</g,"&lt;");                                                                                     // 962
	text = text.replace(/>/g,"&gt;");                                                                                     // 963
                                                                                                                       // 964
	// Now, escape characters that are magic in Markdown:                                                                 // 965
	text = escapeCharacters(text,"\*_{}[]\\",false);                                                                      // 966
                                                                                                                       // 967
// jj the line above breaks this:                                                                                      // 968
//---                                                                                                                  // 969
                                                                                                                       // 970
//* Item                                                                                                               // 971
                                                                                                                       // 972
//   1. Subitem                                                                                                        // 973
                                                                                                                       // 974
//            special char: *                                                                                          // 975
//---                                                                                                                  // 976
                                                                                                                       // 977
	return text;                                                                                                          // 978
}                                                                                                                      // 979
                                                                                                                       // 980
                                                                                                                       // 981
var _DoItalicsAndBold = function(text) {                                                                               // 982
                                                                                                                       // 983
	// <strong> must go first:                                                                                            // 984
	text = text.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,                                                             // 985
		"<strong>$2</strong>");                                                                                              // 986
                                                                                                                       // 987
	text = text.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,                                                                     // 988
		"<em>$2</em>");                                                                                                      // 989
                                                                                                                       // 990
	return text;                                                                                                          // 991
}                                                                                                                      // 992
                                                                                                                       // 993
                                                                                                                       // 994
var _DoBlockQuotes = function(text) {                                                                                  // 995
                                                                                                                       // 996
	/*                                                                                                                    // 997
		text = text.replace(/                                                                                                // 998
		(								// Wrap whole match in $1                                                                                   // 999
			(                                                                                                                   // 1000
				^[ \t]*>[ \t]?			// '>' at the start of a line                                                                     // 1001
				.+\n					// rest of the first line                                                                                 // 1002
				(.+\n)*					// subsequent consecutive lines                                                                        // 1003
				\n*						// blanks                                                                                                 // 1004
			)+                                                                                                                  // 1005
		)                                                                                                                    // 1006
		/gm, function(){...});                                                                                               // 1007
	*/                                                                                                                    // 1008
                                                                                                                       // 1009
	text = text.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,                                                            // 1010
		function(wholeMatch,m1) {                                                                                            // 1011
			var bq = m1;                                                                                                        // 1012
                                                                                                                       // 1013
			// attacklab: hack around Konqueror 3.5.4 bug:                                                                      // 1014
			// "----------bug".replace(/^-/g,"") == "bug"                                                                       // 1015
                                                                                                                       // 1016
			bq = bq.replace(/^[ \t]*>[ \t]?/gm,"~0");	// trim one level of quoting                                              // 1017
                                                                                                                       // 1018
			// attacklab: clean up hack                                                                                         // 1019
			bq = bq.replace(/~0/g,"");                                                                                          // 1020
                                                                                                                       // 1021
			bq = bq.replace(/^[ \t]+$/gm,"");		// trim whitespace-only lines                                                    // 1022
			bq = _RunBlockGamut(bq);				// recurse                                                                              // 1023
			                                                                                                                    // 1024
			bq = bq.replace(/(^|\n)/g,"$1  ");                                                                                  // 1025
			// These leading spaces screw with <pre> content, so we need to fix that:                                           // 1026
			bq = bq.replace(                                                                                                    // 1027
					/(\s*<pre>[^\r]+?<\/pre>)/gm,                                                                                     // 1028
				function(wholeMatch,m1) {                                                                                          // 1029
					var pre = m1;                                                                                                     // 1030
					// attacklab: hack around Konqueror 3.5.4 bug:                                                                    // 1031
					pre = pre.replace(/^  /mg,"~0");                                                                                  // 1032
					pre = pre.replace(/~0/g,"");                                                                                      // 1033
					return pre;                                                                                                       // 1034
				});                                                                                                                // 1035
			                                                                                                                    // 1036
			return hashBlock("<blockquote>\n" + bq + "\n</blockquote>");                                                        // 1037
		});                                                                                                                  // 1038
	return text;                                                                                                          // 1039
}                                                                                                                      // 1040
                                                                                                                       // 1041
                                                                                                                       // 1042
var _FormParagraphs = function(text) {                                                                                 // 1043
//                                                                                                                     // 1044
//  Params:                                                                                                            // 1045
//    $text - string to process with html <p> tags                                                                     // 1046
//                                                                                                                     // 1047
                                                                                                                       // 1048
	// Strip leading and trailing lines:                                                                                  // 1049
	text = text.replace(/^\n+/g,"");                                                                                      // 1050
	text = text.replace(/\n+$/g,"");                                                                                      // 1051
                                                                                                                       // 1052
	var grafs = text.split(/\n{2,}/g);                                                                                    // 1053
	var grafsOut = new Array();                                                                                           // 1054
                                                                                                                       // 1055
	//                                                                                                                    // 1056
	// Wrap <p> tags.                                                                                                     // 1057
	//                                                                                                                    // 1058
	var end = grafs.length;                                                                                               // 1059
	for (var i=0; i<end; i++) {                                                                                           // 1060
		var str = grafs[i];                                                                                                  // 1061
                                                                                                                       // 1062
		// if this is an HTML marker, copy it                                                                                // 1063
		if (str.search(/~K(\d+)K/g) >= 0) {                                                                                  // 1064
			grafsOut.push(str);                                                                                                 // 1065
		}                                                                                                                    // 1066
		else if (str.search(/\S/) >= 0) {                                                                                    // 1067
			str = _RunSpanGamut(str);                                                                                           // 1068
			str = str.replace(/^([ \t]*)/g,"<p>");                                                                              // 1069
			str += "</p>"                                                                                                       // 1070
			grafsOut.push(str);                                                                                                 // 1071
		}                                                                                                                    // 1072
                                                                                                                       // 1073
	}                                                                                                                     // 1074
                                                                                                                       // 1075
	//                                                                                                                    // 1076
	// Unhashify HTML blocks                                                                                              // 1077
	//                                                                                                                    // 1078
	end = grafsOut.length;                                                                                                // 1079
	for (var i=0; i<end; i++) {                                                                                           // 1080
		// if this is a marker for an html block...                                                                          // 1081
		while (grafsOut[i].search(/~K(\d+)K/) >= 0) {                                                                        // 1082
			var blockText = g_html_blocks[RegExp.$1];                                                                           // 1083
			blockText = blockText.replace(/\$/g,"$$$$"); // Escape any dollar signs                                             // 1084
			grafsOut[i] = grafsOut[i].replace(/~K\d+K/,blockText);                                                              // 1085
		}                                                                                                                    // 1086
	}                                                                                                                     // 1087
                                                                                                                       // 1088
	return grafsOut.join("\n\n");                                                                                         // 1089
}                                                                                                                      // 1090
                                                                                                                       // 1091
                                                                                                                       // 1092
var _EncodeAmpsAndAngles = function(text) {                                                                            // 1093
// Smart processing for ampersands and angle brackets that need to be encoded.                                         // 1094
	                                                                                                                      // 1095
	// Ampersand-encoding based entirely on Nat Irons's Amputator MT plugin:                                              // 1096
	//   http://bumppo.net/projects/amputator/                                                                            // 1097
	text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;");                                                    // 1098
	                                                                                                                      // 1099
	// Encode naked <'s                                                                                                   // 1100
	text = text.replace(/<(?![a-z\/?\$!])/gi,"&lt;");                                                                     // 1101
	                                                                                                                      // 1102
	return text;                                                                                                          // 1103
}                                                                                                                      // 1104
                                                                                                                       // 1105
                                                                                                                       // 1106
var _EncodeBackslashEscapes = function(text) {                                                                         // 1107
//                                                                                                                     // 1108
//   Parameter:  String.                                                                                               // 1109
//   Returns:	The string, with after processing the following backslash                                                // 1110
//			   escape sequences.                                                                                              // 1111
//                                                                                                                     // 1112
                                                                                                                       // 1113
	// attacklab: The polite way to do this is with the new                                                               // 1114
	// escapeCharacters() function:                                                                                       // 1115
	//                                                                                                                    // 1116
	// 	text = escapeCharacters(text,"\\",true);                                                                          // 1117
	// 	text = escapeCharacters(text,"`*_{}[]()>#+-.!",true);                                                             // 1118
	//                                                                                                                    // 1119
	// ...but we're sidestepping its use of the (slow) RegExp constructor                                                 // 1120
	// as an optimization for Firefox.  This function gets called a LOT.                                                  // 1121
                                                                                                                       // 1122
	text = text.replace(/\\(\\)/g,escapeCharacters_callback);                                                             // 1123
	text = text.replace(/\\([`*_{}\[\]()>#+-.!])/g,escapeCharacters_callback);                                            // 1124
	return text;                                                                                                          // 1125
}                                                                                                                      // 1126
                                                                                                                       // 1127
                                                                                                                       // 1128
var _DoAutoLinks = function(text) {                                                                                    // 1129
                                                                                                                       // 1130
	text = text.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi,"<a href=\"$1\">$1</a>");                                     // 1131
                                                                                                                       // 1132
	// Email addresses: <address@domain.foo>                                                                              // 1133
                                                                                                                       // 1134
	/*                                                                                                                    // 1135
		text = text.replace(/                                                                                                // 1136
			<                                                                                                                   // 1137
			(?:mailto:)?                                                                                                        // 1138
			(                                                                                                                   // 1139
				[-.\w]+                                                                                                            // 1140
				\@                                                                                                                 // 1141
				[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+                                                                                  // 1142
			)                                                                                                                   // 1143
			>                                                                                                                   // 1144
		/gi, _DoAutoLinks_callback());                                                                                       // 1145
	*/                                                                                                                    // 1146
	text = text.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,                                   // 1147
		function(wholeMatch,m1) {                                                                                            // 1148
			return _EncodeEmailAddress( _UnescapeSpecialChars(m1) );                                                            // 1149
		}                                                                                                                    // 1150
	);                                                                                                                    // 1151
                                                                                                                       // 1152
	return text;                                                                                                          // 1153
}                                                                                                                      // 1154
                                                                                                                       // 1155
                                                                                                                       // 1156
var _EncodeEmailAddress = function(addr) {                                                                             // 1157
//                                                                                                                     // 1158
//  Input: an email address, e.g. "foo@example.com"                                                                    // 1159
//                                                                                                                     // 1160
//  Output: the email address as a mailto link, with each character                                                    // 1161
//	of the address encoded as either a decimal or hex entity, in                                                        // 1162
//	the hopes of foiling most address harvesting spam bots. E.g.:                                                       // 1163
//                                                                                                                     // 1164
//	<a href="&#x6D;&#97;&#105;&#108;&#x74;&#111;:&#102;&#111;&#111;&#64;&#101;                                          // 1165
//	   x&#x61;&#109;&#x70;&#108;&#x65;&#x2E;&#99;&#111;&#109;">&#102;&#111;&#111;                                       // 1166
//	   &#64;&#101;x&#x61;&#109;&#x70;&#108;&#x65;&#x2E;&#99;&#111;&#109;</a>                                            // 1167
//                                                                                                                     // 1168
//  Based on a filter by Matthew Wickline, posted to the BBEdit-Talk                                                   // 1169
//  mailing list: <http://tinyurl.com/yu7ue>                                                                           // 1170
//                                                                                                                     // 1171
                                                                                                                       // 1172
	// attacklab: why can't javascript speak hex?                                                                         // 1173
	function char2hex(ch) {                                                                                               // 1174
		var hexDigits = '0123456789ABCDEF';                                                                                  // 1175
		var dec = ch.charCodeAt(0);                                                                                          // 1176
		return(hexDigits.charAt(dec>>4) + hexDigits.charAt(dec&15));                                                         // 1177
	}                                                                                                                     // 1178
                                                                                                                       // 1179
	var encode = [                                                                                                        // 1180
		function(ch){return "&#"+ch.charCodeAt(0)+";";},                                                                     // 1181
		function(ch){return "&#x"+char2hex(ch)+";";},                                                                        // 1182
		function(ch){return ch;}                                                                                             // 1183
	];                                                                                                                    // 1184
                                                                                                                       // 1185
	addr = "mailto:" + addr;                                                                                              // 1186
                                                                                                                       // 1187
	addr = addr.replace(/./g, function(ch) {                                                                              // 1188
		if (ch == "@") {                                                                                                     // 1189
		   	// this *must* be encoded. I insist.                                                                             // 1190
			ch = encode[Math.floor(Math.random()*2)](ch);                                                                       // 1191
		} else if (ch !=":") {                                                                                               // 1192
			// leave ':' alone (to spot mailto: later)                                                                          // 1193
			var r = Math.random();                                                                                              // 1194
			// roughly 10% raw, 45% hex, 45% dec                                                                                // 1195
			ch =  (                                                                                                             // 1196
					r > .9  ?	encode[2](ch)   :                                                                                       // 1197
					r > .45 ?	encode[1](ch)   :                                                                                       // 1198
								encode[0](ch)                                                                                                  // 1199
				);                                                                                                                 // 1200
		}                                                                                                                    // 1201
		return ch;                                                                                                           // 1202
	});                                                                                                                   // 1203
                                                                                                                       // 1204
	addr = "<a href=\"" + addr + "\">" + addr + "</a>";                                                                   // 1205
	addr = addr.replace(/">.+:/g,"\">"); // strip the mailto: from the visible part                                       // 1206
                                                                                                                       // 1207
	return addr;                                                                                                          // 1208
}                                                                                                                      // 1209
                                                                                                                       // 1210
                                                                                                                       // 1211
var _UnescapeSpecialChars = function(text) {                                                                           // 1212
//                                                                                                                     // 1213
// Swap back in all the special characters we've hidden.                                                               // 1214
//                                                                                                                     // 1215
	text = text.replace(/~E(\d+)E/g,                                                                                      // 1216
		function(wholeMatch,m1) {                                                                                            // 1217
			var charCodeToReplace = parseInt(m1);                                                                               // 1218
			return String.fromCharCode(charCodeToReplace);                                                                      // 1219
		}                                                                                                                    // 1220
	);                                                                                                                    // 1221
	return text;                                                                                                          // 1222
}                                                                                                                      // 1223
                                                                                                                       // 1224
                                                                                                                       // 1225
var _Outdent = function(text) {                                                                                        // 1226
//                                                                                                                     // 1227
// Remove one level of line-leading tabs or spaces                                                                     // 1228
//                                                                                                                     // 1229
                                                                                                                       // 1230
	// attacklab: hack around Konqueror 3.5.4 bug:                                                                        // 1231
	// "----------bug".replace(/^-/g,"") == "bug"                                                                         // 1232
                                                                                                                       // 1233
	text = text.replace(/^(\t|[ ]{1,4})/gm,"~0"); // attacklab: g_tab_width                                               // 1234
                                                                                                                       // 1235
	// attacklab: clean up hack                                                                                           // 1236
	text = text.replace(/~0/g,"")                                                                                         // 1237
                                                                                                                       // 1238
	return text;                                                                                                          // 1239
}                                                                                                                      // 1240
                                                                                                                       // 1241
var _Detab = function(text) {                                                                                          // 1242
// attacklab: Detab's completely rewritten for speed.                                                                  // 1243
// In perl we could fix it by anchoring the regexp with \G.                                                            // 1244
// In javascript we're less fortunate.                                                                                 // 1245
                                                                                                                       // 1246
	// expand first n-1 tabs                                                                                              // 1247
	text = text.replace(/\t(?=\t)/g,"    "); // attacklab: g_tab_width                                                    // 1248
                                                                                                                       // 1249
	// replace the nth with two sentinels                                                                                 // 1250
	text = text.replace(/\t/g,"~A~B");                                                                                    // 1251
                                                                                                                       // 1252
	// use the sentinel to anchor our regex so it doesn't explode                                                         // 1253
	text = text.replace(/~B(.+?)~A/g,                                                                                     // 1254
		function(wholeMatch,m1,m2) {                                                                                         // 1255
			var leadingText = m1;                                                                                               // 1256
			var numSpaces = 4 - leadingText.length % 4;  // attacklab: g_tab_width                                              // 1257
                                                                                                                       // 1258
			// there *must* be a better way to do this:                                                                         // 1259
			for (var i=0; i<numSpaces; i++) leadingText+=" ";                                                                   // 1260
                                                                                                                       // 1261
			return leadingText;                                                                                                 // 1262
		}                                                                                                                    // 1263
	);                                                                                                                    // 1264
                                                                                                                       // 1265
	// clean up sentinels                                                                                                 // 1266
	text = text.replace(/~A/g,"    ");  // attacklab: g_tab_width                                                         // 1267
	text = text.replace(/~B/g,"");                                                                                        // 1268
                                                                                                                       // 1269
	return text;                                                                                                          // 1270
}                                                                                                                      // 1271
                                                                                                                       // 1272
                                                                                                                       // 1273
//                                                                                                                     // 1274
//  attacklab: Utility functions                                                                                       // 1275
//                                                                                                                     // 1276
                                                                                                                       // 1277
                                                                                                                       // 1278
var escapeCharacters = function(text, charsToEscape, afterBackslash) {                                                 // 1279
	// First we have to escape the escape characters so that                                                              // 1280
	// we can build a character class out of them                                                                         // 1281
	var regexString = "([" + charsToEscape.replace(/([\[\]\\])/g,"\\$1") + "])";                                          // 1282
                                                                                                                       // 1283
	if (afterBackslash) {                                                                                                 // 1284
		regexString = "\\\\" + regexString;                                                                                  // 1285
	}                                                                                                                     // 1286
                                                                                                                       // 1287
	var regex = new RegExp(regexString,"g");                                                                              // 1288
	text = text.replace(regex,escapeCharacters_callback);                                                                 // 1289
                                                                                                                       // 1290
	return text;                                                                                                          // 1291
}                                                                                                                      // 1292
                                                                                                                       // 1293
                                                                                                                       // 1294
var escapeCharacters_callback = function(wholeMatch,m1) {                                                              // 1295
	var charCodeToEscape = m1.charCodeAt(0);                                                                              // 1296
	return "~E"+charCodeToEscape+"E";                                                                                     // 1297
}                                                                                                                      // 1298
                                                                                                                       // 1299
} // end of Showdown.converter                                                                                         // 1300
                                                                                                                       // 1301
// export                                                                                                              // 1302
if (typeof exports != 'undefined') exports.Showdown = Showdown;                                                        // 1303
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages\showdown\template-integration.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
if (Package.handlebars) {                                                                                              // 1
  Package.handlebars.Handlebars.registerHelper('markdown', function (options) {                                        // 2
    var converter = new Showdown.converter();                                                                          // 3
    return converter.makeHtml(options.fn(this));                                                                       // 4
  });                                                                                                                  // 5
}                                                                                                                      // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.showdown = {
  Showdown: Showdown
};

})();

//# sourceMappingURL=3e13c4f50c349535eafaf65fcc6058347d68013d.map
