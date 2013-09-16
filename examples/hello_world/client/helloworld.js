Meteor.startup(function() {
bootbox.animate(false);
Toast.defaults.width = '400px';
return Toast.defaults.displayDuration = 1000;
});
Template.hello.greeting = function () {
return "Welcome to Hello World.";
};

Template.hello.events({

'click input' : function () {

    Toast.info("The button was clicked!");
    var confirm;
    confirm = bootbox.confirm('Send hello to the server?', 'No', 'Yes', function(confirmed) {
        if (confirmed) {
            var callReturned;
            callReturned = Meteor.call('say_hello', function(error, result){
                 if(error){
                   Toast.error("There has been an error: " + error.reason);
                 } else{
                   Toast.success(result);
                 }
            });
            console.log("callReturned: " + callReturned);
            // Toast.warning("test= " + callReturned);
        }
    });
    return confirm;
}
});
