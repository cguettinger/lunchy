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
        allGroupsWithoutMyGroups = [];
        allGroups = Groups.find().fetch();
        _.forEach(allGroups, function(group, i, allGroups){
            insert = true;
            myGroups.forEach(function(myGroup) {
                if(myGroup.name == group.name){
                    insert = false;
                }
            });
            /*_.forEach(myGroups, function(mygroup, i, myGroups){
                if(mygroup.name == group.name){
                    insert = false;
                }
            });*/
            if(insert){
                //allGroupsWithoutMyGroups.add(group);
            }
        });
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
