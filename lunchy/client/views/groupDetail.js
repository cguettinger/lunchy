Meteor.subscribe('proposals');

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
    proposals: function(){
        var selectedGroupId = Session.get('selectedGroup');
        return Proposals.find({'groupId' : selectedGroupId});
    },
    groupObject: function(){
        var groupId = Session.get('selectedGroup');
        return Groups.findOne(groupId);

    },
    userNameByUserId: function(creatorUserId)
    {
        return Meteor.users.findOne(creatorUserId).emails[0].address.split("@")[0];
    }
});

Template.groupDetail.events(
    {
        'click #create_proposal': function (evt) {
            evt.preventDefault();
            var insert = {
                description: $("#proposalDescription").val(),
                time: $("#proposalTime").val(),
                creator: Meteor.userId(),
                groupId: Session.get('selectedGroup')
            };

            Proposals.insert(insert);
        }
    }
);
