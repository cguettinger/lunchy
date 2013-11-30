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
    }
});
