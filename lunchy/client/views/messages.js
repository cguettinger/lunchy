var messageHandle = Meteor.subscribeWithPagination('messages', 20);


Template.messages.helpers({
    hasGroup: function() {
        var groupId = Session.get('selectedGroup');
        return Groups.findOne(groupId) != null;
    },
    disabledOnOtherGroups: function(){
        var selectedGroupId = Session.get('selectedGroup');
        if(UsersToGroups.find({userId: Meteor.userId(), group: selectedGroupId}).count() == 0){
            return "disabled='disabled'";
        }else{
            return "";
        }
    }
});

Template.messagesItems.helpers({
    messageGroups: function()
    {
        var messageGroupCounter                     = 0;
        var messageGroups                           = new Array();
        var messageListCounter                      = 0;
        var messageList                             = new Array();
        var allMessageList                          = Messages.find({groupId:Session.get('selectedGroup')}, {sort: {timestamp: -1}}).fetch();
        var currentGroupDate                        = null;
        for(var i = 0; i < allMessageList.length; i++)
        {
            var message                             = allMessageList[i];
            if(null == currentGroupDate)
            {
                currentGroupDate                    = new Date(message.timestamp);
            }

            if(i == allMessageList.length-1)
            {
                messageList[messageListCounter]         = message;
            }

            if(dateChanged(currentGroupDate, message.timestamp) || i == allMessageList.length-1)
            {
                if(i == allMessageList.length-1)
                {
                    messageList[messageListCounter]         = message;
                }
                var day                             = "" + currentGroupDate.getDate();
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
            else
            {
                messageList[messageListCounter]         = message;
            }
            messageListCounter++;
        }
        return messageGroups;
    },
    formattedDate: function (timestamp) {
        var date = new Date(timestamp);
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    },
    showLoadNextButton: function(){
        Meteor.call('messagesCount',Session.get('selectedGroup') , function(error, result){
            Session.set('messagesCount', result);
            return result;
        });
        console.log("loaded : " + Messages.find({groupId:Session.get('selectedGroup')}).count() + ", count: " +  Session.get('messagesCount'));
        return (Messages.find({groupId:Session.get('selectedGroup')}).count() != Session.get('messagesCount'));
    }

});

function dateChanged(currentGroupDate, timestamp)
{
    var date        = new Date(timestamp);
    var returnValue = false;
    if (!(currentGroupDate.getYear() == date.getYear() && currentGroupDate.getMonth() == date.getMonth() && currentGroupDate.getDate() == date.getDate()))
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
    },

    'click .loadNextButton': function(evt){
        evt.preventDefault();
        messageHandle.loadNextPage();
    }
});
