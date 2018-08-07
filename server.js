"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var routeHandler_1 = require("./controllers/routeHandler");
var app = express();
var port = 8080;
app.use(bodyParser.json());
app.get('/readFile', routeHandler_1.routeHandler);
app.listen(port, function () {
    console.log("port listening in : " + port);
});
