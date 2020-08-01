var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    http = require("https"),
    config = require('./config'),
    cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET /search/eminem
app.get('/api/search/:query', (request, response) => {
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
    }

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);

            response.setHeader('Content-Type', 'application/json');
            response.send(body.toString());
        });
    });

    request.on('error', function (error) {
        handleError(res, error.message, 'Something went really wrong, oops!', 500);
    });

    req.end();
});

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
