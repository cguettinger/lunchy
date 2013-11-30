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

Groups.allow({
    insert: function(userId, doc){
        return !! userId;
    }
});

Meteor.publish("groups", function () {
    return Groups.find();
});