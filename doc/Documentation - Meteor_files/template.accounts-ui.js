(function(){Template.__define__("pkg_accounts_ui",Package.handlebars.Handlebars.json_ast_to_func([["#",[[0,"better_markdown"]],["\n## `accounts-ui`\n\nA turn-key user interface for Meteor Accounts.\n\nTo add Accounts and a set of login controls to an application, add the\n`accounts-ui` package and at least one login provider package:\n`accounts-password`, `accounts-facebook`, `accounts-github`,\n`accounts-google`, `accounts-twitter`, or `accounts-weibo`.\n\nThen simply add the `",["{",[[0,"dstache"]]],"loginButtons}}` helper to an HTML file. This\nwill place a login widget on the page. If there is only one provider configured\nand it is an external service, this will add a login/logout button. If you use\n`accounts-password` or use multiple external login services, this will add\na \"Sign in\" link which opens a dropdown menu with login options. If you plan to\nposition the login dropdown in the right edge of the screen, use\n`",["{",[[0,"dstache"]]],"loginButtons align=\"right\"}}` in order to get the dropdown to lay\nitself out without expanding off the edge of the screen.\n\nTo configure the behavior of `",["{",[[0,"dstache"]]],"loginButtons}}`, use\n[`Accounts.ui.config`](#accounts_ui_config).\n\n`accounts-ui` also includes modal popup dialogs to handle links from\n[`sendResetPasswordEmail`](#accounts_sendresetpasswordemail), [`sendVerificationEmail`](#accounts_sendverificationemail),\nand [`sendEnrollmentEmail`](#accounts_sendenrollmentemail). These\ndo not have to be manually placed in HTML: they are automatically activated\nwhen the URLs are loaded.\n\n\n\n"]]]));

})();