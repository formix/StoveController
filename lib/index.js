var requestTemp = require("./requestTemp");

requestTemp(function(err, temp) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Current temperature: " + temp + " C");
});
