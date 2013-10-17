
Matches.allow({
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


Tipps.allow({
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


Meteor.publish('tippsyUsers', function () {
    return TippsyUsers.find();
});

Meteor.publish('myTipps', function () {
    var initializing = true;
    var self = this;
    var tippsyUser_id = "";
    if (this.userId) {
        var theUser = Meteor.users.findOne({_id: this.userId});
        console.log(this.userId);
        console.log(theUser);

        var tippsyUser = TippsyUsers.findOne({name: theUser.username});
        tippsyUser_id = tippsyUser._id;
    }

    var matches = Matches.find().fetch();
    _.forEach(matches, function (match, index, matches ) {
            if(!Tipps.findOne({match_ID : match._id, tippsyUser_ID : tippsyUser_id})){
                Tipps.insert({
                    scoreTeamA: null,
                    scoreTeamB: null,
                    match_ID: match._id,
                    tippsyUser_ID: tippsyUser_id
                })
            }
        }
    )

    var handle = Tipps.find({tippsyUser_ID: tippsyUser_id}).observeChanges({
        added: function (id) {
            if (!initializing){
                var tipp = Tipps.findOne(id);
                self.added('myTipps', tipp._id, {scoreTeamA: tipp.scoreTeamA,
                    scoreTeamB: tipp.scoreTeamB,
                    match_ID: tipp.match_ID,
                    tippsyUser_ID: tipp.tippsyUser_ID});
            }
        },
        removed: function (id) {
            var tipp = Tipps.findOne(id);
            self.removed('myTipps', tipp._id);
        }
        // don't care about moved or changed
    });

    var tipps = Tipps.find({tippsyUser_ID: tippsyUser_id});
    tipps.forEach(function (element) {
        self.added('myTipps', element._id, {scoreTeamA: element.scoreTeamA,
            scoreTeamB: element.scoreTeamB,
            match_ID: element.match_ID,
            tippsyUser_ID: element.tippsyUser_ID});
    });
    initializing = false;
    self.ready();
});

Meteor.publish('matches', function () {
    return Matches.find();
});


Meteor.publish('tipps', function () {
    return Tipps.find();
});