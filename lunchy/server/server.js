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

    UsersToGroups.insert({userId: C7stGWMv3ovwzJ6nS, groups: [groupEcom, group3oben]});
}

Groups.allow({
    insert: function(userId, doc){
        return !! userId;
    }
});

UsersToGroups.allow({
    insert: function(userId, doc){
        return !! userId;
    }
});

Meteor.publish("groups", function () {
    return Groups.find();
});

Meteor.publish("usersToGroups", function () {
    return UsersToGroups.find({userId: Meteor.userId()});
});