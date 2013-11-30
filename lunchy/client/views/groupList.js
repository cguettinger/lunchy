var myGroups = [
    {
        name: 'Media'
    },
    {
        name: 'E-Commerce'
    }
];

Meteor.subscribe('groups');

Template.groupList.helpers({
    myGroups: myGroups,
    allGroups: function () {
        return Groups.find();
    }
});

Template.groupList.events({
    'submit #create_group': function (evt) {
        evt.preventDefault();
        Groups.insert({name: $(evt.target).find("input").val()});
        $(evt.target).find("input").val("");
    },

    'click .groupItem': function (evt) {
       evt.preventDefault();
       Toast.info($(evt.target).attr("href"));
       Session.set('selectedGroup', $(evt.target).attr("href"));
    }
});
