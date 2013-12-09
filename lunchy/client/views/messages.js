Meteor.subscribe("messages");

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
    }
});
