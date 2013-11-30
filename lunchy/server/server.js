/**
 * Created by ast on 30.11.13.
 */

if (Groups.find().count() === 0) {
    Groups.insert({
        name: "BR"
    });

    Groups.insert({
        name: "Media"
    });

    Groups.insert({
        name: "E-Commerce"
    });

    Groups.insert({
        name: "3-oben"
    });
}
checkInsertAllowed = function(userId, doc){ return !! userId; }

Groups.allow({
    insert: checkInsertAllowed
});

Proposals.allow({
    insert: checkInsertAllowed
});

Admitters.allow({
    insert: checkInsertAllowed
});

Meteor.publish("groups", function () {
    return Groups.find();
});
Meteor.publish("proposals", function () {
    return Proposals.find();
});
Meteor.publish("admitters", function () {
    return Admitters.find();
});