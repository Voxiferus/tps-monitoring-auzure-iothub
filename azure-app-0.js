var tibbit28 = require("@tibbo-tps/tibbit-28").init("S11");
var tibbit35 = require("@tibbo-tps/tibbit-35").init("S13");
var tibbit30 = require("@tibbo-tps/tibbit-30").init("S15");

setInterval(function(){
    var illuminationData = tibbit28.getData();
    var humidityData = tibbit30.getData();
    var pressureData = tibbit35.getData();
    var dateTime = new Date();

    console.log("Date/Time: "+dateTime);
    console.log("Illumination: "+illuminationData.illumination);
    console.log("Humidity: "+humidityData.humidity);
    console.log("Temperature: "+humidityData.temperature);
    console.log("Pressure: "+pressureData.pressure);
},1000);
