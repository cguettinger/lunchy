var proposalData =
    [
        {
            creator: 'cgr',
            title: 'Büffee um 12:00 Uhr von',
            admiters: [
                {name: 'bgs'},
                {name: 'fhr'},
                {name: 'mma'}
            ]
        },
        {
            creator: 'mma',
            title: 'Chinese um 12:00 Uhr von',
            admiters: [
                {name: 'bgs'}
            ]
        },
        {
            creator: 'nll',
            title: 'Italiener um 12:00 Uhr von',
            admiters: [
                {name: 'bgs'},
                {name: 'fhr'}
            ]
        }
    ];

Template.groupDetail.helpers({
    //TODO: delete static proposals and use groupObject
    proposals: proposalData,
    groupObject: function(){
        var groupId = Session.get('selectedGroup');
        return Groups.findOne(groupId);

    }
});