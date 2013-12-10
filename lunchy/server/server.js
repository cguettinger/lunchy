/**
 * Created by ast on 30.11.13.
 */


checkInsertAllowed = function(userId, doc){ return !! userId; }

Accounts.validateNewUser(function (user) {
    var loginName = user.emails[0].address;
    if (loginName && loginName.length >= 3 && loginName.indexOf('sybit.de') >= 0)
        return true;
    throw new Meteor.Error(403, "Only for privileged users!");
});

Meteor.publish('messages', function(limit) {
    return Messages.find({}, {limit: limit});
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
    messagesCount: function(id){
        console.log( "messages Count " + Messages.find().count());
        return Messages.find({groupId:id}).count();
    }
});

Admitters.allow({
    insert: checkInsertAllowed,
    update:checkInsertAllowed,
    remove:checkInsertAllowed
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

