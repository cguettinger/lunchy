Meteor.subscribe("messages");

Template.messagesItems.helpers({
    messageGroups: function()
    {
        var messageGroupCounter                     = 0;
        var messageGroups                           = new Array();
        var messageListCounter                     = 0;
        var messageList                             = new Array();
        var allMessageList                          = Messages.find({}, {sort: {timestamp: -1}}).fetch();
        var currentGroupDate                        = null;
        for(var i = 0; i < allMessageList.length; i++)
        {
            var message                             = allMessageList[i];
            if(null == currentGroupDate)
            {
                currentGroupDate                    = new Date(message.timestamp);
            }

            if(dateChanged(currentGroupDate, message.timestamp) || i == allMessageList.length-1)
            {
                var day                             = "" + currentGroupDate.getDay();
                if(day.length < 2)
                {
                    day = "0" + day;
                }
                var month                           = "" + (currentGroupDate.getMonth() + 1);
                if(month.length < 2)
                {
                    month = "0" + month;
                }
                var year                            = "" + currentGroupDate.getFullYear();
                var timestamp                       = day + "." + month + "." + year;
                messageGroups[messageGroupCounter]  = {timestamp: timestamp, messages: messageList};
                currentGroupDate                    = new Date(message.timestamp);
                messageList                         = new Array();
                messageGroupCounter++;
                messageListCounter                  = 0;
            }
            messageList[messageListCounter]         = message;
            messageListCounter++;
        }
        return messageGroups;
    },
    formattedDate: function (timestamp) {
        var date = new Date(timestamp);
        return date.getDay() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    }

});

function dateChanged(currentGroupDate, timestamp)
{
    var date        = new Date(timestamp);
    var returnValue = false;
    if (!(currentGroupDate.getYear() == date.getYear() && currentGroupDate.getMonth() == date.getMonth() && currentGroupDate.getDay() == date.getDay()))
    {
        returnValue = true;
    }
    return returnValue;
}

Template.messages.events({
    'submit #add_message': function (evt) {
        evt.preventDefault();
        var message = {};
        message.message = $(evt.target).find("input").val();
        message.author = Meteor.user().emails[0].address.split("@")[0];
        message.timestamp = new Date().getTime();
        message.groupId=Session.get('selectedGroup');

        Messages.insert(message);
        $(evt.target).find("input").val("");
    }
});
