
// From https://leafletjs.com/examples/quick-start/
var map = L.map('map').setView([51.04, -114.06], 11);  // Calgary approx city center from online search

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function onConnect(recon, url) {
    console.log("Connected!");
    alert("Connected!");
}

var should_be_open = false;
var publishing_topic = false;

// If failed, try again
function onFailure(message) {
    if (should_be_open) {
        console.log("Failed! " + message);
        alert("Failed! " + message);

        setTimeout(startconnection, 2000);
    }
}

// If disconnected, try again
function onConnectionLost() {
    if (should_be_open) {
        console.log("Connection Lost!");
        alert("Connection Lost! Reconnecting");
        setTimeout(startconnection, 2000);
    }
}

function onMessageArrived(rx) {
    console.log("Received!")
    console.log(rx.payloadString)
}

function startconnection(event) {
    console.log("Starting a secure connection")
    var host = document.getElementById("host").value;
    var port = Number(document.getElementById("port").value);
    var client = "dylansdevice" + Math.floor(Math.random() * 10000);

    mqtt = new Paho.MQTT.Client(host, port, client);
    var options = {
        timeout: 4000,
        onSuccess: onConnect,
        onFailure: onFailure,
        useSSL:true
    };

    mqtt.onConnectionLost = onConnectionLost;
    mqtt.onMessageArrived = onMessageArrived;

    should_be_open = true;
    mqtt.connect(options)
}

function endConnection(event) {
    should_be_open = false;
    mqtt.disconnect();
    console.log("Disconnected!");
    alert("Disconnected!");
}

function settopic(event) {
    if (!should_be_open) {
        console.log("Must Connect First!");
        alert("Must Connect First!");
        return
    }
    publishing_topic = document.getElementById("topic").value;
    mqtt.subscribe(publishing_topic)

    console.log("Topic Set as " + publishing_topic);
    alert("Topic Set");

}

function publishstatus(event) {
    if (!should_be_open) {
        console.log("Must Connect First!");
        alert("Must Connect First!");
        return
    }
    if (!publishing_topic) {
        console.log("Must Set a Topic First!");
        alert("Must Set a Topic First!");
        return
    }
    if (!navigator.geolocation) {
        console.log("Must be position enabled!");
        alert("Must be position enabled!");
        return
    }

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }

    var temperature = Math.random() // [0-1)
    temperature = temperature * 100 // [0-101)
    temperature = temperature - 40 // - [-40-61)
    temperature = Math.floor(temperature) // [-40-60]

    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
    navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)
            console.log(temperature)
            alert(position.coords.latitude)
            alert(position.coords.longitude)
            alert(temperature)
        }
    )

    var msg = "Testing"
    message = new Paho.MQTT.Message(msg);
    message.destinationName = publishing_topic
    mqtt.send(message)

    
    console.log("Sent Message");
    alert("Sent Message");
}