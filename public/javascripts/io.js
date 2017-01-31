$(function() {
    var socket = io.connect(window.location.origin);
    socket.on('reload', function (data) {
        console.log('recevied reload',data);
        window.location.reload();
    });
});