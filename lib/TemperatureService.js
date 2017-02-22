var http = require("http");


module.exports = TemperatureService;


function TemperatureService(intervalTime, callback) {
    this.intervalTime = intervalTime;
    this.callback = callback;
    this._options = {
        host: "api.openweathermap.org",
        path: "/data/2.5/weather?id=6138360&units=metric" +
              "&appid=a37af3666b69772c2d81c222ab1531b5",
        headers: {
            "Accept": "application/json"
        }
    };
};


TemperatureService.prototype.start = function() {
    this._interval = setInterval(
            this.requestTemperature, this.intervalTime, this._options);
    this.requestTemperature(this._options);
};

TemperatureService.prototype.stop = function() {
    if (this._interval === undefined) {
        return;
    }
    clearInterval(this._interval);
    delete this._interval;
};

TemperatureService.prototype.requestTemperature = function(options) {
    var self = this;
    http.get(options, function(response) {


        var data = "";
        response.on("data", function(chunk) {
            data += chunk;
        });

        response.on("end", function() {
            if (response.statusCode !== 200) {
                console.log("Request error status code " + response.statusCode + "\n" + data);
                return;
            }
            try {
                var weather = JSON.parse(data);
                self.temperature = weather.main.temp;
                self.callback(self.temperature);
            } catch(e) {
                console.log("Paarsing error " + "\n" + data);
            }
        });
    });
};



