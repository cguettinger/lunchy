
Template.addProposal.rendered = function () {
    // Aus irgendeinem Grund müssen solche JQuery DOM
    // Selektoren bei Blaze möglichst in eigenen Templates ausgelagert werden,
    // damit der DOM schon existiert wenn rendered aufgerufen wird
    // Am besten sollte man jeden Aspekt der Anwendung in eigenen Templates behandeln.
    $( "#proposalDescription" ).autocomplete({
        source: availableProposalLocations,
        minLength: 0
    });

    $( "#proposalTime" ).autocomplete({
        source: availableProposalTimes,
        minLength: 0
    });
}