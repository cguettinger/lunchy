var proposalHandle = Meteor.subscribe('proposals');
Meteor.subscribe('admitters');

var reminder;

isProposalCollectionReady = function(){
    return proposalHandle.ready();
}



Template.groupDetail.helpers({
    proposals: function(){
        var selectedGroupId = Session.get('selectedGroup');
        var dateFromSession = Session.get('currentDate');
        return Proposals.find({'groupId' : selectedGroupId, 'creationDate': dateFromSession});
    },
    groupObject: function(){
        var groupId = Session.get('selectedGroup');
        return Groups.findOne(groupId);
    },
    showDate: function(){
        var currentDate = Session.get('currentDate');
        var today = currentDateWithoutTime();
        if(currentDate === today){
            return "Heute, " + moment(currentDate).format('LL');
        }else{
            return moment(currentDate).format('LL');
        }
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
    },
    renderDraggable: function(id) {
        var selectedGroupId = Session.get('selectedGroup');
        if(UsersToGroups.find({userId: Meteor.userId(), group: selectedGroupId}).count() == 0){
            return "";
        }else{
            return (Meteor.userId()+Session.get("currentDate")) == id ? "draggable" : "";
        }
    },
    renderBadgeType: function(admitterId){
        if(admitterId === Meteor.userId()){
            return 'badge-warning'
        } else {
            return 'badge-info';
        }
    }
});



submitProposal = function(evt){
    console.log("add_proposal");
    evt.preventDefault();
    if($("#proposalDescription").val() && $("#proposalTime").val()){
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
        $('#proposalDescription').val("");
        $('#proposalTime').val("");
    }
}

Template.groupDetail.events(
    {
        'submit #addProposal': function (evt) {
            submitProposal(evt);
        },
        'click .proposalbutton': function (evt) {

            var proposalId = $(evt.currentTarget).attr("id");
            var proposal = Proposals.findOne(proposalId);
            var proposalTime = proposal.time;
            var proposalDescription = proposal.description;
            Session.set("proposalTime", proposalTime);
            Session.set("proposalDescription", proposalDescription);
            var currentDate = Session.get('currentDate');


            var result = Admitters.findOne(Meteor.userId()+currentDate);

            if(reminder){
                Meteor.clearInterval(reminder);
                reminder = null;
            }
            if(result && result.proposalId == proposalId) {
                Admitters.remove(Meteor.userId()+currentDate);
            }
            else if(result) {
                Admitters.update(Meteor.userId() + currentDate, {$set: {proposalId:proposalId}});
                reminder = Meteor.setInterval(checkTimeOfProposalReachedAndNotify, 5000);
            } else {
                var insert = {
                    _id: Meteor.userId() + currentDate,
                    admitterId: Meteor.userId(),
                    admitterName:Meteor.users.findOne(Meteor.userId()).emails[0].address.split("@")[0],
                    proposalId:proposalId
                };
                var id = Admitters.insert(insert);
                reminder = Meteor.setInterval(checkTimeOfProposalReachedAndNotify, 5000);
            }
        },
        'click #btnDatePast': function (evt) {
            var currentDateString = Session.get('currentDate');
            var currentDateTimestamp = dateFromString(currentDateString).getTime();
            var currentDateTimestampMinusOneDay = currentDateTimestamp - (60*60*24*1000);
            var currentDateMinusOneDay = new Date(currentDateTimestampMinusOneDay);
            console.log("click .btnDatePast: " + currentDateString);
            Session.set('currentDate', formattedDate(currentDateMinusOneDay));
            currentDateString = Session.get('currentDate');
            console.log("click .btnDatePast: " + currentDateString);
        },
        'click #btnDateFuture': function (evt) {
            var currentDateString = Session.get('currentDate');
            var currentDateTimestamp = dateFromString(currentDateString).getTime();
            var currentDateTimestampMinusOneDay = currentDateTimestamp + (60*60*24*1000);
            var currentDatePlusOneDay = new Date(currentDateTimestampMinusOneDay);
            console.log("click .btnDateFuture: " + currentDateString);
            Session.set('currentDate', formattedDate(currentDatePlusOneDay));
            currentDateString = Session.get('currentDate');
            console.log("click .btnDateFuture: " + currentDateString);
        }

    }
);

checkTimeOfProposalReachedAndNotify = function (){
    time = Session.get("proposalTime").split(":");
    description = Session.get("proposalDescription");
    console.log("timer: " + time[0] + ":" + time[1]);
    dayString = formattedDate(new Date());
    dateTimeOfProposal = dateFromString(dayString);
    dateTimeOfProposal.setMinutes(time[1]);
    dateTimeOfProposal.setHours(time[0]);
    now = new Date();
    if(now.getTime() + 5*60*1000 > dateTimeOfProposal.getTime() && now.getTime() <= dateTimeOfProposal.getTime()){
        showNotification("Es geht gleich los!", "Um " + time[0] + ":" + time[1] + " Uhr geht's los. Ziel: " + description);
        Meteor.clearInterval(reminder);
        reminder = null;
    }
    if(reminder && now.getTime() > dateTimeOfProposal.getTime()){
        Meteor.clearInterval(reminder);
        reminder = null;
    }
    console.log("date: " + dateTimeOfProposal);
};

Template.groupDetail.rendered = function () {
    // Dieser Code gehört tatsächlich in den rendered Abschnitt
    // der nur ein einziges mal bei rendern des Templates
    // ausgeführt wird, da beim ändern der Zustimmung zum Vorschlag
    // wieder ein Timer aufgezogen wird
    if(reminder){
        Meteor.clearInterval(reminder);
        reminder = null;
    }
    var now = new Date();
    var currentDateString = formattedDate(now);
    var admitter = Admitters.findOne(Meteor.userId()+currentDateString);
    if(admitter){
        var proposalId = admitter.proposalId;
        var proposal = Proposals.findOne(proposalId);
        var proposalTime = proposal.time;
        var proposalDescription = proposal.description;
        Session.set("proposalTime", proposalTime);
        Session.set("proposalDescription", proposalDescription);
        Toast.info("Setting interval for: " + proposalDescription);
        reminder = Meteor.setInterval(checkTimeOfProposalReachedAndNotify, 5000);
    }
};

Template.admitterList.rendered = function () {
    $( ".draggable" ).draggable();
    $(".proposalDroppable").droppable({
        activeClass: "activeColor",
        hoverClass: "hoverColor",

        drop: function (event, ui) {
            var proposalId = $(this).attr("id").split('_')[1];
            $("#" + proposalId).click();
        }
    });
};


