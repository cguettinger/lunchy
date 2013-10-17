// An Animal class that takes a document in its constructor
/*
Animal = function (doc) {
    _.extend(this, doc);
};
_.extend(Animal.prototype, {
    makeNoise: function () {
        console.log(this.sound);
    }
});

// Define a Collection that uses Animal as its document
Animals = new Meteor.Collection("Animals", {
    transform: function (doc) { return new Animal(doc); }
});

// Create an Animal and call its makeNoise method
Animals.insert({name: "raptor", sound: "roar"});
Animals.findOne({name: "raptor"}).makeNoise(); // prints "roar"
    */