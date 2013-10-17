TippsyUser = function (doc) {
    _.extend(this, doc);
};
/*_.extend(TippsyUser.prototype, {
    findTipps: function () {
        return Tipps.find();
    }
});*/

TippsyUsers = new Meteor.Collection('tippsyUsers');

Tipps = new Meteor.Collection('tipps');

Matches = new Meteor.Collection('matches');

