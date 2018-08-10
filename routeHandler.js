"use strict";
exports.__esModule = true;
var express_1 = require("express");
var path = require("path");
var excelReader_1 = require("../service/excelReader");
var router = express_1.Router();
var excelReaderObj = new excelReader_1.excelReader();
router.get('/uploadTemplate', function (req, res) {
    excelReaderObj.uploadTemplate().then(function (val) { return res.send(val); }, function (err) { return res.send(err); });
});
router.get('/updateForm', function (req, res) {
    excelReaderObj.writeFileToLocal().then(function (val) {
        res.sendFile(path.join(__dirname, 'updatedForm.xlsx'));
    }, function (err) { return res.send(err); });
});
exports.routeHandler = router;
