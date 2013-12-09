/**
 * Created by ast on 30.11.13.
 */


if (Groups.find().count() === 0) {
    var groupBr = Groups.insert({
        name: "BR"
    });

    var groupMedia = Groups.insert({
        name: "Media"
    });

    var groupEcom = Groups.insert({
        name: "E-Commerce"
    });

    var group3oben = Groups.insert({
        name: "3-oben"
    });


}
checkInsertAllowed = function(userId, doc){ return !! userId; }

Meteor.publish("messages", function () {
    return Messages.find();
});

Meteor.publish("groups", function () {
    return Groups.find();
});

Groups.allow({
    insert: checkInsertAllowed
});

Proposals.allow({
    insert: checkInsertAllowed
});

UsersToGroups.allow({
    insert: checkInsertAllowed,
    remove: checkInsertAllowed
});

Meteor.publish("usersToGroups", function () {
    return UsersToGroups.find({userId: this.userId});
});

Meteor.methods({
    printInfos: function() {
        console.log("usersToGroups: " + UsersToGroups.find().count());
    },
    userNameByUserId: function(creatorUserId) {
        console.log(Meteor.users.findOne(creatorUserId).emails[0].address.split("@")[0]);
        return Meteor.users.findOne(creatorUserId).emails[0].address.split("@")[0];
    }
});

Admitters.allow({
    insert: checkInsertAllowed
});

Messages.allow({
    insert: checkInsertAllowed
});

Meteor.publish("proposals", function () {
    return Proposals.find();
});
Meteor.publish("admitters", function () {
    return Admitters.find();
});

