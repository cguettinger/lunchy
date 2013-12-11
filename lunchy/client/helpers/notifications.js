init_document_for_notifications = function () {

    var Notification = window.Notification || window.mozNotification || window.webkitNotification;

    Notification.requestPermission(function (permission) {
        console.log(permission);
    });
}

showNotification = function(title, text) {
    var instance = new Notification(
        title, {
            body: text
        }
    );
    instance.onclick = function () {
        // Something to do
    };
    instance.onerror = function () {
        // Something to do
    };
    instance.onshow = function () {
        // Something to do
    };
    instance.onclose = function () {
        // Something to do
    };
    return false;
}