Meteor.startup(function () {
    bootbox.animate(false);
    Toast.defaults.width = '400px';
    return Toast.defaults.displayDuration = 6000;
});

MyTipps = new Meteor.Collection('myTipps');
Meteor.subscribe('tipps');
Meteor.subscribe('tippsyUsers');
var matchesSubscription = Meteor.subscribe('matches');

var myTippsSubscription = null;

Deps.autorun(function () {
    myTippsSubscription = Meteor.subscribe('myTipps', { onReady: function() {
        var tipps = MyTipps.find().fetch();
    } });

});

Template.myTipp.events({
    'change .score-input': function (evt) {

        var options;
        if(evt.srcElement.id === "score-team-a"){
            options = {
                scoreTeamA: evt.srcElement.value
            };
        }
        if(evt.srcElement.id === "score-team-b"){
            options = {
                scoreTeamB: evt.srcElement.value
            };
        }
        console.log(options);
        if(options){
            var theTipp = Tipps.update(this._id, {
                $set: options
            }, function (err) {
                if (err) {
                    console.log(err.reason);
                    return Toast.error(err.reason);
                }
            });
        }
    }
});

Template.content.tippsyUsers = function () {
    return TippsyUsers.find();
};

Template.content.matches = function () {
    return Matches.find();
};

Deps.autorun(function () {
    if (matchesSubscription.ready()) {
        Matches.find().observeChanges({
            _suppress_initial: true,
            added: function (id, event) {
                console.log("Match added:" + id);
            },
            changed: function (id, event) {
                console.log("Match changed:" + id);
            },
            removed: function (id, event) {
                console.log("Match removed:" + id);
            }
        });
    }
});

Deps.autorun(function(){
    Template.content.loggedIn = function () {
        return Meteor.userId() != undefined;
    };
    Template.content.notLoggedIn = function () {
        return Meteor.userId() == undefined;
    };
});


Deps.autorun(function () {
   //if (myTippsSubscription.ready()) {
        Template.content.theTipps = function () {
            var tipps = MyTipps.find().fetch();
            console.log("MyTipps: " + tipps.length);
            var tippArray = [];
            _.forEach(tipps, function (element, index, tipps) {
                var match = Matches.findOne(element.match_ID);
                element.match = match;
                tippArray.push(element);
            })
            console.log(tippArray);
            return tippArray;
        };
   //}
});

