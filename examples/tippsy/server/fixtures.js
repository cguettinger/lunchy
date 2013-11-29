if (!Meteor.users.find().count()) {
    var options = {
        username: 'admin',
        password: 'default-password',
        email: 'admin@example.com'
    };
    Accounts.createUser(options);
    Accounts.createUser({
        username: 'test1@sybit.de',
        password: 'test1@sybit.de',
        email: 'test1@sybit.de'
    });
    Accounts.createUser({
        username: 'test2@sybit.de',
        password: 'test2@sybit.de',
        email: 'test2@sybit.de'
    });
    Accounts.createUser({
        username: 'test3@sybit.de',
        password: 'test3@sybit.de',
        email: 'test3@sybit.de'
    });
}
if (Matches.find().count() === 0) {
    var match1ID = Matches.insert({
        teamA: "Deutschland",
        teamB: "England",
        scoreTeamA: undefined,
        scoreTeamB: undefined
    });
    var match2ID = Matches.insert({
        teamA: "Italien",
        teamB: "Spanien",
        scoreTeamA: undefined,
        scoreTeamB: undefined
    });
}
if (TippsyUsers.find().count() === 0) {
    var tippsyUser1ID = TippsyUsers.insert({
        name: "test1@sybit.de",
        score: 5
    });
    var tippsyUser2D = TippsyUsers.insert({
        name: "test2@sybit.de",
        score: 0
    });
    var tippsyUser3ID = TippsyUsers.insert({
        name: "test3@sybit.de",
        score: 25
    });
}
if (Tipps.find().count() === 0) {
    var tipp1ID = Tipps.insert({
        scoreTeamA: 4,
        scoreTeamB: 0,
        match_ID: match1ID,
        tippsyUser_ID: tippsyUser1ID
    });
    var tipp2ID = Tipps.insert({
        scoreTeamA: 2,
        scoreTeamB: 2,
        match_ID: match2ID,
        tippsyUser_ID: tippsyUser1ID
    });
    var tipp3ID = Tipps.insert({
        scoreTeamA: 1,
        scoreTeamB: 3,
        match_ID: match2ID,
        tippsyUser_ID: tippsyUser2D
    });
}

