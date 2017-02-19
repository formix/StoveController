var http = require("http");

var options = {
    host: "http://api.openweathermap.org",
    path: "/data/2.5/weather?id=6138360&appid=a37af3666b69772c2d81c222ab1531b5"
};


(function() {

    http.get(options, function(response) {

        var data = "";
        response.on("data", function(chunk) {
            data += chunk;
        });

        response.on("end", function() {
            console.log(data);
        });
    });


})();
