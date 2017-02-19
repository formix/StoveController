var TemperatureService = require("./TemperatureService");

var tempService = new TemperatureService(10000, function(temp) {
    console.log("Current temperature: " + temp + " Celcius");
});

tempService.start();

setTimeout(function() {
    tempService.stop();
}, 30000);
