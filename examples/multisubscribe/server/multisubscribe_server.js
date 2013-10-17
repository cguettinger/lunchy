Full = new Meteor.Collection('full');
Partial = new Meteor.Collection('partial');



Full.allow({
    insert: function (userId) {
        return true;
    },
    update: function (userId) {
        return true;
    },
    remove: function (userId) {
        return true;
    }
});

Meteor.startup(function () {
    if (Full.find().count() === 0) {
        Full.insert({prop_one: "value_full", prop_two: "1"});
        Full.insert({prop_one: "value_full", prop_two: "2"});
        Full.insert({prop_one: "value_partial", prop_two: "3"});
    }
});

Meteor.publish('full', function () {
    return Full.find();
});

Meteor.publish('partial', function () {
    var initializing = true;
    var self = this;

    var handle = Full.find({prop_one: "value_partial"}).observeChanges({
        added: function (id) {
            if (!initializing){
                var newPartial = Full.findOne(id);
                self.added('partial', newPartial._id, {prop_one: newPartial.prop_one, prop_two: newPartial.prop_two});
            }
        },
        removed: function (id) {
            var newPartial = Full.findOne(id);
            self.removed('partial', newPartial._id);
        }
        // don't care about moved or changed
    });

    var partial = Full.find({prop_one: "value_partial"});
    partial.forEach(function (element) {

        //var uuid = Meteor.uuid();   // note._id will cause same problem
        self.added('partial', element._id, {prop_one: element.prop_one, prop_two: element.prop_two});
    });
    initializing = false;
    self.ready();
});