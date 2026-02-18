
// From https://leafletjs.com/examples/quick-start/
var map = L.map('map').setView([51.04, -114.06], 11);  // Calgary approx city center from online search

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function onConnect() {

}

function onFailure() {

}

function onConnectionLost() {

}

function onMessageArrived() {
    
}

function startconnection(event) {
    var host = document.getElementById("host").value;
    var port = document.getElementById("value").value;
    var client = "dylansdevice" + Math.floor(Math.random() * 10000);

    mqqt = new Paho.MQTT.Client(host, port, client);
    var options = {
        timeout: 4000,
        onSuccess: onConnect,
        onFailure: onFailure,
    };

    mqtt.onConnectionLost = onConnectionLost;
    mqtt.onMessageArrived = onMessageArrived;

    mqtt.connect(options)

}

function endConnection(event) {

}

function settopic(event) {

}

function publishstatus(event) {

}