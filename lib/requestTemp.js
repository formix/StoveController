var http = require("http");

var options = {
    host: "api.openweathermap.org",
    path: "/data/2.5/weather?id=6138360&units=metric" +
          "&appid=a37af3666b69772c2d81c222ab1531b5",
    headers: {
        "Accept": "application/json"
    }
};


module.exports = function (callback) {
    http.get(options, function(response) {

        var data = "";
        response.on("data", function(chunk) {
            data += chunk;
        });

        response.on("end", function() {
            if (response.statusCode !== 200) {

                callback(new Error("Request error status code " + 
                        response.statusCode + "\n" + data), null);
                return;
            }
            try {
                var weather = JSON.parse(data);
                callback(null, weather.main.temp);
            } catch(e) {
                var err = new Error("Parsing error " + "\n" + data);
                err.cause = e;
                callback(err);
            }
        });
    });
};



