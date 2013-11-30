/* Any main.* file is loaded after everything else. */

Template.lunchyContentArea.helpers
({
    isLoggedIn:function(){

        return Meteor.userId() !== null;

    }

});