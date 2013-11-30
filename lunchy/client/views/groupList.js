var myGroups = [
    {
        name: 'Media'
    },
    {
        name: 'E-Commerce'
    }
];

Meteor.subscribe('groups');

Meteor.subscribe('usersToGroups');

Deps.autorun(function(){
    Template.groupList.helpers({
        myGroups: function(){
            myGroupsArray = [];
            userToGroupsArray = UsersToGroups.find().fetch();
            _.forEach(userToGroupsArray, function(userToGroupElement, i, userToGroupsArray){
                myGroupsArray.push(Groups.findOne(userToGroupElement.group));
            });

            return myGroupsArray;
        },
        allGroups: function () {
            allGroupsWithoutMyGroups = [];
            allGroups = Groups.find().fetch();
            console.log("All Groups: " + allGroups.length);
            _.forEach(allGroups, function(theGroup, i, allGroups){
                if(UsersToGroups.find({group: theGroup._id}).count() == 0){
                    allGroupsWithoutMyGroups.push(theGroup);
                }
            });
            console.log("not my Groups array: " + allGroupsWithoutMyGroups.length);
            return allGroupsWithoutMyGroups;
        }
    })}
);

Template.groupList.events({
    'submit #create_group': function (evt) {
        evt.preventDefault();
        Groups.insert({name: $(evt.target).find("input").val()});
        $(evt.target).find("input").val("");

        console.log("userId " + Meteor.userId() + " groups: " + UsersToGroups.find().count());

    },

    'click .groupItem': function (evt) {
       evt.preventDefault();
       Toast.info($(evt.target).attr("href"));
       Session.set('selectedGroup', $(evt.target).attr("href"));
       UsersToGroups.insert({userId: Meteor.userId(), group: $(evt.target).attr("href")});
       console.log("userId " + Meteor.userId() + " groups: " + UsersToGroups.find().count());
       Meteor.call('printInfos');
    }
});
