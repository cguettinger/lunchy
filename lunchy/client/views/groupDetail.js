Meteor.subscribe('proposals');
Meteor.subscribe('admitters');

Template.groupDetail.helpers({
    disabledOnOtherGroups: function(){
        var selectedGroupId = Session.get('selectedGroup');
        if(UsersToGroups.find({userId: Meteor.userId(), group: selectedGroupId}).count() == 0){
            return "disabled='disabled'";
        }else{
            return "";
        }
    },
    proposals: function(){
        var selectedGroupId = Session.get('selectedGroup');
        return Proposals.find({'groupId' : selectedGroupId});
    },
    groupObject: function(){
        var groupId = Session.get('selectedGroup');
        return Groups.findOne(groupId);
    },
    hasGroup: function() {
//        todo@cba wie kann ich auf groupObject zugreifen?
       // return groupObject != null;
        var groupId = Session.get('selectedGroup');
        return Groups.findOne(groupId) != null;
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
