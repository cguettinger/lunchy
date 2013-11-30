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

if (Messages.find().count() === 0) {
    Messages.insert({
        message: 'heute Büffee',
        author: 'cgr'
    });
    Messages.insert({
        message: 'nein',
        author: 'nll'
    });
    Messages.insert({
        message: 'doch',
        author: 'cba'
    });
}

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

Admitters.allow({
    insert: checkInsertAllowed
});

Messages.allow({
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