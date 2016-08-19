var clientFromConnectionString = require('azure-iot-device-amqp').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

var connectionString = '<DEVICE CONNECTION STRING>';
var client = clientFromConnectionString(connectionString);

var tibbit28 = require("@tibbo-tps/tibbit-28").init("S11");
var tibbit35 = require("@tibbo-tps/tibbit-35").init("S13");
var tibbit30 = require("@tibbo-tps/tibbit-30").init("S15");

client.open(function(err){
    if(err){
        console.log('Could not connect: ' + err);
    }else{
        console.log('Client connected');

        setInterval(function(){
            var illuminationData = tibbit28.getData();
            var humidityData = tibbit30.getData();
            var pressureData = tibbit35.getData();

            var time = new Date().toISOString();

            var data = JSON.stringify({
                humidity: humidityData.humidity,
                temperature: humidityData.temperature,
                pressure: pressureData.pressure,
                illumination: illuminationData.illumination,
                time: time
            });

            var message = new Message(data);

            client.sendEvent(message, function (err) {
                if(err){
                    console.log(err.toString());
                }else{
                    console.log("Message sent: " + message.getData());
                }
            });
        },60000)
    }
});