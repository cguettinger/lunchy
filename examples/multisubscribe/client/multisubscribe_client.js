Full = new Meteor.Collection('full');
Partial = new Meteor.Collection('partial');

Meteor.subscribe('full');
var handle;

Deps.autorun(function () {
    handle =  Meteor.subscribe('partial', { onReady: function() {
        var partial = Partial.find().fetch();
        console.log("onReady called:" + + partial.length );

    } });
});

Deps.autorun(function () {
    if (handle.ready()) {
        var partial = Partial.find().fetch();
        console.log("ready called:" + + partial.length + " " + partial[0].prop_one);
    }
});



