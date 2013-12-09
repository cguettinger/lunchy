Meteor.subscribe('proposals');
Meteor.subscribe('admitters');

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

    }
});

Template.admitterList.helpers({

    admittersOfProposal: function(proposalId){
        return Admitters.find({'proposalId': proposalId}).fetch();
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
                creatorName: Meteor.users.findOne(Meteor.userId()).emails[0].address.split("@")[0],
                groupId: Session.get('selectedGroup')
            };

            Proposals.insert(insert);
        },
        'click .proposalbutton': function (evt) {

            var proposalId = $(evt.currentTarget).attr("id");
            var result = Admitters.findOne(Meteor.userId());

            if(result) {
                Admitters.update(Meteor.userId(), {$set: {proposalId:proposalId}});
            } else {
                var insert = {
                    _id: Meteor.userId(),
                    admitterName:Meteor.users.findOne(Meteor.userId()).emails[0].address.split("@")[0],
                    proposalId:proposalId
                };
                var id = Admitters.insert(insert);
            }
        }
    }
);
