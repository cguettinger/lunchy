/* Any main.* file is loaded after everything else. */

Meteor.startup(function () {
    init_document_for_notifications();
    moment.lang('de');
    Session.set('currentDate',currentDateWithoutTime());
    bootbox.animate(false);
    Toast.defaults.width = '400px';
    Toast.defaults.displayDuration = 6000;

});

Template.lunchyContentArea.helpers
({
    isLoggedIn:function(){
        return Meteor.userId() !== null;
    }
});

Deps.autorun(function () {
    if (isProposalCollectionReady()) {
        Proposals.find().observeChanges({
            _suppress_initial: true,
            added: function (id, proposal) {
                console.log('show: ' + proposal);
                if(isProposalCollectionReady() && proposal.creator != Meteor.userId()){
                    showNotification('Neuer Vorschlag in Lunchy von: ' + proposal.creatorName, proposal.description);
                }
            }
        });
    }
});


Template.lunchyContentArea.rendered = function () {
    $('.withTooltip').tooltip();
}