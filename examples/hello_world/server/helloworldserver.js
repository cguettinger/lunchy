Meteor.methods({
    say_hello: function() {
        var message;
        message = "Server has been called!";
        console.log(message);
        return "Hello you!";
    }
});
Meteor.startup(function () {
// code to run on server at startup
});
