/* Any main.* file is loaded after everything else. */

Meteor.startup(function () {
    moment.lang('de');
    Session.set('currentDate',currentDateWithoutTime());

    bootbox.animate(false);
    Toast.defaults.width = '400px';
    return Toast.defaults.displayDuration = 6000;
    init_document_for_notifications();


});

Template.lunchyContentArea.helpers
({
    isLoggedIn:function(){

        return Meteor.userId() !== null;

    }

});

Template.lunchyContentArea.rendered= function (){

};

Proposals.find().observeChanges({
    added: function (id, proposal) {
        console.log('show');
        if(proposal.creator != Meteor.userId()){
            showNotification('Neuer Vorschlag in Lunchy von: ' + proposal.creatorName, proposal.description);
        }
    }
});