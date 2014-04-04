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

UI.body.helpers({
    // Helpers sind reaktiv. Man kann diese auch ohne Rückgabewert ins Template
    // einbinden und dann werden sie reaktiv ausgewertet, wie hier
    topProposalClass: function(){
        // set the background image to the top propasal
        var selectedGroupId = Session.get('selectedGroup');
        var dateFromSession = Session.get('currentDate');
        var proposals = Proposals.find({'groupId': selectedGroupId, 'creationDate': dateFromSession}).fetch();
        var topProposal = "";
        var topProposalCount = 0;
        for (var i = 0; i < proposals.length; i++) {
            var currentProposalCount = Admitters.find({'proposalId': proposals[i]._id}).count();
            if (currentProposalCount > topProposalCount) {
                topProposalCount = currentProposalCount;
                topProposal = proposals[i].description;
            }
        }
        var bodyClass = topProposal.toLowerCase();
        bodyClass = bodyClass.replace(/ /g, '');
        bodyClass = bodyClass.replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u');
        $("body").attr('class', bodyClass);
    }
});

// Globale Helper sind jetzt möglich, die man in allen
// Templates benutzen kann
UI.registerHelper('disabledOnOtherGroupsOrPastProposals', function () {
    var selectedGroupId = Session.get('selectedGroup');
    var currentDateString = Session.get('currentDate');
    var currentDate = dateFromString(currentDateString);
    var isDisabled = false;

    if (UsersToGroups.find({userId: Meteor.userId(), group: selectedGroupId}).count() == 0) {
        isDisabled = true;
    }
    if (currentDate.getTime() < dateFromString(currentDateWithoutTime()).getTime()) {
        isDisabled = true;
    }

    if (isDisabled) {
        return "disabled";
    } else {
        return null;
    }
});

Template.lunchyContentArea.rendered = function () {
    $('.withTooltip').tooltip();
}