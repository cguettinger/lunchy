var myGroups = [{
    name: 'Media'
}, {
    name: 'E-Commerce'
}];

var allGroups = [{
    name: 'BR'
}, {
    name: '3-oben'
}];
Template.groupList.helpers({
    myGroups: myGroups,
    allGroups: allGroups
});
