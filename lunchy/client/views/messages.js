//Meteor.subscribe("messages");
var messageHandle = Meteor.subscribeWithPagination('messages', 5);


var previousMessagesDate = null;
Template.messagesItems.helpers({

    messages: function () {
        return Messages.find({}, {sort: {timestamp: -1}});
    },
    dateChanged: function (timestamp) {
        var date = new Date(timestamp);
        var returnValue = false;
        if (previousMessagesDate != null && !(previousMessagesDate.getYear() == date.getYear() && previousMessagesDate.getMonth() == date.getMonth() && previousMessagesDate.getDay() == date.getDay() && previousMessagesDate.getMinutes() == date.getMinutes())) {
            returnValue = true;
        }
        previousMessagesDate = date;
        return returnValue;
    },

    formattedDate: function (timestamp) {
        var date = new Date(timestamp);
        return date.getDay() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + "  " + date.getMinutes();
    },

    showLoadNextButton: function(){
        Meteor.call('messagesCount', function(error, result){
           Session.set('messagesCount', result);
           return result;
        });
        //console.log("loaded : " + Messages.find().count() + ", count: " +  Session.get('messagesCount'));
        return (Messages.find().count() != Session.get('messagesCount'));
    }

});

Meteor.methods({
    messagesCount: function(){
        console.log( "client side messages Count " + Messages.find().count());
    }
});


Template.messages.events({
    'submit #add_message': function (evt) {
        evt.preventDefault();
        var message = {};
        message.message = $(evt.target).find("input").val();
        message.author = Meteor.user().emails[0].address.split("@")[0];
        message.timestamp = new Date().getTime();

        Messages.insert(message);
        $(evt.target).find("input").val("");
    },

    'click .loadNextButton': function(evt){
        evt.preventDefault();
        messageHandle.loadNextPage();
    }
});
