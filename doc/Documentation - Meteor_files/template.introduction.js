(function(){Template.__define__("introduction",Package.handlebars.Handlebars.json_ast_to_func(["<div id=\"introduction\">\n<!-- clicking this anchor in the left bar should scroll to top of doc,\nnot here -->\n<!-- XXX by: (three headshot thumbnails w names) -->\n\n",["#",[[0,"markdown"]],["\n\n<b>_Meteor is an ultra-simple environment for building modern websites.\nWhat once took weeks, even with the best tools, now takes hours with\nMeteor._</b>\n\nThe web was originally designed to work in the same way that mainframes\nworked in the 70s.  The application server rendered a screen and sent it\nover the network to a dumb terminal. Whenever the user did anything,\nthat server rerendered a whole new screen. This model served the Web\nwell for over a decade. It gave rise to LAMP, Rails, Django, PHP.\n\nBut the best teams, with the biggest budgets and the longest schedules,\nnow build applications in JavaScript that run on the client.  These apps\nhave stellar interfaces.  They don't reload pages.  They are reactive:\nchanges from any client immediately appear on everyone's screen.\n\nThey've built them the hard way.  Meteor makes it an order of\nmagnitude simpler, and a lot more fun.  You can build a complete\napplication in a weekend, or a sufficiently caffeinated hackathon.  No\nlonger do you need to provision server resources, or deploy API\nendpoints in the cloud, or manage a database, or wrangle an ORM layer,\nor swap back and forth between JavaScript and Ruby, or broadcast data\ninvalidations to clients.\n\nMeteor is a work in progress, but we hope it shows the direction of\nour thinking.  We'd love to hear your feedback.\n\n\n## Quick start!\n\n<!-- change colors on these. $ and command output in grey, rest in\nwhite -->\n\nThe following works on all [supported\nplatforms](https://github.com/meteor/meteor/wiki/Supported-Platforms).\n\nInstall Meteor:\n\n<pre>\n$ curl https://install.meteor.com | /bin/sh\n</pre>\n\nCreate a project:\n\n<pre>\n$ meteor create myapp\n</pre>\n\nRun it locally:\n\n<pre>\n$ cd myapp\n$ meteor\n=&gt; Meteor server running on: http://localhost:3000/\n</pre>\n\nUnleash it on the world (on a free server we provide):\n\n<pre>\n$ meteor deploy myapp.meteor.com\n</pre>\n\n<h2 id=\"sevenprinciples\">Seven Principles of Meteor</h2>\n\n<!-- wire with [1,2,3] on it -->\n- _Data on the Wire_. Don't send HTML over the network. Send data and\nlet the client decide how to render it.\n\n<!-- two people, one speech bubble coming out of both of their mouths,\ncontaining '{}' -->\n- _One Language._ Write both the client and the server parts of your\ninterface in JavaScript.\n\n<!-- globe, with the same database icon in US and Russia -->\n- _Database Everywhere_. Use the same transparent API to access your\ndatabase from the client or the server.\n\n<!-- clock with zero time elapsed. or clock on left with zero time\nelapsed, horizontal bold line to a clock with zero time elapsed, but a\nline at a 45 degree angle to a a clock in grey with 100 ms\nelapsed. like shades of relativity -->\n- _Latency Compensation_. On the client, use prefetching and model\nsimulation to make it look like you have a zero-latency connection to\nthe database.\n\n<!-- knee getting hit with hammer like in reflex test -->\n- _Full Stack Reactivity_. Make realtime the default. All layers, from\ndatabase to template, should make an event-driven interface available.\n\n- _Embrace the Ecosystem_. Meteor is open source and integrates,\nrather than replaces, existing open source tools and frameworks.\n\n<!-- zen circle -->\n- _Simplicity Equals Productivity_. The best way to make something\nseem simple is to have it actually _be_ simple. Accomplish this through\nclean, classically beautiful APIs.\n\n\n<h2 id=\"resources\">Developer Resources</h2>\n\n<!-- https://github.com/blog/273-github-ribbons -->\n<a href=\"http://github.com/meteor/meteor\"><img class=\"github-ribbon visible-desktop\" style=\"position: absolute; top: 0; right: 0; border: 0;\" src=\"/forkme_right_red_aa0000.png\" alt=\"Fork me on GitHub\"></a>\n\nIf anything in Meteor catches your interest, we hope you'll get involved\nwith the project!\n\n<dl class=\"involved\">\n<dt><span>Stack Overflow</span></dt>\n<dd>The best place to ask (and answer!) technical questions is on <a href=\"http://stackoverflow.com/questions/tagged/meteor\">Stack\n  Overflow</a>.  Be sure to add\n  the <code>meteor</code> tag to your question.\n</dd>\n\n<dt><span>Mailing lists</span></dt>\n<dd>\n  We have two mailing lists for Meteor.  <nobr><a href=\"http://groups.google.com/group/meteor-talk\"><code>meteor-talk@googlegroups.com</code></a></nobr>\n  is for general questions, requests for help, and new project\n  announcements.\n  <nobr><a href=\"http://groups.google.com/group/meteor-core\"><code>meteor-core@googlegroups.com</code></a></nobr>\n  is for discussing Meteor internals and proposed changes.\n</dd>\n\n<dt><span>IRC</span></dt>\n<dd><code>#meteor</code> on <code>irc.freenode.net</code>. The\ndevelopers hang out here and will answer your questions whenever they\ncan.</dd>\n\n<dt><span>GitHub</span></dt>\n<dd>The code is on <a href=\"http://github.com/meteor/meteor\">GitHub</a>. The best way to send a patch is with a GitHub pull request, and the best way to file a bug is in the <a href=\"https://github.com/meteor/meteor/issues/\">GitHub bug tracker</a>, after reading our <a href=\"https://github.com/meteor/meteor/blob/devel/Contributing.md#filing-bug-reports\">guide to filing bug reports</a>. If the issue contains sensitive information or raises a security concern, email <code>security</code><code>@</code><code>meteor</code><code>.</code><code>com</code> instead, which will page the security team.</dd>\n</dl>\n\n"]],"\n</div>"]));

})();