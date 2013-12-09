/* Any main.* file is loaded after everything else. */

Meteor.startup(function () {

    Session.set('currentDate',currentDateWithoutTime());

    bootbox.animate(false);
    Toast.defaults.width = '400px';
    return Toast.defaults.displayDuration = 6000;
});

Template.lunchyContentArea.helpers
({
    isLoggedIn:function(){

        return Meteor.userId() !== null;

    }

});
