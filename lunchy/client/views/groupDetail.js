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
    disabledForPastProposals:function(){
        var currentDateString = Session.get('currentDate');
        var currentDate = dateFromString(currentDateString);
        console.log('currentDateParsed:', currentDate);
        if(currentDate.getTime() < dateFromString(currentDateWithoutTime()).getTime()){
            return "disabled='disabled'";
        }else{
            return "";
        }
    },
    proposals: function(){
        var selectedGroupId = Session.get('selectedGroup');
        var dateFromSession = Session.get('currentDate');
        return Proposals.find({'groupId' : selectedGroupId, 'creationDate': dateFromSession});
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
        return Admitters.find({'proposalId': proposalId});
    }
});

Template.groupDetail.events(
    {
        //TODO: checken ob date in der Vergangenheit liegt.
        'click #create_proposal': function (evt) {
            evt.preventDefault();
            var dateFromSession = Session.get('currentDate');
            var insert = {
                description: $("#proposalDescription").val(),
                time: $("#proposalTime").val(),
                creationDate: dateFromSession,
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
