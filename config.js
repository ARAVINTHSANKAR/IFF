"use strict";
exports.__esModule = true;
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var db;
exports.db = db;
MongoClient.connect('mongodb://localhost:27017/excelDataPOC', { useNewUrlParser: true }, function (err, dbClient) {
    if (err) {
        console.log("connection failed");
    }
    else {
        console.log("Connection success");
        exports.db = db = dbClient;
    }
});
