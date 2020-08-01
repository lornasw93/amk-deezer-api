var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    http = require("https"),
    config = require('./config'),
    cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET method -- /search/eminem
app.get('/api/search/:query', (request, response) => {
    console.log(`GET HTTP method on api/deezer/${request.params.query} resource`);

    var options = {
        "method": "GET",
        "hostname": config.host,
        "port": null,
        "path": '/search?q=' + request.params.query,
        "headers": {
            "x-rapidapi-host": config.host,
            "x-rapidapi-key": config.key,
            "useQueryString": true
        }
    };

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);

            response.send(body.toString());
        });
    });

    request.on('error', function (error) {
        handleError(res, error.message, 'Something went really wrong, oops!', 500);
    });

    req.end();
});

app.get('/api/artist5/:date', (request, response) => {
    //response.send(`GET HTTP method on artist5/${request.params.date} resource`);

    //var options = {
    //    "method": "GET",
    //    "hostname": config.host,
    //    "port": null,
    //    "path": '/artist-100?date=' + request.params.date + '&range=1-5',
    //    "headers": {
    //        "x-rapidapi-host": config.host,
    //        "x-rapidapi-key": config.key,
    //        "useQueryString": true
    //    }
    //};

    //var req = http.request(options, function (res) {
    //    var chunks = [];

    //    res.on("data", function (chunk) {
    //        chunks.push(chunk);
    //    });

    //    res.on("end", function () {
    //        var body = Buffer.concat(chunks);
    //        console.log(body.toString());
    //    });
    //});

    //request.on('error', function (error) {
    //    handleError(res, error.message, 'Something went really wrong, oops!', 500);
    //});

    //req.end();
});

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
