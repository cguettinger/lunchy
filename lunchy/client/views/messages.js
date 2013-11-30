Meteor.subscribe("messages");

Template.messagesItems.helpers({
    messages: function () {
        return Messages.find({}).fetch().reverse()
    }
});

Template.messages.events({
    'submit #add_message': function (evt) {
        evt.preventDefault();
        var userName = Meteor.user().emails[0].address.split("@")[0];
        Messages.insert({message: $(evt.target).find("input").val(), author: userName});
        $(evt.target).find("input").val("");
    }
});
